import { Feature } from './feature'
import { Webhook } from './webhook'

import { Stripe } from 'stripe'

export class StripeClient {
	private readonly stripe: Stripe

	public constructor(key: string) {
		this.stripe = new Stripe(key)

		Feature.Stripe = this.stripe
		Webhook.Stripe = this.stripe
	}

	public get Feature() {
		return Feature
	}

	public get Webhook() {
		return Webhook
	}
}
