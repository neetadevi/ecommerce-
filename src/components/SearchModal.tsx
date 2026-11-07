import React, { useState, useMemo } from 'react'
import { X, Search, Star, ArrowRight } from 'lucide-react'
import { PRODUCTS, Product } from '../data/mockData'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectProduct: (product: Product) => void
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct
}) => {
  if (!isOpen) return null

  const [query, setQuery] = useState('')

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return PRODUCTS.slice(0, 4)
    const q = query.toLowerCase()
    return PRODUCTS.filter(
      p => p.title.toLowerCase().includes(q) ||
           p.category.toLowerCase().includes(q) ||
           p.fabric.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center pt-16 px-4 animate-fadeIn">
      <div 
        className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Input Field */}
        <div className="relative mb-6">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search velvet suits, kurta sets, chanderi, spring collection..."
            className="w-full pl-12 pr-4 py-3.5 bg-neutral-50 border border-neutral-200 rounded-xl text-sm focus:outline-none focus:border-amber-700"
          />
        </div>

        {/* Popular Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-6 text-xs">
          <span className="text-neutral-400 font-semibold text-[11px] uppercase tracking-wider">Popular:</span>
          {['Velvet Suits', 'Kurta Sets', 'Shaadi Specials', 'Pastel Pink', 'Necklace'].map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setQuery(tag)}
              className="px-2.5 py-1 bg-neutral-100 hover:bg-amber-100 hover:text-amber-900 rounded-full text-neutral-700 transition-colors cursor-pointer"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results */}
        <div className="space-y-3 max-h-[50vh] overflow-y-auto">
          <p className="text-xs font-bold uppercase tracking-wider text-neutral-400">
            {query.trim() ? `Search Results (${filteredProducts.length})` : 'Trending Now'}
          </p>

          {filteredProducts.length === 0 ? (
            <div className="py-8 text-center text-xs text-neutral-500">
              No matching products found for "{query}". Try searching "Suit" or "Velvet".
            </div>
          ) : (
            filteredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => {
                  onSelectProduct(p)
                  onClose()
                }}
                className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-neutral-50 cursor-pointer transition-colors group"
              >
                <div className="w-12 h-16 rounded overflow-hidden bg-neutral-100 shrink-0">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover object-top" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                    {p.category}
                  </span>
                  <h4 className="text-xs font-semibold text-neutral-900 truncate group-hover:text-amber-800">
                    {p.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-bold text-neutral-900">₹{p.price.toLocaleString('en-IN')}</span>
                    <span className="text-[10px] text-neutral-400 line-through">₹{p.originalPrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <ArrowRight size={14} className="text-neutral-400 group-hover:text-amber-800 group-hover:translate-x-1 transition-all" />
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  )
}

