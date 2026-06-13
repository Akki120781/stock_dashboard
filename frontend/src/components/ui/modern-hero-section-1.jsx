import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const navigate = useNavigate()

  useEffect(() => {
    const handleMouseMove = (e) => {
      const rect = e.currentTarget?.getBoundingClientRect()
      if (rect) {
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }

    const heroElement = document.getElementById('hero-section')
    if (heroElement) {
      heroElement.addEventListener('mousemove', handleMouseMove)
      return () => heroElement.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section
      id="hero-section"
      className="flex flex-col items-center text-center relative mx-auto rounded-2xl overflow-hidden my-6 py-0 px-4 w-full min-h-[calc(100vh-5rem)] bg-background transition-colors duration-300"
    >
      
      <div className="absolute inset-0 z-0 h-full w-full pointer-events-none">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 1220 810"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <g clipPath="url(#clip0_186_1134)">
            <mask
              id="mask0_186_1134"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="10"
              y="-1"
              width="1200"
              height="812"
            >
              <rect x="10" y="-0.84668" width="1200" height="811.693" fill="url(#paint0_linear_186_1134)" />
            </mask>
            <g mask="url(#mask0_186_1134)">
              {/* Grid Rectangles */}
              {[...Array(35)].map((_, i) => (
                <React.Fragment key={`row-${i}`}>
                  {[...Array(23)].map((_, j) => (
                    <rect
                      key={`${i}-${j}`}
                      x={-20.0891 + i * 36}
                      y={9.2 + j * 36}
                      width="35.6"
                      height="35.6"
                      stroke="currentColor"
                      className="text-foreground/8 transition-all duration-300 hover:text-foreground/20"
                      strokeWidth="0.4"
                      strokeDasharray="2 2"
                    />
                  ))}
                </React.Fragment>
              ))}
              
              {/* Subtle highlight rectangles */}
              <rect x="699.711" y="81" width="36" height="36" fill="currentColor" className="text-foreground/6 transition-all duration-500" />
              <rect x="195.711" y="153" width="36" height="36" fill="currentColor" className="text-foreground/7 transition-all duration-500" />
              <rect x="1023.71" y="153" width="36" height="36" fill="currentColor" className="text-foreground/7 transition-all duration-500" />
              <rect x="123.711" y="225" width="36" height="36" fill="currentColor" className="text-foreground/7 transition-all duration-500" />
              <rect x="1095.71" y="225" width="36" height="36" fill="currentColor" className="text-foreground/7 transition-all duration-500" />
              <rect x="951.711" y="297" width="36" height="36" fill="currentColor" className="text-foreground/7 transition-all duration-500" />
              <rect x="231.711" y="333" width="36" height="36" fill="currentColor" className="text-foreground/5 transition-all duration-500" />
              <rect x="303.711" y="405" width="36" height="36" fill="currentColor" className="text-foreground/5 transition-all duration-500" />
              <rect x="87.7109" y="405" width="36" height="36" fill="currentColor" className="text-foreground/7 transition-all duration-500" />
              <rect x="519.711" y="405" width="36" height="36" fill="currentColor" className="text-foreground/6 transition-all duration-500" />
              <rect x="771.711" y="405" width="36" height="36" fill="currentColor" className="text-foreground/7 transition-all duration-500" />
              <rect x="591.711" y="477" width="36" height="36" fill="currentColor" className="text-foreground/5 transition-all duration-500" />
            </g>

            {/* Subtle mouse-following glow */}
            <circle
              cx={mousePosition.x}
              cy={mousePosition.y}
              r="120"
              fill="url(#mouseGradient)"
              opacity="0.12"
              className="pointer-events-none transition-opacity duration-300"
            />

            <g filter="url(#filter0_f_186_1134)">
              <path
                d="M1447.45 -87.0203V-149.03H1770V1248.85H466.158V894.269C1008.11 894.269 1447.45 454.931 1447.45 -87.0203Z"
                fill="url(#paint1_linear_186_1134)"
                opacity="0.6"
              />
            </g>

            <g filter="url(#filter1_f_186_1134)">
              <path
                d="M1383.45 -151.02V-213.03H1706V1184.85H402.158V830.269C944.109 830.269 1383.45 390.931 1383.45 -151.02Z"
                fill="url(#paint2_linear_186_1134)"
                fillOpacity="0.4"
              />
            </g>

            <g style={{ mixBlendMode: "lighten" }} filter="url(#filter2_f_186_1134)">
              <path
                d="M1567.45 -231.02V-293.03H1890V1104.85H586.158V750.269C1128.11 750.269 1567.45 310.931 1567.45 -231.02Z"
                fill="url(#paint3_linear_186_1134)"
                opacity="0.3"
              />
            </g>

            <g style={{ mixBlendMode: "overlay" }} filter="url(#filter3_f_186_1134)">
              <path
                d="M65.625 750.269H284.007C860.205 750.269 1327.31 283.168 1327.31 -293.03H1650V1104.85H65.625V750.269Z"
                fill="url(#paint4_radial_186_1134)"
                fillOpacity="0.3"
              />
            </g>
          </g>

          <rect
            x="0.5"
            y="0.5"
            width="1219"
            height="809"
            rx="15.5"
            stroke="currentColor"
            className="text-foreground/8"
          />

          <defs>
            <radialGradient id="mouseGradient" cx="0" cy="0" r="1">
              <stop offset="0%" stopColor="var(--color-primary)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            
            <filter
              id="filter0_f_186_1134"
              x="147.369"
              y="-467.818"
              width="1941.42"
              height="2035.46"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="159.394" result="effect1_foregroundBlur_186_1134" />
            </filter>
            <filter
              id="filter1_f_186_1134"
              x="-554.207"
              y="-1169.39"
              width="3216.57"
              height="3310.61"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="478.182" result="effect1_foregroundBlur_186_1134" />
            </filter>
            <filter
              id="filter2_f_186_1134"
              x="426.762"
              y="-452.424"
              width="1622.63"
              height="1716.67"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="79.6969" result="effect1_foregroundBlur_186_1134" />
            </filter>
            <filter
              id="filter3_f_186_1134"
              x="-253.163"
              y="-611.818"
              width="2221.95"
              height="2035.46"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="159.394" result="effect1_foregroundBlur_186_1134" />
            </filter>
            <linearGradient
              id="paint0_linear_186_1134"
              x1="35.0676"
              y1="23.6807"
              x2="903.8"
              y2="632.086"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="currentColor" stopOpacity="0" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0.4" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_186_1134"
              x1="1118.08"
              y1="-149.03"
              x2="1118.08"
              y2="1248.85"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="currentColor" />
              <stop offset="0.578125" stopColor="var(--color-primary)" stopOpacity="0.8" />
              <stop offset="1" stopColor="var(--color-primary)" />
            </linearGradient>
            <linearGradient
              id="paint2_linear_186_1134"
              x1="1054.08"
              y1="-213.03"
              x2="1054.08"
              y2="1184.85"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="currentColor" />
              <stop offset="0.578125" stopColor="var(--color-primary)" stopOpacity="0.8" />
              <stop offset="1" stopColor="var(--color-primary)" />
            </linearGradient>
            <linearGradient
              id="paint3_linear_186_1134"
              x1="1238.08"
              y1="-293.03"
              x2="1238.08"
              y2="1104.85"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="currentColor" />
              <stop offset="0.578125" stopColor="var(--color-primary)" stopOpacity="0.8" />
              <stop offset="1" stopColor="var(--color-primary)" />
            </linearGradient>
            <radialGradient
              id="paint4_radial_186_1134"
              cx="0"
              cy="0"
              r="1"
              gradientUnits="userSpaceOnUse"
              gradientTransform="translate(989.13 557.24) rotate(47.9516) scale(466.313 471.424)"
            >
              <stop stopColor="currentColor" />
              <stop offset="0.157789" stopColor="var(--color-primary)" stopOpacity="0.8" />
              <stop offset="1" stopColor="var(--color-primary)" />
            </radialGradient>
            <clipPath id="clip0_186_1134">
              <rect width="1220" height="810" rx="16" fill="currentColor" />
            </clipPath>
          </defs>
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full space-y-6 md:space-y-8 lg:space-y-10 px-4 pt-24 pb-16">
        
        {/* Subtle status indicator */}
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-semibold text-indigo-600 dark:text-indigo-400 dark:bg-brand-500/10 dark:border-brand-500/20">
          <span className="w-2 h-2 bg-indigo-600 dark:bg-brand-400 rounded-full mr-2 animate-pulse"></span>
          Live Market Quotes & Analytics
        </div>

        {/* Main heading */}
        <h1 className="text-foreground text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight max-w-4xl tracking-tight">
          Master the Markets in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-indigo-400 dark:from-brand-400 dark:to-teal-300">Real-Time</span>
        </h1>
        
        {/* Subheading */}
        <p className="text-muted-foreground text-lg md:text-xl lg:text-2xl font-normal leading-relaxed max-w-2xl">
          Track your favorite assets, analyze deep historical trends, and stay ahead of the curve with advanced charting and real-time market data.
        </p>

        {/* CTA Button */}
        <div className="pt-4">
          <Button 
            size="lg"
            onClick={() => navigate('/signup')}
            className="bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-brand-500 dark:hover:bg-brand-600 dark:text-white px-10 py-6 rounded-full font-bold text-lg shadow-lg shadow-indigo-500/20 dark:shadow-brand-500/20 transition-all duration-300 hover:scale-[1.03] cursor-pointer"
          >
            Get Started Free
          </Button>
        </div>

        {/* Minimal trust indicators */}
        <div className="flex items-center space-x-8 pt-8 text-sm text-muted-foreground font-medium">
          <div className="text-center">
            <div className="font-bold text-foreground text-lg">10K+</div>
            <div>Active Traders</div>
          </div>
          <div className="w-px h-8 bg-slate-200 dark:bg-slate-800"></div>
          <div className="text-center">
            <div className="font-bold text-foreground text-lg">99.9%</div>
            <div>Data Uptime</div>
          </div>
          <div className="w-px h-8 bg-slate-200 dark:bg-slate-800"></div>
          <div className="text-center">
            <div className="font-bold text-foreground text-lg">Real-Time</div>
            <div>Quotes & Charts</div>
          </div>
        </div>
      </div>
    </section>
  )
}
