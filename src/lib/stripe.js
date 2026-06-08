import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)


export const PLAN_PRICE_ID ={
    'seeker_pro' : 'price_1Tg2IEHXNI7TvlPwCjGjJMR9',
    'seeker_premium' : 'price_1Tg8MUHXNI7TvlPwdwm3zhiY',
    'recruiter_growth': 'price_1Tg8OfHXNI7TvlPwIRfipN3Q',
    'recruiter_enterprise': 'price_1Tg8Q1HXNI7TvlPw8fBVpuXE',
}