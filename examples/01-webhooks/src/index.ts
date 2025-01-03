import 'dotenv/config'

import { wh } from './webhooks.js'

import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.post('/webhook', async (c) => {
	try {
		await wh.handle({
			body: await c.req.text(),
			signature: c.req.header('Stripe-Signature') as string
		})
	} catch (error) {
		console.error(error)
		return c.newResponse(null, 500)
	}
})

const port = 3000
console.log(`Server is running on http://localhost:${port}`)

serve({
	fetch: app.fetch,
	port
})
