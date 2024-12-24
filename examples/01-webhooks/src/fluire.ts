import { Fluire } from 'fluire'

export const fluire = new Fluire({
	stripe: {
		secretKey: process.env.STRIPE_SECRET_KEY as string
	}
})
