#!usr/bin/env node

import { migrate } from './commands/migrate'
import { getPackageJSON } from './lib/package'

import { Command, program } from 'commander'

process.on('SIGINT', () => process.exit(0))
process.on('SIGTERM', () => process.exit(0))

function main() {
	const packageInfo = getPackageJSON()

	const program = new Command()
		.name('fluire')
		.description(packageInfo.description || 'Migration CLI helper for Fluire')
		.version(
			packageInfo.version || '1.0.0',
			'-v, --version',
			'output the current version'
		)

	program.addCommand(migrate)

	program.parse()
}

main()
