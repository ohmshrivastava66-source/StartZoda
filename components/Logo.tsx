
import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
}

export const Logo: React.FC<LogoProps> = ({ className = "", size = 32 }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background shape of the 'Z' part 1 */}
      <path 
        d="M25 25H65C70 25 75 30 75 35V45H25L25 25Z" 
        fill="currentColor" 
      />
      {/* Background shape of the 'Z' part 2 */}
      <path 
        d="M35 75H75V55H25C25 60 25 65 30 70C35 75 35 75 35 75Z" 
        fill="currentColor" 
      />
      {/* The Arrow part */}
      <path 
        d="M35 80L80 20M80 20V45M80 20H55" 
        stroke="currentColor" 
        strokeWidth="12" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
};
