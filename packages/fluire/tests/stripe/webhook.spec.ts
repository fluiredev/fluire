import { InstanceNotSetError } from '~/stripe/exceptions/instance-not-set'
import { InvalidEventsLengthError } from '~/stripe/exceptions/invalid-events-length'
import { InvalidEventTypeError } from '~/stripe/exceptions/invalid-event-type'
import { InvalidEventError } from '~/stripe/exceptions/invalid-event'
import { Webhook } from '~/stripe/webhook'

import Stripe from 'stripe'

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
			}).toThrowError(InstanceNotSetError)
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

		const constructEvent = vi.fn()

		Webhook.Stripe.webhooks.constructEvent = constructEvent

		const webhook = new Webhook({
			events: ['*'],
			handle: () => {},
			secret: 'any_secret'
		})

		beforeEach(() => {
			constructEvent.mockClear()
			// biome-ignore lint/complexity/useLiteralKeys: Without this, we wouldn't be able to get a private property
			webhook['allEventsAllowed'] = true
		})

		it('should throw error if signature is invalid', async () => {
			constructEvent.mockImplementation(() => {
				throw new Error()
			})

			await expect(
				webhook.handle({ body: '', signature: '' })
			).rejects.toThrowError()
		})

		it('should throw if event is invalid', async () => {
			constructEvent.mockReturnValueOnce(undefined)

			await expect(
				webhook.handle({ body: '', signature: '' })
			).rejects.toThrowError(InvalidEventError)
		})

		it('should throw if event is not allowed', async () => {
			constructEvent.mockReturnValueOnce({ type: 'account.updated' })

			// biome-ignore lint/complexity/useLiteralKeys: Without this, we wouldn't be able to get a private property
			webhook['allEventsAllowed'] = false

			await expect(
				webhook.handle({ body: '', signature: '' })
			).rejects.toThrowError(InvalidEventTypeError)
		})

		it('should call handle function', async () => {
			constructEvent.mockReturnValueOnce({ type: 'account.updated' })

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
})
