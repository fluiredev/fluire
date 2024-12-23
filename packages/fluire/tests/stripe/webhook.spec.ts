import { InvalidEventsLengthError } from '~/stripe/exceptions/invalid-events-length'
import { InvalidEventTypeError } from '~/stripe/exceptions/invalid-event-type'
import { InvalidEventError } from '~/stripe/exceptions/invalid-event'
import { StripeNotSetError } from '~/stripe/exceptions/stripe-not-set'
import { Webhook } from '~/stripe/webhook'

import Stripe from 'stripe'
import { URLRequiredError } from '~/stripe/exceptions/url-required'

describe('src/stripe/webhook.ts', () => {
	describe('new Webhook()', () => {
		beforeEach(() => {
			// biome-ignore lint/suspicious/noExplicitAny: This is a test case
			Webhook.Stripe = undefined as any
		})

		it('should be able to create a new instance of Webhook', () => {
			Webhook.Stripe = new Stripe('any_secret_key')

			const webhook = new Webhook({
				events: ['*'],
				handle: () => {},
				secret: 'any_secret'
			})

			expect(webhook).toBeInstanceOf(Webhook)
		})

		it('should throw if Stripe instance is not set', () => {
			expect(() => {
				new Webhook({
					events: ['*'],
					handle: () => {},
					secret: 'any_secret'
				})
			}).toThrowError(StripeNotSetError)
		})

		it('should throw if events length is 0', () => {
			Webhook.Stripe = new Stripe('any_secret_key')

			expect(() => {
				new Webhook({
					events: [],
					handle: () => {},
					secret: 'any_secret'
				})
			}).toThrowError(InvalidEventsLengthError)
		})

		it('should allow all events if includes *', () => {
			Webhook.Stripe = new Stripe('any_secret_key')

			const webhook = new Webhook({
				events: ['*'],
				handle: () => {},
				secret: 'any_secret'
			})

			// biome-ignore lint/complexity/useLiteralKeys: Without this, we wouldn't be able to get a private property
			expect(webhook['allEventsAllowed']).toBe(true)
		})

		it('should include children events if alias is passed', () => {
			Webhook.Stripe = new Stripe('any_secret_key')

			const webhook = new Webhook({
				events: ['account.*'],
				handle: () => {},
				secret: 'any_secret'
			})

			// biome-ignore lint/complexity/useLiteralKeys: Without this, we wouldn't be able to get a private property
			expect(webhook['allowedEvents']).toEqual([
				'account.updated',
				'account.application.authorized',
				'account.application.deauthorized',
				'account.external_account.created',
				'account.external_account.deleted',
				'account.external_account.updated'
			])
		})

		it('should include events when passed', () => {
			Webhook.Stripe = new Stripe('any_secret_key')

			const webhook = new Webhook({
				events: ['account.updated'],
				handle: () => {},
				secret: 'any_secret'
			})

			// biome-ignore lint/complexity/useLiteralKeys: Without this, we wouldn't be able to get a private property
			expect(webhook['allowedEvents']).toEqual(['account.updated'])
		})
	})

	describe('webhook.handle()', () => {
		Webhook.Stripe = new Stripe('any_secret')

		const webhook = new Webhook({
			events: ['*'],
			handle: () => {},
			secret: 'any_secret'
		})

		beforeEach(() => {
			// biome-ignore lint/complexity/useLiteralKeys: Without this, we wouldn't be able to get a private property
			webhook['allEventsAllowed'] = true
		})

		it('should throw error if signature is invalid', async () => {
			Webhook.Stripe.webhooks.constructEvent = vi
				.fn()
				.mockImplementationOnce(() => {
					throw new Error()
				})

			await expect(
				webhook.handle({ body: '', signature: '' })
			).rejects.toThrowError()
		})

		it('should throw if event is invalid', async () => {
			Webhook.Stripe.webhooks.constructEvent = vi
				.fn()
				.mockReturnValueOnce(undefined)

			await expect(
				webhook.handle({ body: '', signature: '' })
			).rejects.toThrowError(InvalidEventError)
		})

		it('should throw if event is not allowed', async () => {
			Webhook.Stripe.webhooks.constructEvent = vi
				.fn()
				.mockReturnValueOnce({ type: 'account.updated' })

			// biome-ignore lint/complexity/useLiteralKeys: Without this, we wouldn't be able to get a private property
			webhook['allEventsAllowed'] = false

			await expect(
				webhook.handle({ body: '', signature: '' })
			).rejects.toThrowError(InvalidEventTypeError)
		})

		it('should call handle function', async () => {
			Webhook.Stripe.webhooks.constructEvent = vi
				.fn()
				.mockReturnValueOnce({ type: 'account.updated' })

			const handle = vi.fn()

			// biome-ignore lint/complexity/useLiteralKeys: Without this, we wouldn't be able to get a private property
			webhook['options'].handle = handle

			await webhook.handle({
				body: '',
				signature: ''
			})

			expect(handle).toHaveBeenCalled()
		})
	})

	describe('webhook.register()', () => {
		Webhook.Stripe = new Stripe('any_secret')

		const webhook = new Webhook({
			events: ['*'],
			handle: () => {},
			secret: 'any_secret'
		})

		beforeEach(() => {
			// biome-ignore lint/complexity/useLiteralKeys: Without this, we wouldn't be able to get a private property
			webhook['options'].url = 'https://example.com'
		})

		it('should throw if url is not passed', async () => {
			// biome-ignore lint/complexity/useLiteralKeys: Without this, we wouldn't be able to get a private property
			webhook['options'].url = undefined

			await expect(webhook.register()).rejects.toThrowError(URLRequiredError)
		})

		it('should throw if webhook creation fails', async () => {
			Webhook.Stripe.webhookEndpoints.create = vi
				.fn()
				.mockImplementationOnce(() => {
					throw new Error()
				})

			await expect(webhook.register()).rejects.toThrowError()
		})

		it('should return webhook', async () => {
			Webhook.Stripe.webhookEndpoints.create = vi.fn().mockReturnValueOnce({
				secret: 'created_secret'
			})

			await expect(webhook.register()).resolves.toEqual({
				secret: 'created_secret'
			})
		})

		it('should call webhookEndpoints.create with [*] if all events are allowed', async () => {
			Webhook.Stripe.webhookEndpoints.create = vi.fn().mockReturnValueOnce({})

			// biome-ignore lint/complexity/useLiteralKeys: Without this, we wouldn't be able to get a private property
			webhook['allEventsAllowed'] = true

			await webhook.register()

			expect(Webhook.Stripe.webhookEndpoints.create).toHaveBeenCalledWith({
				enabled_events: ['*'],
				url: 'https://example.com'
			})
		})

		it('should call webhookEndpoints.create with passed events', async () => {
			Webhook.Stripe.webhookEndpoints.create = vi.fn().mockReturnValueOnce({})

			// biome-ignore lint/complexity/useLiteralKeys: Without this, we wouldn't be able to get a private property
			webhook['allEventsAllowed'] = false
			// biome-ignore lint/complexity/useLiteralKeys: Without this, we wouldn't be able to get a private property
			webhook['allowedEvents'] = ['account.updated']

			await webhook.register()

			expect(Webhook.Stripe.webhookEndpoints.create).toHaveBeenCalledWith({
				enabled_events: ['account.updated'],
				url: 'https://example.com'
			})
		})
	})
})
