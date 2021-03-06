const { Router } = require('express');
const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`);

module.exports = Router()

  .post('/pay', async(request, response) => {
    try {
    // Create the PaymentIntent
      let intent = await stripe.paymentIntents.create({
        amount: request.body.cartTotal,
        currency: 'usd',
        payment_method: request.body.payment_method_id,

        // A PaymentIntent can be confirmed some time after creation,
        // but here we want to confirm (collect payment) immediately.
        confirm: true,

        // If the payment requires any follow-up actions from the
        // customer, like two-factor authentication, Stripe will error
        // and you will need to prompt them for a new payment method.
        error_on_requires_action: true
      });
      return generateResponse(response, intent);
    } catch(e) {
      if(e.type === 'StripeCardError') {
      // Display error on client
        return response.send({ error: e.message });
      } else {
      // Something else happened
        return response.status(500).send({ error: e.message });
      }
    }
  });

function generateResponse(response, intent) {
  if(intent.status === 'succeeded') {
    // Handle post-payment fulfillment
    return response.send({ success: true });
  } else {
    // Any other status would be unexpected, so error
    return response.status(500).send({ error: 'Unexpected status ' + intent.status });
  }
}
