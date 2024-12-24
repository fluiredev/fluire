import { findNearestNodeModules, getPackageJSON } from './package'

import chalk from 'chalk'
import { build } from 'esbuild'
import type { defineConfig } from 'fluire/config'
import fsp from 'node:fs/promises'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { promisify } from 'node:util'

const promisifiedRealpath = promisify(fs.realpath)

type FluireConfig = ReturnType<typeof defineConfig>

// Thanks to "vite" and contributors for the following code :)

interface NodeModuleWithCompile extends NodeJS.Module {
	_compile(code: string, filename: string): unknown
}

const DEFAULT_CONFIG_FILES = [
	'fluire.config.js',
	'fluire.config.mjs',
	'fluire.config.ts',
	'fluire.config.cjs',
	'fluire.config.mts',
	'fluire.config.cts'
]

export function isFilePathESM(filePath: string): boolean {
	if (/\.m[jt]s$/.test(filePath)) {
		return true
	}

	if (/\.c[jt]s$/.test(filePath)) {
		return false
	}

	const pkg = getPackageJSON()

	return pkg.type === 'module'
}

const _require = createRequire(import.meta.url)

export async function getFluireConfig(): Promise<FluireConfig> {
	let resolvedPath: string | undefined

	for (const filename of DEFAULT_CONFIG_FILES) {
		const filePath = path.resolve(process.cwd(), filename)

		if (!fs.existsSync(filePath)) continue

		resolvedPath = filePath
		break
	}

	if (!resolvedPath) {
		console.log(
			chalk.red(
				'Could not find a Fluire config file - Is the file named correctly? Searching for fluire.config.{js,ts,mjs,cjs}'
			)
		)
		process.exit(1)
	}

	const isESM = isFilePathESM(resolvedPath)

	try {
		const result = await build({
			absWorkingDir: process.cwd(),
			entryPoints: [resolvedPath],
			write: false,
			target: [`node${process.versions.node}`],
			platform: 'node',
			bundle: true,
			format: isESM ? 'esm' : 'cjs',
			mainFields: ['main'],
			sourcemap: 'inline',
			sourceRoot: `${path.dirname(resolvedPath)}${path.sep}`,
			metafile: true,
			external: ['fluire', 'stripe', 'esbuild']
		})

		const [bundled] = result.outputFiles

		if (!bundled) {
			throw new Error('No output files were generated')
		}

		const code = bundled.text

		let config: FluireConfig

		if (isESM) {
			let nodeModulesDir =
				typeof process.versions.deno === 'string'
					? undefined // Deno doesn't have a node_modules directory
					: findNearestNodeModules(path.dirname(resolvedPath))

			if (nodeModulesDir) {
				try {
					await fsp.mkdir(path.resolve(nodeModulesDir, '.fluire-temp/'), {
						recursive: true
					})
					// biome-ignore lint/suspicious/noExplicitAny: Error is caught and handled
				} catch (e: any) {
					if (e.code === 'EACCES') {
						nodeModulesDir = undefined
					} else {
						throw e
					}
				}
			}

			const hash = `timestamp-${Date.now()}-${Math.random().toString(16).slice(2)}`

			const tempFileName = nodeModulesDir
				? path.resolve(
						nodeModulesDir,
						`.fluire-temp/${path.basename(resolvedPath)}.${hash}.mjs`
					)
				: `${resolvedPath}.${hash}.mjs`

			await fsp.writeFile(tempFileName, code)

			try {
				config = (await import(pathToFileURL(tempFileName).href)).default
			} finally {
				fs.unlink(tempFileName, () => {})
			}
		} else {
			const extension = path.extname(resolvedPath)

			const realFileName = await promisifiedRealpath(resolvedPath)

			const loaderExt = extension in _require.extensions ? extension : '.js'

			const defaultLoader = _require.extensions[loaderExt]

			if (!defaultLoader) {
				throw new Error(`No loader found for ${extension}`)
			}

			_require.extensions[loaderExt] = (
				module: NodeJS.Module,
				filename: string
			) => {
				if (filename === realFileName) {
					;(module as NodeModuleWithCompile)._compile(code, filename)
				} else {
					defaultLoader(module, filename)
				}
			}

			const raw = _require(realFileName)
			_require.extensions[loaderExt] = defaultLoader

			config = raw.__esModule ? raw.default : raw
		}

		return config
	} catch (e) {
		console.error(e)
		console.error(
			chalk.red(
				'Error loading Fluire config file. Make sure the file is a valid module.'
			)
		)
		process.exit(1)
	}
}
