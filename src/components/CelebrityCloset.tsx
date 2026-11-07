import React from 'react'
import { CELEBRITY_LOOKS } from '../data/mockData'
import { Sparkles, ArrowRight } from 'lucide-react'

interface CelebrityClosetProps {
  onShopCelebrityLook: (lookTitle: string) => void
}

export const CelebrityCloset: React.FC<CelebrityClosetProps> = ({ onShopCelebrityLook }) => {
  return (
    <section id="celebrity" className="py-20 bg-[#161413] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 text-amber-300 text-xs uppercase tracking-[0.3em] font-semibold">
            <Sparkles size={14} className="text-amber-400" />
            Spotlight Style
          </div>
          <h2 
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-5xl font-bold tracking-tight text-white"
          >
            CELEBRITY CLOSET
          </h2>
          <p className="text-neutral-400 text-sm max-w-md mx-auto leading-relaxed">
            Leading icons in our signature festive silhouettes and couture hand-embroidery.
          </p>
          <div className="w-16 h-0.5 bg-amber-500 mx-auto mt-2" />
        </div>

        {/* Celebrity Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CELEBRITY_LOOKS.map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-[#221F1D] rounded-xl overflow-hidden border border-neutral-800 hover:border-amber-500/50 transition-all duration-500 flex flex-col"
            >
              {/* Image Frame */}
              <div className="relative aspect-[3/4] overflow-hidden bg-neutral-900">
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-108"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                {/* Bottom Overlay Label */}
                <div className="absolute bottom-4 left-4 right-4 space-y-1">
                  <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold">
                    {item.role}
                  </span>
                  <h3 
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    className="text-xl font-bold text-white group-hover:text-amber-200 transition-colors"
                  >
                    {item.name}
                  </h3>
                </div>
              </div>

              {/* Outfit details & CTA */}
              <div className="p-4 flex flex-col flex-1 justify-between space-y-3 bg-[#1C1917]">
                <div>
                  <p className="text-xs text-neutral-300 font-medium line-clamp-1">
                    {item.outfitTitle}
                  </p>
                  <p className="text-sm font-bold text-amber-400 mt-1">
                    ₹{item.price.toLocaleString('en-IN')}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onShopCelebrityLook(item.outfitTitle)}
                  className="w-full py-2.5 px-4 bg-transparent hover:bg-amber-500 text-amber-300 hover:text-black border border-amber-500/40 text-xs uppercase tracking-widest font-bold transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                >
                  Shop The Look <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

