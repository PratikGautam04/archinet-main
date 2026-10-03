'use client';

import React, { useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { RevealZoom } from '../animations/ScrollReveal';

const createScallopPath = (
  cx: number,
  cy: number,
  outerRadius: number,
  innerRadius: number,
  points: number,
) => {
  const step = (Math.PI * 2) / (points * 2);
  let path = '';

  for (let i = 0; i < points * 2; i += 1) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = i * step - Math.PI / 2;
    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);

    path += `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)},${y.toFixed(2)}`;
  }

  return `${path} Z`;
};

export default function Archinet2026VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const scallopPath = createScallopPath(100, 100, 95, 89, 36);

  const togglePlayback = () => {
    const video = videoRef.current;

    if (!video) return;

    // PLAY
    if (video.paused) {
      video.muted = false;
      video.volume = 1;

      void video
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error('Video playback failed:', error);
        });

      return;
    }

    // PAUSE
    video.pause();
    setIsPlaying(false);
  };

  const handleVideoClick = () => {
    const video = videoRef.current;

    if (!video) return;

    // Only pause when the video is currently playing.
    // The play button handles starting/resuming playback.
    if (!video.paused) {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section
      id="archinet-2026-video"
      aria-label="Archinet 2026 event film"
      className="relative isolate flex h-[62vh] min-h-[460px] w-full items-center justify-center overflow-hidden bg-[#050505] sm:h-[68vh] sm:min-h-[520px] lg:h-[74vh] lg:min-h-[580px]"
    >
      {/* VIDEO */}
      <div
        className="absolute inset-0 cursor-pointer"
        onClick={handleVideoClick}
        role="button"
        tabIndex={0}
        aria-label={isPlaying ? 'Pause Archinet 2026 video' : 'Play Archinet 2026 video'}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            togglePlayback();
          }
        }}
      >
        <video
          ref={videoRef}
          loop
          playsInline
          preload="metadata"
          controls={false}
          className="h-full w-full object-cover"
          style={{
            filter: 'brightness(0.78) contrast(1.04) saturate(0.92)',
          }}
        >
          <source
            src="/assets/videos/archinet-2026-final.mp4"
            type="video/mp4"
          />
        </video>
      </div>

      {/* OVERLAYS */}
      <div className="pointer-events-none absolute inset-0 bg-black/20" />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#050505]/75 via-black/10 to-[#050505]/85" />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_18%,rgba(5,5,5,0.55)_100%)]" />

      {/* PLAY BUTTON */}
      {!isPlaying && (
        <RevealZoom className="relative z-10">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              togglePlayback();
            }}
            aria-label="Play Archinet 2026 video"
            className="group relative flex h-48 w-48 items-center justify-center rounded-full outline-none transition-transform duration-500 hover:scale-[1.04] focus-visible:ring-2 focus-visible:ring-[#f0ab44] sm:h-56 sm:w-56 lg:h-64 lg:w-64"
          >
            <svg
              viewBox="0 0 200 200"
              className="absolute inset-0 h-full w-full"
              aria-hidden="true"
            >
              <path
                d={scallopPath}
                fill="rgba(5,5,5,0.12)"
                stroke="#f0ab44"
                strokeWidth="1.2"
              />

              <path
                id="archinet2026CircleText"
                d="M 100,100 m -67,0 a 67,67 0 1,1 134,0 a 67,67 0 1,1 -134,0"
                fill="none"
              />

              <g className="origin-center animate-[spin_24s_linear_infinite]">
                <text className="fill-[#f0ab44] font-sans text-[12px] font-bold uppercase tracking-[0.28em]">
                  <textPath
                    href="#archinet2026CircleText"
                    startOffset="0%"
                  >
                    ARCHINET 2026 • STAY TUNED • ARCHINET 2026 •
                  </textPath>
                </text>
              </g>
            </svg>

            {/* PLAY ICON */}
            <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-[#f0ab44]/50 bg-[#050505] shadow-[0_8px_30px_rgba(0,0,0,0.45)] transition-colors group-hover:border-[#f0ab44] sm:h-16 sm:w-16">
              <Play className="ml-0.5 h-5 w-5 fill-[#f0ab44] text-[#f0ab44]" />
            </span>
          </button>
        </RevealZoom>
      )}
    </section>
  );
}