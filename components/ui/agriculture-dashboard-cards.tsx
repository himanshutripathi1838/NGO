import React from "react";
import { Users, Home, Wallet, Sprout, ArrowRight } from "lucide-react";

export interface AgricultureCardItem {
  id: string;
  heading: string;
  description: string;
  icon: React.ReactNode;
  theme: "green" | "lime" | "orange" | "blue";
  onClick?: () => void;
}

export const defaultAgricultureCards: AgricultureCardItem[] = [
  {
    id: "farmers",
    heading: "FARMERS",
    description: "Registered in this network",
    icon: <Users className="w-5 h-5" />,
    theme: "green",
  },
  {
    id: "cultivated-area",
    heading: "CULTIVATED AREA",
    description: "Across seasons · not landholding",
    icon: <Home className="w-5 h-5" />,
    theme: "lime",
  },
  {
    id: "input-expense",
    heading: "INPUT EXPENSE",
    description: "Total of itemized expenses",
    icon: <Wallet className="w-5 h-5" />,
    theme: "orange",
  },
  {
    id: "harvest-output",
    heading: "HARVEST OUTPUT",
    description: "Compare one crop at a time",
    icon: <Sprout className="w-5 h-5" />,
    theme: "blue",
  },
];

const themeStyles = {
  green: {
    cardBg: "bg-gradient-to-b from-white via-[#f3fcf6] to-[#e6f7ec]",
    border: "border-[#d4ecd9] hover:border-[#86efac]",
    iconBg: "bg-[#dcfce7] text-[#16a34a]",
    arrowBg: "bg-[#dcfce7] text-[#15803d] border-[#bbf7d0]",
    leafColor: "text-[#86efac]",
  },
  lime: {
    cardBg: "bg-gradient-to-b from-white via-[#f9fdf2] to-[#eef8db]",
    border: "border-[#e1f0c5] hover:border-[#bef264]",
    iconBg: "bg-[#ecfccb] text-[#65a30d]",
    arrowBg: "bg-[#ecfccb] text-[#4d7c0f] border-[#d9f99d]",
    leafColor: "text-[#bef264]",
  },
  orange: {
    cardBg: "bg-gradient-to-b from-white via-[#fffaf3] to-[#ffeed7]",
    border: "border-[#fde4ca] hover:border-[#fed7aa]",
    iconBg: "bg-[#ffedd5] text-[#ea580c]",
    arrowBg: "bg-[#ffedd5] text-[#c2410c] border-[#fed7aa]",
    leafColor: "text-[#fed7aa]",
  },
  blue: {
    cardBg: "bg-gradient-to-b from-white via-[#f3faff] to-[#e2f2fd]",
    border: "border-[#cbe6fa] hover:border-[#bae6fd]",
    iconBg: "bg-[#e0f2fe] text-[#0284c7]",
    arrowBg: "bg-[#e0f2fe] text-[#0284c7] border-[#bae6fd]",
    leafColor: "text-[#bae6fd]",
  },
};

export function AgricultureDashboardCards({
  cards = defaultAgricultureCards,
  className = "",
}: {
  cards?: AgricultureCardItem[];
  className?: string;
}) {
  return (
    <section
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full ${className}`}
      aria-label="Agricultural Network Overview"
    >
      {cards.map((card) => {
        const theme = themeStyles[card.theme];
        return (
          <article
            key={card.id}
            onClick={card.onClick}
            tabIndex={0}
            role="button"
            className={`group relative overflow-hidden rounded-[24px] p-5 pt-5 pb-0 min-h-[180px] flex flex-col justify-start border ${theme.cardBg} ${theme.border} shadow-[0_10px_25px_-4px_rgba(7,116,67,0.04),0_2px_6px_rgba(0,0,0,0.02)] hover:shadow-[0_16px_32px_-4px_rgba(7,116,67,0.1),0_4px_12px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all duration-200 cursor-pointer select-none`}
          >
            {/* Top-Right Delicate Botanical Leaf */}
            <div
              className={`absolute top-2 right-14 w-9 h-9 pointer-events-none ${theme.leafColor} opacity-85 z-10`}
              aria-hidden="true"
            >
              <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
                <path
                  d="M44,4 C34,14 30,28 32,42"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M32,42 C22,38 20,26 31,24 C31.8,30 32,36 32,42 Z"
                  fill="currentColor"
                  opacity="0.85"
                />
                <path
                  d="M36,22 C26,16 28,6 37,9 C37,14 36.5,18 36,22 Z"
                  fill="currentColor"
                  opacity="0.75"
                />
                <path
                  d="M42,10 C34,4 39,-2 44,2 C44,5 43,8 42,10 Z"
                  fill="currentColor"
                  opacity="0.9"
                />
              </svg>
            </div>

            {/* Header Row */}
            <div className="flex items-center justify-between gap-3 relative z-20">
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`w-11 h-11 rounded-[14px] flex items-center justify-center shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-105 ${theme.iconBg}`}
                >
                  {card.icon}
                </div>
                <div className="flex flex-col gap-0.5 min-w-0">
                  <h3 className="text-[13.5px] font-extrabold tracking-[0.6px] uppercase text-[#0f172a] leading-tight">
                    {card.heading}
                  </h3>
                  <p className="text-[11.5px] font-medium text-[#64748b] leading-tight truncate">
                    {card.description}
                  </p>
                </div>
              </div>

              {/* Circular Right-Arrow Icon */}
              <div
                className={`w-[34px] h-[34px] rounded-full flex items-center justify-center shrink-0 border transition-all duration-200 group-hover:translate-x-1 group-hover:scale-105 ${theme.arrowBg}`}
                aria-hidden="true"
              >
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            {/* Decorative Agricultural Landscape Graphics at Bottom */}
            {card.theme === "green" && (
              <svg
                className="absolute bottom-0 left-0 right-0 w-full h-[85px] pointer-events-none z-10"
                viewBox="0 0 320 90"
                fill="none"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="rFarmHills1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#86efac" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#4ade80" stopOpacity="0.6" />
                  </linearGradient>
                  <linearGradient id="rFarmHills2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22c55e" />
                    <stop offset="100%" stopColor="#15803d" />
                  </linearGradient>
                  <linearGradient id="rFarmHills3" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#16a34a" />
                    <stop offset="100%" stopColor="#14532d" />
                  </linearGradient>
                </defs>
                <path d="M0,65 Q110,40 210,54 Q270,62 320,48 L320,90 L0,90 Z" fill="url(#rFarmHills1)" />
                <path d="M0,55 Q80,44 170,68 Q240,84 320,80 L320,90 L0,90 Z" fill="url(#rFarmHills2)" />
                <path d="M0,58 Q85,48 180,72" stroke="rgba(255,255,255,0.35)" strokeWidth="2" fill="none" />
                <path d="M0,68 Q95,58 200,80" stroke="rgba(255,255,255,0.25)" strokeWidth="1.8" fill="none" />
                <path d="M0,74 Q120,62 230,84 L320,86 L320,90 L0,90 Z" fill="url(#rFarmHills3)" />
                <path d="M50,56 Q110,50 148,64" stroke="#059669" strokeWidth="1.6" fill="none" />
                <circle cx="148" cy="64" r="7.5" fill="#047857" />
                <circle cx="148" cy="61" r="1.8" fill="#ffffff" />
                <path d="M144,66 C144,64 146,63 148,63 C150,63 152,64 152,66" stroke="#ffffff" strokeWidth="1.1" fill="none" />
                <g transform="translate(225, 26)">
                  <path d="M-8,28 C-8,18 -16,15 -19,13 C-16,22 -10,26 -8,28 Z" fill="#86efac" />
                  <path d="M-6,30 Q-13,20 -15,11" stroke="#4ade80" strokeWidth="1.4" fill="none" />
                  <path d="M36,28 C36,18 44,15 47,13 C44,22 38,26 36,28 Z" fill="#86efac" />
                  <path d="M4,44 C4,28 14,24 24,24 C34,24 44,28 44,44 Z" fill="#6ee7b7" opacity="0.95" />
                  <circle cx="24" cy="15" r="7.5" fill="#5eead4" />
                  <ellipse cx="24" cy="11" rx="15" ry="3.5" fill="#34d399" />
                  <path d="M15,11 C15,4 33,4 33,11 Z" fill="#10b981" />
                </g>
              </svg>
            )}

            {card.theme === "lime" && (
              <svg
                className="absolute bottom-0 left-0 right-0 w-full h-[85px] pointer-events-none z-10"
                viewBox="0 0 320 90"
                fill="none"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="rLimeSun" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="60%" stopColor="#facc15" />
                    <stop offset="100%" stopColor="#eab308" />
                  </linearGradient>
                  <radialGradient id="rLimeSunGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fde047" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#fde047" stopOpacity="0" />
                  </radialGradient>
                  <linearGradient id="rLimeHill1" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#bef264" />
                    <stop offset="100%" stopColor="#84cc16" />
                  </linearGradient>
                  <linearGradient id="rLimeHill2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a3e635" />
                    <stop offset="100%" stopColor="#4d7c0f" />
                  </linearGradient>
                </defs>
                <circle cx="230" cy="56" r="24" fill="url(#rLimeSunGlow)" />
                <circle cx="230" cy="56" r="14" fill="url(#rLimeSun)" />
                <path d="M180,68 Q235,52 320,58 L320,90 L180,90 Z" fill="#65a30d" opacity="0.35" />
                <circle cx="266" cy="58" r="4.5" fill="#3f6212" />
                <rect x="265" y="62" width="2" height="3" fill="#365314" />
                <circle cx="279" cy="54" r="5.5" fill="#4d7c0f" />
                <rect x="278" y="59" width="2" height="4" fill="#365314" />
                <circle cx="294" cy="59" r="4.5" fill="#3f6212" />
                <rect x="293" y="63" width="2" height="3" fill="#365314" />
                <path d="M0,66 Q110,46 220,62 Q270,70 320,64 L320,90 L0,90 Z" fill="url(#rLimeHill1)" />
                <path d="M0,74 Q120,58 240,76 L320,80 L320,90 L0,90 Z" fill="url(#rLimeHill2)" />
                <path d="M0,68 Q90,58 170,66" stroke="#d9f99d" strokeWidth="1.8" fill="none" />
                <path d="M10,78 Q100,64 200,72" stroke="#bef264" strokeWidth="1.8" fill="none" />
                <path d="M40,85 Q130,72 230,76" stroke="#d9f99d" strokeWidth="1.6" fill="none" />
              </svg>
            )}

            {card.theme === "orange" && (
              <svg
                className="absolute bottom-0 left-0 right-0 w-full h-[85px] pointer-events-none z-10"
                viewBox="0 0 320 90"
                fill="none"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="rOrgDune1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffedd5" />
                    <stop offset="100%" stopColor="#fed7aa" />
                  </linearGradient>
                  <linearGradient id="rOrgDune2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fed7aa" />
                    <stop offset="100%" stopColor="#fb923c" />
                  </linearGradient>
                  <linearGradient id="rOrgCoinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef08a" />
                    <stop offset="40%" stopColor="#facc15" />
                    <stop offset="100%" stopColor="#ca8a04" />
                  </linearGradient>
                  <linearGradient id="rOrgCoinEdge" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#eab308" />
                    <stop offset="100%" stopColor="#a16207" />
                  </linearGradient>
                </defs>
                <path d="M0,64 Q90,50 200,66 Q260,74 320,60 L320,90 L0,90 Z" fill="url(#rOrgDune1)" />
                <path d="M0,74 Q100,62 210,78 Q270,86 320,72 L320,90 L0,90 Z" fill="url(#rOrgDune2)" opacity="0.6" />
                <g transform="translate(230, 28)">
                  <rect x="0" y="0" width="30" height="42" rx="3" fill="#ffffff" stroke="#fde68a" strokeWidth="1.2" />
                  <line x1="5" y1="7" x2="20" y2="7" stroke="#e2e8f0" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="5" y1="13" x2="25" y2="13" stroke="#cbd5e1" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="5" y1="19" x2="23" y2="19" stroke="#e2e8f0" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="5" y1="25" x2="25" y2="25" stroke="#e2e8f0" strokeWidth="1.8" strokeLinecap="round" />
                  <line x1="5" y1="32" x2="16" y2="32" stroke="#f59e0b" strokeWidth="2.2" strokeLinecap="round" />
                </g>
                <g transform="translate(208, 46)">
                  <line x1="-7" y1="7" x2="-2" y2="7" stroke="#f59e0b" strokeWidth="1.6" strokeLinecap="round" />
                  <line x1="-5" y1="2" x2="-1" y2="4" stroke="#f59e0b" strokeWidth="1.6" strokeLinecap="round" />
                  <line x1="-5" y1="12" x2="-1" y2="10" stroke="#f59e0b" strokeWidth="1.6" strokeLinecap="round" />
                  <path d="M0,20 C0,17 5,15 12,15 C19,15 24,17 24,20 L24,24 C24,27 19,29 12,29 C5,29 0,27 0,24 Z" fill="url(#rOrgCoinEdge)" />
                  <ellipse cx="12" cy="20" rx="12" ry="4" fill="url(#rOrgCoinGrad)" />
                  <path d="M0,15 C0,12 5,10 12,10 C19,10 24,12 24,15 L24,19 C24,22 19,24 12,24 C5,24 0,22 0,19 Z" fill="url(#rOrgCoinEdge)" />
                  <ellipse cx="12" cy="15" rx="12" ry="4" fill="url(#rOrgCoinGrad)" />
                  <path d="M0,10 C0,7 5,5 12,5 C19,5 24,7 24,10 L24,14 C24,17 19,19 12,19 C5,19 0,17 0,14 Z" fill="url(#rOrgCoinEdge)" />
                  <ellipse cx="12" cy="10" rx="12" ry="4" fill="url(#rOrgCoinGrad)" />
                  <path d="M12,7.5 L12.8,9.5 L14.8,10 L12.8,10.5 L12,12.5 L11.2,10.5 L9.2,10 L11.2,9.5 Z" fill="#ffffff" opacity="0.85" />
                </g>
              </svg>
            )}

            {card.theme === "blue" && (
              <svg
                className="absolute bottom-0 left-0 right-0 w-full h-[85px] pointer-events-none z-10"
                viewBox="0 0 320 90"
                fill="none"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="rBluWave1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#bae6fd" />
                    <stop offset="100%" stopColor="#38bdf8" />
                  </linearGradient>
                  <linearGradient id="rBluWave2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#34d399" />
                    <stop offset="100%" stopColor="#059669" />
                  </linearGradient>
                  <linearGradient id="rBluBarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#7dd3fc" />
                    <stop offset="100%" stopColor="#bae6fd" />
                  </linearGradient>
                </defs>
                <path d="M0,64 C80,60 140,82 200,66 C250,54 285,62 320,50 L320,90 L0,90 Z" fill="url(#rBluWave1)" opacity="0.4" />
                <g transform="translate(190, 36)">
                  <rect x="0" y="22" width="6.5" height="20" rx="1.8" fill="url(#rBluBarGrad)" opacity="0.5" />
                  <rect x="10" y="14" width="6.5" height="28" rx="1.8" fill="url(#rBluBarGrad)" opacity="0.7" />
                  <rect x="20" y="6" width="6.5" height="36" rx="1.8" fill="url(#rBluBarGrad)" opacity="0.9" />
                </g>
                <path d="M0,74 C70,70 120,86 190,78 C250,70 285,76 320,70 L320,90 L0,90 Z" fill="url(#rBluWave2)" />
                <path d="M0,70 C80,66 140,84 210,70" stroke="#0284c7" strokeWidth="1.4" strokeOpacity="0.3" fill="none" />
                <g transform="translate(280, 10)">
                  <path d="M10,74 C10,48 9.5,24 9,0" stroke="#16a34a" strokeWidth="2.2" strokeLinecap="round" />
                  <path d="M9,0 C6.5,-7 11.5,-7 9,0 Z" fill="#22c55e" />
                  <path d="M9,10 C3.5,8 1,15 8,17 C8,14.5 9,12 9,10 Z" fill="#4ade80" />
                  <path d="M9,12 C14.5,10 17,17 10,19 C10,16.5 9,14 9,12 Z" fill="#22c55e" />
                  <path d="M9,24 C1.5,21 -2,32 8,33 C8,29.5 9,27 9,24 Z" fill="#22c55e" />
                  <path d="M9,27 C16.5,24 20,35 10,36 C10,32.5 9,30 9,27 Z" fill="#16a34a" />
                  <path d="M9,41 C-1,37 -4,51 8,51 C8,47 9,43.5 9,41 Z" fill="#16a34a" />
                  <path d="M9,44 C19,40 22,54 10,54 C10,50 9,46.5 9,44 Z" fill="#15803d" />
                </g>
              </svg>
            )}
          </article>
        );
      })}
    </section>
  );
}

export default AgricultureDashboardCards;
