"use client";

import React from "react";
import { Card, Button } from "@heroui/react";
import { ShieldExclamation, ArrowLeft, House, LockOpen } from "@gravity-ui/icons";

export default function UnauthorizedPage() {
  return (
    <main className="w-full min-h-screen bg-zinc-950 text-zinc-100 pt-32 pb-16 px-4 relative overflow-hidden flex flex-col items-center justify-center">
      
      {/* 🌌 Background Decorative Mesh / Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-red-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-20 w-[350px] h-[350px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full mx-auto relative z-10 animate-fade-in">
        <Card className="w-full bg-zinc-900/40 border border-zinc-800/80 p-8 sm:p-10 rounded-[24px] backdrop-blur-xl text-center shadow-2xl flex flex-col items-center">
          
          {/* 🚨 Animated Security Lock / Shield Badge */}
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 mb-6 relative">
            <ShieldExclamation size={30} />
            <span className="absolute inset-0 rounded-full border border-red-500/30 animate-ping opacity-20 scale-105" />
          </div>

          {/* Error Headers */}
          <div className="space-y-2 mb-6">
            <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest bg-red-500/10 border border-red-500/20 px-3 py-1 rounded-full">
              Error 403: Forbidden
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight pt-2">
              Access Token Revoked
            </h1>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-xs mx-auto">
              Your profile tier configuration does not possess valid permissions to cross this operational route.
            </p>
          </div>

          <hr className="w-full border-zinc-800/60 mb-6" />

          {/* Help Center Info Box */}
          <div className="w-full text-left bg-zinc-950/40 border border-zinc-800/40 rounded-xl p-4 space-y-2 mb-8">
            <p className="text-xs text-zinc-400 leading-relaxed">
              <span className="text-zinc-200 font-medium">Why am I seeing this?</span> You might be logged in as a Seeker trying to access Recruiter control spaces, or your premium application tracking pipeline session has expired.
            </p>
          </div>

          {/* 🛠️ Action Routing Controls (Serialization Safe "as" tags) */}
          <div className="flex flex-col gap-3 w-full">
            <Button
              as="a"
              href="/auth/signin"
              color="primary"
              className="w-full h-11 bg-purple-600 hover:bg-purple-500 text-white rounded-xl text-sm font-semibold tracking-wide transition-all shadow-lg shadow-purple-500/10 flex items-center justify-center gap-2"
            >
              <LockOpen size={16} />
              Sign in with Another Account
            </Button>
            
            <div className="grid grid-cols-2 gap-3 w-full">
              <Button
                as="a"
                href="javascript:history.back()"
                variant="bordered"
                className="w-full h-11 border-zinc-800 text-zinc-300 hover:bg-zinc-800/60 hover:text-white rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5"
              >
                <ArrowLeft size={14} />
                Go Back
              </Button>
              
              <Button
                as="a"
                href="/"
                variant="bordered"
                className="w-full h-11 border-zinc-800 text-zinc-300 hover:bg-zinc-800/60 hover:text-white rounded-xl text-xs font-medium transition-all flex items-center justify-center gap-1.5"
              >
                <House size={14} />
                Return Home
              </Button>
            </div>
          </div>

        </Card>
      </div>
    </main>
  );
}