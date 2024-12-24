import { getFluireConfig } from '~/lib/fluire-config'

describe('src/lib/fluire-config.ts', () => {
	describe('getFluireConfig', () => {
		it('should be able to get the Fluire config', async () => {
			vi.mock('./fluire.config.js', () => ({
				anyOption: 'anyValue'
			}))

			const config = await getFluireConfig()

			expect(config).toBeDefined()
			expect(config).toEqual({ anyOption: 'anyValue' })
		})
	})
})
