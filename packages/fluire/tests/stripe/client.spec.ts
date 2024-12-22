import { StripeClient } from '~/stripe/client'

describe('src/stripe/client.ts', () => {
	describe('StripeClient', () => {
		it('should be able to create a new instance of StripeClient', () => {
			const client = new StripeClient('any_secret_key')

			expect(client).toBeInstanceOf(StripeClient)
		})

		it('should be able to access Webhook', () => {
			const client = new StripeClient('any_secret_key')

			expect(client.Webhook).toBeDefined()
		})
	})
})
