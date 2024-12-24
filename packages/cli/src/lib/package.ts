import path from 'node:path'
import fs from 'node:fs'
import type { PackageJson } from 'type-fest'

export function getPackageJSON() {
	return require('../../package.json') as PackageJson
}

export function tryStatSync(file: string): fs.Stats | undefined {
	try {
		// The "throwIfNoEntry" is a performance optimization for cases where the file does not exist
		return fs.statSync(file, { throwIfNoEntry: false })
	} catch {
		// Ignore errors
	}
}

export function findNearestNodeModules(basedir: string): string | null {
	let result: string | null = null

	while (basedir) {
		const pkgPath = path.join(basedir, 'node_modules')

		if (tryStatSync(pkgPath)?.isDirectory()) {
			return pkgPath
		}

		const nextBasedir = path.dirname(basedir)

		if (nextBasedir === result) break

		result = nextBasedir
	}

	return null
}
