interface WaveDividerProps {
  flip?: boolean;
  className?: string;
}

export const WaveDivider = ({ flip = false, className = "" }: WaveDividerProps) => {
  return (
    <div
      className={`w-full overflow-hidden leading-none ${flip ? "rotate-180" : ""} ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="w-full h-[60px] sm:h-[80px] md:h-[100px]"
      >
        <defs>
          <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(43 80% 70%)" stopOpacity="0.15" />
            <stop offset="50%" stopColor="hsl(43 72% 55%)" stopOpacity="0.25" />
            <stop offset="100%" stopColor="hsl(43 60% 40%)" stopOpacity="0.15" />
          </linearGradient>
        </defs>
        <path
          d="M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z"
          fill="hsl(var(--card) / 0.5)"
        >
          <animate
            attributeName="d"
            dur="8s"
            repeatCount="indefinite"
            values="
              M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z;
              M0,60 C240,20 480,100 720,60 C960,20 1200,100 1440,60 L1440,120 L0,120 Z;
              M0,60 C240,100 480,20 720,60 C960,100 1200,20 1440,60 L1440,120 L0,120 Z
            "
          />
        </path>
        <path
          d="M0,80 C360,110 720,40 1080,80 C1260,100 1380,60 1440,80 L1440,120 L0,120 Z"
          fill="url(#waveGrad)"
        >
          <animate
            attributeName="d"
            dur="6s"
            repeatCount="indefinite"
            values="
              M0,80 C360,110 720,40 1080,80 C1260,100 1380,60 1440,80 L1440,120 L0,120 Z;
              M0,80 C360,40 720,110 1080,80 C1260,60 1380,100 1440,80 L1440,120 L0,120 Z;
              M0,80 C360,110 720,40 1080,80 C1260,100 1380,60 1440,80 L1440,120 L0,120 Z
            "
          />
        </path>
      </svg>
    </div>
  );
};
