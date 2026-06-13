"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { BullLogo } from "./bull-logo";


interface PupilProps {
  size?: number;
  maxDistance?: number;
  pupilColor?: string;
  forceLookX?: number;
  forceLookY?: number;
}

const Pupil = ({ 
  size = 12, 
  maxDistance = 5,
  pupilColor = "black",
  forceLookX,
  forceLookY
}: PupilProps) => {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const pupilRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const calculatePupilPosition = () => {
    if (!pupilRef.current) return { x: 0, y: 0 };

    // If forced look direction is provided, use that instead of mouse tracking
    if (forceLookX !== undefined && forceLookY !== undefined) {
      return { x: forceLookX, y: forceLookY };
    }

    const pupil = pupilRef.current.getBoundingClientRect();
    const pupilCenterX = pupil.left + pupil.width / 2;
    const pupilCenterY = pupil.top + pupil.height / 2;

    const deltaX = mouseX - pupilCenterX;
    const deltaY = mouseY - pupilCenterY;
    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);

    const angle = Math.atan2(deltaY, deltaX);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    return { x, y };
  };

  const pupilPosition = calculatePupilPosition();

  return (
    <div
      ref={pupilRef}
      className="rounded-full"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: pupilColor,
        transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
        transition: 'transform 0.1s ease-out',
      }}
    />
  );
};




interface EyeBallProps {
  size?: number;
  pupilSize?: number;
  maxDistance?: number;
  eyeColor?: string;
  pupilColor?: string;
  isBlinking?: boolean;
  forceLookX?: number;
  forceLookY?: number;
}

const EyeBall = ({ 
  size = 48, 
  pupilSize = 16, 
  maxDistance = 10,
  eyeColor = "white",
  pupilColor = "black",
  isBlinking = false,
  forceLookX,
  forceLookY
}: EyeBallProps) => {
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const eyeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const calculatePupilPosition = () => {
    if (!eyeRef.current) return { x: 0, y: 0 };

    // If forced look direction is provided, use that instead of mouse tracking
    if (forceLookX !== undefined && forceLookY !== undefined) {
      return { x: forceLookX, y: forceLookY };
    }

    const eye = eyeRef.current.getBoundingClientRect();
    const eyeCenterX = eye.left + eye.width / 2;
    const eyeCenterY = eye.top + eye.height / 2;

    const deltaX = mouseX - eyeCenterX;
    const deltaY = mouseY - eyeCenterY;
    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);

    const angle = Math.atan2(deltaY, deltaX);
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;

    return { x, y };
  };

  const pupilPosition = calculatePupilPosition();

  return (
    <div
      ref={eyeRef}
      className="rounded-full flex items-center justify-center transition-all duration-150"
      style={{
        width: `${size}px`,
        height: isBlinking ? '2px' : `${size}px`,
        backgroundColor: eyeColor,
        overflow: 'hidden',
      }}
    >
      {!isBlinking && (
        <div
          className="rounded-full"
          style={{
            width: `${pupilSize}px`,
            height: `${pupilSize}px`,
            backgroundColor: pupilColor,
            transform: `translate(${pupilPosition.x}px, ${pupilPosition.y}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        />
      )}
    </div>
  );
};




interface LoginPageProps {
  isModal?: boolean;
  onClose?: () => void;
}

function LoginPage({ isModal = false, onClose }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showJoke, setShowJoke] = useState(false);
  const [mouseX, setMouseX] = useState<number>(0);
  const [mouseY, setMouseY] = useState<number>(0);
  const [isPurpleBlinking, setIsPurpleBlinking] = useState(false);
  const [isBlackBlinking, setIsBlackBlinking] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isLookingAtEachOther, setIsLookingAtEachOther] = useState(false);
  const [isPurplePeeking, setIsPurplePeeking] = useState(false);
  const purpleRef = useRef<HTMLDivElement>(null);
  const blackRef = useRef<HTMLDivElement>(null);
  const yellowRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX);
      setMouseY(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Blinking effect for purple character
  useEffect(() => {
    const getRandomBlinkInterval = () => Math.random() * 4000 + 3000; // Random between 3-7 seconds

    const scheduleBlink = () => {
      const blinkTimeout = setTimeout(() => {
        setIsPurpleBlinking(true);
        setTimeout(() => {
          setIsPurpleBlinking(false);
          scheduleBlink();
        }, 150); // Blink duration 150ms
      }, getRandomBlinkInterval());

      return blinkTimeout;
    };

    const timeout = scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  // Blinking effect for black character
  useEffect(() => {
    const getRandomBlinkInterval = () => Math.random() * 4000 + 3000; // Random between 3-7 seconds

    const scheduleBlink = () => {
      const blinkTimeout = setTimeout(() => {
        setIsBlackBlinking(true);
        setTimeout(() => {
          setIsBlackBlinking(false);
          scheduleBlink();
        }, 150); // Blink duration 150ms
      }, getRandomBlinkInterval());

      return blinkTimeout;
    };

    const timeout = scheduleBlink();
    return () => clearTimeout(timeout);
  }, []);

  // Looking at each other animation when typing starts
  useEffect(() => {
    if (isTyping) {
      setIsLookingAtEachOther(true);
      const timer = setTimeout(() => {
        setIsLookingAtEachOther(false);
      }, 800); // Look at each other for 1.5 seconds, then back to tracking mouse
      return () => clearTimeout(timer);
    } else {
      setIsLookingAtEachOther(false);
    }
  }, [isTyping]);

  // Purple sneaky peeking animation when typing password and it's visible
  useEffect(() => {
    if (password.length > 0 && showPassword) {
      const schedulePeek = () => {
        const peekInterval = setTimeout(() => {
          setIsPurplePeeking(true);
          setTimeout(() => {
            setIsPurplePeeking(false);
          }, 800); // Peek for 800ms
        }, Math.random() * 3000 + 2000); // Random peek every 2-5 seconds
        return peekInterval;
      };

      const firstPeek = schedulePeek();
      return () => clearTimeout(firstPeek);
    } else {
      setIsPurplePeeking(false);
    }
  }, [password, showPassword, isPurplePeeking]);

  const calculatePosition = (ref: React.RefObject<HTMLDivElement | null>) => {
    if (!ref.current) return { faceX: 0, faceY: 0, bodyRotation: 0 };

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 3; // Focus on head area

    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;

    // Face movement (limited range)
    const faceX = Math.max(-15, Math.min(15, deltaX / 20));
    const faceY = Math.max(-10, Math.min(10, deltaY / 30));

    // Body lean (skew for lean while keeping bottom straight) - negative to lean towards mouse
    const bodySkew = Math.max(-6, Math.min(6, -deltaX / 120));

    return { faceX, faceY, bodySkew };
  };

  const purplePos = calculatePosition(purpleRef);
  const blackPos = calculatePosition(blackRef);
  const yellowPos = calculatePosition(yellowRef);
  const orangePos = calculatePosition(orangeRef);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simulate API delay (quick)
    await new Promise(resolve => setTimeout(resolve, 300));

    // Mock authentication - validate against dummy credentials
    if (email === "erik@gmail.com" && password === "1234") {
      console.log("✅ Login successful!");
      alert("Login successful! Welcome, Erik!");
      onClose?.();
    } else {
      setError("Invalid email or password. Please try again.");
      console.log("❌ Login failed");
    }

    setIsLoading(false);
  };

  return (
    <div className={cn(
      isModal 
        ? cn("h-[540px] w-full grid relative text-white", showJoke ? "grid-cols-1" : "md:grid-cols-2") 
        : cn("min-h-screen grid", showJoke ? "grid-cols-1" : "lg:grid-cols-2")
    )}>
      {/* Left Content Section */}
      <div className={cn(
        "relative flex-col justify-between p-10 text-white z-20",
        showJoke
          ? "hidden"
          : isModal 
            ? "hidden md:flex border-r border-white/5 bg-slate-950/40 backdrop-blur-xl" 
            : "hidden lg:flex bg-gradient-to-br from-primary/90 via-primary to-primary/80 text-primary-foreground"
      )}>
        <div className="relative z-20">
          <div className="flex items-center gap-2 text-lg font-semibold">
            <div className="size-8 rounded-lg bg-red-950/40 border border-red-500/20 backdrop-blur-sm flex items-center justify-center">
              <BullLogo className="size-4.5" />
            </div>
            <span>BullTrade</span>
          </div>
        </div>

        <div className="relative z-20 flex items-end justify-center h-[340px]">
          {/* Cartoon Characters */}
          <div className="relative transform scale-[0.8] origin-bottom" style={{ width: '460px', height: '340px' }}>
            {/* Purple character */}
            <div 
              ref={purpleRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: '40px',
                width: '150px',
                height: (isTyping || (password.length > 0 && !showPassword)) ? '360px' : '330px',
                backgroundColor: '#6C3FF5',
                borderRadius: '10px 10px 0 0',
                zIndex: 1,
                transform: showJoke 
                  ? 'skewX(-10deg) translateX(25px)' 
                  : (password.length > 0 && showPassword)
                    ? `skewX(0deg)`
                    : (isTyping || (password.length > 0 && !showPassword))
                      ? `skewX(${(purplePos.bodySkew || 0) - 12}deg) translateX(30px)` 
                      : `skewX(${purplePos.bodySkew || 0}deg)`,
                transformOrigin: 'bottom center',
              }}
            >
              <div 
                className="absolute flex gap-6 transition-all duration-700 ease-in-out"
                style={{
                  left: showJoke ? '60px' : (password.length > 0 && showPassword) ? `${15}px` : isLookingAtEachOther ? `${45}px` : `${35 + purplePos.faceX}px`,
                  top: showJoke ? '50px' : (password.length > 0 && showPassword) ? `${30}px` : isLookingAtEachOther ? `${55}px` : `${35 + purplePos.faceY}px`,
                }}
              >
                <EyeBall 
                  size={16} 
                  pupilSize={6} 
                  maxDistance={4} 
                  eyeColor="white" 
                  pupilColor="#2D2D2D" 
                  isBlinking={isPurpleBlinking}
                  forceLookX={showJoke ? 4 : (password.length > 0 && showPassword) ? (isPurplePeeking ? 3 : -3) : isLookingAtEachOther ? 2 : undefined}
                  forceLookY={showJoke ? 3 : (password.length > 0 && showPassword) ? (isPurplePeeking ? 4 : -3) : isLookingAtEachOther ? 3 : undefined}
                />
                <EyeBall 
                  size={16} 
                  pupilSize={6} 
                  maxDistance={4} 
                  eyeColor="white" 
                  pupilColor="#2D2D2D" 
                  isBlinking={isPurpleBlinking}
                  forceLookX={showJoke ? 4 : (password.length > 0 && showPassword) ? (isPurplePeeking ? 3 : -3) : isLookingAtEachOther ? 2 : undefined}
                  forceLookY={showJoke ? 3 : (password.length > 0 && showPassword) ? (isPurplePeeking ? 4 : -3) : isLookingAtEachOther ? 3 : undefined}
                />
              </div>
            </div>

            {/* Black character */}
            <div 
              ref={blackRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: '185px',
                width: '100px',
                height: '260px',
                backgroundColor: '#2D2D2D',
                borderRadius: '8px 8px 0 0',
                zIndex: 2,
                transform: showJoke 
                  ? 'skewX(12deg) translateX(10px)'
                  : (password.length > 0 && showPassword)
                    ? `skewX(0deg)`
                    : isLookingAtEachOther
                      ? `skewX(${(blackPos.bodySkew || 0) * 1.5 + 10}deg) translateX(15px)`
                      : (isTyping || (password.length > 0 && !showPassword))
                        ? `skewX(${(blackPos.bodySkew || 0) * 1.5}deg)` 
                        : `skewX(${blackPos.bodySkew || 0}deg)`,
                transformOrigin: 'bottom center',
              }}
            >
              <div 
                className="absolute flex gap-5 transition-all duration-700 ease-in-out"
                style={{
                  left: showJoke ? '32px' : (password.length > 0 && showPassword) ? `${8}px` : isLookingAtEachOther ? `${26}px` : `${20 + blackPos.faceX}px`,
                  top: showJoke ? '12px' : (password.length > 0 && showPassword) ? `${24}px` : isLookingAtEachOther ? `${10}px` : `${26 + blackPos.faceY}px`,
                }}
              >
                <EyeBall 
                  size={14} 
                  pupilSize={5} 
                  maxDistance={3} 
                  eyeColor="white" 
                  pupilColor="#2D2D2D" 
                  isBlinking={isBlackBlinking}
                  forceLookX={showJoke ? 3 : (password.length > 0 && showPassword) ? -3 : isLookingAtEachOther ? 0 : undefined}
                  forceLookY={showJoke ? -3 : (password.length > 0 && showPassword) ? -3 : isLookingAtEachOther ? -3 : undefined}
                />
                <EyeBall 
                  size={14} 
                  pupilSize={5} 
                  maxDistance={3} 
                  eyeColor="white" 
                  pupilColor="#2D2D2D" 
                  isBlinking={isBlackBlinking}
                  forceLookX={showJoke ? 3 : (password.length > 0 && showPassword) ? -3 : isLookingAtEachOther ? 0 : undefined}
                  forceLookY={showJoke ? -3 : (password.length > 0 && showPassword) ? -3 : isLookingAtEachOther ? -3 : undefined}
                />
              </div>
            </div>

            {/* Orange character */}
            <div 
              ref={orangeRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: '0px',
                width: '190px',
                height: '160px',
                zIndex: 3,
                backgroundColor: '#FF9B6B',
                borderRadius: '95px 95px 0 0',
                transform: showJoke 
                  ? 'skewX(8deg) translateX(15px)'
                  : (password.length > 0 && showPassword) ? `skewX(0deg)` : `skewX(${orangePos.bodySkew || 0}deg)`,
                transformOrigin: 'bottom center',
              }}
            >
              <div 
                className="absolute flex gap-6 transition-all duration-200 ease-out"
                style={{
                  left: showJoke ? '80px' : (password.length > 0 && showPassword) ? `${40}px` : `${65 + (orangePos.faceX || 0)}px`,
                  top: showJoke ? '60px' : (password.length > 0 && showPassword) ? `${65}px` : `${70 + (orangePos.faceY || 0)}px`,
                }}
              >
                <Pupil size={10} maxDistance={4} pupilColor="#2D2D2D" forceLookX={showJoke ? 4 : (password.length > 0 && showPassword) ? -4 : undefined} forceLookY={showJoke ? 2 : (password.length > 0 && showPassword) ? -3 : undefined} />
                <Pupil size={10} maxDistance={4} pupilColor="#2D2D2D" forceLookX={showJoke ? 4 : (password.length > 0 && showPassword) ? -4 : undefined} forceLookY={showJoke ? 2 : (password.length > 0 && showPassword) ? -3 : undefined} />
              </div>
            </div>

            {/* Yellow character */}
            <div 
              ref={yellowRef}
              className="absolute bottom-0 transition-all duration-700 ease-in-out"
              style={{
                left: '240px',
                width: '110px',
                height: '190px',
                backgroundColor: '#E8D754',
                borderRadius: '55px 55px 0 0',
                zIndex: 4,
                transform: showJoke 
                  ? 'skewX(10deg) translateX(12px)'
                  : (password.length > 0 && showPassword) ? `skewX(0deg)` : `skewX(${yellowPos.bodySkew || 0}deg)`,
                transformOrigin: 'bottom center',
              }}
            >
              <div 
                className="absolute flex gap-5 transition-all duration-200 ease-out"
                style={{
                  left: showJoke ? '40px' : (password.length > 0 && showPassword) ? `${15}px` : `${40 + (yellowPos.faceX || 0)}px`,
                  top: showJoke ? '28px' : (password.length > 0 && showPassword) ? `${32}px` : `${32 + (yellowPos.faceY || 0)}px`,
                }}
              >
                <Pupil size={10} maxDistance={4} pupilColor="#2D2D2D" forceLookX={showJoke ? 4 : (password.length > 0 && showPassword) ? -4 : undefined} forceLookY={showJoke ? 1 : (password.length > 0 && showPassword) ? -4 : undefined} />
                <Pupil size={10} maxDistance={4} pupilColor="#2D2D2D" forceLookX={showJoke ? 4 : (password.length > 0 && showPassword) ? -4 : undefined} forceLookY={showJoke ? 1 : (password.length > 0 && showPassword) ? -4 : undefined} />
              </div>
              <div 
                className="absolute w-16 h-[3px] bg-[#2D2D2D] rounded-full transition-all duration-200 ease-out"
                style={{
                  left: showJoke ? '30px' : (password.length > 0 && showPassword) ? `${8}px` : `${32 + (yellowPos.faceX || 0)}px`,
                  top: showJoke ? '70px' : (password.length > 0 && showPassword) ? `${70}px` : `${70 + (yellowPos.faceY || 0)}px`,
                }}
              />
            </div>
          </div>
        </div>

        <div className="relative z-20 flex items-center gap-6 text-xs text-white/40">
          <a href="#" className="hover:text-white transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Support
          </a>
        </div>

        <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:16px_16px] pointer-events-none" />
      </div>

      {/* Right Login / Prank Section */}
      {showJoke ? (
        <div className="flex flex-col items-center justify-center p-4 bg-white relative z-10 w-full h-full overflow-hidden select-none text-center">
          {isModal && onClose && (
            <button
              aria-label="Close authentication modal"
              onClick={onClose}
              className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-lg border border-black/15 bg-black/5 text-black hover:bg-black/10 z-50 cursor-pointer"
              type="button"
            >
              <X className="size-4" />
            </button>
          )}

          {/* 404 Text centered at the top, same height as close button */}
          <h1 className="absolute top-4 left-1/2 -translate-x-1/2 text-black text-6xl sm:text-7xl font-extrabold select-none z-20">
            404
          </h1>

          {/* Centered Walking GIF container (Larger size) */}
          <div
            className="w-full max-w-[480px] h-[270px] bg-[url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)] bg-center bg-no-repeat bg-contain relative z-0 mt-6"
            aria-hidden="true"
          />

          {/* Content section below the GIF */}
          <div className="relative z-10 flex flex-col items-center justify-center mt-[-6px]">
            <h3 className="text-2xl font-bold text-black select-none">
              Haha got u
            </h3>

            <Button
              type="button"
              onClick={() => setShowJoke(false)}
              className="bg-black hover:bg-zinc-800 text-white font-semibold rounded-lg px-4 py-1.5 text-xs cursor-pointer shadow-sm border border-black/5 w-fit h-auto min-h-0 mt-5"
              size="sm"
            >
              back to signup
            </Button>
          </div>
        </div>
      ) : (
        <div className={cn(
          "flex items-center justify-center p-8 bg-background relative z-10",
          isModal && "bg-[#090d16] md:bg-[#070b13]/96"
        )}>
          {isModal && onClose && (
            <button
              aria-label="Close authentication modal"
              onClick={onClose}
              className="absolute right-4 top-4 inline-flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white z-50 cursor-pointer"
              type="button"
            >
              <X className="size-4" />
            </button>
          )}

          <div className="w-full max-w-[340px]">
            {/* Mobile Logo */}
            <div className="md:hidden flex items-center justify-center gap-2 text-lg font-semibold mb-8">
              <div className="size-8 rounded-lg bg-red-950/40 border border-red-500/20 flex items-center justify-center">
                <BullLogo className="size-4.5" />
              </div>
              <span>BullTrade</span>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold tracking-tight text-white mb-1.5">Welcome back</h1>
              <p className="text-slate-400 text-xs">Access your real-time analytics dashboard</p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs font-semibold text-slate-300">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="anna@gmail.com"
                  value={email}
                  autoComplete="off"
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsTyping(true)}
                  onBlur={() => setIsTyping(false)}
                  required
                  className="h-10 bg-white/[0.03] border-white/10 focus:border-cyan-200/50 text-white rounded-lg placeholder:text-slate-600"
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-xs font-semibold text-slate-300">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="h-10 pr-10 bg-white/[0.03] border-white/10 focus:border-cyan-200/50 text-white rounded-lg placeholder:text-slate-600"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between py-1">
                <div className="flex items-center space-x-2">
                  <Checkbox id="remember" className="border-white/20 data-[state=checked]:bg-cyan-200 data-[state=checked]:text-black" />
                  <Label
                    htmlFor="remember"
                    className="text-xs font-normal text-slate-400 cursor-pointer"
                  >
                    Remember me
                  </Label>
                </div>
                <a
                  href="#"
                  className="text-xs text-cyan-200 hover:underline font-semibold"
                >
                  Forgot?
                </a>
              </div>

              {error && (
                <div className="p-2.5 text-xs text-rose-300 bg-rose-950/20 border border-rose-900/30 rounded-lg">
                  {error}
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full h-10 text-sm font-semibold bg-cyan-200 hover:bg-cyan-100 text-slate-950 transition-colors rounded-lg cursor-pointer"
                size="default" 
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Log in"}
              </Button>
            </form>

            {/* Social Login */}
            <div className="mt-4">
              <Button 
                variant="outline" 
                className="w-full h-10 bg-white/[0.03] border-white/10 hover:bg-white/5 hover:text-white text-slate-300 text-xs rounded-lg cursor-pointer"
                type="button"
              >
                <Mail className="mr-2 size-4" />
                Log in with Google
              </Button>
            </div>

            {/* Sign Up Link */}
            <div className="text-center text-xs text-slate-400 mt-6">
              Don't have an account?{" "}
              <a href="/signup" className="text-cyan-200 font-semibold hover:underline">
                Sign Up
              </a>
            </div>

            {/* Skip for now Easter Egg Link */}
            <div className="text-center mt-3 border-t border-white/5 pt-3">
              <button
                type="button"
                onClick={() => setShowJoke(true)}
                className="text-xs text-slate-500 hover:text-cyan-200 transition-colors font-medium cursor-pointer"
              >
                Skip for now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export const Component = LoginPage;
