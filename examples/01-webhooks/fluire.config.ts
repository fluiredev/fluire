import 'dotenv/config'

import { fluire } from './src/fluire.js'

import { defineConfig } from 'fluire/config'

export default defineConfig({
	fluire,
	stripe: {
		webhooks: 'src/webhooks.ts'
	}
})
