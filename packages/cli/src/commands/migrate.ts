import { getFluireConfig } from '~/lib/fluire-config'
import { danger, log } from '~/lib/logger'
import { loadWebhooks } from '~/lib/loaders'

import { Command } from 'commander'
import Stripe from 'stripe'

export const migrate = new Command()
	.name('migrate')
	.description('Migrate your Fluire to the desired PSP')

type Options = {
	destructive: boolean
}

async function migrateWebhooks(
	stripe: Stripe,
	paths: string[] | string | true,
	options: Options
) {
	try {
		log('Migrating webhooks...')

		const loadedWebhooks = await loadWebhooks(paths)
		let registeredWebhooks: Stripe.WebhookEndpoint[] = []

		while (true) {
			const currentItems = await stripe.webhookEndpoints.list({
				limit: 100,
				starting_after: registeredWebhooks[registeredWebhooks.length - 1]?.id
			})

			registeredWebhooks = registeredWebhooks.concat(currentItems.data)

			if (!currentItems.has_more) break
		}

		if (options.destructive) {
			log('Deleting existing webhooks...')

			for (const webhook of registeredWebhooks) {
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
