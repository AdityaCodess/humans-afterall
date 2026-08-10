"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Globe, Shield } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Initialize Google Identity Services
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
        callback: handleGoogleLogin,
      });

      // Render the official Google button inside our target div
      window.google.accounts.id.renderButton(
        document.getElementById('google-btn'),
        { theme: 'filled_black', size: 'large', width: '100%', shape: 'rectangular' }
      );
    }
  }, []);

  async function handleGoogleLogin(response: any) {
    try {
      // Send the token to your backend/database route
      const res = await fetch('http://localhost:4000/api/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: response.credential }),
      });

      if (res.ok) {
        // Redirect straight into the simulation command center
        router.push('/play');
      } else {
        console.error('Authentication failed on backend');
      }
    } catch (err) {
      console.error('Network error during auth', err);
    }
  }

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


  if (isLoggedIn) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col justify-center items-center font-sans select-none">
        <h2 className="text-5xl font-black text-orange-500 tracking-tight animate-bounce drop-shadow-[0_0_15px_rgba(249,115,22,0.5)]">
          LOADING...
        </h2>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-zinc-950 flex flex-col justify-center items-center font-sans overflow-hidden select-none">
      {/* Background Layer: Ready for a dynamic particle canvas */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-950 to-zinc-950" />

      {/* Floating UI Container */}
      <div className="relative z-10 w-full max-w-md p-6">
        {/* Game Title Area */}
        <div
          className="text-center mb-10 animate-bounce"
          style={{ animationDuration: "3s" }}
        >
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-orange-500 drop-shadow-[0_4px_0_rgba(234,88,12,0.8)] uppercase tracking-tight">
            Tap to Start
          </h1>
          <p className="mt-2 text-zinc-400 font-bold tracking-widest text-sm">
            SERVER: ONLINE
          </p>
        </div>

        {/* Chunky Game Panel */}
        <div className="bg-zinc-900 border-4 border-zinc-800 rounded-3xl p-6 shadow-[0_8px_0_rgba(39,39,42,1)]">
          <form
            className="space-y-5"
            onSubmit={isOtpSent ? handleVerifyOtp : handleSendOtp}
          >
            <div>
              <label className="block text-xs font-black text-zinc-500 uppercase tracking-wider mb-2 ml-1">
                Player Email
              </label>
              <input
                type="email"
                required
                disabled={isOtpSent}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-zinc-950 border-2 border-zinc-800 rounded-xl px-4 py-3 text-white font-bold text-lg focus:outline-none focus:border-orange-500 focus:ring-0 transition-colors disabled:opacity-50"
                placeholder="player@domain.com"
              />
            </div>

            {isOtpSent && (
              <div className="animate-in zoom-in-95 duration-200">
                <label className="block text-xs font-black text-zinc-500 uppercase tracking-wider mb-2 ml-1">
                  Verification Code
                </label>
                <input
                  type="text"
                  required
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  className="w-full bg-zinc-950 border-2 border-zinc-800 rounded-xl px-4 py-3 text-orange-400 font-black text-center text-2xl tracking-[0.25em] focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="000000"
                  maxLength={6}
                />
              </div>
            )}

            {/* Tactile Primary Button */}
            <button
              type="submit"
              className="w-full group relative flex items-center justify-center gap-2 bg-gradient-to-b from-orange-400 to-orange-600 border-b-4 border-orange-700 active:border-b-0 active:translate-y-1 rounded-xl px-4 py-4 text-xl font-black text-white uppercase tracking-wide transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.6)]"
            >
              {isOtpSent ? "Verify & Play" : "Send Code"}
            </button>
          </form>

          <div className="mt-6 border-t-2 border-zinc-800 pt-6">
            {/* The actual Google button gets rendered inside this div */}
            <div className="w-full flex justify-center bg-zinc-950 rounded-xl p-1 shadow-inner">
              <div id="google-btn" className="w-full flex justify-center" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}