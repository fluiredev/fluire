import { Webhook } from './webhook'

import { Stripe } from 'stripe'

export class StripeClient {
	private readonly instance: Stripe

	public constructor(key: string) {
		this.instance = new Stripe(key)

		Webhook.Stripe = this.instance
	}

	public get Webhook() {
		return Webhook
	}
}
