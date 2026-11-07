import React, { useState } from 'react'
import { Search, ShoppingBag, Heart, User, Menu, X, Sparkles } from 'lucide-react'
import { Logo } from './Logo'

interface HeaderProps {
  cartCount: number
  wishlistCount: number
  onOpenCart: () => void
  onOpenWishlist: () => void
  onOpenAuth: () => void
  onOpenSearch: () => void
  onSelectCategory: (cat: string) => void
  activeCategory: string
  userEmail: string | null
  onSignOut: () => void
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAuth,
  onOpenSearch,
  onSelectCategory,
  activeCategory,
  userEmail,
  onSignOut
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userDropdownOpen, setUserDropdownOpen] = useState(false)

  const navLinks = [
    { label: 'All Collection', value: 'All' },
    { label: 'Lady Garments', value: 'Lady Garments' },
    { label: 'Shoes', value: 'Shoes' },
    { label: 'T-Shirts', value: 'T-Shirts' },
    { label: 'Shirts', value: 'Shirts' },
    { label: 'Sale (20% OFF)', value: 'Sale' }
  ]

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-neutral-100 transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-[#1C1917] text-amber-200 py-2 px-4 text-xs font-medium tracking-widest text-center flex items-center justify-center gap-3 overflow-hidden select-none">
        <Sparkles size={13} className="text-amber-400 animate-pulse hidden sm:inline" />
        <span className="uppercase text-[11px] sm:text-xs tracking-wider">
          ✦ FLAT 20% OFF ON ALL ORDERS | USE CODE: <strong className="text-white underline decoration-amber-400 font-bold">UNIQUE20</strong> ✦ FREE EXPRESS DELIVERY ACROSS INDIA ✦
        </span>
        <Sparkles size={13} className="text-amber-400 animate-pulse hidden sm:inline" />
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-800 hover:text-amber-700 focus:outline-none"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Desktop Left Nav Links */}
          <nav className="hidden lg:flex items-center space-x-6 text-[13px] font-medium tracking-wider uppercase text-neutral-700">
            {navLinks.slice(0, 3).map((link) => (
              <button
                key={link.value}
                type="button"
                onClick={() => onSelectCategory(link.value)}
                className={`transition-colors duration-200 pb-1 relative cursor-pointer ${activeCategory === link.value
                  ? 'text-amber-800 font-semibold'
                  : 'hover:text-amber-700'
                  }`}
              >
                {link.label}
                {activeCategory === link.value && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-700 rounded-full" />
                )}
              </button>
            ))}
          </nav>

          {/* Center Brand Logo */}
          <div className="flex-1 lg:flex-none flex justify-center py-2">
            <a href="#" onClick={(e) => { e.preventDefault(); onSelectCategory('All') }}>
              <Logo size="md" />
            </a>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center space-x-4 sm:space-x-5 text-neutral-800">
            {/* Search Icon */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="p-1.5 hover:text-amber-700 transition-colors cursor-pointer relative"
              title="Search collection"
            >
              <Search size={21} />
            </button>

            {/* User / Supabase Auth Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  if (userEmail) {
                    setUserDropdownOpen(!userDropdownOpen)
                  } else {
                    onOpenAuth()
                  }
                }}
                className="p-1.5 hover:text-amber-700 transition-colors cursor-pointer flex items-center gap-1.5"
                title={userEmail ? `Signed in as ${userEmail}` : 'Sign in / Register'}
              >
                <User size={21} />
                {userEmail && (
                  <span className="hidden xl:inline text-xs font-semibold max-w-[100px] truncate text-amber-900">
                    {userEmail.split('@')[0]}
                  </span>
                )}
              </button>

              {/* User Dropdown */}
              {userEmail && userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-neutral-100 py-2 z-50 text-xs">
                  <div className="px-4 py-2 border-b border-neutral-100">
                    <p className="text-neutral-500 font-medium">Logged in via Supabase</p>
                    <p className="text-neutral-900 font-bold truncate">{userEmail}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      onSignOut()
                      setUserDropdownOpen(false)
                    }}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-neutral-50 font-semibold cursor-pointer"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>

            {/* Wishlist Icon */}
            <button
              type="button"
              onClick={onOpenWishlist}
              className="p-1.5 hover:text-amber-700 transition-colors cursor-pointer relative"
              title="Wishlist"
            >
              <Heart size={21} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart / Bag Icon */}
            <button
              type="button"
              onClick={onOpenCart}
              className="p-1.5 hover:text-amber-700 transition-colors cursor-pointer relative"
              title="Shopping Bag"
            >
              <ShoppingBag size={21} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#8B1E3F] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center justify-center space-x-10 py-2.5 border-t border-neutral-100 text-xs tracking-widest uppercase font-semibold text-neutral-600">
          {navLinks.map((link) => (
            <button
              key={link.value}
              type="button"
              onClick={() => onSelectCategory(link.value)}
              className={`hover:text-amber-800 transition-colors cursor-pointer ${
                activeCategory === link.value ? 'text-amber-800 font-bold underline underline-offset-8 decoration-2 decoration-amber-700' : ''
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-neutral-200 px-6 py-4 space-y-3 animate-fadeIn">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.value}
                type="button"
                onClick={() => {
                  onSelectCategory(link.value)
                  setMobileMenuOpen(false)
                }}
                className={`text-left py-2 text-sm uppercase tracking-wider font-medium cursor-pointer ${activeCategory === link.value ? 'text-amber-800 font-bold' : 'text-neutral-700'
                  }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-neutral-100 flex flex-col space-y-2 text-sm text-neutral-600">
            {userEmail ? (
              <button
                type="button"
                onClick={() => {
                  onSignOut()
                  setMobileMenuOpen(false)
                }}
                className="text-left py-1 text-red-600 font-semibold cursor-pointer"
              >
                Sign Out ({userEmail})
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  onOpenAuth()
                  setMobileMenuOpen(false)
                }}
                className="text-left py-1 text-amber-800 font-bold cursor-pointer"
              >
                Login / Register
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
