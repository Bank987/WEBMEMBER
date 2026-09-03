"use client";

import { useState, useRef, useEffect } from "react";
import YouTube, { YouTubePlayer } from "react-youtube";
import { Music } from "lucide-react";
import { Track } from "@/types/music";

interface PremiumPlayerProps {
  track: Track;
  onNext?: () => void;
  onPrevious?: () => void;
  onTogglePlay?: (isPlaying: boolean) => void;
  onEnded?: () => void;
  autoPlay?: boolean;
  className?: string;
}

export function PremiumPlayer({ track, onNext, onPrevious, onTogglePlay, onEnded, autoPlay = false, className = "" }: PremiumPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [duration, setDuration] = useState(track.duration || 0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  const playerRef = useRef<YouTubePlayer>(null);
  const progressInterval = useRef<NodeJS.Timeout | undefined>(undefined);

  useEffect(() => { setIsMounted(true); return () => { if (progressInterval.current) clearInterval(progressInterval.current); }; }, []);

  const extractVideoId = (url: string) => {
    if (!url) return null;
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const videoId = track.url ? extractVideoId(track.url) : null;

  const handlePlayPause = () => {
    if (!playerRef.current) return;
    if (isPlaying) { setIsPlaying(false); playerRef.current.pauseVideo(); }
    else { setIsPlaying(true); playerRef.current.playVideo(); }
  };

  const handleReady = (event: { target: YouTubePlayer }) => {
    playerRef.current = event.target;
    setDuration(event.target.getDuration());
    event.target.setVolume(50);
  };

  const handleStateChange = (event: { data: number }) => {
    if (event.data === 1) {
      setIsPlaying(true);
      onTogglePlay?.(true);
      setDuration(playerRef.current?.getDuration?.() || 0);
      progressInterval.current = setInterval(() => {
        if (playerRef.current) setPlayedSeconds(playerRef.current.getCurrentTime());
      }, 400);
    } else {
      setIsPlaying(false);
      onTogglePlay?.(false);
      if (progressInterval.current) clearInterval(progressInterval.current);
      if (event.data === 0) onEnded?.();
    }
  };

  const handleSeek = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!playerRef.current || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    playerRef.current.seekTo(pct * duration, true);
    setPlayedSeconds(pct * duration);
  };

  useEffect(() => {
    const handleForcePlay = () => {
      if (playerRef.current) {
        playerRef.current.unMute();
        playerRef.current.setVolume(50);
        playerRef.current.playVideo();
        setIsPlaying(true);
      }
    };
    window.addEventListener("force-play-music", handleForcePlay);
    return () => window.removeEventListener("force-play-music", handleForcePlay);
  }, []);

  useEffect(() => {
    if (autoPlay && isMounted) {
      const timer = setTimeout(() => { if (!isPlaying && playerRef.current) setAutoplayBlocked(true); }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isPlaying, autoPlay, isMounted]);

  const fmt = (s: number) => { const m = Math.floor(s / 60); const sec = Math.floor(s % 60); return m + ":" + (sec < 10 ? "0" : "") + sec; };
  const pClamp = duration > 0 ? Math.min((playedSeconds / duration) * 100, 100) : 0;

  if (!isMounted) return null;

  return (
    <>
      {videoId && (
        <div className="absolute w-[1px] h-[1px] opacity-0 pointer-events-none -z-50 overflow-hidden">
          <YouTube
            videoId={videoId}
            opts={{ height: "1", width: "1", playerVars: { autoplay: autoPlay ? 1 : 0, controls: 0, disablekb: 1, fs: 0, loop: 1, playlist: videoId } }}
            onReady={handleReady}
            onStateChange={handleStateChange}
          />
        </div>
      )}

      <div className={`relative ${className}`}>
        
        {/* === COLLAPSED MINI BUTTON === */}
        <button
          onClick={() => { if (autoplayBlocked && !isPlaying) { handlePlayPause(); setAutoplayBlocked(false); } else { setIsExpanded(true); } }}
          className={`absolute bottom-0 right-0 w-[50px] h-[50px] rounded-full p-[3px] bg-gradient-to-tr from-[#6E44FF] to-[#22C9A0] shadow-[0_0_20px_rgba(110,68,255,0.4)] hover:shadow-[0_0_30px_rgba(110,68,255,0.6)] transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] origin-bottom-right ${isExpanded ? 'scale-50 opacity-0 pointer-events-none' : 'scale-100 opacity-100 hover:scale-110'}`}
        >
          <div className="w-full h-full rounded-full overflow-hidden bg-black flex items-center justify-center relative">
            {track.albumArt ? (
              <img src={track.albumArt} alt="Cover" className={`w-full h-full object-cover scale-[1.35] ${isPlaying ? "animate-[spin_6s_linear_infinite]" : ""}`} />
            ) : (
              <Music className="w-[16px] h-[16px] text-white/50" />
            )}
            <div className="absolute w-[10px] h-[10px] bg-black rounded-full border border-white/20" />
          </div>
        </button>

        {/* === EXPANDED PREMIUM GLASS CARD === */}
        <div 
          className={`absolute bottom-0 right-0 transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] origin-bottom-right ${!isExpanded ? 'scale-90 opacity-0 pointer-events-none translate-y-4' : 'scale-100 opacity-100 translate-y-0'}`}
          style={{ width: 380 }}
        >
          {/* Album Art pop-out */}
          <div
            className="absolute z-20 rounded-full overflow-hidden flex-shrink-0"
            style={{
              width: 110, height: 110, left: -15, top: "50%",
              transform: "translateY(-50%)",
              boxShadow: isPlaying ? "0 0 0 3px rgba(110,68,255,0.3), 0 0 25px rgba(110,68,255,0.2), 0 8px 25px rgba(0,0,0,0.5)" : "0 8px 25px rgba(0,0,0,0.5)",
              animation: isPlaying && isExpanded ? "premiumSpin 6s linear infinite" : "none",
              transition: "box-shadow 0.6s ease",
            }}
          >
            <div className="absolute inset-0 z-10 rounded-full pointer-events-none" style={{ background: "repeating-radial-gradient(circle at center, transparent 0px, transparent 3px, rgba(0,0,0,0.12) 3px, rgba(0,0,0,0.12) 4px)" }} />
            <div className="absolute z-20 rounded-full" style={{ width: 14, height: 14, left: "50%", top: "50%", transform: "translate(-50%,-50%)", background: "#111", border: "2px solid rgba(255,255,255,0.15)" }} />
            {track.albumArt ? (
              <img src={track.albumArt} className="w-full h-full object-cover scale-[1.35]" alt="Album" />
            ) : (
              <div className="w-full h-full bg-[#111] flex items-center justify-center"><Music className="w-8 h-8 text-white/30" /></div>
            )}
          </div>

          {/* Close / Collapse button */}
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute z-20 flex items-center justify-center rounded-full text-white hover:scale-110 active:scale-95 transition-transform backdrop-blur-md border border-white/20"
            style={{ width: 32, height: 32, background: "rgba(110,68,255,0.8)", right: -8, top: -8, boxShadow: "0 4px 12px rgba(110,68,255,0.5)", animation: isPlaying && isExpanded ? "premiumPulse 2s ease-in-out infinite" : "none" }}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" /></svg>
          </button>

          {/* Glass Card */}
          <div 
            className="relative z-10 w-full rounded-[22px] py-3 pr-4 overflow-hidden backdrop-blur-2xl border border-white/10" 
            style={{ 
              background: "linear-gradient(135deg, rgba(20,20,20,0.6) 0%, rgba(5,5,5,0.8) 100%)", 
              paddingLeft: 108, 
              boxShadow: "0 16px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)" 
            }}
          >
            {/* Airpods pill */}
            <div className="relative inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 mb-1.5 border border-white/10" style={{ background: "rgba(255,255,255,0.05)" }}>
              <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="#22C9A0"><circle cx="7" cy="10" r="2.5" /><circle cx="17" cy="10" r="2.5" /><path d="M7 12.5V17M17 12.5V17" stroke="#22C9A0" strokeWidth="2" strokeLinecap="round" /></svg>
              <span className="text-[9px] font-semibold text-white/90">Connected</span>
              {isPlaying && <span className="relative flex h-1 w-1 ml-0.5"><span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" /><span className="relative inline-flex rounded-full h-1 w-1 bg-green-500" /></span>}
            </div>

            {/* Title */}
            <h3 className="text-[15px] font-bold leading-tight mb-0.5 truncate text-white drop-shadow-md">{track.title}</h3>
            <p className="text-[9px] mb-1.5 truncate text-white/50">{track.artist}</p>

            {/* Waveform progress */}
            <div className="relative w-full mb-1">
              <svg viewBox="0 0 300 12" className="w-full h-[10px] cursor-pointer drop-shadow-sm" preserveAspectRatio="none" onClick={handleSeek}>
                <defs>
                  <linearGradient id="premGrad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#6E44FF" /><stop offset="25%" stopColor="#22C9A0" />
                    <stop offset="50%" stopColor="#FF8A00" /><stop offset="75%" stopColor="#9B59B6" /><stop offset="100%" stopColor="#6E44FF" />
                  </linearGradient>
                </defs>
                <path d="M0 6 Q5 2,10 6 T20 6 T30 6 T40 6 T50 6 T60 6 T70 6 T80 6 T90 6 T100 6 T110 6 T120 6 T130 6 T140 6 T150 6 T160 6 T170 6 T180 6 T190 6 T200 6 T210 6 T220 6 T230 6 T240 6 T250 6 T260 6 T270 6 T280 6 T290 6 T300 6" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5" strokeLinecap="round" />
                <clipPath id="premProg"><rect x="0" y="0" width={`${pClamp}%`} height="12" /></clipPath>
                <path d="M0 6 Q5 2,10 6 T20 6 T30 6 T40 6 T50 6 T60 6 T70 6 T80 6 T90 6 T100 6 T110 6 T120 6 T130 6 T140 6 T150 6 T160 6 T170 6 T180 6 T190 6 T200 6 T210 6 T220 6 T230 6 T240 6 T250 6 T260 6 T270 6 T280 6 T290 6 T300 6" fill="none" stroke="url(#premGrad)" strokeWidth="2.5" strokeLinecap="round" clipPath="url(#premProg)" />
                <circle cx={`${pClamp * 3}`} cy="6" r="3" fill="#FF8A00" style={{ filter: "drop-shadow(0 0 3px rgba(255,138,0,0.8))" }} />
                <circle cx={`${pClamp * 3}`} cy="6" r="6" fill="#FF8A00" fillOpacity="0.3" />
              </svg>
              <div className="flex justify-between mt-[1px]">
                <span className="text-[7.5px] font-mono text-white/40">{fmt(playedSeconds)}</span>
                <span className="text-[7.5px] font-mono text-white/40">{duration > 0 ? fmt(duration) : "--:--"}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between px-0.5 mt-0.5">
              <button onClick={() => setShuffle(!shuffle)} className={`w-[30px] h-[30px] rounded-full flex items-center justify-center transition-all duration-300 active:scale-75 border ${shuffle ? 'bg-[#6E44FF] border-[#6E44FF] text-white' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white'}`}>
                <svg className="w-[12px] h-[12px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" /><polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" /><line x1="4" y1="4" x2="9" y2="9" /></svg>
              </button>
              <button onClick={() => { if (playedSeconds > 3 && playerRef.current) { playerRef.current.seekTo(0, true); setPlayedSeconds(0); } else { onPrevious?.(); } }} className="w-[30px] h-[30px] rounded-full flex items-center justify-center transition-all active:scale-75 bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg>
              </button>
              <button onClick={handlePlayPause} className="w-[40px] h-[40px] rounded-full flex items-center justify-center text-white transition-all active:scale-75 border border-[#6E44FF]" style={{ background: "linear-gradient(135deg, #6E44FF, #8E2DE2)", boxShadow: isPlaying ? "0 0 0 4px rgba(110,68,255,0.15), 0 3px 12px rgba(110,68,255,0.5)" : "0 3px 12px rgba(110,68,255,0.4)", animation: isPlaying && isExpanded ? "premiumPlayPulse 2s ease-in-out infinite" : "none" }}>
                {!isPlaying ? <svg className="w-5 h-5 ml-0.5 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg> : <svg className="w-5 h-5 drop-shadow-md" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>}
              </button>
              <button onClick={() => onNext?.()} className="w-[30px] h-[30px] rounded-full flex items-center justify-center transition-all active:scale-75 bg-white/5 border border-white/10 text-white/60 hover:bg-white/10 hover:text-white">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>
              </button>
              <button onClick={() => setRepeat(!repeat)} className={`w-[30px] h-[30px] rounded-full flex items-center justify-center transition-all duration-300 active:scale-75 border ${repeat ? 'bg-[#6E44FF] border-[#6E44FF] text-white' : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white'}`}>
                <svg className="w-[12px] h-[12px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 014-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 01-4 4H3" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes premiumSpin { from { transform: translateY(-50%) rotate(0deg); } to { transform: translateY(-50%) rotate(360deg); } }
        @keyframes premiumPulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.08); } }
        @keyframes premiumPlayPulse { 0%, 100% { box-shadow: 0 0 0 4px rgba(110,68,255,0.15), 0 3px 12px rgba(110,68,255,0.5); } 50% { box-shadow: 0 0 0 7px rgba(110,68,255,0.1), 0 3px 16px rgba(110,68,255,0.6); } }
        @keyframes premiumShimmer { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
      `}} />
    </>
  );
}
