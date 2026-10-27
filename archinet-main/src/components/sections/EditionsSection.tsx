
'use client';

import React, { useState } from 'react';
import { EDITIONS_DATA, Edition } from '../../data';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
  Play,
  Maximize2,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RevealTitle,
  RevealUp,
  RevealZoom,
} from '../animations/ScrollReveal';
import { MetadataField } from '../../types/metadata';
import {
  getField,
  getFieldValue,
  getCardJsonData,
} from '../../utils/metadata';

function EditionVideo({
  src,
  isCenter,
}: {
  src?: string;
  isCenter: boolean;
}) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const videoSrc =
    src && src.trim().length > 0 ? src.trim() : undefined;

  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isCenter) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [isCenter]);

  if (!videoSrc) {
    return <div className="w-full h-full bg-black/60" />;
  }

  return (
    <video
      ref={videoRef}
      src={videoSrc}
      loop
      muted
      playsInline
      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105 pointer-events-none"
    />
  );
}

interface EditionsSectionProps {
  data?: MetadataField[];
}

export default function EditionsSection({
  data,
}: EditionsSectionProps) {
  const eyebrow =
    getFieldValue(data, 'section_label', 'eyebrow', 'label') ||
    'PREVIOUS EDITIONS';

  const rawTitle = getFieldValue(data, 'title');

  const isDefaultOrOldTitle =
    !rawTitle ||
    rawTitle.toLowerCase().includes('built over time');

  const description1 =
    getFieldValue(data, 'description', 'description_1', 'intro_1') ||
    'Every Archinet edition brings participating manufacturing brands and architecture and interior-design professionals together in a curated environment designed for product discovery, networking and professional engagement.';

  const description2Val = getFieldValue(
    data,
    'description_2',
    'subtitle',
    'intro_2'
  );

  const description2 =
    description2Val &&
    description2Val !==
      'FROM ONE IDEA TO A CURATED DESIGN NETWORK'
      ? description2Val
      : 'Explore moments from our previous editions, including brand showcases, product displays and conversations between the people shaping the architecture and design industry.';

  const renderTitle = () => {
    if (isDefaultOrOldTitle) {
      return (
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#E8E1D5] font-normal tracking-tight leading-tight">
          A Look Back at{' '}
          <span className="editorial-italic italic font-serif !text-[#D9BC78]">
            Archinet.
          </span>
        </h2>
      );
    }

    if (rawTitle && /archinet\.?/i.test(rawTitle)) {
      const parts = rawTitle.split(/archinet\.?/i);

      return (
        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#E8E1D5] font-normal tracking-tight leading-tight">
          {parts[0]}
          <span className="editorial-italic italic font-serif !text-[#D9BC78]">
            Archinet.
          </span>
          {parts[1] || ''}
        </h2>
      );
    }

    return (
      <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#E8E1D5] font-normal tracking-tight leading-tight whitespace-pre-line">
        {rawTitle}
      </h2>
    );
  };

  // Dynamic edition cards from Metadata Master
  const editionField = getField(
    data,
    'edition',
    'editions',
    'edition_details',
    'edition_list'
  );

  const editionCardData =
    getCardJsonData<Record<string, string>>(editionField);

  let dynamicEditions: Edition[] = [];

  if (editionCardData.length > 0) {
    dynamicEditions = editionCardData
      .map((item, idx) => {
        const fallback =
          EDITIONS_DATA[idx % EDITIONS_DATA.length];

        return {
          id: `edition-${idx + 1}`,
          number:
            item.edition ||
            item.number ||
            item.title ||
            fallback.number,
          city: item.city || fallback.city,
          venue: item.venue || fallback.venue,
          date: item.date || fallback.date,
          year: item.year || fallback.year || '',
          video: item.video || fallback.video,
          referenceUrl:
            item.instagram_link ||
            item.instagramLink ||
            item.referenceUrl ||
            item.reference_url ||
            fallback.referenceUrl,
        };
      })
      .filter((edition) => edition.venue || edition.city || edition.video);
  }

  // Fallback to individual edition keys
  if (dynamicEditions.length === 0) {
    const editionKeys = [
      'edition_9',
      'edition_10',
      'edition_11',
      'edition_12',
      'edition_13',
    ];

    editionKeys.forEach((key, idx) => {
      const field = getField(data, key);
      const cardData =
        getCardJsonData<Record<string, string>>(field);

      if (cardData && cardData.length > 0) {
        const item = cardData[0];

        if (item.video || item.city || item.venue) {
          const fallback =
            EDITIONS_DATA[idx % EDITIONS_DATA.length];

          dynamicEditions.push({
            id: key.replace('_', '-'),
            number:
              item.number ||
              item.title ||
              item.edition ||
              fallback.number,
            city: item.city || fallback.city,
            venue: item.venue || fallback.venue,
            date: item.date || fallback.date,
            year: item.year || fallback.year,
            video: item.video || fallback.video,
            referenceUrl:
              item.referenceUrl ||
              item.reference_url ||
              item.instagram_link ||
              fallback.referenceUrl,
          });
        }
      }
    });
  }

  const editions =
    dynamicEditions.length > 0
      ? dynamicEditions
      : EDITIONS_DATA;

  const [activeIndex, setActiveIndex] = useState(
    editions.length > 2 ? 2 : 0
  );

  const [selectedEdition, setSelectedEdition] =
    useState<Edition | null>(null);

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? editions.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === editions.length - 1 ? 0 : prev + 1
    );
  };

  const getIndices = () => {
    const len = editions.length;

    if (len === 0) {
      return { prev: 0, active: 0, next: 0 };
    }

    const prev = (activeIndex - 1 + len) % len;
    const next = (activeIndex + 1) % len;

    return {
      prev,
      active: activeIndex,
      next,
    };
  };

  const { prev, active, next } = getIndices();

  // Drag / swipe gesture
  const handleDragEnd = (
    _: any,
    info: { offset: { x: number } }
  ) => {
    if (info.offset.x < -50) {
      handleNext();
    } else if (info.offset.x > 50) {
      handlePrev();
    }
  };

  return (
    <section
      id="editions"
      className="relative z-10 w-full bg-black text-[#AAA59B] font-sans overflow-hidden"
    >
      {/* Main Content */}
      <div className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center">
        {/* Section Heading */}
        <div className="text-center mb-10 sm:mb-14 max-w-3xl mx-auto flex flex-col items-center">
          <RevealTitle>
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-px bg-[#D9BC78]/50" />

              <span className="text-xs font-sans text-[#D9BC78] tracking-[0.25em] uppercase font-semibold">
                {eyebrow}
              </span>

              <span className="w-8 h-px bg-[#D9BC78]/50" />
            </div>
          </RevealTitle>

          <RevealTitle>{renderTitle()}</RevealTitle>

          <RevealUp delay={0.15}>
            <div className="flex flex-col gap-3 mt-4 sm:mt-5 max-w-2xl mx-auto">
              <p className="text-xs sm:text-sm font-sans text-[#AAA59B] leading-relaxed font-normal">
                {description1}
              </p>

              {description2 && (
                <p className="text-xs sm:text-sm font-sans text-[#AAA59B]/80 leading-relaxed font-normal">
                  {description2}
                </p>
              )}
            </div>
          </RevealUp>
        </div>

        {/* Edition Carousel */}
        <RevealZoom
          delay={0.2}
          className="relative w-full flex flex-col items-center overflow-x-hidden"
        >
          <div className="relative w-full flex items-center justify-center py-6 sm:py-8 lg:py-10 min-h-[480px] sm:min-h-[600px] lg:min-h-[460px]">
            {/* Previous Edition Button */}
            <button
              type="button"
              onClick={handlePrev}
              className="absolute left-1 sm:left-4 lg:left-10 xl:left-16 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-13 sm:h-13 rounded-full border border-[#D9BC78]/60 hover:border-[#D9BC78] bg-[#090909]/90 text-[#D9BC78] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
              aria-label="Previous edition"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]" />
            </button>

            {/* Next Edition Button */}
            <button
              type="button"
              onClick={handleNext}
              className="absolute right-1 sm:right-4 lg:left-auto lg:right-10 xl:right-16 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-13 sm:h-13 rounded-full border border-[#D9BC78]/60 hover:border-[#D9BC78] bg-[#090909]/90 text-[#D9BC78] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl cursor-pointer"
              aria-label="Next edition"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.75]" />
            </button>

            {/* Carousel Cards */}
            <motion.div
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              className="flex items-center justify-center -space-x-12 sm:-space-x-20 lg:-space-x-16 xl:-space-x-20 w-full max-w-6xl lg:max-w-[1150px] xl:max-w-[1250px] px-0 sm:px-12"
            >
              {[prev, active, next].map(
                (itemIndex, positionIdx) => {
                  const isCenter = positionIdx === 1;
                  const edition = editions[itemIndex];

                  if (!edition) return null;

                  return (
                    <motion.div
                      key={`${edition.id}-${itemIndex}`}
                      layout
                      initial={false}
                      animate={{
                        opacity: isCenter ? 1 : 0.45,
                        scale: isCenter ? 1 : 0.92,
                        filter: isCenter
                          ? 'brightness(1)'
                          : 'brightness(0.75)',
                      }}
                      transition={{
                        layout: {
                          duration: 0.75,
                          ease: [0.16, 1, 0.3, 1],
                        },
                        scale: {
                          duration: 0.75,
                          ease: [0.16, 1, 0.3, 1],
                        },
                        opacity: {
                          duration: 0.55,
                          ease: [0.16, 1, 0.3, 1],
                        },
                        filter: { duration: 0.55 },
                      }}
                      onClick={() => {
                        if (!isCenter) {
                          setActiveIndex(itemIndex);
                        } else {
                          setSelectedEdition(edition);
                        }
                      }}
                      className={[
                        'shrink-0 cursor-pointer select-none rounded-[20px] overflow-hidden relative group/card',
                        isCenter
                          ? 'w-[74vw] max-w-[310px] sm:w-[490px] lg:w-[380px] xl:w-[390px] bg-[#080808] border border-[#D9BC78]/50 shadow-[0_0_40px_rgba(217,188,120,0.10)] p-3 sm:p-5 z-20 relative'
                          : 'w-[70vw] max-w-[285px] sm:w-[460px] lg:w-[350px] xl:w-[360px] bg-[#0a0a0a] border border-white/10 p-3 sm:p-5 hover:opacity-75 z-10 relative',
                      ].join(' ')}
                    >
                      {/* Video */}
                      <div className="relative w-full h-[220px] sm:h-[300px] lg:h-[280px] xl:h-[300px] rounded-xl overflow-hidden bg-black/60">
                        <EditionVideo
                          src={edition.video}
                          isCenter={isCenter}
                        />

                        {/* Play Overlay */}
                        {isCenter && (
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2 pointer-events-none">
                            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#D9BC78] text-black flex items-center justify-center shadow-2xl transform scale-90 group-hover/card:scale-100 transition-transform">
                              <Play className="w-6 h-6 fill-black translate-x-0.5" />
                            </div>

                            <span className="text-[10px] font-sans text-[#E8E1D5] tracking-widest uppercase bg-black/70 px-2.5 py-1 rounded-full border border-white/20 backdrop-blur-md">
                              WATCH FULLSCREEN
                            </span>
                          </div>
                        )}

                        {/* Location Badge */}
                        <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1 bg-[#17140e]/95 border border-[#D9BC78]/50 text-[#D9BC78] rounded-full text-xs font-sans tracking-wider uppercase shadow-md">
                          <MapPin className="w-3 h-3" />
                          <span>{edition.city}</span>
                        </div>
                      </div>

                      {/* Edition Details */}
                      <div className="mt-4 px-1">
                        <h3 className="font-serif text-xl sm:text-2xl lg:text-2xl text-[#E8E1D5] font-medium tracking-tight truncate flex items-center justify-between">
                          <span>{edition.venue}</span>

                          {isCenter && (
                            <Maximize2 className="w-4 h-4 text-[#D9BC78] opacity-70 group-hover/card:opacity-100 transition-opacity" />
                          )}
                        </h3>

                        <div className="flex items-center justify-between gap-4 mt-2.5 pt-2.5 border-t border-white/[0.08] text-xs sm:text-sm font-sans text-[#AAA59B]">
                          <span className="text-[#D9BC78] font-sans text-[10px] sm:text-xs font-semibold tracking-[0.08em] uppercase truncate">
                            {edition.number}
                          </span>

                          <span className="text-[#D9BC78] font-sans text-xs flex items-center gap-1.5 shrink-0">
                            <Calendar className="w-3.5 h-3.5" />
                            {edition.date}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                }
              )}
            </motion.div>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-6 sm:mt-10">
            {editions.map((edition, idx) => (
              <button
                key={`${edition.id}-${idx}`}
                type="button"
                onClick={() => setActiveIndex(idx)}
                className={`transition-all duration-500 cursor-pointer ${
                  activeIndex === idx
                    ? 'w-7 h-2 bg-[#D9BC78] rounded-full'
                    : 'w-2 h-2 bg-white/20 hover:bg-white/40 rounded-full'
                }`}
                aria-label={`Go to ${edition.venue}`}
              />
            ))}
          </div>
        </RevealZoom>
      </div>

      {/* Fullscreen Edition Modal */}
      <AnimatePresence>
        {selectedEdition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4 pt-[90px] pb-6 select-none"
            onClick={() => setSelectedEdition(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 300,
              }}
              className="relative w-full max-w-[420px] h-[calc(100vh-110px)] max-h-[800px] bg-black border border-[#D9BC78]/50 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(217,188,120,0.2)] flex flex-col justify-between"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Fullscreen Video */}
              {selectedEdition.video ? (
                <video
                  src={selectedEdition.video}
                  controls
                  autoPlay
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover z-0"
                />
              ) : (
                <div className="absolute inset-0 w-full h-full bg-black z-0" />
              )}

              {/* Modal Header */}
              <div className="relative z-10 bg-gradient-to-b from-black/95 via-black/60 to-transparent p-4 sm:p-5 flex items-center justify-between border-b border-white/10">
                <div>
                  <span className="text-[10px] font-sans text-[#D9BC78] tracking-widest uppercase block mb-0.5 font-medium">
                    {selectedEdition.number} · {selectedEdition.city}
                  </span>

                  <h3 className="font-serif text-lg sm:text-xl text-[#E8E1D5] font-medium leading-snug drop-shadow-md">
                    {selectedEdition.venue}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedEdition(null)}
                  className="w-9 h-9 rounded-full border border-white/30 hover:border-[#D9BC78] text-[#E8E1D5] hover:text-[#D9BC78] flex items-center justify-center bg-black/60 backdrop-blur-md cursor-pointer transition-all active:scale-95 shadow-xl"
                  aria-label="Close video player"
                >
                  <X className="w-5 h-5 stroke-[2]" />
                </button>
              </div>

              {/* Modal Footer */}
              <div className="relative z-10 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-4 sm:p-5 flex flex-col gap-2 border-t border-white/10">
                <div className="flex items-center justify-between gap-4 text-[10px] font-sans text-[#D9BC78]">
                  <span>
                    {selectedEdition.city} · {selectedEdition.venue}
                  </span>

                  <span className="bg-black/60 px-2.5 py-0.5 rounded-full border border-[#D9BC78]/40">
                    {selectedEdition.date}
                  </span>
                </div>

                {selectedEdition.referenceUrl && (
                  <a
                    href={selectedEdition.referenceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="pt-2 border-t border-white/15 text-[10px] font-sans text-[#E8E1D5]/80 hover:text-[#D9BC78] tracking-widest uppercase transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    View Reference Reel ↗
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
