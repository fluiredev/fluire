import { importFile, isFilePathESM } from './import-file'
import { externalizeDeps } from './fluire-config'
import { debug, log } from './logger'

import { build } from 'esbuild'
import { Webhook } from 'fluire/stripe'
import { glob } from 'glob'
import nodePath from 'node:path'

export async function loadWebhooks(
	path: string[] | string | true,
	debugEnabled = false
): Promise<Webhook<any>[]> {
	let paths: string[] = []

	if (typeof path === 'string') {
		paths = [path]
	} else if (Array.isArray(path)) {
		paths = path
	} else {
		// In a specific use case where path is `true`, we return a default path
		paths = ['lib/webhooks.ts']
	}

	if (debugEnabled) debug('Paths:', paths)

	const webhookList: Webhook<any>[] = []

	for (const path of paths) {
		const files = glob.sync(path)

		if (debugEnabled) debug('Files:', files)

		for (const file of files) {
			log(`Loading webhooks from ${file}`)
			const isESM = isFilePathESM(file)

			if (debugEnabled) debug('File is ESM:', isESM)

			const result = await build({
				absWorkingDir: process.cwd(),
				entryPoints: [file],
				write: false,
				target: [`node${process.versions.node}`],
				platform: 'node',
				bundle: true,
				format: isESM ? 'esm' : 'cjs',
				mainFields: ['main'],
				sourcemap: 'inline',
				sourceRoot: `${nodePath.dirname(file)}${nodePath.sep}`,
				metafile: true,
				plugins: externalizeDeps(isESM, false, file)
			})

			const [bundled] = result.outputFiles

			if (!bundled) {
				throw new Error('No output files were generated')
			}

			const code = bundled.text

			const webhooks = await importFile<{
				[key: string]: unknown
			}>(file, code, isESM)

			for (const [, value] of Object.entries(webhooks)) {
				if (debugEnabled)
					debug('value instanceof Webhook:', value instanceof Webhook)

				if (value instanceof Webhook) {
					webhookList.push(value)
				}
			}
		}
	}

	return webhookList
}
