"use client";

import { useEffect, useRef, useState, useCallback } from "react";

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

interface Track {
  id: string;
  title: string;
  thumb: string;
}

const PLAYLIST: Track[] = [
  { id: "jfKfPfyJRdk", title: "Lofi Hip Hop Radio", thumb: "https://i.ytimg.com/vi/jfKfPfyJRdk/hqdefault.jpg" },
  { id: "5qap5aO4i9A", title: "Chillhop Essentials", thumb: "https://i.ytimg.com/vi/5qap5aO4i9A/hqdefault.jpg" },
  { id: "lTRiuFIWV54", title: "Jazz Vibes", thumb: "https://i.ytimg.com/vi/lTRiuFIWV54/hqdefault.jpg" },
  { id: "HuFYqnbVbzY", title: "Ambient Worlds", thumb: "https://i.ytimg.com/vi/HuFYqnbVbzY/hqdefault.jpg" },
  { id: "rUxyKA_-grg", title: "Midnight City", thumb: "https://i.ytimg.com/vi/rUxyKA_-grg/hqdefault.jpg" },
  { id: "4xDzrJKXOOY", title: "Synthwave Retro", thumb: "https://i.ytimg.com/vi/4xDzrJKXOOY/hqdefault.jpg" },
  { id: "kgx4WGK0oNU", title: "Chill Beats", thumb: "https://i.ytimg.com/vi/kgx4WGK0oNU/hqdefault.jpg" },
  { id: "7NOSDKb0HlU", title: "Study Session", thumb: "https://i.ytimg.com/vi/7NOSDKb0HlU/hqdefault.jpg" },
];

export default function MusicSandbox() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const playerRef = useRef<any>(null);
  const intervalRef = useRef<any>(null);
  const readyRef = useRef(false);

  const track = PLAYLIST[currentIdx];

  const loadTrack = useCallback((idx: number) => {
    setTransitioning(true);
    setTimeout(() => {
      setCurrentIdx(idx);
      setProgress(0);
      setCurrentTime(0);
      if (playerRef.current?.loadVideoById) {
        playerRef.current.loadVideoById(PLAYLIST[idx].id);
      }
      setTimeout(() => setTransitioning(false), 400);
    }, 300);
  }, []);

  const playNext = useCallback(() => {
    if (shuffle) {
      let r = Math.floor(Math.random() * PLAYLIST.length);
      while (r === currentIdx && PLAYLIST.length > 1) r = Math.floor(Math.random() * PLAYLIST.length);
      loadTrack(r);
    } else {
      loadTrack((currentIdx + 1) % PLAYLIST.length);
    }
  }, [currentIdx, shuffle, loadTrack]);

  const playPrev = useCallback(() => {
    if (currentTime > 3 && playerRef.current?.seekTo) {
      playerRef.current.seekTo(0);
      setProgress(0);
      setCurrentTime(0);
    } else {
      loadTrack((currentIdx - 1 + PLAYLIST.length) % PLAYLIST.length);
    }
  }, [currentIdx, currentTime, loadTrack]);

  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const first = document.getElementsByTagName("script")[0];
      if (first?.parentNode) first.parentNode.insertBefore(tag, first);
      else document.head.appendChild(tag);
      window.onYouTubeIframeAPIReady = () => initPlayer();
    } else {
      initPlayer();
    }

    function initPlayer() {
      playerRef.current = new window.YT.Player("yt-player", {
        height: "0",
        width: "0",
        videoId: PLAYLIST[0].id,
        playerVars: { autoplay: 0, controls: 0 },
        events: {
          onReady: () => { readyRef.current = true; },
          onStateChange: (e: any) => {
            if (e.data === window.YT.PlayerState.PLAYING) {
              setIsPlaying(true);
              setDuration(playerRef.current.getDuration());
            } else if (e.data === window.YT.PlayerState.PAUSED) {
              setIsPlaying(false);
            } else if (e.data === window.YT.PlayerState.ENDED) {
              setIsPlaying(false);
            }
          },
        },
      });
    }
    return () => { if (playerRef.current?.destroy) playerRef.current.destroy(); };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        if (playerRef.current?.getCurrentTime && playerRef.current?.getDuration) {
          const t = playerRef.current.getCurrentTime();
          const d = playerRef.current.getDuration();
          setCurrentTime(t);
          setDuration(d);
          if (d > 0) setProgress((t / d) * 100);
        }
      }, 400);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying]);

  useEffect(() => {
    if (!isPlaying && currentTime > 0 && duration > 0 && (duration - currentTime) < 1.5) {
      if (repeat) {
        playerRef.current?.seekTo(0);
        playerRef.current?.playVideo();
      } else {
        playNext();
      }
    }
  }, [isPlaying, currentTime, duration, repeat, playNext]);

  const togglePlay = () => {
    if (!readyRef.current) return;
    if (isPlaying) playerRef.current.pauseVideo();
    else playerRef.current.playVideo();
  };

  const seekTo = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!playerRef.current?.seekTo || !duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    playerRef.current.seekTo(pct * duration);
    setProgress(pct * 100);
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return m + ":" + (sec < 10 ? "0" : "") + sec;
  };

  const pClamp = Math.min(progress, 100);

  return (
    <div className="min-h-screen flex items-center justify-center p-10" style={{ background: "#1B1D2B" }}>
      <div id="yt-player" className="hidden" />

      <div className="relative flex items-center" style={{ width: 560 }}>

        {/* Album Art */}
        <div
          className="absolute z-20 rounded-full overflow-hidden flex-shrink-0"
          style={{
            width: 180, height: 180, left: -30, top: "50%",
            transform: "translateY(-50%)",
            boxShadow: isPlaying
              ? "0 0 0 4px rgba(110,68,255,0.3), 0 0 40px rgba(110,68,255,0.25), 0 12px 40px rgba(0,0,0,0.6)"
              : "0 12px 40px rgba(0,0,0,0.6)",
            animation: isPlaying ? "vinylSpin 6s linear infinite" : "none",
            transition: "box-shadow 0.6s ease",
          }}
        >
          {/* vinyl grooves overlay */}
          <div className="absolute inset-0 z-10 rounded-full pointer-events-none" style={{
            background: "repeating-radial-gradient(circle at center, transparent 0px, transparent 3px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)",
          }} />
          {/* center hole */}
          <div className="absolute z-20 rounded-full" style={{
            width: 20, height: 20, left: "50%", top: "50%", transform: "translate(-50%,-50%)",
            background: "#1B1D2B", border: "2px solid rgba(255,255,255,0.15)",
          }} />
          <img
            src={track.thumb}
            className="w-full h-full object-cover transition-opacity duration-500"
            style={{ opacity: transitioning ? 0 : 1 }}
            alt="Album"
          />
        </div>

        {/* Share button */}
        <button
          className="absolute z-20 flex items-center justify-center rounded-full text-white hover:scale-110 active:scale-95 transition-transform"
          style={{
            width: 44, height: 44, background: "#6E44FF",
            right: -14, top: -14,
            boxShadow: "0 4px 14px rgba(110,68,255,0.5)",
            animation: isPlaying ? "pulse 2s ease-in-out infinite" : "none",
          }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </button>

        {/* White Card */}
        <div className="relative z-10 w-full rounded-[28px] py-5 pr-6 overflow-hidden" style={{ background: "rgba(255,255,255,0.95)", paddingLeft: 170, boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}>

          {/* Animated gradient border glow when playing */}
          {isPlaying && (
            <div className="absolute inset-0 rounded-[28px] pointer-events-none" style={{
              background: "linear-gradient(90deg, rgba(110,68,255,0.08), rgba(34,201,160,0.08), rgba(255,138,0,0.08), rgba(110,68,255,0.08))",
              backgroundSize: "300% 100%",
              animation: "shimmer 3s ease-in-out infinite",
            }} />
          )}

          {/* Airpods pill */}
          <div className="relative inline-flex items-center gap-1.5 rounded-full px-3 py-1 mb-3" style={{ background: "#D5F0EE" }}>
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#6E44FF">
              <circle cx="7" cy="10" r="2.5" /><circle cx="17" cy="10" r="2.5" />
              <path d="M7 12.5V17M17 12.5V17" stroke="#6E44FF" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <span className="text-[12px] font-semibold" style={{ color: "#3A3D5C" }}>{"Johnathan's Airpods"}</span>
            {isPlaying && <span className="relative flex h-2 w-2 ml-1"><span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" style={{ animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite" }}></span><span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span></span>}
          </div>

          {/* Title with fade transition */}
          <div className="relative overflow-hidden mb-1" style={{ height: 30 }}>
            <h3
              className="text-[22px] font-bold leading-tight absolute transition-all duration-500"
              style={{
                color: "#1B1D2B",
                opacity: transitioning ? 0 : 1,
                transform: transitioning ? "translateY(20px)" : "translateY(0)",
              }}
            >
              {track.title}
            </h3>
          </div>

          {/* Track counter */}
          <p className="text-[11px] mb-3 font-medium transition-all duration-300" style={{ color: "#B0B3C7" }}>
            {currentIdx + 1} / {PLAYLIST.length}
          </p>

          {/* Waveform progress */}
          <div className="relative w-full mb-1">
            <svg viewBox="0 0 300 14" className="w-full h-[14px] cursor-pointer" preserveAspectRatio="none" onClick={seekTo}>
              <defs>
                <linearGradient id="wg" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#6E44FF" /><stop offset="25%" stopColor="#22C9A0" />
                  <stop offset="50%" stopColor="#FF8A00" /><stop offset="75%" stopColor="#9B59B6" /><stop offset="100%" stopColor="#6E44FF" />
                </linearGradient>
              </defs>
              <path d="M0 7 Q5 3,10 7 T20 7 T30 7 T40 7 T50 7 T60 7 T70 7 T80 7 T90 7 T100 7 T110 7 T120 7 T130 7 T140 7 T150 7 T160 7 T170 7 T180 7 T190 7 T200 7 T210 7 T220 7 T230 7 T240 7 T250 7 T260 7 T270 7 T280 7 T290 7 T300 7" fill="none" stroke="#E5E7EB" strokeWidth="3" strokeLinecap="round" />
              <clipPath id="prog"><rect x="0" y="0" width={`${pClamp}%`} height="14" /></clipPath>
              <path d="M0 7 Q5 3,10 7 T20 7 T30 7 T40 7 T50 7 T60 7 T70 7 T80 7 T90 7 T100 7 T110 7 T120 7 T130 7 T140 7 T150 7 T160 7 T170 7 T180 7 T190 7 T200 7 T210 7 T220 7 T230 7 T240 7 T250 7 T260 7 T270 7 T280 7 T290 7 T300 7" fill="none" stroke="url(#wg)" strokeWidth="3" strokeLinecap="round" clipPath="url(#prog)" />
              <circle cx={`${pClamp * 3}`} cy="7" r="5" fill="#FF8A00" style={{ transition: "cx 0.3s ease", filter: "drop-shadow(0 0 4px rgba(255,138,0,0.6))" }} />
              <circle cx={`${pClamp * 3}`} cy="7" r="9" fill="#FF8A00" fillOpacity="0.2" style={{ transition: "cx 0.3s ease" }} />
            </svg>
            <div className="flex justify-between mt-1">
              <span className="text-[10px] font-mono" style={{ color: "#9CA3AF" }}>{fmt(currentTime)}</span>
              <span className="text-[10px] font-mono" style={{ color: "#9CA3AF" }}>{duration > 0 ? fmt(duration) : "--:--"}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between px-2">
            <button onClick={() => setShuffle(!shuffle)} className="w-[44px] h-[44px] rounded-full flex items-center justify-center transition-all duration-300 active:scale-75 hover:shadow-md" style={{ background: shuffle ? "#6E44FF" : "#D5F0EE", transform: shuffle ? "scale(1.05)" : "scale(1)" }}>
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke={shuffle ? "white" : "#3A3D5C"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" /><polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" /><line x1="4" y1="4" x2="9" y2="9" />
              </svg>
            </button>
            <button onClick={playPrev} className="w-[44px] h-[44px] rounded-full flex items-center justify-center transition-all duration-200 active:scale-75 hover:shadow-md hover:brightness-95" style={{ background: "#D5F0EE" }}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#3A3D5C"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" /></svg>
            </button>
            <button onClick={togglePlay} className="w-[56px] h-[56px] rounded-full flex items-center justify-center text-white transition-all duration-200 active:scale-75 hover:brightness-110" style={{ background: "#6E44FF", boxShadow: isPlaying ? "0 0 0 6px rgba(110,68,255,0.15), 0 6px 20px rgba(110,68,255,0.35)" : "0 6px 20px rgba(110,68,255,0.35)", animation: isPlaying ? "playPulse 2s ease-in-out infinite" : "none" }}>
              {!isPlaying ? (
                <svg className="w-7 h-7 ml-1" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
              ) : (
                <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
              )}
            </button>
            <button onClick={playNext} className="w-[44px] h-[44px] rounded-full flex items-center justify-center transition-all duration-200 active:scale-75 hover:shadow-md hover:brightness-95" style={{ background: "#D5F0EE" }}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#3A3D5C"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>
            </button>
            <button onClick={() => setRepeat(!repeat)} className="w-[44px] h-[44px] rounded-full flex items-center justify-center transition-all duration-300 active:scale-75 hover:shadow-md" style={{ background: repeat ? "#6E44FF" : "#D5F0EE", transform: repeat ? "scale(1.05)" : "scale(1)" }}>
              <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24" fill="none" stroke={repeat ? "white" : "#3A3D5C"} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="17 1 21 5 17 9" /><path d="M3 11V9a4 4 0 014-4h14" /><polyline points="7 23 3 19 7 15" /><path d="M21 13v2a4 4 0 01-4 4H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes vinylSpin {
          from { transform: translateY(-50%) rotate(0deg); }
          to { transform: translateY(-50%) rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 4px 14px rgba(110,68,255,0.5); }
          50% { transform: scale(1.08); box-shadow: 0 4px 20px rgba(110,68,255,0.7); }
        }
        @keyframes playPulse {
          0%, 100% { box-shadow: 0 0 0 6px rgba(110,68,255,0.15), 0 6px 20px rgba(110,68,255,0.35); }
          50% { box-shadow: 0 0 0 10px rgba(110,68,255,0.08), 0 6px 25px rgba(110,68,255,0.45); }
        }
        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}} />
    </div>
  );
}
