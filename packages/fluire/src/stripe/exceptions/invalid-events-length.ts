export class InvalidEventsLengthError extends Error {
	constructor() {
		super('You must provide at least one event')
	}
}
