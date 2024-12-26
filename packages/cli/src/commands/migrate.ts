import { getFluireConfig } from '~/lib/fluire-config'
import { danger, log } from '~/lib/logger'
import { loadWebhooks } from '~/lib/loaders'

import { Command } from 'commander'
import Stripe from 'stripe'

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

			if (config.stripe.webhooks) {
				log('Migrating webhooks...')

				const loadedWebhooks = await loadWebhooks(config.stripe.webhooks)
				let registeredWebhooks: Stripe.WebhookEndpoint[] = []

				while (true) {
					const currentItems = await stripe.webhookEndpoints.list({
						limit: 100,
						starting_after:
							registeredWebhooks[registeredWebhooks.length - 1]?.id
					})

					registeredWebhooks = registeredWebhooks.concat(currentItems.data)

					if (!currentItems.has_more) break
				}

				for (const webhook of loadedWebhooks) {
					if (!webhook.url) {
						danger('Webhook does not have a URL. Skipping...')
						continue
					}

					const existingWebhook = registeredWebhooks.find(
						(registered) => registered.url === webhook.url
					)

					if (existingWebhook) {
						log(`Updating webhook ${webhook.url}...`)

						await webhook.update(existingWebhook.id)
					} else {
						log(`Registering webhook ${webhook.url}...`)

						const { secret } = await webhook.register()

						log(`Webhook  registered with secret ${secret} - Save it securely!`)
					}
				}
			}
		}
	})
