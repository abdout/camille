import React from 'react';

interface LoadingProps {
  message?: string;
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({ 
  message = "Loading...", 
  className = "" 
}) => {
  return (
    <div className={`fixed inset-0 bg-[#141414] flex flex-col items-center justify-center z-50 ${className}`}>
      <div className="relative">
        {/* Animated spinner */}
        <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin mb-4"></div>
        
        {/* Loading text */}
        <div className="text-white text-xl font-light tracking-wide">
          {message}
        </div>
        
        {/* Animated dots */}
        <div className="flex space-x-1 mt-2 justify-center">
          <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '0ms' }}></div>
          <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '150ms' }}></div>
          <div className="w-1 h-1 bg-white/60 rounded-full animate-pulse" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}; 