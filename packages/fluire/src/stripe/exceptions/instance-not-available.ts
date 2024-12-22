export class InstanceNotAvailableError extends Error {
	constructor() {
		super('Stripe instance not available')
	}
}
