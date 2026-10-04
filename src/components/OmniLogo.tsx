import React from 'react';

interface OmniLogoProps {
  variant?: 'default' | 'light' | 'dark' | 'mono' | 'animated' | 'icon-only';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  accentColor?: string;
}

export const OmniLogo: React.FC<OmniLogoProps> = ({
  variant = 'default',
  size = 'md',
  accentColor = '#2563EB',
}) => {
  const dimensions = {
    sm: 24,
    md: 32,
    lg: 44,
    xl: 64,
  }[size];

  const isAnimated = variant === 'animated';
  const strokeMain =
    variant === 'light'
      ? '#0F172A'
      : variant === 'dark'
      ? '#F8FAFC'
      : variant === 'mono'
      ? 'currentColor'
      : accentColor;

  const strokeSecondary =
    variant === 'mono' ? 'currentColor' : variant === 'light' ? '#334155' : '#94A3B8';

  return (
    <div className="inline-flex items-center gap-2.5 select-none">
      <svg
        width={dimensions}
        height={dimensions}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={isAnimated ? 'animate-spin' : ' shrink-0'}
        aria-label="OMNI Continuous Global Symbol"
      >
        {/* Outer continuous orbital ring representing global business & infinite automation */}
        <circle
          cx="32"
          cy="32"
          r="26"
          stroke={strokeMain}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="124 38"
        />
        {/* Inner intersecting Mobius/Equatorial loop representing AI intelligence & agent synergy */}
        <path
          d="M16 32C16 23.1634 23.1634 16 32 16C40.8366 16 48 23.1634 48 32C48 40.8366 40.8366 48 32 48"
          stroke={strokeSecondary}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        {/* Continuous cross-axis intelligence nexus */}
        <path
          d="M21 32C21 26.5 25.8 22 32 22C38.2 22 43 26.5 43 32C43 37.5 38.2 42 32 42C25.8 42 21 37.5 21 32Z"
          stroke={strokeMain}
          strokeWidth="2.5"
        />
        {/* Central core node */}
        <circle cx="32" cy="32" r="4.5" fill={strokeMain} />
        <circle cx="51" cy="14" r="3" fill={strokeMain} />
      </svg>
      {variant !== 'icon-only' && (
        <span className="font-display font-bold tracking-tight text-lg leading-none">
          OMNI
        </span>
      )}
    </div>
  );
};
