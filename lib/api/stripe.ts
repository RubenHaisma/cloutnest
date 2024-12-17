import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

export async function createPaymentIntent(amount: number) {
  const response = await fetch('/api/create-payment-intent', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ amount }),
  });
  return response.json();
}

export async function createStripeAccount() {
  const response = await fetch('/api/create-stripe-account', {
    method: 'POST',
  });
  return response.json();
}

export { stripePromise };
