import React, { useState, useRef } from 'react'
import { Volume2, VolumeX, ChevronLeft, ChevronRight, Play, Pause, Sparkles } from 'lucide-react'
import { HERO_SLIDES } from '../data/mockData'

interface HeroBannerProps {
  onShopClick: () => void
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onShopClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const slide = HERO_SLIDES[currentSlide]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
  }

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(videoRef.current.muted)
    }
  }

  const togglePlay = () => {
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
    <section className="relative w-full h-[540px] sm:h-[620px] lg:h-[720px] bg-neutral-900 overflow-hidden select-none">
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
            className="w-full h-full object-cover object-center filter brightness-[0.88]"
          />
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40" />

          {/* Video Controls (Sound & Pause) */}
          <div className="absolute bottom-6 right-6 z-20 flex items-center space-x-2 bg-black/50 backdrop-blur-md rounded-full px-3 py-1.5 border border-white/20 text-white text-xs">
            <button
              type="button"
              onClick={togglePlay}
              className="p-1.5 hover:text-amber-300 transition-colors cursor-pointer"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <div className="w-[1px] h-3 bg-white/30" />
            <button
              type="button"
              onClick={toggleSound}
              className="p-1.5 hover:text-amber-300 transition-colors cursor-pointer"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 w-full h-full">
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="w-full h-full object-cover object-top filter brightness-[0.92] transition-transform duration-1000 transform scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/30" />
        </div>
      )}

      {/* Floating Content Box */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 sm:pb-20">
        <div className="max-w-2xl text-white space-y-4 animate-fadeIn">
          
          <div className="inline-flex items-center gap-2 bg-amber-500/20 backdrop-blur-md border border-amber-400/40 text-amber-200 px-3.5 py-1 rounded-full text-xs font-bold tracking-[0.2em] uppercase">
            <Sparkles size={13} className="text-amber-300" />
            {slide.subtitle}
          </div>

          <h1 
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white drop-shadow-md leading-tight"
          >
            {slide.title}
          </h1>

          <p className="text-neutral-200 text-sm sm:text-base font-normal max-w-xl line-clamp-2 leading-relaxed">
            {slide.description}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onShopClick}
              className="px-8 py-3.5 bg-white text-neutral-900 hover:bg-amber-100 font-bold text-xs sm:text-sm tracking-[0.2em] uppercase rounded-none transition-all duration-300 shadow-xl cursor-pointer hover:shadow-amber-500/20 hover:scale-[1.02]"
            >
              {slide.ctaText}
            </button>
            <a
              href="#celebrity"
              className="px-6 py-3.5 border border-white/80 hover:border-white text-white hover:bg-white/10 font-medium text-xs sm:text-sm tracking-[0.18em] uppercase transition-all duration-300 cursor-pointer backdrop-blur-xs"
            >
              Celebrity Closet
            </a>
          </div>

        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        type="button"
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs border border-white/20 transition-all cursor-pointer"
        aria-label="Previous Slide"
      >
        <ChevronLeft size={22} />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-black/70 text-white flex items-center justify-center backdrop-blur-xs border border-white/20 transition-all cursor-pointer"
        aria-label="Next Slide"
      >
        <ChevronRight size={22} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrentSlide(idx)}
            className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
              currentSlide === idx ? 'w-8 bg-amber-400' : 'w-2.5 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

