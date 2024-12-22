import 'dotenv/config'
import { serve } from '@hono/node-server'
import { Fluire } from 'fluire'
import { Hono } from 'hono'

const app = new Hono()

const fluire = new Fluire({
	stripe: {
		secretKey: process.env.STRIPE_SECRET_KEY as string
	}
})

const wh = new fluire.stripe.Webhook({
	events: ['invoice.paid'],
	handle: async ({ event, payload }) => {
		console.log('Event:', event)
		console.log('Payload:', payload)
	},
	secret: process.env.STRIPE_WEBHOOK_SECRET as string
})

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
