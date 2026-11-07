import React from 'react'
import { Home, Grid, Search, Heart, ShoppingBag } from 'lucide-react'

interface BottomNavProps {
  cartCount: number
  wishlistCount: number
  onHomeClick: () => void
  onCategoriesClick: () => void
  onSearchClick: () => void
  onWishlistClick: () => void
  onCartClick: () => void
}

export const BottomNav: React.FC<BottomNavProps> = ({
  cartCount,
  wishlistCount,
  onHomeClick,
  onCategoriesClick,
  onSearchClick,
  onWishlistClick,
  onCartClick
}) => {
  return (
    <nav className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 shadow-lg px-4 py-2 flex items-center justify-around select-none">
      
      {/* Home */}
      <button
        type="button"
        onClick={onHomeClick}
        className="flex flex-col items-center justify-center text-neutral-700 hover:text-amber-800 transition-colors py-1 cursor-pointer"
      >
        <Home size={19} />
        <span className="text-[10px] font-semibold mt-0.5 tracking-wider">Home</span>
      </button>

      {/* Categories */}
      <button
        type="button"
        onClick={onCategoriesClick}
        className="flex flex-col items-center justify-center text-neutral-700 hover:text-amber-800 transition-colors py-1 cursor-pointer"
      >
        <Grid size={19} />
        <span className="text-[10px] font-semibold mt-0.5 tracking-wider">Categories</span>
      </button>

      {/* Search */}
      <button
        type="button"
        onClick={onSearchClick}
        className="flex flex-col items-center justify-center text-neutral-700 hover:text-amber-800 transition-colors py-1 cursor-pointer"
      >
        <Search size={19} />
        <span className="text-[10px] font-semibold mt-0.5 tracking-wider">Search</span>
      </button>

      {/* Wishlist */}
      <button
        type="button"
        onClick={onWishlistClick}
        className="flex flex-col items-center justify-center text-neutral-700 hover:text-amber-800 transition-colors py-1 relative cursor-pointer"
      >
        <Heart size={19} />
        {wishlistCount > 0 && (
          <span className="absolute top-0 right-1.5 bg-amber-700 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
            {wishlistCount}
          </span>
        )}
        <span className="text-[10px] font-semibold mt-0.5 tracking-wider">Wishlist</span>
      </button>

      {/* Bag / Cart */}
      <button
        type="button"
        onClick={onCartClick}
        className="flex flex-col items-center justify-center text-neutral-700 hover:text-amber-800 transition-colors py-1 relative cursor-pointer"
      >
        <ShoppingBag size={19} />
        {cartCount > 0 && (
          <span className="absolute top-0 right-1.5 bg-[#8B1E3F] text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center animate-bounce">
            {cartCount}
          </span>
        )}
        <span className="text-[10px] font-semibold mt-0.5 tracking-wider">Bag</span>
      </button>

    </nav>
  )
}
