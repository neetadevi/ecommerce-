import React from 'react'
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react'
import { Product } from '../data/mockData'

interface WishlistDrawerProps {
  isOpen: boolean
  onClose: () => void
  wishlistItems: Product[]
  onRemoveFromWishlist: (product: Product) => void
  onMoveToCart: (product: Product, size: string) => void
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveFromWishlist,
  onMoveToCart
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-2">
            <Heart size={20} className="text-rose-600 fill-rose-600" />
            <h2 
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-lg font-bold text-neutral-900"
            >
              My Wishlist ({wishlistItems.length})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-200 text-neutral-600 transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {wishlistItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 flex items-center justify-center">
                <Heart size={30} />
              </div>
              <p className="text-neutral-700 font-bold text-base">Your wishlist is empty</p>
              <p className="text-xs text-neutral-400 max-w-xs">
                Save your favorite outfits and jewellery by clicking the heart icon.
              </p>
            </div>
          ) : (
            wishlistItems.map((p) => (
              <div key={p.id} className="flex gap-3.5 pb-4 border-b border-neutral-100 items-start">
                <div className="w-20 h-24 rounded-md overflow-hidden bg-neutral-100 shrink-0">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover object-top" />
                </div>
                <div className="flex-1 flex flex-col justify-between h-24">
                  <div>
                    <div className="flex items-start justify-between">
                      <h4 
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        className="text-xs font-bold text-neutral-900 line-clamp-1"
                      >
                        {p.title}
                      </h4>
                      <button
                        type="button"
                        onClick={() => onRemoveFromWishlist(p)}
                        className="text-neutral-400 hover:text-red-600 transition-colors cursor-pointer p-0.5"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <p className="text-xs font-bold text-neutral-900 mt-1">
                      ₹{p.price.toLocaleString('en-IN')}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onMoveToCart(p, p.sizes[0] || 'M')
                      onRemoveFromWishlist(p)
                    }}
                    className="w-full py-1.5 bg-neutral-900 hover:bg-amber-800 text-white text-[11px] font-bold uppercase tracking-wider rounded flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <ShoppingBag size={13} /> Move to Bag
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-4 bg-neutral-50 border-t border-neutral-100">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs uppercase tracking-widest cursor-pointer"
          >
            Continue Browsing
          </button>
        </div>
      </div>
    </div>
  )
}

