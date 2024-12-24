import { getFluireConfig } from '~/lib/fluire-config'

import { Command } from 'commander'

export const migrate = new Command()
	.name('migrate')
	.description('Migrate your Fluire to the desired PSP')

export const stripeMigrate = migrate
	.command('stripe')
	.description('Migrate your Fluire to Stripe')
	.option(
		'--destructive',
		'Delete all existing data in Stripe and create new data (use with caution)'
	)
	.action(async () => {
		const config = await getFluireConfig()
	})
