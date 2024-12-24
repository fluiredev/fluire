import type { PackageJson } from 'type-fest'

export function getPackageJSON() {
	return require('../../package.json') as PackageJson
}
