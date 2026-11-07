import React, { useState } from 'react'
import { Heart, Eye, ShoppingBag, Star, Check, Zap } from 'lucide-react'
import type { Product } from '../data/mockData'

interface ProductCardProps {
  product: Product
  isWishlisted: boolean
  onToggleWishlist: (product: Product) => void
  onQuickView: (product: Product) => void
  onAddToCart: (product: Product, selectedSize: string) => void
  onBuyNow: (product: Product, selectedSize: string) => void
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
  onBuyNow
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M')
  const [added, setAdded] = useState(false)

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    onAddToCart(product, selectedSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const handleBuy = (e: React.MouseEvent) => {
    e.stopPropagation()
    onBuyNow(product, selectedSize)
  }

  return (
    <div 
      className="group relative flex flex-col bg-white rounded-lg sm:rounded-xl overflow-hidden border border-neutral-100 hover:border-neutral-300 hover:shadow-lg transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Area */}
      <div 
        className="relative w-full aspect-[3/4] bg-neutral-50 overflow-hidden cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <img
          src={isHovered ? product.hoverImage : product.image}
          alt={product.title}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
          {product.isBestSeller && (
            <span className="bg-[#8B1E3F] text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 uppercase tracking-wider rounded-none shadow-xs">
              BESTSELLER
            </span>
          )}
          {product.discount > 0 && (
            <span className="bg-amber-600 text-white text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-none shadow-xs">
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onToggleWishlist(product)
          }}
          className={`absolute top-2 right-2 z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600'
              : 'bg-white/80 hover:bg-white text-neutral-600 hover:text-rose-600'
          }`}
          title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={14} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Quick View Button (hover reveal on desktop) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onQuickView(product)
          }}
          className="hidden sm:flex absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-white/95 hover:bg-white text-neutral-900 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full shadow-md items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 cursor-pointer"
        >
          <Eye size={13} /> Quick View
        </button>
      </div>

      {/* Product Content Details */}
      <div className="p-2.5 sm:p-4 flex flex-col flex-1 justify-between space-y-1.5 sm:space-y-2.5">
        
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-[10px] sm:text-xs text-neutral-500">
          <span className="uppercase tracking-wider font-bold text-amber-900 truncate">
            {product.category}
          </span>
          <div className="flex items-center gap-0.5 text-amber-600 font-semibold text-[10px] sm:text-[11px] shrink-0">
            <Star size={11} fill="currentColor" />
            <span>{product.rating}</span>
          </div>
        </div>

        {/* Title */}
        <h3 
          onClick={() => onQuickView(product)}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          className="font-medium text-xs sm:text-sm text-neutral-900 line-clamp-2 hover:text-amber-800 transition-colors cursor-pointer leading-snug min-h-[2rem] sm:min-h-[2.5rem]"
          title={product.title}
        >
          {product.title}
        </h3>

        {/* Price Row */}
        <div className="flex items-baseline gap-1.5 sm:gap-2 flex-wrap">
          <span className="text-sm sm:text-base font-bold text-neutral-900">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-[10px] sm:text-xs text-neutral-400 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Quick Size Chips */}
        {product.sizes.length > 1 && (
          <div className="flex items-center gap-1 overflow-x-auto pb-1 scrollbar-none">
            {product.sizes.slice(0, 4).map((sz) => (
              <button
                key={sz}
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedSize(sz)
                }}
                className={`text-[9px] sm:text-[10px] font-medium px-1.5 sm:px-2 py-0.5 rounded border transition-colors cursor-pointer ${
                  selectedSize === sz
                    ? 'border-amber-800 bg-amber-800 text-white'
                    : 'border-neutral-200 text-neutral-600 hover:border-neutral-400'
                }`}
              >
                {sz}
              </button>
            ))}
          </div>
        )}

        {/* Dual Actions: Add to Bag & Buy Now */}
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          <button
            type="button"
            onClick={handleAdd}
            className={`py-2 px-1 rounded text-[10px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all duration-200 cursor-pointer ${
              added
                ? 'bg-emerald-700 text-white'
                : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900'
            }`}
          >
            {added ? (
              <>
                <Check size={12} /> Added
              </>
            ) : (
              <>
                <ShoppingBag size={12} /> Bag
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleBuy}
            className="py-2 px-1 bg-neutral-900 hover:bg-[#8B1E3F] text-white rounded text-[10px] sm:text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-all duration-200 cursor-pointer shadow-xs"
          >
            <Zap size={12} className="text-amber-400" /> Buy Now
          </button>
        </div>

      </div>
    </div>
  )
}
