import { InstanceNotAvailableError } from './exceptions/instance-not-available'
import { InvalidEventError } from './exceptions/invalid-event'
import { InvalidEventTypeError } from './exceptions/invalid-event-type'
import { InvalidEventsLengthError } from './exceptions/invalid-events-length'
import {
	webhookAliases,
	type WebhookAliases,
	type WebhookEvent,
	type WebhookEvents,
	type WebhookKey
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

	public constructor(
		private readonly options: WebhookOptions<T>,
		private readonly instance?: Stripe
	) {
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
				}

				this.allowedEvents.push(event)
			}
		}
	}

	public async handle({ body, signature }: HandleFnParams): Promise<void> {
		if (!this.instance) {
			throw new InstanceNotAvailableError()
		}

		const event = this.instance.webhooks.constructEvent(
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
			stripe: this.instance
			// biome-ignore lint/suspicious/noExplicitAny: Unfornately, the type is too complex to be inferred
		} as any)
	}
}
