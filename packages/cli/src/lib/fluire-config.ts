import { importFile, isFilePathESM } from './import-file'

import chalk from 'chalk'
import { build } from 'esbuild'
import type { defineConfig } from 'fluire/config'
import fs from 'node:fs'
import path from 'node:path'

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
