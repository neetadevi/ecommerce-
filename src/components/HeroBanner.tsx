import React, { useState, useEffect, useRef } from 'react'
import { Volume2, VolumeX, ChevronLeft, ChevronRight, Play, Pause, Sparkles } from 'lucide-react'
import { HERO_SLIDES } from '../data/mockData'

interface HeroBannerProps {
  onShopClick: () => void
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onShopClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const touchStartX = useRef<number | null>(null)

  const slide = HERO_SLIDES[currentSlide]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
  }

  // Auto-slide every 5 seconds (pause if user is hovering or playing video with sound)
  useEffect(() => {
    if (isHovered) return
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(timer)
  }, [currentSlide, isHovered])

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (diff > 45) {
      nextSlide() // Swipe left -> Next slide
    } else if (diff < -45) {
      prevSlide() // Swipe right -> Prev slide
    }
    touchStartX.current = null
  }

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play()
        setIsPlaying(true)
      } else {
        videoRef.current.pause()
        setIsPlaying(false)
      }
    }
  }

  return (
    <section 
      className="relative w-full h-[480px] sm:h-[580px] lg:h-[680px] bg-neutral-950 overflow-hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Media */}
      {slide.type === 'video' ? (
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={videoRef}
            src={slide.videoUrl}
            poster={slide.poster}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="w-full h-full object-cover object-center filter brightness-[0.85]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35" />

          {/* Video Controls */}
          <div className="absolute bottom-6 right-6 z-20 flex items-center space-x-2 bg-black/60 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/20 text-white text-xs">
            <button
              type="button"
              onClick={togglePlay}
              className="p-1 hover:text-amber-300 transition-colors cursor-pointer"
              title={isPlaying ? 'Pause Video' : 'Play Video'}
            >
              {isPlaying ? <Pause size={15} /> : <Play size={15} />}
            </button>
            <div className="w-[1px] h-3 bg-white/30" />
            <button
              type="button"
              onClick={toggleSound}
              className="p-1 hover:text-amber-300 transition-colors cursor-pointer"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
            </button>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 w-full h-full">
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="w-full h-full object-cover object-center filter brightness-[0.88] transition-all duration-700 ease-in-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30" />
        </div>
      )}

      {/* Floating Content Box */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-14 sm:pb-20">
        <div className="max-w-2xl text-white space-y-3.5 animate-fadeIn">
          
          <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-md border border-amber-400/40 text-amber-200 px-3.5 py-1 rounded-full text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase">
            <Sparkles size={13} className="text-amber-300" />
            {slide.subtitle}
          </div>

          <h1 
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white drop-shadow-md leading-tight"
          >
            {slide.title}
          </h1>

          <p className="text-neutral-200 text-xs sm:text-sm font-normal max-w-xl line-clamp-2 leading-relaxed">
            {slide.description}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={onShopClick}
              className="px-7 py-3 bg-white hover:bg-amber-100 text-neutral-900 font-bold text-xs tracking-[0.2em] uppercase rounded-none transition-all duration-300 shadow-xl cursor-pointer hover:scale-102"
            >
              {slide.ctaText}
            </button>
          </div>

        </div>
      </div>

      {/* Big Visible Left Arrow */}
      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/30 transition-all cursor-pointer shadow-xl hover:scale-110 active:scale-95"
        aria-label="Previous Slide (Left)"
      >
        <ChevronLeft size={26} />
      </button>

      {/* Big Visible Right Arrow */}
      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-black/50 hover:bg-black/80 text-white flex items-center justify-center backdrop-blur-md border border-white/30 transition-all cursor-pointer shadow-xl hover:scale-110 active:scale-95"
        aria-label="Next Slide (Right)"
      >
        <ChevronRight size={26} />
      </button>

      {/* Slide Indicators / Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex space-x-2.5">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
              currentSlide === idx ? 'w-8 bg-amber-400' : 'w-2.5 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
