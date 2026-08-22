export interface Track {
  id: number | string;
  title: string;
  artist: string;
  duration: number; // in seconds
  albumArt: string;
  url?: string;
}
