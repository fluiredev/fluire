export class URLRequiredError extends Error {
	public constructor() {
		super('URL is required')
	}
}
