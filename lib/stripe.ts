import { Stripe, loadStripe } from '@stripe/stripe-js'

let stripePromise: Promise<Stripe | null>

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
  }
  return stripePromise
}

export const createCheckoutSession = async (priceId: string) => {
  const res = await fetch('/api/create-checkout-session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ priceId }),
  })

  const { sessionId } = await res.json()
  const stripe = await getStripe()
  
  if (!stripe) throw new Error('Failed to load Stripe')
  
  const { error } = await stripe.redirectToCheckout({ sessionId })
  
  if (error) throw new Error(error.message)
}