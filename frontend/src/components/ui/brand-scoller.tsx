"use client";

import React from "react";

// J.P. Morgan Chase Logo (Octagon)
const JPMorganLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 text-white/80">
    <path d="M11.5 2.5H8.5L2.5 8.5V11.5H5.5L11.5 5.5V2.5Z" />
    <path d="M21.5 8.5L15.5 2.5H12.5V5.5L18.5 11.5H21.5V8.5Z" />
    <path d="M12.5 21.5H15.5L21.5 15.5V12.5H18.5L12.5 18.5V21.5Z" />
    <path d="M2.5 15.5L8.5 21.5H11.5V18.5L5.5 12.5H2.5V15.5Z" />
  </svg>
);

// Goldman Sachs Logo (Monogram)
const GoldmanSachsLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="size-6 text-sky-400">
    <path d="M12 4H7a4 4 0 0 0-4 4v8a4 4 0 0 0 4 4h5" />
    <path d="M15 16h4a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-5v8" />
  </svg>
);

// Morgan Stanley Logo (Crest)
const MorganStanleyLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6 text-amber-500">
    <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" />
    <line x1="12" y1="2" x2="12" y2="22" />
  </svg>
);

// Citi Logo (Wordmark + Arch)
const CitiLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-6">
    <path d="M4 14C8 7.5 16 7.5 20 14" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
    <text x="12" y="19" fill="currentColor" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">citi</text>
  </svg>
);

// Bank of America Logo (Flag stripes)
const BankOfAmericaLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-6">
    <rect x="2" y="4" width="7" height="16" fill="#0B2F87" rx="0.5" />
    <rect x="11" y="4" width="11" height="3.2" fill="#E31837" rx="0.5" />
    <rect x="11" y="9.2" width="11" height="3.2" fill="#E31837" rx="0.5" />
    <rect x="11" y="14.4" width="11" height="3.2" fill="#E31837" rx="0.5" />
    <rect x="11" y="19.6" width="11" height="3.2" fill="#E31837" rx="0.5" />
  </svg>
);

// HSBC Logo (Hexagon)
const HSBCLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="size-6 text-red-500">
    <path d="M12 3L21 12L12 21L3 12L12 3Z" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <polygon points="12,3 7,12 12,12" />
    <polygon points="12,21 17,12 12,12" />
    <polygon points="3,12 12,12 12,7" />
    <polygon points="21,12 12,12 12,17" />
  </svg>
);

const banks = [
  { logo: <JPMorganLogo />, name: "J.P. Morgan" },
  { logo: <GoldmanSachsLogo />, name: "Goldman Sachs" },
  { logo: <MorganStanleyLogo />, name: "Morgan Stanley" },
  { logo: <CitiLogo />, name: "Citi" },
  { logo: <BankOfAmericaLogo />, name: "Bank of America" },
  { logo: <HSBCLogo />, name: "HSBC" },
];

export const BrandScroller = () => {
  return (
    <div className="group flex overflow-hidden py-2 [--gap:3rem] gap-(--gap) flex-row max-w-full [--duration:30s] [mask-image:linear-gradient(to_right,_rgba(0,_0,_0,_0),rgba(0,_0,_0,_1)_10%,rgba(0,_0,_0,_1)_90%,rgba(0,_0,_0,_0))]">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div
            className="flex shrink-0 justify-around gap-(--gap) animate-marquee flex-row min-w-full"
            key={i}
          >
            {banks.map((bank, index) => (
              <div className="flex items-center gap-3 shrink-0" key={index}>
                {bank.logo}
                <span className="text-sm font-semibold opacity-70 tracking-tight text-white whitespace-nowrap">{bank.name}</span>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export const BrandScrollerReverse = () => {
  return (
    <div className="group flex overflow-hidden py-2 [--gap:3rem] gap-(--gap) flex-row max-w-full [--duration:30s] [mask-image:linear-gradient(to_right,_rgba(0,_0,_0,_0),rgba(0,_0,_0,_1)_10%,rgba(0,_0,_0,_1)_90%,rgba(0,_0,_0,_0))]">
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <div
            className="flex shrink-0 justify-around gap-(--gap) animate-marquee-reverse flex-row min-w-full"
            key={i}
          >
            {banks.map((bank, index) => (
              <div className="flex items-center gap-3 shrink-0" key={index}>
                {bank.logo}
                <span className="text-sm font-semibold opacity-70 tracking-tight text-white whitespace-nowrap">{bank.name}</span>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};
