import type { Fluire } from './fluire'

type DefineConfigParams = {
	/**
	 * Your Fluire instance.
	 */
	fluire: Fluire
	stripe?: {
		/**
		 * The glob-like pattern to find your webhook handlers.
		 */
		webhooks?: string | string[] | false
	}
}

/**
 * Define your configuration for Fluire CLI.
 *
 * @param config Your configuration.
 * @returns The configuration used by Fluire CLI.
 */
export function defineConfig(config: DefineConfigParams) {
	return {
		fluire: config.fluire,
		stripe: {
			webhooks: config.stripe?.webhooks || false,
			secretKey: config.fluire.stripe.key
		}
	}
}
