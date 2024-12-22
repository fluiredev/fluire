import type { Stripe } from 'stripe'

type a = Stripe.WebhookEndpointCreateParams.EnabledEvent

export type WebhookEvents = {
	'account.application.authorized': Stripe.AccountApplicationAuthorizedEvent.Data
	'account.application.deauthorized': Stripe.AccountApplicationDeauthorizedEvent.Data
	'account.external_account.created': Stripe.AccountExternalAccountCreatedEvent.Data
	'account.external_account.deleted': Stripe.AccountExternalAccountDeletedEvent.Data
	'account.external_account.updated': Stripe.AccountExternalAccountUpdatedEvent.Data
	'account.updated': Stripe.AccountUpdatedEvent.Data
	'application_fee.created': Stripe.ApplicationFeeCreatedEvent.Data
	'application_fee.refund.updated': Stripe.ApplicationFeeRefundUpdatedEvent.Data
	'application_fee.refunded': Stripe.ApplicationFeeRefundedEvent.Data
	'balance.available': Stripe.BalanceAvailableEvent.Data
	'billing.alert.triggered': Stripe.BillingAlertTriggeredEvent.Data
	'billing_portal.configuration.created': Stripe.BillingPortalConfigurationCreatedEvent.Data
	'billing_portal.configuration.updated': Stripe.BillingPortalConfigurationUpdatedEvent.Data
	'billing_portal.session.created': Stripe.BillingPortalSessionCreatedEvent.Data
	'capability.updated': Stripe.CapabilityUpdatedEvent.Data
	'cash_balance.funds_available': Stripe.CashBalanceFundsAvailableEvent.Data
	'charge.captured': Stripe.ChargeCapturedEvent.Data
	'charge.dispute.closed': Stripe.ChargeDisputeClosedEvent.Data
	'charge.dispute.created': Stripe.ChargeDisputeCreatedEvent.Data
	'charge.dispute.funds_reinstated': Stripe.ChargeDisputeFundsReinstatedEvent.Data
	'charge.dispute.funds_withdrawn': Stripe.ChargeDisputeFundsWithdrawnEvent.Data
	'charge.dispute.updated': Stripe.ChargeDisputeUpdatedEvent.Data
	'charge.expired': Stripe.ChargeExpiredEvent.Data
	'charge.failed': Stripe.ChargeFailedEvent.Data
	'charge.pending': Stripe.ChargePendingEvent.Data
	'charge.refund.updated': Stripe.ChargeRefundUpdatedEvent.Data
	'charge.refunded': Stripe.ChargeRefundedEvent.Data
	'charge.succeeded': Stripe.ChargeSucceededEvent.Data
	'charge.updated': Stripe.ChargeUpdatedEvent.Data
	'checkout.session.async_payment_failed': Stripe.CheckoutSessionAsyncPaymentFailedEvent.Data
	'checkout.session.async_payment_succeeded': Stripe.CheckoutSessionAsyncPaymentSucceededEvent.Data
	'checkout.session.completed': Stripe.CheckoutSessionCompletedEvent.Data
	'checkout.session.expired': Stripe.CheckoutSessionExpiredEvent.Data
	'climate.order.canceled': Stripe.ClimateOrderCanceledEvent.Data
	'climate.order.created': Stripe.ClimateOrderCreatedEvent.Data
	'climate.order.delayed': Stripe.ClimateOrderDelayedEvent.Data
	'climate.order.delivered': Stripe.ClimateOrderDeliveredEvent.Data
	'climate.order.product_substituted': Stripe.ClimateOrderProductSubstitutedEvent.Data
	'climate.product.created': Stripe.ClimateProductCreatedEvent.Data
	'climate.product.pricing_updated': Stripe.ClimateProductPricingUpdatedEvent.Data
	'coupon.created': Stripe.CouponCreatedEvent.Data
	'coupon.deleted': Stripe.CouponDeletedEvent.Data
	'coupon.updated': Stripe.CouponUpdatedEvent.Data
	'credit_note.created': Stripe.CreditNoteCreatedEvent.Data
	'credit_note.updated': Stripe.CreditNoteUpdatedEvent.Data
	'credit_note.voided': Stripe.CreditNoteVoidedEvent.Data
	'customer.created': Stripe.CustomerCreatedEvent.Data
	'customer.deleted': Stripe.CustomerDeletedEvent.Data
	'customer.discount.created': Stripe.CustomerDiscountCreatedEvent.Data
	'customer.discount.deleted': Stripe.CustomerDiscountDeletedEvent.Data
	'customer.discount.updated': Stripe.CustomerDiscountUpdatedEvent.Data
	'customer.source.created': Stripe.CustomerSourceCreatedEvent.Data
	'customer.source.deleted': Stripe.CustomerSourceDeletedEvent.Data
	'customer.source.expiring': Stripe.CustomerSourceExpiringEvent.Data
	'customer.source.updated': Stripe.CustomerSourceUpdatedEvent.Data
	'customer.subscription.created': Stripe.CustomerSubscriptionCreatedEvent.Data
	'customer.subscription.deleted': Stripe.CustomerSubscriptionDeletedEvent.Data
	'customer.subscription.paused': Stripe.CustomerSubscriptionPausedEvent.Data
	'customer.subscription.pending_update_applied': Stripe.CustomerSubscriptionPendingUpdateAppliedEvent.Data
	'customer.subscription.pending_update_expired': Stripe.CustomerSubscriptionPendingUpdateExpiredEvent.Data
	'customer.subscription.resumed': Stripe.CustomerSubscriptionResumedEvent.Data
	'customer.subscription.trial_will_end': Stripe.CustomerSubscriptionTrialWillEndEvent.Data
	'customer.subscription.updated': Stripe.CustomerSubscriptionUpdatedEvent.Data
	'customer.tax_id.created': Stripe.CustomerTaxIdCreatedEvent.Data
	'customer.tax_id.deleted': Stripe.CustomerTaxIdDeletedEvent.Data
	'customer.tax_id.updated': Stripe.CustomerTaxIdUpdatedEvent.Data
	'customer.updated': Stripe.CustomerUpdatedEvent.Data
	'customer_cash_balance_transaction.created': Stripe.CustomerCashBalanceTransactionCreatedEvent.Data
	'entitlements.active_entitlement_summary.updated': Stripe.EntitlementsActiveEntitlementSummaryUpdatedEvent.Data
	'file.created': Stripe.FileCreatedEvent.Data
	'financial_connections.account.created': Stripe.FinancialConnectionsAccountCreatedEvent.Data
	'financial_connections.account.deactivated': Stripe.FinancialConnectionsAccountDeactivatedEvent.Data
	'financial_connections.account.disconnected': Stripe.FinancialConnectionsAccountDisconnectedEvent.Data
	'financial_connections.account.reactivated': Stripe.FinancialConnectionsAccountReactivatedEvent.Data
	'financial_connections.account.refreshed_balance': Stripe.FinancialConnectionsAccountRefreshedBalanceEvent.Data
	'financial_connections.account.refreshed_ownership': Stripe.FinancialConnectionsAccountRefreshedOwnershipEvent.Data
	'financial_connections.account.refreshed_transactions': Stripe.FinancialConnectionsAccountRefreshedTransactionsEvent.Data
	'identity.verification_session.canceled': Stripe.IdentityVerificationSessionCanceledEvent.Data
	'identity.verification_session.created': Stripe.IdentityVerificationSessionCreatedEvent.Data
	'identity.verification_session.processing': Stripe.IdentityVerificationSessionProcessingEvent.Data
	'identity.verification_session.redacted': Stripe.IdentityVerificationSessionRedactedEvent.Data
	'identity.verification_session.requires_input': Stripe.IdentityVerificationSessionRequiresInputEvent.Data
	'identity.verification_session.verified': Stripe.IdentityVerificationSessionVerifiedEvent.Data
	'invoice.created': Stripe.InvoiceCreatedEvent.Data
	'invoice.deleted': Stripe.InvoiceDeletedEvent.Data
	'invoice.finalization_failed': Stripe.InvoiceFinalizationFailedEvent.Data
	'invoice.finalized': Stripe.InvoiceFinalizedEvent.Data
	'invoice.marked_uncollectible': Stripe.InvoiceMarkedUncollectibleEvent.Data
	'invoice.overdue': Stripe.InvoiceOverdueEvent.Data
	'invoice.paid': Stripe.InvoicePaidEvent.Data
	'invoice.payment_action_required': Stripe.InvoicePaymentActionRequiredEvent.Data
	'invoice.payment_failed': Stripe.InvoicePaymentFailedEvent.Data
	'invoice.payment_succeeded': Stripe.InvoicePaymentSucceededEvent.Data
	'invoice.sent': Stripe.InvoiceSentEvent.Data
	'invoice.upcoming': Stripe.InvoiceUpcomingEvent.Data
	'invoice.updated': Stripe.InvoiceUpdatedEvent.Data
	'invoice.voided': Stripe.InvoiceVoidedEvent.Data
	'invoice.will_be_due': Stripe.InvoiceWillBeDueEvent.Data
	'invoiceitem.created': Stripe.InvoiceItemCreatedEvent.Data
	'invoiceitem.deleted': Stripe.InvoiceItemDeletedEvent.Data
	'issuing_authorization.created': Stripe.IssuingAuthorizationCreatedEvent.Data
	'issuing_authorization.request': Stripe.IssuingAuthorizationRequestEvent.Data
	'issuing_authorization.updated': Stripe.IssuingAuthorizationUpdatedEvent.Data
	'issuing_card.created': Stripe.IssuingCardCreatedEvent.Data
	'issuing_card.updated': Stripe.IssuingCardUpdatedEvent.Data
	'issuing_cardholder.created': Stripe.IssuingCardholderCreatedEvent.Data
	'issuing_cardholder.updated': Stripe.IssuingCardholderUpdatedEvent.Data
	'issuing_dispute.closed': Stripe.IssuingDisputeClosedEvent.Data
	'issuing_dispute.created': Stripe.IssuingDisputeCreatedEvent.Data
	'issuing_dispute.funds_reinstated': Stripe.IssuingDisputeFundsReinstatedEvent.Data
	'issuing_dispute.funds_rescinded': Stripe.IssuingDisputeFundsRescindedEvent.Data
	'issuing_dispute.submitted': Stripe.IssuingDisputeSubmittedEvent.Data
	'issuing_dispute.updated': Stripe.IssuingDisputeUpdatedEvent.Data
	'issuing_personalization_design.activated': Stripe.IssuingPersonalizationDesignActivatedEvent.Data
	'issuing_personalization_design.deactivated': Stripe.IssuingPersonalizationDesignDeactivatedEvent.Data
	'issuing_personalization_design.rejected': Stripe.IssuingPersonalizationDesignRejectedEvent.Data
	'issuing_personalization_design.updated': Stripe.IssuingPersonalizationDesignUpdatedEvent.Data
	'issuing_token.created': Stripe.IssuingTokenCreatedEvent.Data
	'issuing_token.updated': Stripe.IssuingTokenUpdatedEvent.Data
	'issuing_transaction.created': Stripe.IssuingTransactionCreatedEvent.Data
	'issuing_transaction.purchase_details_receipt_updated': Stripe.IssuingTransactionPurchaseDetailsReceiptUpdatedEvent.Data
	'issuing_transaction.updated': Stripe.IssuingTransactionUpdatedEvent.Data
	'mandate.updated': Stripe.MandateUpdatedEvent.Data
	'payment_intent.amount_capturable_updated': Stripe.PaymentIntentAmountCapturableUpdatedEvent.Data
	'payment_intent.canceled': Stripe.PaymentIntentCanceledEvent.Data
	'payment_intent.created': Stripe.PaymentIntentCreatedEvent.Data
	'payment_intent.partially_funded': Stripe.PaymentIntentPartiallyFundedEvent.Data
	'payment_intent.payment_failed': Stripe.PaymentIntentPaymentFailedEvent.Data
	'payment_intent.processing': Stripe.PaymentIntentProcessingEvent.Data
	'payment_intent.requires_action': Stripe.PaymentIntentRequiresActionEvent.Data
	'payment_intent.succeeded': Stripe.PaymentIntentSucceededEvent.Data
	'payment_link.created': Stripe.PaymentLinkCreatedEvent.Data
	'payment_link.updated': Stripe.PaymentLinkUpdatedEvent.Data
	'payment_method.attached': Stripe.PaymentMethodAttachedEvent.Data
	'payment_method.automatically_updated': Stripe.PaymentMethodAutomaticallyUpdatedEvent.Data
	'payment_method.detached': Stripe.PaymentMethodDetachedEvent.Data
	'payment_method.updated': Stripe.PaymentMethodUpdatedEvent.Data
	'payout.canceled': Stripe.PayoutCanceledEvent.Data
	'payout.created': Stripe.PayoutCreatedEvent.Data
	'payout.failed': Stripe.PayoutFailedEvent.Data
	'payout.paid': Stripe.PayoutPaidEvent.Data
	'payout.reconciliation_completed': Stripe.PayoutReconciliationCompletedEvent.Data
	'payout.updated': Stripe.PayoutUpdatedEvent.Data
	'person.created': Stripe.PersonCreatedEvent.Data
	'person.deleted': Stripe.PersonDeletedEvent.Data
	'person.updated': Stripe.PersonUpdatedEvent.Data
	'plan.created': Stripe.PlanCreatedEvent.Data
	'plan.deleted': Stripe.PlanDeletedEvent.Data
	'plan.updated': Stripe.PlanUpdatedEvent.Data
	'price.created': Stripe.PriceCreatedEvent.Data
	'price.deleted': Stripe.PriceDeletedEvent.Data
	'price.updated': Stripe.PriceUpdatedEvent.Data
	'product.created': Stripe.ProductCreatedEvent.Data
	'product.deleted': Stripe.ProductDeletedEvent.Data
	'product.updated': Stripe.ProductUpdatedEvent.Data
	'promotion_code.created': Stripe.PromotionCodeCreatedEvent.Data
	'promotion_code.updated': Stripe.PromotionCodeUpdatedEvent.Data
	'quote.accepted': Stripe.QuoteAcceptedEvent.Data
	'quote.canceled': Stripe.QuoteCanceledEvent.Data
	'quote.created': Stripe.QuoteCreatedEvent.Data
	'quote.finalized': Stripe.QuoteFinalizedEvent.Data
	'radar.early_fraud_warning.created': Stripe.RadarEarlyFraudWarningCreatedEvent.Data
	'radar.early_fraud_warning.updated': Stripe.RadarEarlyFraudWarningUpdatedEvent.Data
	'refund.created': Stripe.RefundCreatedEvent.Data
	'refund.failed': Stripe.RefundFailedEvent.Data
	'refund.updated': Stripe.RefundUpdatedEvent.Data
	'reporting.report_run.failed': Stripe.ReportingReportRunFailedEvent.Data
	'reporting.report_run.succeeded': Stripe.ReportingReportRunSucceededEvent.Data
	'reporting.report_type.updated': Stripe.ReportingReportTypeUpdatedEvent.Data
	'review.closed': Stripe.ReviewClosedEvent.Data
	'review.opened': Stripe.ReviewOpenedEvent.Data
	'setup_intent.canceled': Stripe.SetupIntentCanceledEvent.Data
	'setup_intent.created': Stripe.SetupIntentCreatedEvent.Data
	'setup_intent.requires_action': Stripe.SetupIntentRequiresActionEvent.Data
	'setup_intent.setup_failed': Stripe.SetupIntentSetupFailedEvent.Data
	'setup_intent.succeeded': Stripe.SetupIntentSucceededEvent.Data
	'sigma.scheduled_query_run.created': Stripe.SigmaScheduledQueryRunCreatedEvent.Data
	'source.canceled': Stripe.SourceCanceledEvent.Data
	'source.chargeable': Stripe.SourceChargeableEvent.Data
	'source.failed': Stripe.SourceFailedEvent.Data
	'source.mandate_notification': Stripe.SourceMandateNotificationEvent.Data
	'source.refund_attributes_required': Stripe.SourceRefundAttributesRequiredEvent.Data
	'source.transaction.created': Stripe.SourceTransactionCreatedEvent.Data
	'source.transaction.updated': Stripe.SourceTransactionUpdatedEvent.Data
	'subscription_schedule.aborted': Stripe.SubscriptionScheduleAbortedEvent.Data
	'subscription_schedule.canceled': Stripe.SubscriptionScheduleCanceledEvent.Data
	'subscription_schedule.completed': Stripe.SubscriptionScheduleCompletedEvent.Data
	'subscription_schedule.created': Stripe.SubscriptionScheduleCreatedEvent.Data
	'subscription_schedule.expiring': Stripe.SubscriptionScheduleExpiringEvent.Data
	'subscription_schedule.released': Stripe.SubscriptionScheduleReleasedEvent.Data
	'subscription_schedule.updated': Stripe.SubscriptionScheduleUpdatedEvent.Data
	'tax.settings.updated': Stripe.TaxSettingsUpdatedEvent.Data
	'tax_rate.created': Stripe.TaxRateCreatedEvent.Data
	'tax_rate.updated': Stripe.TaxRateUpdatedEvent.Data
	'terminal.reader.action_failed': Stripe.TerminalReaderActionFailedEvent.Data
	'terminal.reader.action_succeeded': Stripe.TerminalReaderActionSucceededEvent.Data
	'test_helpers.test_clock.advancing': Stripe.TestHelpersTestClockAdvancingEvent.Data
	'test_helpers.test_clock.created': Stripe.TestHelpersTestClockCreatedEvent.Data
	'test_helpers.test_clock.deleted': Stripe.TestHelpersTestClockDeletedEvent.Data
	'test_helpers.test_clock.internal_failure': Stripe.TestHelpersTestClockInternalFailureEvent.Data
	'test_helpers.test_clock.ready': Stripe.TestHelpersTestClockReadyEvent.Data
	'topup.canceled': Stripe.TopupCanceledEvent.Data
	'topup.created': Stripe.TopupCreatedEvent.Data
	'topup.failed': Stripe.TopupFailedEvent.Data
	'topup.reversed': Stripe.TopupReversedEvent.Data
	'topup.succeeded': Stripe.TopupSucceededEvent.Data
	'transfer.created': Stripe.TransferCreatedEvent.Data
	'transfer.reversed': Stripe.TransferReversedEvent.Data
	'transfer.updated': Stripe.TransferUpdatedEvent.Data
	'treasury.credit_reversal.created': Stripe.TreasuryCreditReversalCreatedEvent.Data
	'treasury.credit_reversal.posted': Stripe.TreasuryCreditReversalPostedEvent.Data
	'treasury.debit_reversal.completed': Stripe.TreasuryDebitReversalCompletedEvent.Data
	'treasury.debit_reversal.created': Stripe.TreasuryDebitReversalCreatedEvent.Data
	'treasury.debit_reversal.initial_credit_granted': Stripe.TreasuryDebitReversalInitialCreditGrantedEvent.Data
	'treasury.financial_account.closed': Stripe.TreasuryFinancialAccountClosedEvent.Data
	'treasury.financial_account.created': Stripe.TreasuryFinancialAccountCreatedEvent.Data
	'treasury.financial_account.features_status_updated': Stripe.TreasuryFinancialAccountFeaturesStatusUpdatedEvent.Data
	'treasury.inbound_transfer.canceled': Stripe.TreasuryInboundTransferCanceledEvent.Data
	'treasury.inbound_transfer.created': Stripe.TreasuryInboundTransferCreatedEvent.Data
	'treasury.inbound_transfer.failed': Stripe.TreasuryInboundTransferFailedEvent.Data
	'treasury.inbound_transfer.succeeded': Stripe.TreasuryInboundTransferSucceededEvent.Data
	'treasury.outbound_payment.canceled': Stripe.TreasuryOutboundPaymentCanceledEvent.Data
	'treasury.outbound_payment.created': Stripe.TreasuryOutboundPaymentCreatedEvent.Data
	'treasury.outbound_payment.expected_arrival_date_updated': Stripe.TreasuryOutboundPaymentExpectedArrivalDateUpdatedEvent.Data
	'treasury.outbound_payment.failed': Stripe.TreasuryOutboundPaymentFailedEvent.Data
	'treasury.outbound_payment.posted': Stripe.TreasuryOutboundPaymentPostedEvent.Data
	'treasury.outbound_payment.returned': Stripe.TreasuryOutboundPaymentReturnedEvent.Data
	'treasury.outbound_payment.tracking_details_updated': Stripe.TreasuryOutboundPaymentTrackingDetailsUpdatedEvent.Data
	'treasury.outbound_transfer.canceled': Stripe.TreasuryOutboundTransferCanceledEvent.Data
	'treasury.outbound_transfer.created': Stripe.TreasuryOutboundTransferCreatedEvent.Data
	'treasury.outbound_transfer.expected_arrival_date_updated': Stripe.TreasuryOutboundTransferExpectedArrivalDateUpdatedEvent.Data
	'treasury.outbound_transfer.failed': Stripe.TreasuryOutboundTransferFailedEvent.Data
	'treasury.outbound_transfer.posted': Stripe.TreasuryOutboundTransferPostedEvent.Data
	'treasury.outbound_transfer.returned': Stripe.TreasuryOutboundTransferReturnedEvent.Data
	'treasury.outbound_transfer.tracking_details_updated': Stripe.TreasuryOutboundTransferTrackingDetailsUpdatedEvent.Data
	'treasury.received_credit.created': Stripe.TreasuryReceivedCreditCreatedEvent.Data
	'treasury.received_credit.failed': Stripe.TreasuryReceivedCreditFailedEvent.Data
	'treasury.received_credit.succeeded': Stripe.TreasuryReceivedCreditSucceededEvent.Data
	'treasury.received_debit.created': Stripe.TreasuryReceivedDebitCreatedEvent.Data
}

export type WebhookKey = keyof WebhookEvents

export type WebhookEvent<T extends keyof WebhookEvents> = {
	event: T
	payload: WebhookEvents[T]
}

type AllWebhookEvents = {
	[K in keyof WebhookEvents]: WebhookEvent<K>
}[keyof WebhookEvents]

type WebhookEventAlias<T extends keyof WebhookEvents> = {
	[K in T]: WebhookEvent<K>
}[T]

export type WebhookAliases = {
	'*': AllWebhookEvents
	'account.*': WebhookEventAlias<
		| 'account.updated'
		| 'account.application.authorized'
		| 'account.application.deauthorized'
		| 'account.external_account.created'
		| 'account.external_account.deleted'
		| 'account.external_account.updated'
	>
	'application_fee.*': WebhookEventAlias<
		| 'application_fee.created'
		| 'application_fee.refunded'
		| 'application_fee.refund.updated'
	>
	'balance.*': WebhookEventAlias<'balance.available'>
	'billing.*': WebhookEventAlias<'billing.alert.triggered'>
	'billing_portal.*': WebhookEventAlias<
		| 'billing_portal.configuration.created'
		| 'billing_portal.configuration.updated'
		| 'billing_portal.session.created'
	>
	'capability.*': WebhookEventAlias<'capability.updated'>
	'cash_balance.*': WebhookEventAlias<'cash_balance.funds_available'>
	'charge.*': WebhookEventAlias<
		| 'charge.captured'
		| 'charge.expired'
		| 'charge.failed'
		| 'charge.pending'
		| 'charge.refunded'
		| 'charge.succeeded'
		| 'charge.updated'
		| 'charge.dispute.closed'
		| 'charge.dispute.created'
		| 'charge.dispute.funds_reinstated'
		| 'charge.dispute.funds_withdrawn'
		| 'charge.dispute.updated'
	>
	'checkout.*': WebhookEventAlias<
		| 'checkout.session.async_payment_failed'
		| 'checkout.session.async_payment_succeeded'
		| 'checkout.session.completed'
		| 'checkout.session.expired'
	>
	'climate.*': WebhookEventAlias<
		| 'climate.order.canceled'
		| 'climate.order.created'
		| 'climate.order.delayed'
		| 'climate.order.delivered'
		| 'climate.order.product_substituted'
		| 'climate.product.created'
		| 'climate.product.pricing_updated'
	>
	'coupon.*': WebhookEventAlias<
		'coupon.created' | 'coupon.deleted' | 'coupon.updated'
	>
	'credit_note.*': WebhookEventAlias<
		'credit_note.created' | 'credit_note.updated' | 'credit_note.voided'
	>
	'customer.*': WebhookEventAlias<
		| 'customer.created'
		| 'customer.updated'
		| 'customer.deleted'
		| 'customer.discount.created'
		| 'customer.discount.updated'
		| 'customer.discount.deleted'
		| 'customer.source.created'
		| 'customer.source.updated'
		| 'customer.source.deleted'
		| 'customer.source.expiring'
		| 'customer.tax_id.created'
		| 'customer.tax_id.updated'
		| 'customer.tax_id.deleted'
		| 'customer.subscription.created'
		| 'customer.subscription.updated'
		| 'customer.subscription.deleted'
		| 'customer.subscription.trial_will_end'
		| 'customer.subscription.pending_update_applied'
		| 'customer.subscription.pending_update_expired'
	>
	'customer_cash_balance_transaction.*': WebhookEventAlias<'customer_cash_balance_transaction.created'>
	'entitlements.*': WebhookEventAlias<'entitlements.active_entitlement_summary.updated'>
	'file.*': WebhookEventAlias<'file.created'>
	'financial_connections.*': WebhookEventAlias<
		| 'financial_connections.account.created'
		| 'financial_connections.account.deactivated'
		| 'financial_connections.account.disconnected'
		| 'financial_connections.account.reactivated'
		| 'financial_connections.account.refreshed_balance'
		| 'financial_connections.account.refreshed_ownership'
		| 'financial_connections.account.refreshed_transactions'
	>
	'identity.*': WebhookEventAlias<
		| 'identity.verification_session.canceled'
		| 'identity.verification_session.created'
		| 'identity.verification_session.processing'
		| 'identity.verification_session.redacted'
		| 'identity.verification_session.requires_input'
		| 'identity.verification_session.verified'
	>
	'invoice.*': WebhookEventAlias<
		| 'invoice.created'
		| 'invoice.paid'
		| 'invoice.payment_failed'
		| 'invoice.payment_succeeded'
		| 'invoice.upcoming'
		| 'invoice.updated'
		| 'invoice.voided'
		| 'invoice.marked_uncollectible'
		| 'invoice.payment_action_required'
		| 'invoice.sent'
		| 'invoice.deleted'
		| 'invoice.finalization_failed'
		| 'invoice.finalized'
		| 'invoice.overdue'
		| 'invoice.will_be_due'
	>
	'invoiceitem.*': WebhookEventAlias<
		'invoiceitem.created' | 'invoiceitem.deleted'
	>
	'issuing.*': WebhookEventAlias<
		| 'issuing_authorization.created'
		| 'issuing_authorization.request'
		| 'issuing_authorization.updated'
		| 'issuing_card.created'
		| 'issuing_card.updated'
		| 'issuing_cardholder.created'
		| 'issuing_cardholder.updated'
		| 'issuing_dispute.closed'
		| 'issuing_dispute.created'
		| 'issuing_dispute.funds_reinstated'
		| 'issuing_dispute.funds_rescinded'
		| 'issuing_dispute.submitted'
		| 'issuing_dispute.updated'
		| 'issuing_personalization_design.activated'
		| 'issuing_personalization_design.deactivated'
		| 'issuing_personalization_design.rejected'
		| 'issuing_personalization_design.updated'
		| 'issuing_token.created'
		| 'issuing_token.updated'
		| 'issuing_transaction.created'
		| 'issuing_transaction.purchase_details_receipt_updated'
		| 'issuing_transaction.updated'
	>
	'payment_intent.*': WebhookEventAlias<
		| 'payment_intent.amount_capturable_updated'
		| 'payment_intent.canceled'
		| 'payment_intent.created'
		| 'payment_intent.partially_funded'
		| 'payment_intent.payment_failed'
		| 'payment_intent.processing'
		| 'payment_intent.requires_action'
		| 'payment_intent.succeeded'
	>
	'payment_link.*': WebhookEventAlias<
		'payment_link.created' | 'payment_link.updated'
	>
	'payment_method.*': WebhookEventAlias<
		| 'payment_method.attached'
		| 'payment_method.automatically_updated'
		| 'payment_method.detached'
		| 'payment_method.updated'
	>
	'payout.*': WebhookEventAlias<
		| 'payout.canceled'
		| 'payout.created'
		| 'payout.failed'
		| 'payout.paid'
		| 'payout.reconciliation_completed'
		| 'payout.updated'
	>
	'person.*': WebhookEventAlias<
		'person.created' | 'person.deleted' | 'person.updated'
	>
	'plan.*': WebhookEventAlias<'plan.created' | 'plan.deleted' | 'plan.updated'>
	'price.*': WebhookEventAlias<
		'price.created' | 'price.deleted' | 'price.updated'
	>
	'product.*': WebhookEventAlias<
		'product.created' | 'product.deleted' | 'product.updated'
	>
	'promotion_code.*': WebhookEventAlias<
		'promotion_code.created' | 'promotion_code.updated'
	>
	'quote.*': WebhookEventAlias<
		'quote.accepted' | 'quote.canceled' | 'quote.created' | 'quote.finalized'
	>
	'radar.*': WebhookEventAlias<
		'radar.early_fraud_warning.created' | 'radar.early_fraud_warning.updated'
	>
	'refund.*': WebhookEventAlias<
		'refund.created' | 'refund.failed' | 'refund.updated'
	>
	'reporting.*': WebhookEventAlias<
		| 'reporting.report_run.failed'
		| 'reporting.report_run.succeeded'
		| 'reporting.report_type.updated'
	>
	'review.*': WebhookEventAlias<'review.closed' | 'review.opened'>
	'setup_intent.*': WebhookEventAlias<
		| 'setup_intent.canceled'
		| 'setup_intent.created'
		| 'setup_intent.requires_action'
		| 'setup_intent.setup_failed'
		| 'setup_intent.succeeded'
	>
	'sigma.*': WebhookEventAlias<'sigma.scheduled_query_run.created'>
	'source.*': WebhookEventAlias<
		| 'source.canceled'
		| 'source.chargeable'
		| 'source.failed'
		| 'source.mandate_notification'
		| 'source.refund_attributes_required'
		| 'source.transaction.created'
		| 'source.transaction.updated'
	>
	'subscription_schedule.*': WebhookEventAlias<
		| 'subscription_schedule.aborted'
		| 'subscription_schedule.canceled'
		| 'subscription_schedule.completed'
		| 'subscription_schedule.created'
		| 'subscription_schedule.expiring'
		| 'subscription_schedule.released'
		| 'subscription_schedule.updated'
	>
	'tax.*': WebhookEventAlias<
		'tax.settings.updated' | 'tax_rate.created' | 'tax_rate.updated'
	>
	'terminal.*': WebhookEventAlias<
		'terminal.reader.action_failed' | 'terminal.reader.action_succeeded'
	>
	'test_helpers.*': WebhookEventAlias<
		| 'test_helpers.test_clock.advancing'
		| 'test_helpers.test_clock.created'
		| 'test_helpers.test_clock.deleted'
		| 'test_helpers.test_clock.internal_failure'
		| 'test_helpers.test_clock.ready'
	>
	'topup.*': WebhookEventAlias<
		| 'topup.canceled'
		| 'topup.created'
		| 'topup.failed'
		| 'topup.reversed'
		| 'topup.succeeded'
	>
	'transfer.*': WebhookEventAlias<
		'transfer.created' | 'transfer.reversed' | 'transfer.updated'
	>
	'treasury.*': WebhookEventAlias<
		| 'treasury.credit_reversal.created'
		| 'treasury.credit_reversal.posted'
		| 'treasury.debit_reversal.completed'
		| 'treasury.debit_reversal.created'
		| 'treasury.debit_reversal.initial_credit_granted'
		| 'treasury.financial_account.closed'
		| 'treasury.financial_account.created'
		| 'treasury.financial_account.features_status_updated'
		| 'treasury.inbound_transfer.canceled'
		| 'treasury.inbound_transfer.created'
		| 'treasury.inbound_transfer.failed'
		| 'treasury.inbound_transfer.succeeded'
		| 'treasury.outbound_payment.canceled'
		| 'treasury.outbound_payment.created'
		| 'treasury.outbound_payment.expected_arrival_date_updated'
		| 'treasury.outbound_payment.failed'
		| 'treasury.outbound_payment.posted'
		| 'treasury.outbound_payment.returned'
		| 'treasury.outbound_payment.tracking_details_updated'
		| 'treasury.outbound_transfer.canceled'
		| 'treasury.outbound_transfer.created'
		| 'treasury.outbound_transfer.expected_arrival_date_updated'
		| 'treasury.outbound_transfer.failed'
		| 'treasury.outbound_transfer.posted'
		| 'treasury.outbound_transfer.returned'
		| 'treasury.outbound_transfer.tracking_details_updated'
		| 'treasury.received_credit.created'
		| 'treasury.received_credit.failed'
		| 'treasury.received_credit.succeeded'
		| 'treasury.received_debit.created'
	>
}

export const webhookAliases = {
	'account.*': [
		'account.updated',
		'account.application.authorized',
		'account.application.deauthorized',
		'account.external_account.created',
		'account.external_account.deleted',
		'account.external_account.updated'
	],
	'application_fee.*': [
		'application_fee.created',
		'application_fee.refunded',
		'application_fee.refund.updated'
	],
	'balance.*': ['balance.available'],
	'billing.*': ['billing.alert.triggered'],
	'billing_portal.*': [
		'billing_portal.configuration.created',
		'billing_portal.configuration.updated',
		'billing_portal.session.created'
	],
	'capability.*': ['capability.updated'],
	'cash_balance.*': ['cash_balance.funds_available'],
	'charge.*': [
		'charge.captured',
		'charge.expired',
		'charge.failed',
		'charge.pending',
		'charge.refunded',
		'charge.succeeded',
		'charge.updated',
		'charge.dispute.closed',
		'charge.dispute.created',
		'charge.dispute.funds_reinstated',
		'charge.dispute.funds_withdrawn',
		'charge.dispute.updated'
	],
	'checkout.*': [
		'checkout.session.async_payment_failed',
		'checkout.session.async_payment_succeeded',
		'checkout.session.completed',
		'checkout.session.expired'
	],
	'climate.*': [
		'climate.order.canceled',
		'climate.order.created',
		'climate.order.delayed',
		'climate.order.delivered',
		'climate.order.product_substituted',
		'climate.product.created',
		'climate.product.pricing_updated'
	],
	'coupon.*': ['coupon.created', 'coupon.deleted', 'coupon.updated'],
	'credit_note.*': [
		'credit_note.created',
		'credit_note.updated',
		'credit_note.voided'
	],
	'customer.*': [
		'customer.created',
		'customer.updated',
		'customer.deleted',
		'customer.discount.created',
		'customer.discount.updated',
		'customer.discount.deleted',
		'customer.source.created',
		'customer.source.updated',
		'customer.source.deleted',
		'customer.source.expiring',
		'customer.tax_id.created',
		'customer.tax_id.updated',
		'customer.tax_id.deleted',
		'customer.subscription.created',
		'customer.subscription.updated',
		'customer.subscription.deleted',
		'customer.subscription.trial_will_end',
		'customer.subscription.pending_update_applied',
		'customer.subscription.pending_update_expired'
	],
	'customer_cash_balance_transaction.*': [
		'customer_cash_balance_transaction.created'
	],
	'entitlements.*': ['entitlements.active_entitlement_summary.updated'],
	'file.*': ['file.created'],
	'financial_connections.*': [
		'financial_connections.account.created',
		'financial_connections.account.deactivated',
		'financial_connections.account.disconnected',
		'financial_connections.account.reactivated',
		'financial_connections.account.refreshed_balance',
		'financial_connections.account.refreshed_ownership',
		'financial_connections.account.refreshed_transactions'
	],
	'identity.*': [
		'identity.verification_session.canceled',
		'identity.verification_session.created',
		'identity.verification_session.processing',
		'identity.verification_session.redacted',
		'identity.verification_session.requires_input',
		'identity.verification_session.verified'
	],
	'invoice.*': [
		'invoice.created',
		'invoice.paid',
		'invoice.payment_failed',
		'invoice.payment_succeeded',
		'invoice.upcoming',
		'invoice.updated',
		'invoice.voided',
		'invoice.marked_uncollectible',
		'invoice.payment_action_required',
		'invoice.sent',
		'invoice.deleted',
		'invoice.finalization_failed',
		'invoice.finalized',
		'invoice.overdue',
		'invoice.will_be_due'
	],
	'invoiceitem.*': ['invoiceitem.created', 'invoiceitem.deleted'],
	'issuing.*': [
		'issuing_authorization.created',
		'issuing_authorization.request',
		'issuing_authorization.updated',
		'issuing_card.created',
		'issuing_card.updated',
		'issuing_cardholder.created',
		'issuing_cardholder.updated',
		'issuing_dispute.closed',
		'issuing_dispute.created',
		'issuing_dispute.funds_reinstated',
		'issuing_dispute.funds_rescinded',
		'issuing_dispute.submitted',
		'issuing_dispute.updated',
		'issuing_personalization_design.activated',
		'issuing_personalization_design.deactivated',
		'issuing_personalization_design.rejected',
		'issuing_personalization_design.updated',
		'issuing_token.created',
		'issuing_token.updated',
		'issuing_transaction.created',
		'issuing_transaction.purchase_details_receipt_updated',
		'issuing_transaction.updated'
	],
	'payment_intent.*': [
		'payment_intent.amount_capturable_updated',
		'payment_intent.canceled',
		'payment_intent.created',
		'payment_intent.partially_funded',
		'payment_intent.payment_failed',
		'payment_intent.processing',
		'payment_intent.requires_action',
		'payment_intent.succeeded'
	],
	'payment_link.*': ['payment_link.created', 'payment_link.updated'],
	'payment_method.*': [
		'payment_method.attached',
		'payment_method.automatically_updated',
		'payment_method.detached',
		'payment_method.updated'
	],
	'payout.*': [
		'payout.canceled',
		'payout.created',
		'payout.failed',
		'payout.paid',
		'payout.reconciliation_completed',
		'payout.updated'
	],
	'person.*': ['person.created', 'person.deleted', 'person.updated'],
	'plan.*': ['plan.created', 'plan.deleted', 'plan.updated'],
	'price.*': ['price.created', 'price.deleted', 'price.updated'],
	'product.*': ['product.created', 'product.deleted', 'product.updated'],
	'promotion_code.*': ['promotion_code.created', 'promotion_code.updated'],
	'quote.*': [
		'quote.accepted',
		'quote.canceled',
		'quote.created',
		'quote.finalized'
	],
	'radar.*': [
		'radar.early_fraud_warning.created',
		'radar.early_fraud_warning.updated'
	],
	'refund.*': ['refund.created', 'refund.failed', 'refund.updated'],
	'reporting.*': [
		'reporting.report_run.failed',
		'reporting.report_run.succeeded',
		'reporting.report_type.updated'
	],
	'review.*': ['review.closed', 'review.opened'],
	'setup_intent.*': [
		'setup_intent.canceled',
		'setup_intent.created',
		'setup_intent.requires_action',
		'setup_intent.setup_failed',
		'setup_intent.succeeded'
	],
	'sigma.*': ['sigma.scheduled_query_run.created'],
	'source.*': [
		'source.canceled',
		'source.chargeable',
		'source.failed',
		'source.mandate_notification',
		'source.refund_attributes_required',
		'source.transaction.created',
		'source.transaction.updated'
	],
	'subscription_schedule.*': [
		'subscription_schedule.aborted',
		'subscription_schedule.canceled',
		'subscription_schedule.completed',
		'subscription_schedule.created',
		'subscription_schedule.expiring',
		'subscription_schedule.released',
		'subscription_schedule.updated'
	],
	'tax.*': ['tax.settings.updated', 'tax_rate.created', 'tax_rate.updated'],
	'terminal.*': [
		'terminal.reader.action_failed',
		'terminal.reader.action_succeeded'
	],
	'test_helpers.*': [
		'test_helpers.test_clock.advancing',
		'test_helpers.test_clock.created',
		'test_helpers.test_clock.deleted',
		'test_helpers.test_clock.internal_failure',
		'test_helpers.test_clock.ready'
	],
	'topup.*': [
		'topup.canceled',
		'topup.created',
		'topup.failed',
		'topup.reversed',
		'topup.succeeded'
	],
	'transfer.*': ['transfer.created', 'transfer.reversed', 'transfer.updated'],
	'treasury.*': [
		'treasury.credit_reversal.created',
		'treasury.credit_reversal.posted',
		'treasury.debit_reversal.completed',
		'treasury.debit_reversal.created',
		'treasury.debit_reversal.initial_credit_granted',
		'treasury.financial_account.closed',
		'treasury.financial_account.created',
		'treasury.financial_account.features_status_updated',
		'treasury.inbound_transfer.canceled',
		'treasury.inbound_transfer.created',
		'treasury.inbound_transfer.failed',
		'treasury.inbound_transfer.succeeded',
		'treasury.outbound_payment.canceled',
		'treasury.outbound_payment.created',
		'treasury.outbound_payment.expected_arrival_date_updated',
		'treasury.outbound_payment.failed',
		'treasury.outbound_payment.posted',
		'treasury.outbound_payment.returned',
		'treasury.outbound_payment.tracking_details_updated',
		'treasury.outbound_transfer.canceled',
		'treasury.outbound_transfer.created',
		'treasury.outbound_transfer.expected_arrival_date_updated',
		'treasury.outbound_transfer.failed',
		'treasury.outbound_transfer.posted',
		'treasury.outbound_transfer.returned',
		'treasury.outbound_transfer.tracking_details_updated',
		'treasury.received_credit.created',
		'treasury.received_credit.failed',
		'treasury.received_credit.succeeded',
		'treasury.received_debit.created'
	]
}
