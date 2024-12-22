import { Webhook } from './webhook'

import { Stripe } from 'stripe'

export class StripeClient {
	public readonly instance: Stripe

	public constructor(key: string) {
		this.instance = new Stripe(key)
	}

	public get Webhook() {
		return Webhook.bind(null, this.instance)
	}
}
