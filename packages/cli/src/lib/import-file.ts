import { findNearestNodeModules, getPackageJSON } from './package'
import path from 'node:path'
import fsp from 'node:fs/promises'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import { pathToFileURL } from 'node:url'
import { promisify } from 'node:util'

const promisifiedRealpath = promisify(fs.realpath)

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

interface NodeModuleWithCompile extends NodeJS.Module {
	_compile(code: string, filename: string): unknown
}

const _require = createRequire(import.meta.url)

export async function importFile<T>(
	filePath: string,
	code: string,
	isESM: boolean
): Promise<T> {
	let value: T

	if (isESM) {
		let nodeModulesDir =
			typeof process.versions.deno === 'string'
				? undefined // Deno doesn't have a node_modules directory
				: findNearestNodeModules(path.dirname(filePath))

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
					`.fluire-temp/${path.basename(filePath)}.${hash}.mjs`
				)
			: `${filePath}.${hash}.mjs`

		await fsp.writeFile(tempFileName, code)

		try {
			value = await import(pathToFileURL(tempFileName).href)
		} finally {
			fs.unlink(tempFileName, () => {})
		}
	} else {
		const extension = path.extname(filePath)

		const realFileName = await promisifiedRealpath(filePath)

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

		value = raw
	}

	return value
}
