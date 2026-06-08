"use client";

import React from "react";
import { Tabs, Card, Button, Accordion, AccordionItem } from "@heroui/react";
import { CircleCheck, Flame, CircleQuestion } from "@gravity-ui/icons";

export default function PricingPage() {
  // Data Structure from the screenshot/text
  const seekerPlans = [
    {
      name: "Free",
      price: "$0",
      period: "/forever",
      description: "Ideal for freshers starting their career journey.",
      features: [
        "Browse & save up to 10 jobs",
        "Apply to up to 3 jobs per month",
        "Basic profile setup",
        "Email notifications & alerts",
      ],
      buttonText: "Get Started",
      variant: "bordered",
      color: "default",
    },
    {
      name: "Pro",
      price: "$19",
      period: "/month",
      description: "Perfect for active job hunters looking for speed.",
      features: [
        "Apply to up to 30 jobs per month",
        "Unlimited saved jobs",
        "Advanced application tracking",
        "Salary insights & analysis",
      ],
      buttonText: "Upgrade to Pro",
      variant: "solid",
      color: "primary",
      popular: true,
    },
    {
      name: "Premium",
      price: "$39",
      period: "/month",
      description: "Ultimate toolkit to stand out from the competition.",
      features: [
        "Everything in Pro included",
        "Unlimited job applications",
        "Profile boost directly to recruiters",
        "Early access to newly posted jobs",
        "24/7 Priority customer support",
      ],
      buttonText: "Go Premium",
      variant: "flat",
      color: "secondary",
    },
  ];

  const recruiterPlans = [
    {
      name: "Free",
      price: "$0",
      period: "/forever",
      description: "Great for a company's first year of micro hiring.",
      features: [
        "Up to 3 active job posts",
        "Basic applicant management pipeline",
        "Standard listing visibility",
      ],
      buttonText: "Start For Free",
      variant: "bordered",
      color: "default",
    },
    {
      name: "Growth",
      price: "$49",
      period: "/month",
      description: "Best for growing engineering & tech teams.",
      features: [
        "Up to 10 active job posts",
        "Applicant tracking system (ATS)",
        "Basic recruitment analytics",
        "Direct email support channels",
      ],
      buttonText: "Choose Growth",
      variant: "solid",
      color: "primary",
      popular: true,
    },
    {
      name: "Enterprise",
      price: "$149",
      period: "/month",
      description: "Comprehensive solutions for grand scale hiring.",
      features: [
        "Up to 50 active job posts",
        "Advanced analytics & reporting dashboard",
        "Featured/Pinned job listings",
        "Team collaboration controls",
        "Custom company branding configurations",
        "Dedicated account manager & priority support",
      ],
      buttonText: "Contact Enterprise",
      variant: "flat",
      color: "secondary",
    },
  ];

  const faqs = [
    {
      title: "Can I cancel my subscription anytime?",
      content: "Yes, you can cancel your subscription at any time directly from your account settings panel. Once canceled, you will retain access to your plan benefits until the end of your current billing cycle.",
    },
    {
      title: "What is your refund policy?",
      content: "We offer a 7-day money-back guarantee for all monthly plans if you are unsatisfied with the features. Please reach out to our priority support team to initiate the process.",
    },
    {
      title: "What payment methods do you accept?",
      content: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and encrypted international gateway processing pipelines for seamless transactions.",
    },
    {
      title: "How does plan switching work?",
      content: "You can upgrade or downgrade your tier configuration smoothly. When upgrading, changes apply instantly and your current month's bill is pro-rated. Downgrades take effect at the start of your next billing cycle.",
    },
  ];

  // 🛠️ FIXED: Standard JavaScript render helper function expression layout mapping
  const renderCards = (plans) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mt-8 w-full">
      {plans.map((plan, index) => (
        <Card 
          key={index} 
          className={`relative bg-zinc-900/40 border p-6 sm:p-8 rounded-[24px] backdrop-blur-md flex flex-col justify-between transition-all duration-300 ${
            plan.popular 
              ? "border-purple-500 shadow-xl shadow-purple-500/5 ring-1 ring-purple-500/30 -translate-y-1" 
              : "border-zinc-800/80 hover:border-zinc-700/80"
          }`}
        >
          {plan.popular && (
            <span className="absolute top-4 right-4 bg-purple-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1">
              <Flame size={12} /> Most Popular
            </span>
          )}

          <div className="space-y-5">
            <div>
              <h3 className="text-xl font-bold text-white">{plan.name}</h3>
              <p className="text-xs text-zinc-500 mt-1 min-h-[32px]">{plan.description}</p>
            </div>

            <div className="flex items-baseline gap-1 py-2 border-b border-zinc-800/60">
              <span className="text-4xl font-extrabold text-white tracking-tight">{plan.price}</span>
              <span className="text-zinc-500 text-sm font-medium">{plan.period}</span>
            </div>

            <ul className="space-y-3.5 pt-2">
              {plan.features.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-sm text-zinc-300 leading-relaxed">
                  <CircleCheck className="text-purple-400 mt-0.5 shrink-0" size={16} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

         <Button
  radius="lg"
  className={`w-full mt-8 h-12 rounded-2xl text-sm font-bold tracking-wide
    transition-all duration-300 active:scale-[0.98]
    ${
      plan.popular
        ? "bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:-translate-y-0.5"
        : "bg-zinc-950/60 border border-zinc-700 text-zinc-200 hover:bg-zinc-800 hover:border-purple-500/60 hover:text-white"
    }
  `}
>
  {plan.buttonText}
</Button>
        </Card>
      ))}
    </div>
  );

  return (
    <main className="w-full min-h-screen bg-zinc-950 text-zinc-100 pt-32 pb-24 px-4 overflow-hidden relative">
      
      {/* Background Decorative Mesh Blurs */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-purple-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] bg-pink-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* HEADER BLOCK */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/60 text-[11px] font-semibold text-purple-400 tracking-wider uppercase backdrop-blur-md">
            Flexible Pricing
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
            Transparent Plans for Everyone
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 font-normal">
            Whether you are expanding your personal developer profile or hunting outstanding talent pipelines, we have got you covered.
          </p>
        </div>

        {/* HERO UI TABS/TOGGLE SWITCH CONTAINER */}
   <Tabs aria-label="Pricing Subscription Options">
  <Tabs.ListContainer>
    <Tabs.List>
      <Tabs.Tab id="seekers">
        For Job Seekers
        <Tabs.Indicator />
      </Tabs.Tab>

      <Tabs.Tab id="recruiters">
        For Recruiters
        <Tabs.Indicator />
      </Tabs.Tab>
    </Tabs.List>
  </Tabs.ListContainer>

  <Tabs.Panel id="seekers">
    {renderCards(seekerPlans)}
  </Tabs.Panel>

  <Tabs.Panel id="recruiters">
    {renderCards(recruiterPlans)}
  </Tabs.Panel>
</Tabs>

        {/* FAQ ACCORDION BLOCK */}
        <section className="w-full max-w-3xl mt-32 space-y-6">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center justify-center gap-2">
              <CircleQuestion size={24} className="text-purple-400" />
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-zinc-400">
              Got questions about billing or license upgrades? We have answers.
            </p>
          </div>

          <Accordion 
            variant="splitted"
            className="px-0 gap-4"
            itemClasses={{
              base: "bg-zinc-900/30 border border-zinc-800/80 rounded-2xl backdrop-blur-sm px-4 py-2",
              title: "text-sm sm:text-base font-semibold text-zinc-200 hover:text-white transition-colors",
              trigger: "py-3",
              content: "text-xs sm:text-sm text-zinc-400 leading-relaxed pb-4 pt-1",
              indicator: "text-purple-400",
            }}
          >
            {faqs.map((faq, index) => (
              <AccordionItem key={index} title={faq.title}>
                {faq.content}
              </AccordionItem>
            ))}
          </Accordion>
        </section>

      </div>
    </main>
  );
}