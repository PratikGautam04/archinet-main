
'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

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
import { EDITIONS_DATA, Edition } from '../../data';

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

interface EditionsSectionProps {
  data?: MetadataField[];
}

interface EditionMetadata {
  [key: string]: string | undefined;
  id?: string;
  edition?: string;
  number?: string;
  title?: string;
  city?: string;
  venue?: string;
  date?: string;
  year?: string;
  video?: string;
  instagram_link?: string;
  instagramLink?: string;
  referenceUrl?: string;
  reference_url?: string;
}

type VisiblePosition = 'left' | 'center' | 'right';

interface VisibleEdition {
  edition: Edition;
  position: VisiblePosition;
  index: number;
}

function EditionVideo({
  src,
  isCenter,
}: {
  src?: string;
  isCenter: boolean;
}) {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    if (isCenter) {
      void video.play().catch(() => {
        // Autoplay can be blocked by the browser.
      });
    } else {
      video.pause();
    }
  }, [isCenter, src]);

  if (!src?.trim()) {
    return <div className="h-full w-full bg-black/60" />;
  }

  return (
    <video
      ref={videoRef}
      src={src.trim()}
      loop
      muted
      playsInline
      preload="metadata"
      className="pointer-events-none h-full w-full object-cover"
    />
  );
}

export default function EditionsSection({
  data,
}: EditionsSectionProps) {
  const eyebrow =
    getFieldValue(data, 'section_label', 'eyebrow', 'label') ||
    'PREVIOUS EDITIONS';

  const rawTitle = getFieldValue(data, 'title');

  const description1 =
    getFieldValue(data, 'description', 'description_1', 'intro_1') ||
    'Every Archinet edition brings participating manufacturing brands and architecture and interior-design professionals together in a curated environment designed for product discovery, networking and professional engagement.';

  const description2Value = getFieldValue(
    data,
    'description_2',
    'subtitle',
    'intro_2'
  );

  const description2 =
    description2Value &&
    description2Value !==
      'FROM ONE IDEA TO A CURATED DESIGN NETWORK'
      ? description2Value
      : 'Explore moments from our previous editions, including brand showcases, product displays and conversations between the people shaping the architecture and design industry.';

  const renderTitle = () => {
    const useDefaultTitle =
      !rawTitle ||
      rawTitle.toLowerCase().includes('built over time');

    if (useDefaultTitle) {
      return (
        <h2 className="font-serif text-4xl font-normal leading-tight tracking-tight text-[#E8E1D5] sm:text-5xl lg:text-6xl">
          A Look Back at{' '}
          <span className="editorial-italic font-serif italic !text-[#D9BC78]">
            Archinet.
          </span>
        </h2>
      );
    }

    if (/archinet\.?/i.test(rawTitle)) {
      const parts = rawTitle.split(/archinet\.?/i);

      return (
        <h2 className="font-serif text-4xl font-normal leading-tight tracking-tight text-[#E8E1D5] sm:text-5xl lg:text-6xl">
          {parts[0]}
          <span className="editorial-italic font-serif italic !text-[#D9BC78]">
            Archinet.
          </span>
          {parts[1] || ''}
        </h2>
      );
    }

    return (
      <h2 className="whitespace-pre-line font-serif text-4xl font-normal leading-tight tracking-tight text-[#E8E1D5] sm:text-5xl lg:text-6xl">
        {rawTitle}
      </h2>
    );
  };

  /*
   * Keep the existing Metadata Master fields.
   */
  const editionField = getField(
    data,
    'edition',
    'editions',
    'edition_details',
    'edition_list'
  );

  const editionCardData =
    getCardJsonData<EditionMetadata>(editionField);

  const editions = useMemo<Edition[]>(() => {
    let result: Edition[] = [];

    if (editionCardData.length > 0) {
      result = editionCardData
        .map((item, index) => {
          const fallback =
            EDITIONS_DATA[index % EDITIONS_DATA.length];

          return {
            ...fallback,
            id: `metadata-edition-${index}`,
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
        .filter(
          (edition) =>
            Boolean(edition.venue) ||
            Boolean(edition.city) ||
            Boolean(edition.video)
        );
    }

    /*
     * Backward compatibility with individual edition fields.
     */
    if (result.length === 0) {
      const editionKeys = [
        'edition_9',
        'edition_10',
        'edition_11',
        'edition_12',
        'edition_13',
      ];

      editionKeys.forEach((key, index) => {
        const field = getField(data, key);
        const cards =
          getCardJsonData<EditionMetadata>(field);

        const item = cards[0];

        if (!item) return;

        const fallback =
          EDITIONS_DATA[index % EDITIONS_DATA.length];

        if (!item.video && !item.city && !item.venue) {
          return;
        }

        result.push({
          ...fallback,
          id: key.replace('_', '-'),
          number:
            item.number ||
            item.title ||
            item.edition ||
            fallback.number,
          city: item.city || fallback.city,
          venue: item.venue || fallback.venue,
          date: item.date || fallback.date,
          year: item.year || fallback.year || '',
          video: item.video || fallback.video,
          referenceUrl:
            item.referenceUrl ||
            item.reference_url ||
            item.instagram_link ||
            item.instagramLink ||
            fallback.referenceUrl,
        });
      });
    }

    return result.length > 0 ? result : EDITIONS_DATA;
  }, [data, editionCardData]);

  const [activeIndex, setActiveIndex] = useState(0);

  const [selectedEdition, setSelectedEdition] =
    useState<Edition | null>(null);

  /*
   * Keep the selected index valid when metadata changes.
   */
  useEffect(() => {
    setActiveIndex((current) => {
      if (editions.length === 0) return 0;

      return current >= editions.length ? 0 : current;
    });
  }, [editions.length]);

  const handlePrev = useCallback(() => {
    setActiveIndex((current) => {
      if (editions.length <= 1) return current;

      return (current - 1 + editions.length) % editions.length;
    });
  }, [editions.length]);

  const handleNext = useCallback(() => {
    setActiveIndex((current) => {
      if (editions.length <= 1) return current;

      return (current + 1) % editions.length;
    });
  }, [editions.length]);

  const handleDragEnd = (
    _: unknown,
    info: { offset: { x: number } }
  ) => {
    if (info.offset.x < -50) {
      handleNext();
    } else if (info.offset.x > 50) {
      handlePrev();
    }
  };

  /*
   * Build three unique card positions.
   * Position-based keys prevent duplicate React keys.
   */
  const visibleEditions = useMemo<VisibleEdition[]>(() => {
    const count = editions.length;

    if (count === 0) return [];

    if (count === 1) {
      return [
        {
          edition: editions[0],
          position: 'center',
          index: 0,
        },
      ];
    }

    if (count === 2) {
      const otherIndex = (activeIndex + 1) % count;

      return [
        {
          edition: editions[otherIndex],
          position: 'left',
          index: otherIndex,
        },
        {
          edition: editions[activeIndex],
          position: 'center',
          index: activeIndex,
        },
      ];
    }

    const previousIndex =
      (activeIndex - 1 + count) % count;

    const nextIndex = (activeIndex + 1) % count;

    return [
      {
        edition: editions[previousIndex],
        position: 'left',
        index: previousIndex,
      },
      {
        edition: editions[activeIndex],
        position: 'center',
        index: activeIndex,
      },
      {
        edition: editions[nextIndex],
        position: 'right',
        index: nextIndex,
      },
    ];
  }, [editions, activeIndex]);

  return (
    <section
      id="editions"
      className="relative z-10 w-full overflow-hidden bg-black font-sans text-[#AAA59B]"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">

        {/* Section heading */}
        <div className="mx-auto mb-8 flex max-w-3xl flex-col items-center text-center sm:mb-12 lg:mb-14">
          <RevealTitle>
            <div className="mb-4 flex items-center justify-center gap-3">
              <span className="h-px w-8 bg-[#D9BC78]/50" />

              <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#D9BC78]">
                {eyebrow}
              </span>

              <span className="h-px w-8 bg-[#D9BC78]/50" />
            </div>
          </RevealTitle>

          <RevealTitle>{renderTitle()}</RevealTitle>

          <RevealUp delay={0.15}>
            <div className="mx-auto mt-4 flex max-w-2xl flex-col gap-3 sm:mt-5">
              <p className="text-xs font-normal leading-relaxed text-[#AAA59B] sm:text-sm">
                {description1}
              </p>

              {description2 && (
                <p className="text-xs font-normal leading-relaxed text-[#AAA59B]/80 sm:text-sm">
                  {description2}
                </p>
              )}
            </div>
          </RevealUp>
        </div>

        {/* Editions carousel */}
        <RevealZoom
          delay={0.2}
          className="relative flex w-full flex-col items-center"
        >
          {/*
            The viewport clips the outer edges of the side cards.
            The track remains centered at every screen size.
          */}
          <div className="relative flex min-h-[490px] w-full items-center justify-center py-6 sm:min-h-[600px] sm:py-8 lg:min-h-[570px] lg:py-10">

            {/* Previous arrow */}
            <button
              type="button"
              onClick={handlePrev}
              disabled={editions.length <= 1}
              aria-label="Previous edition"
              className="absolute left-0 top-1/2 z-40 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#D9BC78]/60 bg-[#090909]/95 text-[#D9BC78] shadow-xl transition hover:scale-105 hover:border-[#D9BC78] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 sm:left-3 sm:h-12 sm:w-12 lg:left-8 xl:left-12"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Next arrow */}
            <button
              type="button"
              onClick={handleNext}
              disabled={editions.length <= 1}
              aria-label="Next edition"
              className="absolute right-0 top-1/2 z-40 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#D9BC78]/60 bg-[#090909]/95 text-[#D9BC78] shadow-xl transition hover:scale-105 hover:border-[#D9BC78] active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 sm:right-3 sm:h-12 sm:w-12 lg:right-8 xl:right-12"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>

            {/* Three-card coverflow track */}
            <motion.div
              drag={editions.length > 1 ? 'x' : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.12}
              onDragEnd={handleDragEnd}
             className={[
  'relative flex w-full items-center justify-center',
  'overflow-visible px-0',
  '-space-x-[42vw]',
  'min-[390px]:-space-x-[40vw]',
  'sm:-space-x-20',
  'lg:-space-x-20 xl:-space-x-24',
].join(' ')}
            >
              <AnimatePresence initial={false} mode="popLayout">
                {visibleEditions.map(
                  ({ edition, position, index }) => {
                    const isCenter = position === 'center';

                    const isSide = !isCenter;

                    return (
                      <motion.article
                        key={`${edition.id}-${position}-${index}`}
                        layout
                        initial={{
                          opacity: 0,
                          scale: 0.9,
                        }}
                        animate={{
                          opacity: isCenter ? 1 : 0.5,
                          scale: isCenter ? 1 : 0.91,
                          filter: isCenter
                            ? 'brightness(1)'
                            : 'brightness(0.68)',
                        }}
                        exit={{
                          opacity: 0,
                          scale: 0.9,
                        }}
                        transition={{
                          layout: {
                            duration: 0.5,
                            ease: [0.16, 1, 0.3, 1],
                          },
                          opacity: {
                            duration: 0.3,
                          },
                          scale: {
                            duration: 0.4,
                          },
                          filter: {
                            duration: 0.3,
                          },
                        }}
                        onClick={() => {
                          if (isSide) {
                            setActiveIndex(index);
                          } else {
                            setSelectedEdition(edition);
                          }
                        }}
                        aria-label={
                          isCenter
                            ? `Open ${edition.venue} video`
                            : `Show ${edition.venue}`
                        }
                        className={[
                          'group/card relative shrink-0 cursor-pointer',
                          'select-none overflow-hidden rounded-[20px]',
                          'border p-2.5 sm:p-4',
                          isCenter
                            ? [
                                'z-20',
                                'w-[74vw] max-w-[430px]',
                                'sm:w-[490px] sm:max-w-[490px]',
                                'lg:w-[420px] lg:max-w-[420px]',
                                'xl:w-[440px] xl:max-w-[440px]',
                                'border-[#D9BC78]/60 bg-[#080808]',
                                'shadow-[0_0_40px_rgba(217,188,120,0.12)]',
                              ].join(' ')
                            : [
                                'z-10',
                                'w-[66vw] max-w-[380px]',
                                'sm:w-[390px] sm:max-w-[390px]',
                                'lg:w-[350px] lg:max-w-[350px]',
                                'xl:w-[370px] xl:max-w-[370px]',
                                'border-white/10 bg-[#0a0a0a]',
                              ].join(' '),
                        ].join(' ')}
                      >
                        {/* Edition image/video */}
                        <div
                          className={[
                            'relative w-full overflow-hidden rounded-xl bg-black/60',
                            'h-[230px]',
                            'min-[390px]:h-[250px]',
                            'sm:h-[300px]',
                            'lg:h-[300px]',
                            'xl:h-[320px]',
                          ].join(' ')}
                        >
                          <EditionVideo
                            src={edition.video}
                            isCenter={isCenter}
                          />

                          {/* Center card hover overlay */}
                          {isCenter && (
                            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/35 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100">
                              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D9BC78] text-black shadow-2xl transition-transform duration-300 group-hover/card:scale-105 sm:h-14 sm:w-14">
                                <Play className="h-6 w-6 translate-x-0.5 fill-black" />
                              </div>

                              <span className="rounded-full border border-white/20 bg-black/70 px-2.5 py-1 font-sans text-[9px] uppercase tracking-widest text-[#E8E1D5] backdrop-blur-md sm:text-[10px]">
                                WATCH FULLSCREEN
                              </span>
                            </div>
                          )}

                          {/* City badge */}
                          <div className="absolute bottom-3 left-2 z-10 flex max-w-[90%] items-center gap-1.5 rounded-full border border-[#D9BC78]/50 bg-[#17140e]/95 px-2.5 py-1 font-sans text-[10px] uppercase tracking-wider text-[#D9BC78] shadow-md sm:left-3 sm:px-3 sm:text-xs">
                            <MapPin className="h-3 w-3 shrink-0" />

                            <span className="truncate">
                              {edition.city}
                            </span>
                          </div>
                        </div>

                        {/* Edition details */}
                        <div className="mt-3 px-0.5 sm:mt-4 sm:px-1">
                          <h3 className="flex items-center justify-between gap-2 font-serif text-lg font-medium tracking-tight text-[#E8E1D5] sm:text-2xl">
                            <span className="min-w-0 truncate">
                              {edition.venue}
                            </span>

                            {isCenter && (
                              <Maximize2 className="h-4 w-4 shrink-0 text-[#D9BC78] opacity-80 transition-opacity group-hover/card:opacity-100" />
                            )}
                          </h3>

                          <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-white/[0.08] pt-2.5 font-sans text-xs text-[#AAA59B] sm:text-sm">
                            <span className="min-w-0 truncate font-sans text-[9px] font-semibold uppercase tracking-[0.06em] text-[#D9BC78] sm:text-xs sm:tracking-[0.08em]">
                              {edition.number}
                            </span>

                            <span className="flex shrink-0 items-center gap-1 font-sans text-[10px] text-[#D9BC78] sm:gap-1.5 sm:text-xs">
                              <Calendar className="h-3.5 w-3.5 shrink-0" />

                              <span>{edition.date}</span>
                            </span>
                          </div>
                        </div>
                      </motion.article>
                    );
                  }
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Pagination dots */}
          <div className="mt-5 flex min-h-3 items-center justify-center gap-2 sm:mt-8">
            {editions.map((edition, index) => (
              <button
                key={`edition-dot-${edition.id}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to ${edition.venue}`}
                aria-current={
                  activeIndex === index ? 'true' : undefined
                }
                className={[
                  'shrink-0 cursor-pointer rounded-full',
                  'transition-all duration-300',
                  activeIndex === index
                    ? 'h-2 w-7 bg-[#D9BC78]'
                    : 'h-2 w-2 bg-white/20 hover:bg-white/40',
                ].join(' ')}
              />
            ))}
          </div>
        </RevealZoom>
      </div>

      {/* Fullscreen edition video modal */}
      <AnimatePresence>
        {selectedEdition && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex select-none items-center justify-center bg-black/90 p-4 pb-6 pt-[90px] backdrop-blur-xl"
            onClick={() => setSelectedEdition(null)}
          >
            <motion.div
              initial={{
                scale: 0.94,
                opacity: 0,
                y: 16,
              }}
              animate={{
                scale: 1,
                opacity: 1,
                y: 0,
              }}
              exit={{
                scale: 0.94,
                opacity: 0,
                y: 16,
              }}
              transition={{
                type: 'spring',
                damping: 25,
                stiffness: 300,
              }}
              className="relative flex h-[calc(100vh-110px)] max-h-[800px] w-full max-w-[420px] flex-col justify-between overflow-hidden rounded-2xl border border-[#D9BC78]/50 bg-black shadow-[0_0_80px_rgba(217,188,120,0.2)]"
              onClick={(event) => event.stopPropagation()}
            >
              {selectedEdition.video ? (
                <video
                  key={selectedEdition.id}
                  src={selectedEdition.video}
                  controls
                  autoPlay
                  playsInline
                  className="absolute inset-0 z-0 h-full w-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 z-0 h-full w-full bg-black" />
              )}

              {/* Modal header */}
              <div className="relative z-10 flex items-center justify-between border-b border-white/10 bg-gradient-to-b from-black/95 via-black/60 to-transparent p-4 sm:p-5">
                <div className="min-w-0">
                  <span className="mb-0.5 block font-sans text-[10px] font-medium uppercase tracking-widest text-[#D9BC78]">
                    {selectedEdition.number} · {selectedEdition.city}
                  </span>

                  <h3 className="truncate font-serif text-lg font-medium leading-snug text-[#E8E1D5] drop-shadow-md sm:text-xl">
                    {selectedEdition.venue}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedEdition(null)}
                  aria-label="Close video player"
                  className="ml-3 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/30 bg-black/60 text-[#E8E1D5] shadow-xl transition hover:border-[#D9BC78] hover:text-[#D9BC78] active:scale-95"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal footer */}
              <div className="relative z-10 flex flex-col gap-2 border-t border-white/10 bg-gradient-to-t from-black/95 via-black/60 to-transparent p-4 sm:p-5">
                <div className="flex items-center justify-between gap-4 font-sans text-[10px] text-[#D9BC78]">
                  <span className="truncate">
                    {selectedEdition.city} · {selectedEdition.venue}
                  </span>

                  <span className="shrink-0 rounded-full border border-[#D9BC78]/40 bg-black/60 px-2.5 py-0.5">
                    {selectedEdition.date}
                  </span>
                </div>

                {selectedEdition.referenceUrl && (
                  <a
                    href={selectedEdition.referenceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="border-t border-white/15 pt-2 font-sans text-[10px] uppercase tracking-widest text-[#E8E1D5]/80 transition-colors hover:text-[#D9BC78]"
                    onClick={(event) => event.stopPropagation()}
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
