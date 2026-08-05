"use client";

import React, { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setIsOtpSent(true);
      } else {
        const data = await res.json();
        alert(data.error || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:4000/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: otpCode }),
      });

      if (res.ok) {
        setIsLoggedIn(true);
      } else {
        const data = await res.json();
        alert(data.error || "Invalid code");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleGoogleLogin = () => {
    console.log("Initiating Google OAuth...");
  };

  if (isLoggedIn) {
    return (
      <div className="relative min-h-screen flex flex-col justify-center items-center bg-black overflow-hidden font-sans">
        {/* Placeholder for 3D Background */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-900 via-black to-black opacity-80" />

        <div className="relative z-10 flex flex-col items-center">
          <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400 tracking-[0.2em] animate-pulse drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
            SYSTEM ONLINE
          </h2>
          <p className="mt-4 text-zinc-400 tracking-widest text-sm uppercase">
            Connection Established
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center bg-black overflow-hidden font-sans selection:bg-emerald-500/30">
      {/* Background Layer - Ready for a Three.js Canvas or Video */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-luminosity" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />

      <div className="relative z-10 w-full max-w-sm px-6">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-black text-white tracking-[0.15em] drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
            HUMANS_
          </h1>
          <p className="text-xs text-emerald-400 tracking-[0.3em] mt-2 font-semibold">
            AUTHENTICATION PROTOCOL
          </p>
        </div>

        {/* Glassmorphism Container */}
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] p-8 rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.8)]">
          <form
            className="space-y-6"
            onSubmit={isOtpSent ? handleVerifyOtp : handleSendOtp}
          >
            <div className="space-y-1">
              <label
                htmlFor="email"
                className="block text-[10px] uppercase tracking-[0.1em] text-zinc-500 font-bold ml-1"
              >
                Operator Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                disabled={isOtpSent}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-zinc-700 text-sm focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all disabled:opacity-30"
                placeholder="enter.address@domain.com"
              />
            </div>

            {isOtpSent && (
              <div className="space-y-1 animate-in fade-in slide-in-from-top-2 duration-300">
                <label
                  htmlFor="otp"
                  className="block text-[10px] uppercase tracking-[0.1em] text-zinc-500 font-bold ml-1"
                >
                  Access Code
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-emerald-400 font-mono tracking-[0.2em] placeholder-zinc-700 text-center text-lg focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                  placeholder="000000"
                  maxLength={6}
                />
              </div>
            )}

            <button
              type="submit"
              className="w-full relative group overflow-hidden rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 text-sm font-bold text-emerald-400 tracking-widest uppercase transition-all hover:bg-emerald-500 hover:text-black hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
            >
              <span className="relative z-10">
                {isOtpSent ? "Verify Link" : "Initialize"}
              </span>
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6 flex items-center justify-between text-zinc-600">
            <div className="w-full h-[1px] bg-white/10"></div>
            <span className="px-3 text-[10px] uppercase tracking-widest font-bold">
              Or
            </span>
            <div className="w-full h-[1px] bg-white/10"></div>
          </div>

          {/* OAuth Button */}
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="mt-6 w-full flex justify-center items-center gap-3 bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm font-bold text-zinc-300 tracking-widest transition-all hover:bg-white hover:text-black"
          >
            GOOGLE
          </button>
        </div>
      </div>
    </div>
  );
}
