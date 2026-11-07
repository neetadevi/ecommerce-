import React, { useState } from 'react'
import { Logo } from './Logo'
import { Mail, Phone, MapPin } from 'lucide-react'
import { supabase } from '../lib/supabase'

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setLoading(true)
    try {
      await supabase.from('newsletter_subscribers').insert({ email })
    } catch (err) {
      console.warn('Newsletter subscribe note:', err)
    } finally {
      setLoading(false)
      setSubscribed(true)
      setEmail('')
      setTimeout(() => setSubscribed(false), 4000)
    }
  }

  return (
    <footer className="relative bg-[#121110] text-neutral-300 overflow-hidden border-t border-neutral-800">
      
      {/* Background Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url('https://cdn.shopify.com/s/files/1/0586/9207/5703/files/Footer_desktop.jpg')` }}
      />

      {/* Main Footer Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
        {/* Top Newsletter Strip */}
        <div className="pb-12 border-b border-neutral-800 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-xl font-bold text-white tracking-wide"
            >
              BE THE FIRST TO KNOW
            </h4>
            <p className="text-xs text-neutral-400">
              Subscribe for exclusive previews of upcoming festive collections &amp; private sales.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full md:w-auto flex max-w-md">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              className="px-4 py-3 bg-neutral-900 border border-neutral-700 text-white text-xs placeholder-neutral-500 rounded-l-none focus:outline-none focus:border-amber-500 w-full md:w-72"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-black font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer shrink-0"
            >
              {subscribed ? 'Subscribed!' : 'Join'}
            </button>
          </form>
        </div>

        {/* 4 Columns Navigation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 border-b border-neutral-800">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="light" size="lg" className="items-start text-left" />
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm pt-2">
              India's premier ethnic &amp; Indo-Western couture brand. Reimagining traditional silhouettes with rich velvets, handcrafted zari embroidery, and modern flair.
            </p>
            <div className="flex items-center space-x-3 text-neutral-400 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-amber-600 hover:text-black flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-amber-600 hover:text-black flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z"/></svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-amber-600 hover:text-black flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              </a>
            </div>
          </div>

          {/* Col 2: Shop */}
          <div className="space-y-3 text-xs">
            <h5 className="font-bold text-white uppercase tracking-widest text-[11px] text-amber-400">
              Collections
            </h5>
            <ul className="space-y-2 text-neutral-400">
              <li><a href="#categories" className="hover:text-amber-300 transition-colors">Velvet Suit Sets</a></li>
              <li><a href="#categories" className="hover:text-amber-300 transition-colors">Kurta Sets &amp; Dupattas</a></li>
              <li><a href="#categories" className="hover:text-amber-300 transition-colors">Shaadi Special Edit</a></li>
              <li><a href="#categories" className="hover:text-amber-300 transition-colors">Co-ord Sets</a></li>
              <li><a href="#categories" className="hover:text-amber-300 transition-colors">Spring '25 Symphony</a></li>
              <li><a href="#celebrity" className="hover:text-amber-300 transition-colors">Celebrity Closet</a></li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div className="space-y-3 text-xs">
            <h5 className="font-bold text-white uppercase tracking-widest text-[11px] text-amber-400">
              Customer Care
            </h5>
            <ul className="space-y-2 text-neutral-400">
              <li><a href="#" className="hover:text-amber-300 transition-colors">Track Your Order</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Shipping &amp; Delivery</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Easy Returns &amp; Exchange</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Inclusive Size Guide</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Free Lifetime Alterations</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">FAQs</a></li>
            </ul>
          </div>

          {/* Col 4: Reach Us */}
          <div className="space-y-3 text-xs">
            <h5 className="font-bold text-white uppercase tracking-widest text-[11px] text-amber-400">
              Get in Touch
            </h5>
            <div className="space-y-2 text-neutral-400">
              <p className="flex items-center gap-2">
                <Phone size={14} className="text-amber-500" />
                <span>+91 1800 200 4567</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={14} className="text-amber-500" />
                <span>care@uniquefashion.com</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin size={14} className="text-amber-500 mt-0.5" />
                <span>Flagship Studio: Connaught Place, New Delhi 110001</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Rights & Payments */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-4">
          <p>© 2026 unique_fashion. All Rights Reserved. Mastercrafted in India.</p>
          <div className="flex items-center space-x-4 text-neutral-400 text-[10px] uppercase tracking-wider font-semibold">
            <span>UPI</span>
            <span>•</span>
            <span>Visa</span>
            <span>•</span>
            <span>Mastercard</span>
            <span>•</span>
            <span>RuPay</span>
            <span>•</span>
            <span>NetBanking</span>
            <span>•</span>
            <span>Cash on Delivery</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
