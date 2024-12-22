import type {
	WebhookAliases,
	WebhookEvent,
	WebhookEvents
} from './webhook-events'

import type Stripe from 'stripe'

type ExtractEventType<T> = T extends keyof WebhookAliases
	? WebhookAliases[T]
	: T extends keyof WebhookEvents
		? WebhookEvent<T>
		: never

type WebhookOptions<
	T extends Array<keyof WebhookEvents | keyof WebhookAliases>
> = {
	events: T
	handle: ({
		event,
		payload
	}: ExtractEventType<T[number]>) => void | Promise<void>
	secret: string
}

type HandleParams = {
	body: string | Buffer
	signature: string | Buffer
}

export class Webhook<
	T extends Array<keyof WebhookEvents | keyof WebhookAliases>
> {
	public constructor(
		private readonly options: WebhookOptions<T>,
		private readonly instance?: Stripe
	) {}

	public async handle({ body, signature }: HandleParams): Promise<void> {
		const event = this.instance?.webhooks.constructEvent(
			body,
			signature,
			this.options.secret
		)

		if (!event) {
			throw new Error('Invalid event')
		}

		await this.options.handle({
			event: event.type,
			payload: event.data
			// biome-ignore lint/suspicious/noExplicitAny: Unfornately, the type is too complex to be inferred
		} as any)
	}
}