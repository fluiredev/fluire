import { StripeClient } from './stripe/client'

type StripeOptions = {
	secretKey: string
}

type FluireConstructorParams = {
	stripe: StripeOptions
}

export class Fluire {
	public readonly stripe: StripeClient

	public constructor(params: FluireConstructorParams) {
		this.stripe = new StripeClient(params.stripe.secretKey)
	}
}
