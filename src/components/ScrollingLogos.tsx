'use client';

import { useEffect, useState } from 'react';

const logos = [
  { name: 'League of Legends', src: '/logos/lol.png', alt: 'LoL' },
  { name: 'Valorant', src: '/logos/valorant.png', alt: 'Valorant' },
  { name: 'Chess', src: '/logos/chess.png', alt: 'Chess' },
  { name: 'PGA Tour', src: '/logos/pga.png', alt: 'PGA Tour' },
  { name: 'CS:GO', src: '/logos/csgo.png', alt: 'CS:GO' },
  { name: 'Overwatch', src: '/logos/overwatch.png', alt: 'Overwatch' },
  { name: 'Rocket League', src: '/logos/rocket-league.png', alt: 'Rocket League' },
  { name: 'Tennis', src: '/logos/tennis.png', alt: 'Tennis' },
  { name: 'Basketball', src: '/logos/basketball.png', alt: 'Basketball' },
  { name: 'Soccer', src: '/logos/soccer.png', alt: 'Soccer' },
];

export function ScrollingLogos() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Start animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative overflow-hidden h-16 mb-6">
      {/* Background scrolling logos */}
      <div 
        className={`absolute inset-0 flex items-center transition-opacity duration-1000 ${
          isVisible ? 'opacity-20' : 'opacity-0'
        }`}
      >
        <div className="flex animate-scroll">
          {/* First set of logos */}
          {logos.map((logo, index) => (
            <div
              key={`first-${index}`}
              className="flex-shrink-0 mx-8 flex items-center justify-center"
            >
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-xs font-semibold text-gray-600 dark:text-gray-400">
                {logo.alt}
              </div>
            </div>
          ))}
          {/* Duplicate set for seamless loop */}
          {logos.map((logo, index) => (
            <div
              key={`second-${index}`}
              className="flex-shrink-0 mx-8 flex items-center justify-center"
            >
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center text-xs font-semibold text-gray-600 dark:text-gray-400">
                {logo.alt}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Foreground content (tagline) */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm px-6 py-2 rounded-full">
          <p className="text-xl text-gray-600 dark:text-gray-300 font-medium">
            See how good you really are—everywhere.
          </p>
        </div>
      </div>
    </div>
  );
} 