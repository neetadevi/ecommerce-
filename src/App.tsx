import React, { useState, useEffect, useMemo } from 'react'
import { Header } from './components/Header'
import { HeroBanner } from './components/HeroBanner'
import { CategoryGrid } from './components/CategoryGrid'
import { ProductCard } from './components/ProductCard'
import { CelebrityCloset } from './components/CelebrityCloset'
import { BrandPromise } from './components/BrandPromise'
import { Footer } from './components/Footer'
import { ProductModal } from './components/ProductModal'
import { CartDrawer, CartItem } from './components/CartDrawer'
import { WishlistDrawer } from './components/WishlistDrawer'
import { AuthModal } from './components/AuthModal'
import { CheckoutModal } from './components/CheckoutModal'
import { SearchModal } from './components/SearchModal'
import { PRODUCTS, Product } from './data/mockData'
import { supabase } from './lib/supabase'
import { Filter, SlidersHorizontal, Sparkles, CheckCircle2 } from 'lucide-react'

export function App() {
  // Category & Filter states
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [filterTag, setFilterTag] = useState<string>('all')
  const [sortBy, setSortBy] = useState<string>('featured')

  // Modals & Drawers state
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false)
  const [isAuthOpen, setIsAuthOpen] = useState<boolean>(false)
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false)
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
  const [wishlistItems, setWishlistItems] = useState<Product[]>([PRODUCTS[1]])

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
    if (activeCategory !== 'All' && activeCategory !== 'Celebrity') {
      result = result.filter(p => p.category === activeCategory)
    }

    // Tag filter
    if (filterTag === 'bestsellers') {
      result = result.filter(p => p.isBestSeller)
    } else if (filterTag === 'velvet') {
      result = result.filter(p => p.fabric.toLowerCase().includes('velvet'))
    } else if (filterTag === 'shaadi') {
      result = result.filter(p => p.category === 'Suit Sets' || p.category === 'Kurta Sets')
    } else if (filterTag === 'under7k') {
      result = result.filter(p => p.price <= 7000)
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

  const handleCelebrityClick = (lookTitle: string) => {
    const match = PRODUCTS.find(p => p.title.toLowerCase().includes(lookTitle.toLowerCase().split(' ')[0]))
    if (match) {
      setModalProduct(match)
    } else {
      setModalProduct(PRODUCTS[0])
    }
  }

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
        onSelectCategory={(cat) => {
          setActiveCategory(cat)
          if (cat === 'Celebrity') {
            document.getElementById('celebrity')?.scrollIntoView({ behavior: 'smooth' })
          } else {
            document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' })
          }
        }}
        activeCategory={activeCategory}
        userEmail={userEmail}
        onSignOut={async () => {
          await supabase.auth.signOut()
          setUserEmail(null)
        }}
      />

      {/* Hero Video & Campaign Banner */}
      <HeroBanner
        onShopClick={() => {
          document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' })
        }}
      />

      {/* Lakshita Category Showcase */}
      <CategoryGrid
        onSelectCategory={(catName) => {
          setActiveCategory(catName)
          document.getElementById('collections')?.scrollIntoView({ behavior: 'smooth' })
        }}
      />

      {/* Main Product Catalog Section */}
      <section id="collections" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-neutral-100 gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-amber-800 font-bold">
                Festive &amp; Everyday Luxe
              </p>
              <h2 
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mt-1"
              >
                {activeCategory === 'All' ? 'EXPLORE OUR COLLECTIONS' : activeCategory.toUpperCase()}
              </h2>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 self-start md:self-auto">
              <SlidersHorizontal size={14} className="text-neutral-500" />
              <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-xs font-bold text-neutral-900 bg-neutral-50 border border-neutral-200 rounded px-2.5 py-1.5 focus:outline-none focus:border-amber-700 cursor-pointer"
              >
                <option value="featured">Featured / Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>

          {/* Quick Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            {[
              { id: 'all', label: 'All Items' },
              { id: 'bestsellers', label: 'Bestsellers 🔥' },
              { id: 'velvet', label: 'Royal Velvet Edit ✨' },
              { id: 'shaadi', label: 'Shaadi Specials 💍' },
              { id: 'under7k', label: 'Under ₹7,000' }
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilterTag(f.id)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  filterTag === f.id
                    ? 'bg-amber-800 text-white shadow-xs'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={wishlistItems.some(w => w.id === product.id)}
                onToggleWishlist={handleToggleWishlist}
                onQuickView={(p) => setModalProduct(p)}
                onAddToCart={(p, size) => handleAddToCart(p, size, 1)}
              />
            ))}
          </div>

          {displayedProducts.length === 0 && (
            <div className="py-16 text-center text-neutral-500 space-y-2">
              <p className="font-bold text-base">No items found in this category filter</p>
              <button
                type="button"
                onClick={() => { setActiveCategory('All'); setFilterTag('all') }}
                className="text-xs text-amber-800 font-bold underline"
              >
                Reset Filters
              </button>
            </div>
          )}

        </div>
      </section>

      {/* Celebrity Closet */}
      <CelebrityCloset onShopCelebrityLook={handleCelebrityClick} />

      {/* The Brand Promise & Flagship Stores */}
      <BrandPromise />

      {/* Footer */}
      <Footer />

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

      {/* Floating Supabase Connected Indicator Badge */}
      <div className="fixed bottom-4 left-4 z-30 hidden sm:flex items-center gap-2 bg-neutral-900/90 backdrop-blur-md text-white text-[11px] font-semibold px-3 py-1.5 rounded-full shadow-lg border border-neutral-700/50">
        <span className={`w-2 h-2 rounded-full ${supabaseConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
        <span>Supabase: {supabaseConnected ? 'Connected (Ecommerce)' : 'Connecting...'}</span>
      </div>

    </div>
  )
}

export default App
