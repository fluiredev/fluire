import { Webhook } from './webhook'

import { Stripe } from 'stripe'

export class StripeClient {
	private readonly instance: Stripe

	public constructor(key: string) {
		this.instance = new Stripe(key)
	}

	public get Webhook(): typeof Webhook {
		return Webhook.bind(null, this.instance)
	}
}
