import { InvalidEventError } from './exceptions/invalid-event'
import { InvalidEventTypeError } from './exceptions/invalid-event-type'
import { InvalidEventsLengthError } from './exceptions/invalid-events-length'
import { StripeNotSetError } from './exceptions/stripe-not-set'
import { URLRequiredError } from './exceptions/url-required'
import {
	webhookAliases,
	type WebhookAliases,
	type WebhookEvent,
	type WebhookEvents
} from './webhook-events'

import type Stripe from 'stripe'

type ExtractEventType<T> = T extends keyof WebhookAliases
	? WebhookAliases[T]
	: T extends keyof WebhookEvents
		? WebhookEvent<T>
		: never

type WebhookHandlerFnParams = { stripe: Stripe }

type WebhookOptions<
	T extends Array<keyof WebhookEvents | keyof WebhookAliases>
> = {
	events: T
	handle: ({
		event,
		payload,
		stripe
	}: ExtractEventType<T[number]> &
		WebhookHandlerFnParams) => void | Promise<void>
	secret: string
	url?: string
}

type HandleFnParams = {
	body: string | Buffer
	signature: string | Buffer
}

export class Webhook<
	T extends Array<keyof WebhookEvents | keyof WebhookAliases>
> {
	private allEventsAllowed = false
	private allowedEvents: (keyof WebhookEvents | keyof WebhookAliases)[] = []

	public static Stripe: Stripe

	public constructor(private readonly options: WebhookOptions<T>) {
		if (!Webhook.Stripe) {
			throw new StripeNotSetError()
		}

		if (options.events.length === 0) {
			throw new InvalidEventsLengthError()
		}

		if (options.events.includes('*')) {
			this.allEventsAllowed = true
		} else {
			for (const event of options.events) {
				if (event in webhookAliases) {
					this.allowedEvents.push(
						...webhookAliases[event as keyof WebhookAliases]
					)

					continue
				}

				this.allowedEvents.push(event)
			}
		}
	}

	public async handle({ body, signature }: HandleFnParams): Promise<void> {
		const event = Webhook.Stripe.webhooks.constructEvent(
			body,
			signature,
			this.options.secret
		)

		if (!event) {
			throw new InvalidEventError()
		}

		if (!this.allEventsAllowed && !this.allowedEvents.includes(event.type)) {
			throw new InvalidEventTypeError()
		}

		await this.options.handle({
			event: event.type,
			payload: event.data,
			stripe: Webhook.Stripe
			// biome-ignore lint/suspicious/noExplicitAny: Unfornately, the type is too complex to be inferred
		} as any)
	}

	public async register(): Promise<Stripe.WebhookEndpoint> {
		if (!this.options.url) {
			throw new URLRequiredError()
		}

		const webhook = await Webhook.Stripe.webhookEndpoints.create({
			enabled_events: this.allEventsAllowed
				? ['*']
				: (this
						.allowedEvents as Stripe.WebhookEndpointCreateParams.EnabledEvent[]),
			url: this.options.url
		})

		return webhook
	}
}
