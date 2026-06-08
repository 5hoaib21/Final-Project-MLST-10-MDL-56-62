import { stripe } from '@/lib/stripe';
import { redirect } from 'next/navigation';
import { CircleCheck, ArrowRight, Envelope, ShieldCheck, ShoppingBag } from '@gravity-ui/icons';
import Link from 'next/link';
import React from 'react';
import { Card, Button } from '@heroui/react';

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)');

  const {
    status,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  });

  if (status === 'open') {
    return redirect('/');
  }

  if (status === 'complete') {
    return (
      <main className="w-full min-h-screen bg-zinc-950 text-zinc-100 pt-32 pb-16 px-4 relative overflow-hidden flex flex-col items-center justify-center">
        
        {/* Decorative Background Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-10 -left-10 w-[300px] h-[300px] bg-purple-600/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-xl w-full mx-auto relative z-10">
          <Card className="w-full bg-zinc-900/50 border border-zinc-800 p-8 sm:p-10 rounded-[24px] backdrop-blur-xl text-center shadow-2xl shadow-emerald-950/10 flex flex-col items-center">
            
            {/* 🌟 Animated Success Badge Indicator */}
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-6 relative shadow-inner shadow-emerald-500/20">
              <CircleCheck size={32} />
              <span className="absolute inset-0 rounded-full border border-emerald-500/30 animate-ping opacity-25 scale-110" />
            </div>

            {/* Header Content */}
            <div className="space-y-2 mb-8">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest bg-emerald-500/5 border border-emerald-500/10 px-3 py-1 rounded-full">
                Payment Success
              </span>
              <h1 className="text-3xl font-extrabold text-white tracking-tight pt-2">
                Thank You For Your Order!
              </h1>
              <p className="text-sm text-zinc-400 max-w-sm mx-auto">
                We appreciate your business! Your transaction pipeline was processed securely.
              </p>
            </div>

            <hr className="w-full border-zinc-800/80 mb-6" />

            {/* Informational Message Grid */}
            <div className="w-full text-left bg-zinc-950/40 border border-zinc-800/60 rounded-xl p-4.5 space-y-3.5 mb-8">
              <div className="flex items-start gap-3 text-sm">
                <Envelope size={18} className="text-purple-400 mt-0.5 shrink-0" />
                <p className="text-zinc-300 leading-relaxed">
                  A confirmation summary with activation links will be dispatched shortly to:{' '}
                  <span className="text-white font-semibold underline decoration-purple-500/40 underline-offset-4 break-all">
                    {customerEmail}
                  </span>
                </p>
              </div>

              <div className="flex items-start gap-3 text-sm pt-2 border-t border-zinc-800/40">
                <ShieldCheck size={18} className="text-zinc-500 mt-0.5 shrink-0" />
                <p className="text-zinc-400 text-xs">
                  Any queries regarding limits setup? Ping our priority response team anytime via{' '}
                  <a 
                    href="mailto:orders@example.com" 
                    className="text-zinc-300 font-medium hover:text-white underline decoration-zinc-700 hover:decoration-white transition-all"
                  >
                    orders@example.com
                  </a>
                </p>
              </div>
            </div>

            {/* Navigation Flow Controls (Bypassing Next.js 16 serialization issues using as="a") */}
            <div className="flex flex-col sm:flex-row gap-3 w-full mt-2">
              <Button
                as="a"
                href="/"
                variant="bordered"
                className="w-full h-11 border-zinc-800 text-zinc-300 hover:bg-zinc-800/60 hover:text-white rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag size={14} />
                Back to Explore
              </Button>
              <Button
                as="a"
                href="/dashboard"
                color="primary"
                className="w-full h-11 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-semibold tracking-wide transition-all shadow-lg shadow-purple-500/10 flex items-center justify-center gap-1.5"
              >
                Go to Dashboard
                <ArrowRight size={14} />
              </Button>
            </div>

          </Card>
        </div>
      </main>
    );
  }
}