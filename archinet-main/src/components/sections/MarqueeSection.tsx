'use client';

import React from 'react';

export default function MarqueeSection() {
  const items = Array(6).fill('ELITE EXHIBITS 2026–27');

  return (
    <section className="w-full py-8 bg-[#0a0a0a] border-y border-[rgba(240,171,68,0.2)] overflow-hidden select-none">
      <div className="animate-marquee whitespace-nowrap flex items-center">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-8 mx-6">
            <span className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-widest text-white uppercase">
              {item}
            </span>
            <span className="text-xl sm:text-3xl text-[var(--accent-gold)]">✦</span>
          </div>
        ))}
        {items.map((item, index) => (
          <div key={`dup-${index}`} className="flex items-center gap-8 mx-6">
            <span className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light tracking-widest text-white uppercase">
              {item}
            </span>
            <span className="text-xl sm:text-3xl text-[var(--accent-gold)]">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
}
