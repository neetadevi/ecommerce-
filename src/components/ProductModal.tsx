import React, { useState } from 'react'
import { X, Star, ShoppingBag, Heart, ShieldCheck, Truck, RotateCcw, Check } from 'lucide-react'
import { Product } from '../data/mockData'

interface ProductModalProps {
  product: Product | null
  onClose: () => void
  isWishlisted: boolean
  onToggleWishlist: (product: Product) => void
  onAddToCart: (product: Product, size: string, quantity: number) => void
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart
}) => {
  if (!product) return null

  const [activeImage, setActiveImage] = useState<string>(product.image)
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M')
  const [quantity, setQuantity] = useState<number>(1)
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    onAddToCart(product, selectedSize, quantity)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white rounded-2xl max-w-4xl w-full overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Left Side: Images Gallery */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between bg-neutral-50 border-r border-neutral-100">
          <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-white shadow-xs">
            <img
              src={activeImage}
              alt={product.title}
              className="w-full h-full object-cover object-top"
            />
          </div>

          {/* Thumbnails */}
          <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setActiveImage(product.image)}
              className={`w-16 h-20 rounded-md overflow-hidden border-2 cursor-pointer transition-all ${
                activeImage === product.image ? 'border-amber-700 ring-2 ring-amber-700/20' : 'border-neutral-200 opacity-70'
              }`}
            >
              <img src={product.image} alt="Front View" className="w-full h-full object-cover" />
            </button>
            <button
              type="button"
              onClick={() => setActiveImage(product.hoverImage)}
              className={`w-16 h-20 rounded-md overflow-hidden border-2 cursor-pointer transition-all ${
                activeImage === product.hoverImage ? 'border-amber-700 ring-2 ring-amber-700/20' : 'border-neutral-200 opacity-70'
              }`}
            >
              <img src={product.hoverImage} alt="Detail View" className="w-full h-full object-cover" />
            </button>
          </div>
        </div>

        {/* Right Side: Product Details */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col overflow-y-auto space-y-5">
          <div>
            <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
              <span className="uppercase tracking-widest text-[11px] font-bold text-amber-800">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-amber-600 font-semibold">
                <Star size={13} fill="currentColor" />
                <span>{product.rating}</span>
                <span className="text-neutral-400">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <h2 
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-xl sm:text-2xl font-bold text-neutral-900 leading-snug"
            >
              {product.title}
            </h2>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 pb-3 border-b border-neutral-100">
            <span className="text-2xl font-bold text-neutral-900">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-sm text-neutral-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
              {product.discount}% OFF (Inclusive of all taxes)
            </span>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
            {product.description}
          </p>

          {/* Specifications Grid */}
          <div className="grid grid-cols-2 gap-3 text-xs bg-[#FAF9F6] p-3 rounded-lg border border-neutral-100">
            <div>
              <span className="text-neutral-400 uppercase tracking-wider block text-[10px]">Fabric</span>
              <span className="font-semibold text-neutral-800">{product.fabric}</span>
            </div>
            <div>
              <span className="text-neutral-400 uppercase tracking-wider block text-[10px]">Fit</span>
              <span className="font-semibold text-neutral-800">{product.fit}</span>
            </div>
          </div>

          {/* Size Selector */}
          {product.sizes.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase font-bold text-neutral-800 tracking-wider">
                  Select Size
                </span>
                <span className="text-[11px] text-amber-800 underline font-medium cursor-pointer">
                  Size Guide
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`min-w-[42px] h-10 px-3 rounded-md text-xs font-semibold border transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'bg-amber-800 text-white border-amber-800 shadow-sm'
                        : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & Actions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-neutral-200 rounded-md">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-2 text-neutral-600 hover:bg-neutral-100 cursor-pointer font-bold"
                >
                  -
                </button>
                <span className="px-3 py-2 text-xs font-bold text-neutral-800 min-w-[32px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3 py-2 text-neutral-600 hover:bg-neutral-100 cursor-pointer font-bold"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className={`flex-1 py-3 px-6 rounded-md font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                  added
                    ? 'bg-emerald-700 text-white'
                    : 'bg-neutral-900 hover:bg-amber-800 text-white'
                }`}
              >
                {added ? (
                  <>
                    <Check size={16} /> Added to Bag
                  </>
                ) : (
                  <>
                    <ShoppingBag size={16} /> Add to Bag
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => onToggleWishlist(product)}
                className={`w-12 h-12 rounded-md border flex items-center justify-center transition-colors cursor-pointer ${
                  isWishlisted
                    ? 'bg-rose-50 text-rose-600 border-rose-200'
                    : 'bg-white text-neutral-600 border-neutral-200 hover:text-rose-600'
                }`}
                title={isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              >
                <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>

          {/* Perks list */}
          <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] text-neutral-500">
            <div className="flex items-center gap-1.5">
              <Truck size={14} className="text-amber-800" />
              <span>Free Delivery</span>
            </div>
            <div className="flex items-center gap-1.5">
              <RotateCcw size={14} className="text-amber-800" />
              <span>Easy 7-Day Returns</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-amber-800" />
              <span>100% Authentic</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
