export class InstanceNotSetError extends Error {
	constructor() {
		super('Instance is not set')
	}
}
