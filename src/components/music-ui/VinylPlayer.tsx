"use client";

import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, SkipBack, SkipForward, Minimize2 } from "lucide-react";
import { Track } from "@/types/music";
import YouTube from "react-youtube";
import { motion, AnimatePresence } from "framer-motion";

interface VinylPlayerProps {
  track: Track;
  initialExpanded?: boolean;
}

export function VinylPlayer({ track, initialExpanded = false }: VinylPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(initialExpanded);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isReady, setIsReady] = useState(false);

  const playerRef = useRef<any>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const extractVideoId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };
  
  const videoId = extractVideoId(track.url);

  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = setInterval(() => {
        if (playerRef.current) {
          setPlayedSeconds(playerRef.current.getCurrentTime() || 0);
        }
      }, 500);
    } else {
      if (progressInterval.current) clearInterval(progressInterval.current);
    }
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, [isPlaying]);

  const onReady = (event: any) => {
    playerRef.current = event.target;
    setDuration(event.target.getDuration() || 0);
    setIsReady(true);
  };

  const onStateChange = (event: any) => {
    if (event.data === 1) setIsPlaying(true);
    else if (event.data === 2) setIsPlaying(false);
    else if (event.data === 0) {
      setIsPlaying(false);
      setPlayedSeconds(0);
      playerRef.current?.seekTo(0);
      playerRef.current?.playVideo(); // Loop
    }
  };

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isReady || !playerRef.current) return;
    if (isPlaying) playerRef.current.pauseVideo();
    else playerRef.current.playVideo();
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    const val = parseFloat(e.target.value);
    setPlayedSeconds(val);
    if (playerRef.current) playerRef.current.seekTo(val);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const progressPercent = duration > 0 ? (playedSeconds / duration) * 100 : 0;

  return (
    <div className="relative z-[60]">
      {videoId && (
        <div className="hidden">
          <YouTube
            videoId={videoId}
            opts={{
              height: "0",
              width: "0",
              playerVars: {
                autoplay: 1,
                controls: 0,
                disablekb: 1,
                fs: 0,
                rel: 0,
              },
            }}
            onReady={onReady}
            onStateChange={onStateChange}
          />
        </div>
      )}

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute bottom-0 right-0 w-[260px] sm:w-[280px] rounded-3xl p-5 bg-black/60 shadow-[0_0_30px_rgba(255,255,255,0.15)] border border-white/15 backdrop-blur-2xl"
            style={{ transformOrigin: "bottom right" }}
          >
            <button 
              onClick={() => setIsExpanded(false)}
              className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
            >
              <Minimize2 size={14} />
            </button>

            <div className="flex justify-center mb-5 mt-2 relative">
              <div className="relative w-[110px] h-[110px] sm:w-[120px] sm:h-[120px] rounded-full shadow-[0_0_25px_rgba(255,255,255,0.1)] p-1 bg-white/5 border border-white/10 backdrop-blur-md">
                <div 
                  className="w-full h-full rounded-full overflow-hidden relative border-4 border-[#121212]"
                  style={{ animation: isPlaying ? "spin 8s linear infinite" : "none" }}
                >
                  <img 
                    src={track.albumArt} 
                    alt={track.title} 
                    className="w-full h-full object-cover scale-[1.35]" 
                  />
                  <div className="absolute inset-0 rounded-full border border-white/10 pointer-events-none"></div>
                  <div className="absolute inset-0 rounded-full border border-black/30 scale-[0.8] pointer-events-none"></div>
                  <div className="absolute inset-0 rounded-full border border-black/30 scale-[0.6] pointer-events-none"></div>
                  
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-black/80 rounded-full shadow-inner border border-white/20 backdrop-blur-md"></div>
                </div>
              </div>
            </div>

            <div className="text-center mb-5 px-3">
              <h3 className="text-white font-bold text-base truncate drop-shadow-md">{track.title}</h3>
              <p className="text-white/60 text-xs font-medium truncate mt-1">{track.artist}</p>
            </div>

            <div className="mb-5 flex items-center gap-2 px-1">
              <span className="text-[9px] font-semibold text-white/50 w-7 text-right font-mono">
                {formatTime(playedSeconds)}
              </span>
              
              <div className="relative flex-1 h-1 bg-black/50 rounded-full cursor-pointer group shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] border border-white/5">
                <div 
                  className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-rose-500 to-indigo-600 shadow-[0_0_10px_rgba(99,102,241,0.6)]"
                  style={{ width: `${progressPercent}%` }}
                ></div>
                <div 
                  className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.9)]"
                  style={{ left: `calc(${progressPercent}% - 5px)` }}
                ></div>
                <input
                  type="range"
                  min="0"
                  max={duration || 100}
                  value={playedSeconds}
                  onChange={handleSeek}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </div>

              <span className="text-[9px] font-semibold text-white/50 w-7 font-mono">
                {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center justify-center gap-5">
              <button className="text-white/50 hover:text-white transition-colors drop-shadow-md active:scale-95">
                <SkipBack size={18} fill="currentColor" />
              </button>

              <button 
                onClick={togglePlay}
                className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-lg flex items-center justify-center text-white border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.15)] hover:bg-white/20 hover:shadow-[0_0_20px_rgba(255,255,255,0.25)] active:scale-95 transition-all"
              >
                {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
              </button>

              <button className="text-white/50 hover:text-white transition-colors drop-shadow-md active:scale-95">
                <SkipForward size={18} fill="currentColor" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={() => setIsExpanded(true)}
            className="w-16 h-16 rounded-full cursor-pointer shadow-[0_10px_20px_rgba(0,0,0,0.3)] bg-[#1a1a1a] p-0.5 relative group border-2 border-white/20 hover:border-white/50 transition-colors"
          >
             <div 
                className="w-full h-full rounded-full overflow-hidden relative border border-white/10"
                style={{ animation: isPlaying ? "spin 8s linear infinite" : "none" }}
              >
                <img 
                  src={track.albumArt} 
                  alt="Cover" 
                  className="w-full h-full object-cover scale-[1.35]" 
                />
                <div className="absolute inset-0 rounded-full border border-black/20 scale-[0.7]"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-black/40 backdrop-blur-md rounded-full shadow-inner border border-white/20"></div>
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
               {isPlaying ? <Pause size={10} color="white" fill="white" /> : <Play size={10} color="white" fill="white" className="ml-0.5" />}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
