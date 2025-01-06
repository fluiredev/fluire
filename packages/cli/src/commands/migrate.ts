import { getFluireConfig } from '~/lib/fluire-config'
import { danger, debug, log } from '~/lib/logger'
import { loadWebhooks } from '~/lib/loaders'

import { Command } from 'commander'
import Stripe from 'stripe'

export const migrate = new Command()
	.name('migrate')
	.description('Migrate your Fluire to the desired PSP')

type Options = {
	destructive: boolean
	debug: boolean
}

async function migrateWebhooks(
	stripe: Stripe,
	paths: string[] | string | true,
	options: Options
) {
	try {
		log('Migrating webhooks...')

		const loadedWebhooks = await loadWebhooks(paths, options.debug)
		let registeredWebhooks: Stripe.WebhookEndpoint[] = []

		while (true) {
			const currentItems = await stripe.webhookEndpoints.list({
				limit: 100,
				starting_after: registeredWebhooks[registeredWebhooks.length - 1]?.id
			})

			if (options.debug)
				debug(
					'Current items:',
					currentItems.data.map((item) => item.url).join(', ')
				)

			registeredWebhooks = registeredWebhooks.concat(currentItems.data)

			if (!currentItems.has_more) break
		}

		if (options.debug)
			debug(
				'Registered webhooks:',
				registeredWebhooks.map((webhook) => webhook.url)
			)

		if (options.destructive) {
			log('Deleting existing webhooks...')

			for (const webhook of registeredWebhooks) {
				if (options.debug) debug('Deleting webhook:', webhook.id)
				await stripe.webhookEndpoints.del(webhook.id)
			}
		}

		for (const webhook of loadedWebhooks) {
			if (!webhook.url) {
				danger('Webhook does not have a URL. Skipping...')
				continue
			}

			const existingWebhook = registeredWebhooks.find(
				(registered) => registered.url === webhook.url
			)

			if (!options.destructive && existingWebhook) {
				log(`Updating webhook ${webhook.url}...`)

				await webhook.update(existingWebhook.id)
			} else {
				log(`Registering webhook ${webhook.url}...`)

				const { secret, id } = await webhook.register()

				log(
					`Webhook ${id} registered with secret ${secret} - Save it securely!`
				)
			}
		}
	} catch (error) {
		if (error instanceof Error) {
			if (options.debug) debug('Error migrating webhooks:', error.stack)
			danger(`Error migrating webhooks: ${error.message}`)
		}
	}
}

export const stripeMigrate = migrate
	.command('stripe')
	.description('Migrate your Fluire to Stripe')
	.option(
		'--destructive',
		'Delete all existing data in Stripe and create new data (use with caution)'
	)
	.option('--debug', 'Show debug logs for troubleshooting purposes')
	.action(async (options) => {
		if (options.destructive) {
			danger(
				'Destructive mode enabled. All existing data in Stripe will be deleted.'
			)
		}

		const config = await getFluireConfig()

		if (config.stripe) {
			if (!config.fluire.stripe.key) {
				danger(
					'No Stripe key found in your Fluire config. Please add it and try again.'
				)
			}

			log('Initializing Stripe migration. This may take a few minutes...')

			const stripe = new Stripe(config.fluire.stripe.key)

			const promises: Promise<void>[] = []

			if (config.stripe.webhooks) {
				promises.push(migrateWebhooks(stripe, config.stripe.webhooks, options))
			}

			await Promise.all(promises)
		}
	})
