import React, { useState } from 'react'
import { Heart, Eye, ShoppingBag, Star, Check } from 'lucide-react'
import { Product } from '../data/mockData'

interface ProductCardProps {
  product: Product
  isWishlisted: boolean
  onToggleWishlist: (product: Product) => void
  onQuickView: (product: Product) => void
  onAddToCart: (product: Product, selectedSize: string) => void
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart
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

  return (
    <div 
      className="group relative flex flex-col bg-white rounded-lg overflow-hidden border border-neutral-100 hover:border-neutral-300 hover:shadow-lg transition-all duration-300"
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
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5 z-10">
          {product.isBestSeller && (
            <span className="bg-[#8B1E3F] text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-none shadow-xs">
              BESTSELLER
            </span>
          )}
          {product.isNew && !product.isBestSeller && (
            <span className="bg-[#1C1917] text-amber-200 text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-none shadow-xs">
              NEW IN
            </span>
          )}
          {product.discount > 0 && (
            <span className="bg-amber-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-none shadow-xs">
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
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer shadow-sm ${
            isWishlisted
              ? 'bg-rose-50 text-rose-600'
              : 'bg-white/80 hover:bg-white text-neutral-600 hover:text-rose-600'
          }`}
          title={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
        </button>

        {/* Quick View Button (hover reveal) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onQuickView(product)
          }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 bg-white/95 hover:bg-white text-neutral-900 px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-full shadow-md flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 cursor-pointer"
        >
          <Eye size={14} /> Quick View
        </button>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between space-y-2.5">
        
        {/* Category & Rating */}
        <div className="flex items-center justify-between text-xs text-neutral-500">
          <span className="uppercase tracking-widest text-[10px] font-bold text-amber-900">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-amber-600 font-semibold text-[11px]">
            <Star size={12} fill="currentColor" />
            <span>{product.rating}</span>
            <span className="text-neutral-400">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Title */}
        <h3 
          onClick={() => onQuickView(product)}
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          className="font-medium text-sm text-neutral-900 line-clamp-2 hover:text-amber-800 transition-colors cursor-pointer leading-snug"
          title={product.title}
        >
          {product.title}
        </h3>

        {/* Price Row */}
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-base font-bold text-neutral-900">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice > product.price && (
            <span className="text-xs text-neutral-400 line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
          <span className="text-[11px] font-semibold text-emerald-700">
            Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
          </span>
        </div>

        {/* Size Selector */}
        {product.sizes.length > 1 && (
          <div className="flex items-center gap-1.5 pt-1 overflow-x-auto pb-1 scrollbar-none">
            <span className="text-[10px] text-neutral-400 uppercase font-semibold mr-1">Size:</span>
            {product.sizes.map((sz) => (
              <button
                key={sz}
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setSelectedSize(sz)
                }}
                className={`text-[10px] font-medium px-2 py-0.5 rounded border transition-colors cursor-pointer ${
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

        {/* Add to Cart Button */}
        <button
          type="button"
          onClick={handleAdd}
          className={`w-full py-2.5 px-3 rounded-none text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
            added
              ? 'bg-emerald-700 text-white'
              : 'bg-neutral-900 hover:bg-amber-800 text-white'
          }`}
        >
          {added ? (
            <>
              <Check size={14} /> Added to Bag
            </>
          ) : (
            <>
              <ShoppingBag size={14} /> Add to Bag
            </>
          )}
        </button>

      </div>
    </div>
  )
}
