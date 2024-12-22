import { Fluire } from '~/fluire'

describe('src/fluire.ts', () => {
	describe('Fluire', () => {
		it('should be able to create a new instance of Fluire', () => {
			const fluire = new Fluire({
				stripe: {
					secretKey: 'any_secret_key'
				}
			})

			expect(fluire).toBeInstanceOf(Fluire)
		})

		it('should be able to create a new instance of Fluire and access StripeClient', () => {
			const fluire = new Fluire({
				stripe: {
					secretKey: 'any_secret_key'
				}
			})

			expect(fluire.stripe).toBeDefined()
		})
	})
})
