import React from 'react'
import { CATEGORIES } from '../data/mockData'
import { ArrowUpRight } from 'lucide-react'

interface CategoryGridProps {
  onSelectCategory: (categoryKey: string) => void
}

export const CategoryGrid: React.FC<CategoryGridProps> = ({ onSelectCategory }) => {
  return (
    <section id="categories" className="py-12 sm:py-16 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-800 font-bold">
            Curated For Every Style
          </p>
          <h2 
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-900 uppercase"
          >
            SHOP BY CATEGORY
          </h2>
          <div className="w-16 h-0.5 bg-amber-700 mx-auto mt-2" />
        </div>

        {/* 4 Main Categories: Lady Garments, Shoes, T-Shirts, Shirts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.categoryKey)}
              className="group relative cursor-pointer flex flex-col bg-white rounded-xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 border border-neutral-100"
            >
              {/* Image Container */}
              <div className="relative w-full aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-neutral-100">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
                />
                
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Hover Quick Action */}
                <div className="absolute bottom-3 right-3 w-8 h-8 rounded-full bg-white text-neutral-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-md">
                  <ArrowUpRight size={16} />
                </div>
              </div>

              {/* Title & Tagline */}
              <div className="w-full p-3.5 text-center bg-white">
                <h3 
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  className="font-bold text-sm sm:text-base text-neutral-900 group-hover:text-amber-800 transition-colors"
                >
                  {cat.name}
                </h3>
                <p className="text-[11px] text-neutral-500 mt-0.5 font-medium">
                  {cat.itemCount} • {cat.tagline}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
