'use client';

import React, { useState, useRef } from 'react';
import { Play, Pause } from 'lucide-react';
import { RevealZoom } from '../animations/ScrollReveal';

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);

  const togglePlayPause = () => {
    if (!videoRef.current) return;

    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // Scalloped / serrated badge border SVG path generator
  const createScallopPath = (cx: number, cy: number, r1: number, r2: number, numPoints: number) => {
    let d = '';
    const step = (Math.PI * 2) / (numPoints * 2);
    for (let i = 0; i < numPoints * 2; i++) {
      const r = i % 2 === 0 ? r1 : r2;
      const angle = i * step - Math.PI / 2;
      const x = cx + r * Math.cos(angle);
      const y = cy + r * Math.sin(angle);
      d += (i === 0 ? 'M' : 'L') + ` ${x.toFixed(2)},${y.toFixed(2)}`;
    }
    return d + ' Z';
  };

  const scallopPathD = createScallopPath(100, 100, 95, 89, 36);

  return (
    <section className="relative w-full h-[70vh] min-h-[480px] sm:min-h-[540px] flex items-center justify-center overflow-hidden bg-[#050505]">
      
      {/* Background MP4 Video (assets/videos/hero_section_video.mp4) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          style={{
            filter: 'brightness(92%) contrast(105%)'
          }}
        >
          <source src="/assets/videos/hero_section_video.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Light Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-[#070707]/60 pointer-events-none" />

      {/* Centered Circular STAY TUNED / PLAY-PAUSE Badge */}
      <div className="relative z-20 flex items-center justify-center text-center">
        
        <RevealZoom className="relative group cursor-pointer">
          {/* Interactive Badge Button */}
          <button
            type="button"
            onClick={togglePlayPause}
            aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
            className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center transition-transform duration-500 group-hover:scale-105 focus:outline-none"
          >
            
            {/* SVG Scalloped Border + Rotating Circular Text */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 200 200">
              {/* Scalloped Gold Outer Border */}
              <path
                d={scallopPathD}
                fill="none"
                stroke="#f0ab44"
                strokeWidth="1.2"
                className="opacity-85 group-hover:opacity-100 transition-opacity duration-300"
              />

              {/* Text Path Circle */}
              <path
                id="circleTextPath"
                d="M 100, 100 m -67, 0 a 67,67 0 1,1 134,0 a 67,67 0 1,1 -134,0"
                fill="none"
              />

              {/* Rotating "STAY TUNED • STAY TUNED • STAY TUNED •" Text */}
              <g className="animate-[spin_25s_linear_infinite] origin-center">
                <text className="text-[12.5px] font-mono tracking-[0.27em] fill-[#f0ab44] font-bold uppercase">
                  <textPath href="#circleTextPath" startOffset="0%">
                    STAY TUNED • STAY TUNED • STAY TUNED •
                  </textPath>
                </text>
              </g>
            </svg>

            {/* Inner Center Solid Dark Circle with Gold Play/Pause Icon */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#050505] border border-[#f0ab44]/40 flex items-center justify-center shadow-2xl group-hover:border-[#f0ab44] transition-colors duration-300 z-10">
              {isPlaying ? (
                <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-[#f0ab44] text-[#f0ab44] group-hover:scale-110 transition-transform duration-300" />
              ) : (
                <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-[#f0ab44] text-[#f0ab44] ml-0.5 group-hover:scale-110 transition-transform duration-300" />
              )}
            </div>

          </button>
        </RevealZoom>

      </div>

    </section>
  );
}
