import { fluire } from './fluire.js'

export const wh = new fluire.stripe.Webhook({
	events: ['invoice.paid'],
	handle: async ({ event, payload }) => {
		console.log('Event:', event)
		console.log('Payload:', payload)
	},
	secret: process.env.STRIPE_WEBHOOK_SECRET as string,
	url: 'http://localhost:3000/webhook'
})
