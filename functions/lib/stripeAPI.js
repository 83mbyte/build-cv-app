
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

    createSession: async (STRIPE_SECRET, PRICE_ID, customer_email, customer_id, path_origin) => {

        const stripe = new Stripe(STRIPE_SECRET);
        const automatic_tax = { enabled: true };
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                    price: PRICE_ID,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            customer_email,
            metadata: { uid: customer_id, origin: path_origin },
            success_url: `${path_origin}/${process.env.APP_PAYMENT_SUCCESS}`,
            cancel_url: `${path_origin}/${process.env.APP_PAYMENT_CANCEL}`,
            automatic_tax
        });

        if (session?.url) {
            return { content: session.url, status: 'Success', code: 200 }
        } else {
            return { message: 'Internal Server Error.', status: 'Error', code: 500 }
        }
    }
}