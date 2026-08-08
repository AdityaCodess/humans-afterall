import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-zinc-950 flex flex-col font-sans select-none overflow-hidden">
      {/* 
        Background Layer: 
        This z-0 container is structurally isolated so you can easily drop a custom 
        hardware-accelerated morphing simulation or Three.js particle engine right 
        here without it interfering with the UI layer on top. 
      */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-800 via-zinc-950 to-zinc-950" />
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop')] bg-cover bg-center mix-blend-screen" />
      </div>

      {/* Top Navigation */}
      <nav className="relative z-10 w-full p-6 flex justify-between items-center">
        <div className="text-2xl font-black text-white tracking-widest uppercase drop-shadow-[0_2px_0_rgba(249,115,22,1)]">
          HUMANS<span className="text-orange-500">_</span>
        </div>

        {/* Secondary Tactile Button */}
        <Link
          href="/login"
          className="bg-zinc-900 border-b-4 border-zinc-950 active:border-b-0 active:translate-y-1 rounded-lg px-6 py-2 text-sm font-black text-zinc-400 uppercase tracking-wider transition-all hover:text-white"
        >
          Sign In
        </Link>
      </nav>

      {/* Main Hero Section */}
      <main className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-4 pb-20">
        {/* Massive Game Title */}
        <h1 className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500 drop-shadow-[0_8px_0_rgba(0,0,0,1)] uppercase tracking-tighter mb-6">
          Automate.
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-orange-500 drop-shadow-[0_8px_0_rgba(234,88,12,0.8)]">
            Dominate.
          </span>
        </h1>

        <p className="max-w-xl text-lg md:text-xl text-zinc-400 font-bold tracking-wide mb-14">
          Deploy your spatial engines, optimize the grid, and watch the numbers
          go up. The ultimate incremental simulation awaits.
        </p>

        {/* Massive Primary CTA */}
        <Link
          href="/login"
          className="group relative flex items-center justify-center gap-2 bg-gradient-to-b from-orange-400 to-orange-600 border-b-8 border-orange-800 active:border-b-0 active:translate-y-2 rounded-2xl px-14 py-6 text-3xl font-black text-white uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(249,115,22,0.2)] hover:shadow-[0_0_50px_rgba(249,115,22,0.5)]"
        >
          Start Grinding
        </Link>
      </main>
    </div>
  );
}
