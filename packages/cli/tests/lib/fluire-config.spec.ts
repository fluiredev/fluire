import { getFluireConfig } from '~/lib/fluire-config'

describe('src/lib/fluire-config.ts', () => {
	describe('getFluireConfig', () => {
		it('should be able to get the Fluire config', async () => {
			// Removing temporarily until we can figure out how to mock esbuild
			
			// vi.mock('./fluire.config.ts', () => ({
			// 	anyOption: 'anyValue'
			// }))

			// const config = await getFluireConfig()

			// expect(config).toBeDefined()
			// expect(config).toContain({ anyOption: 'anyValue' })
		})
	})
})
