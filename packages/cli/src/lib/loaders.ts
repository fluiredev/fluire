import { importFile, isFilePathESM } from './import-file'

import { build } from 'esbuild'
import type { Fluire } from 'fluire'
import { glob } from 'glob'
import nodePath from 'node:path'

type Webhook = Fluire['stripe']['Webhook']

export async function loadWebhooks(
	path: string[] | string | true
): Promise<Webhook[]> {
	let paths: string[] = []

	if (typeof path === 'string') {
		paths = [path]
	} else if (Array.isArray(path)) {
		paths = path
	} else {
		// In a specific use case where path is `true`, we return a default path
		paths = ['lib/webhooks.ts']
	}

	const webhooks: Webhook[] = []

	for (const path of paths) {
		const files = glob.sync(path)

		for (const file of files) {
			const isESM = isFilePathESM(file)

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
				external: ['fluire', 'stripe', 'esbuild']
			})

			const [bundled] = result.outputFiles

			if (!bundled) {
				throw new Error('No output files were generated')
			}

			const code = bundled.text

			const webhooks = await importFile<{
				[key: string]: unknown
			}>(file, code, isESM)

      for (const [key, value] of Object.entries(webhooks)) {
        
      }
		}
	}

	return []
}
