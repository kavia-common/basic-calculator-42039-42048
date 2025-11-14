"use client";

import Calculator from "@/components/Calculator";

export default function Home() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center" style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.10), rgba(249,250,251,1))" }}>
      <Calculator />
    </main>
  );
}
