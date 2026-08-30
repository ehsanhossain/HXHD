import type { Dict } from '@/i18n/dictionaries';

/**
 * Plant footage supplied by the company.
 *
 * The masters are phone video: 60fps HEVC 10-bit HLG at ~52 Mbps, and portrait
 * despite reporting 3840x2160 (they carry a -90 degree display matrix). They
 * ship in two shapes because one cannot do both jobs — 1080x1920 with sound
 * for the cards, which suit 9:16 footage, and a 1280x720 centre crop, muted,
 * for the loop behind the headline.
 */
export interface HomeVideo {
  id: string;
  src: string;
  poster: string;
  /** Card title. A dictionary key so it translates with the rest of the UI. */
  titleKey: keyof Dict;
  /** Spoken description of the footage, for the player's accessible name. */
  description: string;
}

export const HOME_VIDEOS: HomeVideo[] = [
  {
    id: 'dispatch',
    src: '/videos/hxhd-1.mp4',
    poster: '/videos/hxhd-1.jpg',
    titleKey: 'sec.videoDispatch',
    description:
      'Forklift moving IBC totes through the plant doorway, stacked drums either side',
  },
  {
    id: 'store',
    src: '/videos/hxhd-2.mp4',
    poster: '/videos/hxhd-2.jpg',
    titleKey: 'sec.videoStore',
    description:
      'Forklift in the bulk store, rows of IBC totes and stacked drums either side',
  },
  {
    id: 'loading',
    src: '/videos/hxhd-3.mp4',
    poster: '/videos/hxhd-3.jpg',
    titleKey: 'sec.videoLoading',
    description: 'Operator rolling filled drums into a truck container for delivery',
  },
];

/**
 * The muted landscape clips behind the homepage headline, played in sequence:
 * each one advances to the next when it ends, and the third returns to the
 * first. Same footage as the cards above, cropped from 9:16 to a 16:9 centre
 * band and stripped of audio.
 */
export const HERO_CLIPS = [
  { src: '/videos/hero-1.mp4', poster: '/videos/hero-1.jpg' },
  { src: '/videos/hero-2.mp4', poster: '/videos/hero-2.jpg' },
  { src: '/videos/hero-3.mp4', poster: '/videos/hero-3.jpg' },
] as const;
