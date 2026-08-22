"use client";

import { useState, useRef, useEffect } from "react";
import YouTube, { YouTubePlayer } from "react-youtube";
import { Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, Music } from "lucide-react";
import { Track } from "@/types/music";

interface MiniPlayerProps {
  track: Track;
  onNext?: () => void;
  onPrevious?: () => void;
  onTogglePlay?: (isPlaying: boolean) => void;
  onEnded?: () => void;
  autoPlay?: boolean;
  className?: string;
}

export function MiniPlayer({ track, onNext, onPrevious, onTogglePlay, onEnded, autoPlay = false, className = "" }: MiniPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(track.duration || 0);
  const [isMounted, setIsMounted] = useState(false);
  
  const playerRef = useRef<YouTubePlayer>(null);
  const progressInterval = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => {
    setIsMounted(true);
    return () => {
      if (progressInterval.current) clearInterval(progressInterval.current);
    };
  }, []);

  const extractVideoId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const videoId = track.url ? extractVideoId(track.url) : null;

  const handlePlayPause = () => {
    if (!playerRef.current) return;
    
    if (isPlaying) {
      setIsPlaying(false);
      playerRef.current.pauseVideo();
    } else {
      setIsPlaying(true);
      playerRef.current.playVideo();
    }
  };

  const handleReady = (event: { target: YouTubePlayer }) => {
    playerRef.current = event.target;
    setDuration(event.target.getDuration());
    event.target.setVolume(isMuted ? 0 : volume * 100);
    // Let YouTube's built-in autoplay handle the initial play if allowed
  };

  const handleStateChange = (event: { data: number }) => {
    // 1 = playing, 2 = paused, 0 = ended, -1 = unstarted, 3 = buffering, 5 = video cued
    if (event.data === 1) {
      setIsPlaying(true);
      onTogglePlay?.(true);
      
      // Start progress tracking
      progressInterval.current = setInterval(() => {
        if (playerRef.current) {
          setPlayedSeconds(playerRef.current.getCurrentTime());
        }
      }, 1000);
    } else {
      setIsPlaying(false);
      onTogglePlay?.(false);
      
      if (progressInterval.current) clearInterval(progressInterval.current);
      
      if (event.data === 0) {
        onEnded?.();
      }
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setPlayedSeconds(newTime);
    if (playerRef.current) {
      playerRef.current.seekTo(newTime, true);
    }
  };

  useEffect(() => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.mute();
      } else {
        playerRef.current.unMute();
        playerRef.current.setVolume(volume * 100);
      }
    }
  }, [volume, isMuted]);

  const formatTime = (seconds: number) => {
    if (!seconds) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const [isExpanded, setIsExpanded] = useState(false);

  if (!isMounted) return null;

  return (
    <>
      {/* Hidden YouTube IFrame */}
      {videoId && (
        <div className="hidden">
          <YouTube 
            videoId={videoId}
            opts={{ height: '0', width: '0', playerVars: { autoplay: autoPlay ? 1 : 0, controls: 0, disablekb: 1, fs: 0 } }}
            onReady={handleReady}
            onStateChange={handleStateChange}
          />
        </div>
      )}

      {!isExpanded ? (
        <div className={`relative group ${className}`}>
          <button 
            onClick={() => setIsExpanded(true)}
            className="relative w-[54px] h-[54px] rounded-full p-[3px] bg-gradient-to-tr from-[#0084ff] to-[#888888] shadow-[0_0_20px_rgba(0,132,255,0.4)] hover:scale-110 hover:shadow-[0_0_30px_rgba(0,132,255,0.6)] transition-all duration-300 animate-in slide-in-from-bottom-5 fade-in"
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center relative">
              {track.albumArt ? (
                <img src={track.albumArt} alt="Cover" className={`w-full h-full object-cover ${isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''}`} />
              ) : (
                <Music className="w-[18px] h-[18px] text-white/50" />
              )}
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Music className="w-[18px] h-[18px] text-white" />
              </div>
              <div className="absolute w-[12px] h-[12px] bg-black rounded-full border border-white/20" />
            </div>
          </button>
        </div>
      ) : (
        <div className={`bg-[#050505]/90 backdrop-blur-xl border border-white/10 p-[12px] rounded-[18px] shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex items-center gap-[18px] w-full max-w-[400px] overflow-hidden relative group animate-in slide-in-from-bottom-5 fade-in duration-500 ${className}`}>
          <button 
            onClick={() => setIsExpanded(false)}
            className="absolute top-[6px] right-[6px] p-[3px] text-[#888888] hover:text-white bg-black/50 hover:bg-[#0084ff]/20 rounded-full transition-all z-20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>

          <div className={`absolute top-0 left-0 w-full h-full bg-[#0084ff] blur-[50px] opacity-0 transition-opacity duration-1000 pointer-events-none ${isPlaying ? 'opacity-10' : ''}`} />

          <div className="relative shrink-0 w-[54px] h-[54px] rounded-[12px] overflow-hidden bg-[#111111] border border-white/5 shadow-inner flex items-center justify-center">
            {track.albumArt ? (
              <img src={track.albumArt} alt={track.title} className={`w-full h-full object-cover transition-transform duration-[10s] ${isPlaying ? 'scale-110' : 'scale-100'}`} />
            ) : (
              <Music className="w-[20px] h-[20px] text-white/20" />
            )}
            {isPlaying && (
              <div className="absolute inset-0 bg-black/40 flex items-end justify-center gap-[2px] pb-[6px]">
                <div className="w-[3px] h-[30%] bg-[#0084ff] animate-[pulse_1s_ease-in-out_infinite]" />
                <div className="w-[3px] h-[60%] bg-[#0084ff] animate-[pulse_1.2s_ease-in-out_infinite_0.2s]" />
                <div className="w-[3px] h-[40%] bg-[#0084ff] animate-[pulse_0.8s_ease-in-out_infinite_0.4s]" />
              </div>
            )}
          </div>

          <div className="flex-1 flex flex-col justify-center min-w-0 z-10 pr-[12px]">
            <div className="mb-[6px] truncate">
              <h4 className="text-[12px] font-[900] tracking-tight text-white truncate">{track.title}</h4>
              <p className="text-[9px] text-[#888888] tracking-[1px] uppercase truncate">{track.artist}</p>
            </div>

            <div className="flex flex-col gap-[6px]">
              <div className="flex items-center gap-[12px]">
                <button 
                  onClick={handlePlayPause} 
                  className="w-[28px] h-[28px] rounded-full bg-white text-black flex items-center justify-center hover:scale-105 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)] transition-all active:scale-95"
                >
                  {isPlaying ? (
                    <Pause className="w-[12px] h-[12px] fill-current" />
                  ) : (
                    <Play className="w-[12px] h-[12px] fill-current ml-[2px]" />
                  )}
                </button>
                
                <div className="ml-auto flex items-center gap-[6px] group/vol">
                  <button onClick={() => setIsMuted(!isMuted)} className="text-[#888888] hover:text-white transition-colors">
                    {isMuted || volume === 0 ? <VolumeX className="w-[12px] h-[12px]" /> : <Volume2 className="w-[12px] h-[12px]" />}
                  </button>
                  <input 
                    type="range" 
                    min="0" max="1" step="0.01" 
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(parseFloat(e.target.value));
                      setIsMuted(false);
                    }}
                    className="w-0 group-hover/vol:w-[45px] transition-all duration-300 opacity-0 group-hover/vol:opacity-100 accent-[#0084ff] h-[2px] bg-white/10 rounded-full cursor-pointer outline-none appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-[8px] [&::-webkit-slider-thumb]:h-[8px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                  />
                </div>
              </div>

              <div className="flex items-center gap-[9px] text-[8px] font-mono text-[#888888]">
                <span>{formatTime(playedSeconds)}</span>
                <div className="flex-1 relative h-[3px] group/progress cursor-pointer flex items-center">
                  <input 
                    type="range" 
                    min="0" 
                    max={duration || 100} 
                    value={playedSeconds}
                    onChange={handleSeek}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="w-full h-full bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-[#0084ff] to-[#00c3ff] rounded-full transition-all duration-100"
                      style={{ width: `${(playedSeconds / (duration || 100)) * 100}%` }}
                    />
                  </div>
                  <div 
                    className="absolute w-[8px] h-[8px] bg-white rounded-full opacity-0 group-hover/progress:opacity-100 transition-opacity pointer-events-none shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    style={{ left: `calc(${(playedSeconds / (duration || 100)) * 100}% - 4px)` }}
                  />
                </div>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
