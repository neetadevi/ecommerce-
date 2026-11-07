import { useState, useEffect, useMemo } from 'react'
import { Header } from './components/Header'
import { HeroBanner } from './components/HeroBanner'
import { CategoryGrid } from './components/CategoryGrid'
import { ProductCard } from './components/ProductCard'
import { Footer } from './components/Footer'
import { ProductModal } from './components/ProductModal'
import { CartDrawer, type CartItem } from './components/CartDrawer'
import { WishlistDrawer } from './components/WishlistDrawer'
import { AuthModal } from './components/AuthModal'
import { CheckoutModal } from './components/CheckoutModal'
import { SearchModal } from './components/SearchModal'
import { PRODUCTS, type Product } from './data/mockData'
import { supabase } from './lib/supabase'
import { SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react'
import { BottomNav } from './components/BottomNav'
import { WhatsAppButton } from './components/WhatsAppButton'
import { TrackOrderModal } from './components/TrackOrderModal'

export function App() {
  // Category & Filter states
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [filterTag, setFilterTag] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('featured')
  const [visibleCount, setVisibleCount] = useState<number>(4) // Default 4 products shown

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false)
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false)
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false)
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState<boolean>(false)
  const [modalProduct, setModalProduct] = useState<Product | null>(null)

  // Checkout states
  const [checkoutDiscount, setCheckoutDiscount] = useState<number>(0)
  const [checkoutAppliedCode, setCheckoutAppliedCode] = useState<string>('')

  // Cart & Wishlist state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      size: 'L',
      quantity: 1
    }
  ])
  const [wishlistItems, setWishlistItems] = useState<Product[]>([PRODUCTS[7]])

  // Supabase User Session state
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [supabaseConnected, setSupabaseConnected] = useState<boolean>(false)

  useEffect(() => {
    // Check initial Supabase Auth session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (!error) {
        setSupabaseConnected(true)
        if (session?.user?.email) {
          setUserEmail(session.user.email)
        }
      }
    }).catch(() => {
      setSupabaseConnected(false)
    })

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user?.email) {
        setUserEmail(session.user.email)
      } else {
        setUserEmail(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  // When category changes, reset visible count to 4
  const handleSelectCategory = (cat: string) => {
    setActiveCategory(cat)
    setFilterTag('all')
    setVisibleCount(4)
    document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Cart Operations
  const handleAddToCart = (product: Product, size: string, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.size === size)
      if (existing) {
        return prev.map(item => 
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { product, size, quantity }]
    })
  }

  // Direct Buy Now: adds to cart & opens checkout instantly
  const handleBuyNow = (product: Product, size: string, quantity: number = 1) => {
    handleAddToCart(product, size, quantity)
    setIsCheckoutOpen(true)
  }

  const handleUpdateQuantity = (productId: string, size: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(productId, size)
      return
    }
    setCartItems(prev => 
      prev.map(item => 
        item.product.id === productId && item.size === size
          ? { ...item, quantity: newQty }
          : item
      )
    )
  }

  const handleRemoveItem = (productId: string, size: string) => {
    setCartItems(prev => prev.filter(item => !(item.product.id === productId && item.size === size)))
  }

  // Wishlist Operations
  const handleToggleWishlist = (product: Product) => {
    setWishlistItems(prev => {
      const exists = prev.some(item => item.id === product.id)
      if (exists) {
        return prev.filter(item => item.id !== product.id)
      }
      return [...prev, product]
    })
  }

  // Filter & Sort Products
  const displayedProducts = useMemo(() => {
    let result = [...PRODUCTS]

    // Category filter
    if (activeCategory === 'Sale') {
      result = result.filter(p => p.discount >= 25)
    } else if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory)
    }

    // Tag filter
    if (filterTag === 'bestsellers') {
      result = result.filter(p => p.isBestSeller)
    } else if (filterTag === 'new') {
      result = result.filter(p => p.isNew)
    } else if (filterTag === 'under2k') {
      result = result.filter(p => p.price <= 2000)
    }

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price)
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price)
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating)
    }

    return result
  }, [activeCategory, filterTag, sortBy])

  return (
    <div className="min-h-screen flex flex-col bg-white text-neutral-900 font-sans antialiased selection:bg-amber-200 selection:text-neutral-900">
      
      {/* Header */}
      <Header
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlistItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onSelectCategory={handleSelectCategory}
        activeCategory={activeCategory}
        userEmail={userEmail}
        onSignOut={async () => {
          await supabase.auth.signOut()
          setUserEmail(null)
        }}
      />

      {/* Hero Video & Image Slider */}
      <HeroBanner
        onShopClick={() => {
          document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' })
        }}
      />

      {/* 4 Categories: Lady Garments, Shoes, T-Shirts, Shirts */}
      <CategoryGrid onSelectCategory={handleSelectCategory} />

      {/* Main Product Catalog Section */}
      <section id="collections" className="py-12 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-3 border-b border-neutral-100 gap-3">
            <div>
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-amber-800 font-bold">
                Exclusive Collection
              </p>
              <h2 
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-900 mt-1 uppercase"
              >
                {activeCategory === 'All' ? 'EXPLORE OUR COLLECTION' : activeCategory}
              </h2>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-start md:self-auto">
              <SlidersHorizontal size={13} className="text-neutral-500" />
              <span className="text-[11px] font-semibold text-neutral-500 uppercase tracking-wider">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-bold text-neutral-900 bg-neutral-50 border border-neutral-200 rounded px-2 py-1 focus:outline-none focus:border-amber-700 cursor-pointer"
              >
                <option value="featured">Featured / Trending</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Customer Rating</option>
              </select>
            </div>
          </div>

          {/* Quick Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none border-b border-neutral-100 text-xs">
            {[
              { id: 'all', label: 'All Items' },
              { id: 'bestsellers', label: 'Bestsellers 🔥' },
              { id: 'new', label: 'New Arrivals' },
              { id: 'under2k', label: 'Under ₹2,000' }
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => {
                  setFilterTag(f.id)
                  setVisibleCount(4)
                }}
                className={`whitespace-nowrap px-4 py-1.5 text-xs uppercase tracking-wider font-bold rounded-full transition-all cursor-pointer ${
                  filterTag === f.id
                    ? 'bg-neutral-900 text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Product Grid: 2 columns on mobile (Left and Right side by side!), 4 columns on desktop */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
            {displayedProducts.slice(0, visibleCount).map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistItems.some(w => w.id === product.id)}
                onToggleWishlist={handleToggleWishlist}
                onQuickView={(p) => setModalProduct(p)}
                onAddToCart={(p, size) => handleAddToCart(p, size, 1)}
                onBuyNow={(p, size) => handleBuyNow(p, size, 1)}
              />
            ))}
          </div>

          {/* See More / Show Less Button */}
          {displayedProducts.length > 4 && (
            <div className="mt-10 text-center">
              {visibleCount < displayedProducts.length ? (
                <button
                  type="button"
                  onClick={() => setVisibleCount(displayedProducts.length)}
                  className="px-8 py-3 bg-[#4b0006] hover:bg-[#630008] text-white font-bold text-xs uppercase tracking-[0.2em] rounded-none transition-all shadow-md flex items-center justify-center gap-2 mx-auto cursor-pointer"
                >
                  See More ({displayedProducts.length - visibleCount} more items)
                  <ChevronDown size={15} />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setVisibleCount(4)
                    document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="px-6 py-2.5 border border-neutral-300 hover:border-black text-neutral-800 font-bold text-xs uppercase tracking-wider rounded-none transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer"
                >
                  Show Less <ChevronUp size={15} />
                </button>
              )}
            </div>
          )}

          {displayedProducts.length === 0 && (
            <div className="py-16 text-center text-neutral-500 space-y-2">
              <p className="font-bold text-base">No items found in this filter</p>
              <button
                type="button"
                onClick={() => { setActiveCategory('All'); setFilterTag('all'); setVisibleCount(4) }}
                className="text-xs text-amber-800 font-bold underline cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          )}

        </div>
      </section>

      {/* Footer with Professional Level Design */}
      <Footer 
        onSelectCategory={handleSelectCategory}
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
      />

      {/* Interactive Modals & Drawers */}
      <ProductModal
        product={modalProduct}
        onClose={() => setModalProduct(null)}
        isWishlisted={modalProduct ? wishlistItems.some(w => w.id === modalProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={(p, sz, qty) => {
          handleAddToCart(p, sz, qty)
          setIsCartOpen(true)
        }}
        onBuyNow={(p, sz, qty) => {
          handleBuyNow(p, sz, qty)
        }}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={(discount, code) => {
          setCheckoutDiscount(discount)
          setCheckoutAppliedCode(code)
          setIsCartOpen(false)
          setIsCheckoutOpen(true)
        }}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlistItems}
        onRemoveFromWishlist={handleToggleWishlist}
        onMoveToCart={(p, sz) => {
          handleAddToCart(p, sz, 1)
          setIsCartOpen(true)
        }}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onSuccess={(email) => setUserEmail(email)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        discountAmount={checkoutDiscount}
        appliedCode={checkoutAppliedCode}
        onOrderComplete={() => {
          setCartItems([])
        }}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => setModalProduct(p)}
      />

      {/* Order Tracking Modal */}
      <TrackOrderModal
        isOpen={isTrackOrderOpen}
        onClose={() => setIsTrackOrderOpen(false)}
      />

      {/* WhatsApp Floating Chat */}
      <WhatsAppButton />

      {/* Mobile Sticky Bottom Navigation Bar */}
      <BottomNav
        cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
        wishlistCount={wishlistItems.length}
        onHomeClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        onCategoriesClick={() => {
          document.getElementById('categories')?.scrollIntoView({ behavior: 'smooth' })
        }}
        onSearchClick={() => setIsSearchOpen(true)}
        onWishlistClick={() => setIsWishlistOpen(true)}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Live Supabase Connection Pill */}
      <div className="fixed bottom-4 left-4 z-30 hidden sm:flex items-center gap-2 bg-neutral-900/90 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-lg border border-neutral-700/50">
        <span className={`w-2 h-2 rounded-full ${supabaseConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
        <span>Supabase: {supabaseConnected ? 'Connected (Ecommerce)' : 'Connecting...'}</span>
      </div>

    </div>
  )
}

export default App
