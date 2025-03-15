
const Stripe = require('stripe');

module.exports = {
    webhookEventCheck: async (STRIPE_SECRET, STRIPE_WHSEC, sig, payloadBody) => {

        let event;
        const stripe = new Stripe(STRIPE_SECRET);

        try {
            event = stripe.webhooks.constructEvent(payloadBody, sig, STRIPE_WHSEC);

        } catch (err) {
            return ({ message: `Event.object Error: ${err.message}`, status: 'Error', code: 400 });

        }

        if (!event) {
            // return resp.status(400).send(`Event.object Error: Event is Null`);
            return ({ message: `Event.object Error: Event is Null`, status: 'Error', code: 400 });
        }
        if (!event.type) {
            // return resp.status(400).send(`Event.object Error: no Event.type received`);
            return ({ message: `Event.object Error: no Event.type`, status: 'Error', code: 400 });
        }

        switch (event.type) {
            case 'customer.subscription.created':
                const newSubscription = event.data.object;
                const data = {
                    subscriptionId: newSubscription.id,
                    customerId: newSubscription.customer,
                    status: newSubscription.status,
                    currentPeriodEnd: new Date(newSubscription.current_period_end * 1000),
                    cancelAtPeriodEnd: newSubscription.cancel_at_period_end,
                    canceledAt: null,
                    cancelAt: null,
                }

                return ({ success: true, message: 'Subscription created', data });
                break;
            case 'customer.subscription.updated':
                const updatedSubscription = event.data.object;
                const subscriptionId = updatedSubscription.id;
                const status = updatedSubscription.status;
                const cancelAtPeriodEnd = updatedSubscription.cancel_at_period_end;
                const canceledAt = updatedSubscription.canceled_at;
                const cancelAt = updatedSubscription.cancel_at;

                const previousAttributes = updatedSubscription.previous_attributes || {};
                if (
                    Object.keys(previousAttributes).length === 1 &&
                    previousAttributes.cancellation_details &&
                    !previousAttributes.cancel_at_period_end &&
                    !previousAttributes.canceled_at &&
                    !previousAttributes.cancel_at
                ) {
                    console.log(`Subscription ${subscriptionId} feedback updated, no status change`);
                    break; // don nothing. there is no reason to update DB because only feedbacks data changed by user
                }

                if (status === 'canceled') {
                    // Immediate cancelation
                    const data = {
                        subscriptionId,
                        status: 'canceled',
                        canceledAt: canceledAt ? new Date(canceledAt * 1000) : new Date(),
                        cancelAt: null,
                        currentPeriodEnd: null,
                    };
                    console.log(`Subscription ${subscriptionId} canceled immediately`);

                    return ({ success: true, message: 'Subscription canceled immediately', data });
                }
                else if (cancelAtPeriodEnd && canceledAt) {
                    // Cancel at the end of period

                    const data = {
                        subscriptionId,
                        status: 'pending_cancellation', // or 'active' with some prefix or flag 
                        canceledAt: new Date(canceledAt * 1000),
                        cancelAt: cancelAt ? new Date(cancelAt * 1000) : null,
                        currentPeriodEnd: new Date(updatedSubscription.current_period_end * 1000),
                    }
                    console.log(`Subscription ${subscriptionId} scheduled for cancellation`);
                    return ({ success: true, message: 'Subscription scheduled for cancellation', data });
                    break;
                } else if (!cancelAtPeriodEnd && !canceledAt) {

                    // Subscription is active or reactivated
                    const data = {
                        subscriptionId,
                        status: 'active',
                        canceledAt: null,
                        cancelAt: null,
                        currentPeriodEnd: new Date(updatedSubscription.current_period_end * 1000),
                    };
                    console.log(`Subscription ${subscriptionId} active or resumed`);
                    return ({ success: true, message: 'Subscription active or resumed', data })
                    break;
                }
                breal;
            case 'invoice.paid':
                const invoice = event.data.object;
                const subscriptionIdFromInvoice = invoice.subscription;

                if (subscriptionIdFromInvoice) {
                    const subscription = await stripe.subscriptions.retrieve(subscriptionIdFromInvoice);
                    const data = {
                        subscriptionId: subscriptionIdFromInvoice,
                        status: subscription.status,
                        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
                    };
                    console.log(`Subscription ${subscriptionIdFromInvoice} renewed with invoice ${invoice.id}`);
                    return ({ sucess: true, message: `Subscription renewed with invoice.`, data })
                }
                break;
            case 'invoice.payment_failed':
                const failedInvoice = event.data.object;
                const failedSubscriptionId = failedInvoice.subscription;
                if (failedSubscriptionId) {
                    const subscription = await stripe.subscriptions.retrieve(failedSubscriptionId);
                    const data = {
                        subscriptionId: failedSubscriptionId,
                        status: subscription.status, //can be as 'past_due', 'unpaid', 'canceled'
                        currentPeriodEnd: new Date(subscription.current_period_end * 1000),
                    };
                    console.log(`Payment failed for subscription ${failedSubscriptionId}, invoice ${failedInvoice.id}`);
                    return ({ success: true, message: `Payment failed for subscription, invoice.`, data })
                }
                break;


            default:
                console.log(`Unhandled event: ${event.type}`);
                return ({ status: 'Default_Return', message: 'default return..' })
        }

        return ({ status: 'Default_Return', message: 'default return..' })
    },

    // 
    // to work with subscription
    createSetupIntent: async (STRIPE_SECRET,) => {
        try {
            const stripe = new Stripe(STRIPE_SECRET);
            const setupIntent = await stripe.setupIntents.create({
                payment_method_types: ['card'], // Can be added different methods, for example - 'sepa_debit'
            });
            return { clientSecret: setupIntent.client_secret };
        } catch (error) {
            return { error: error.message };
        }
    },
    createSubscriptionIntent: async (STRIPE_SECRET, SUBSCRIPTION_PRICE_ID, paymentMethodId, email) => {
        try {
            const stripe = new Stripe(STRIPE_SECRET);
            const customer = await stripe.customers.create({
                email: email,
                payment_method: paymentMethodId,
                invoice_settings: { default_payment_method: paymentMethodId },
            });

            const subscription = await stripe.subscriptions.create({
                customer: customer.id,
                items: [{ price: SUBSCRIPTION_PRICE_ID }],
                default_payment_method: paymentMethodId,
            });

            return { success: true, subscription };
        } catch (error) {
            return { success: false, error: error.message };
        }
    },

    createSubscriptionPortalSession: async (STRIPE_SECRET, customerId, returnUrl) => {
        try {
            const stripe = new Stripe(STRIPE_SECRET);
            const portalSession = await stripe.billingPortal.sessions.create({
                customer: customerId,
                return_url: returnUrl, // where to return user 
            });
            return { success: true, url: portalSession.url }

        } catch (error) {
            return { sucess: false, error: error.message }

        }
    }

    // end of exports
}


