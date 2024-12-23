import { StripeNotSetError } from './exceptions/stripe-not-set'

import type Stripe from 'stripe'

type FeatureOptions = {
	name: string
	key: string
}

export class Feature {
	private instance: Stripe.Entitlements.Feature | undefined

	public static Stripe: Stripe

	public constructor(private readonly options: FeatureOptions) {
		if (!Feature.Stripe) {
			throw new StripeNotSetError()
		}
	}

	public async create(): Promise<Stripe.Entitlements.Feature> {
		this.instance = await Feature.Stripe.entitlements.features.create({
			name: this.options.name,
			lookup_key: this.options.key,
			metadata: {
				migration_version: 1
			}
		})

		return this.instance
	}
}
