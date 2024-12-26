import { importFile, isFilePathESM } from './import-file'

import chalk from 'chalk'
import { build, type Plugin } from 'esbuild'
import type { defineConfig } from 'fluire/config'
import fs from 'node:fs'
import { builtinModules } from 'node:module'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

type FluireConfig = ReturnType<typeof defineConfig>

// Thanks to "vite" and contributors for the following code :)

const DEFAULT_CONFIG_FILES = [
	'fluire.config.js',
	'fluire.config.mjs',
	'fluire.config.ts',
	'fluire.config.cjs',
	'fluire.config.mts',
	'fluire.config.cts'
]

// Supported by Node, Deno, Bun
const NODE_BUILTIN_NAMESPACE = 'node:'
// Supported by Deno
const NPM_BUILTIN_NAMESPACE = 'npm:'
// Supported by Bun
const BUN_BUILTIN_NAMESPACE = 'bun:'

const nodeBuiltins = builtinModules.filter((id) => !id.includes(':'))

export function isNodeBuiltin(id: string): boolean {
	if (id.startsWith(NODE_BUILTIN_NAMESPACE)) return true
	return nodeBuiltins.includes(id)
}

export function isBuiltin(id: string): boolean {
	if (process.versions.deno && id.startsWith(NPM_BUILTIN_NAMESPACE)) return true
	if (process.versions.bun && id.startsWith(BUN_BUILTIN_NAMESPACE)) return true
	return isNodeBuiltin(id)
}

const defaultExtensions = ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']

// No way, GitHub Copilot just threw this code and it works 😭
// I don't even know what it does
export function externalizeDeps(
	isESM: boolean,
	isModuleSyncConditionEnabled: boolean,
	fileName: string
): Plugin[] {
	return [
		{
			name: 'externalize-deps',
			setup(build) {
				build.onResolve(
					{ filter: /^[^.#].*/ },

					async ({ path: id, importer, kind }) => {
						if (
							kind === 'entry-point' ||
							path.isAbsolute(id) ||
							isNodeBuiltin(id)
						) {
							return
						}

						if (isBuiltin(id)) {
							return { external: true }
						}

						const isImport = isESM || kind === 'dynamic-import'
						let idFsPath: string | undefined
						try {
							idFsPath = require.resolve(id, {
								paths: [path.dirname(importer || fileName)]
							})

							if (isModuleSyncConditionEnabled) {
								idFsPath += defaultExtensions.find((ext) =>
									fs.existsSync(idFsPath + ext)
								)
							}

							if (fs.statSync(idFsPath).isDirectory()) {
								idFsPath = path.join(idFsPath, 'index')
							}
						} catch (e) {
							// If the file is not found, we don't need to do anything
						}

						if (idFsPath && isImport) {
							idFsPath = pathToFileURL(idFsPath).href
						}

						return {
							path: idFsPath,
							external: true
						}
					}
				)
			}
		}
	]
}

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
			plugins: externalizeDeps(isESM, false, resolvedPath)
		})

		const [bundled] = result.outputFiles

		if (!bundled) {
			throw new Error('No output files were generated')
		}

		const code = bundled.text

		const config = (
			await importFile<{
				default: FluireConfig
			}>(resolvedPath, code, isESM)
		).default

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
