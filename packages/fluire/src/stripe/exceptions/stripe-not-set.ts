export class StripeNotSetError extends Error {
	constructor() {
		super('Instance is not set')
	}
}
