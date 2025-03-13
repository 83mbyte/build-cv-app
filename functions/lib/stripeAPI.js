
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

        if (event.type === 'checkout.session.completed' || event.type === 'checkout.session.async_payment_succeeded') {
            return { code: 200, status: 'Success', userId: event.data.object.metadata.uid, origin: event.data.object.metadata.origin, message: 'Payment completed' }
        }

        if (event.type === 'checkout.session.expired' || event.type === 'checkout.session.async_payment_failed') {
            return ({ status: 'Success', message: 'Session.expired || Async_payment_failed', code: 400 })
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

    // end of exports
}


