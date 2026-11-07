import React, { useState } from 'react'
import { Logo } from './Logo'
import { Mail, Phone, MapPin, ShieldCheck, Truck, RotateCcw, Award } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface FooterProps {
  onSelectCategory?: (category: string) => void
  onOpenTrackOrder?: () => void
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenTrackOrder }) => {
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
    <footer className="bg-[#111111] text-neutral-300 border-t border-neutral-800 font-sans">
      
      {/* Top Value Strip */}
      <div className="border-b border-neutral-800 bg-[#161616]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center text-amber-400 shrink-0 border border-neutral-800">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">100% Authentic</h4>
                <p className="text-[11px] text-neutral-400 mt-0.5">Direct from certified artisans</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center text-amber-400 shrink-0 border border-neutral-800">
                <Truck size={22} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Free Delivery</h4>
                <p className="text-[11px] text-neutral-400 mt-0.5">On all orders above ₹2,999</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center text-amber-400 shrink-0 border border-neutral-800">
                <RotateCcw size={22} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Easy 7-Day Returns</h4>
                <p className="text-[11px] text-neutral-400 mt-0.5">Hassle-free reverse pickup</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-neutral-900 flex items-center justify-center text-amber-400 shrink-0 border border-neutral-800">
                <Award size={22} />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider">Secure Checkout</h4>
                <p className="text-[11px] text-neutral-400 mt-0.5">256-Bit SSL Encrypted</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-neutral-800">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4 text-center sm:text-left">
            <Logo variant="light" size="lg" className="sm:items-start sm:text-left" />
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm pt-2">
              India's modern fashion destination for premium Lady Garments, designer Footwear &amp; Shoes, contemporary T-Shirts, and tailored Shirts.
            </p>
            <div className="flex items-center justify-center sm:justify-start space-x-3 text-neutral-400 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-amber-600 hover:text-black flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-amber-600 hover:text-black flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.5 5H18V0h-3.808C10.597 0 9 1.583 9 4.615V8z"/></svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-neutral-900 hover:bg-amber-600 hover:text-black flex items-center justify-center transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
              </a>
            </div>
          </div>

          {/* Shop Categories */}
          <div className="space-y-3 text-xs">
            <h5 className="font-bold text-white uppercase tracking-widest text-[11px] text-amber-400">
              Shop Collections
            </h5>
            <ul className="space-y-2.5 text-neutral-400">
              <li>
                <button 
                  onClick={() => onSelectCategory?.('Lady Garments')} 
                  className="hover:text-amber-300 transition-colors text-left cursor-pointer"
                >
                  Lady Garments (Suits &amp; Kurtas)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory?.('Shoes')} 
                  className="hover:text-amber-300 transition-colors text-left cursor-pointer"
                >
                  Shoes &amp; Footwear (Juttis &amp; Heels)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory?.('T-Shirts')} 
                  className="hover:text-amber-300 transition-colors text-left cursor-pointer"
                >
                  T-Shirts (Oversized &amp; Classic)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory?.('Shirts')} 
                  className="hover:text-amber-300 transition-colors text-left cursor-pointer"
                >
                  Shirts (Linen &amp; Cotton)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onSelectCategory?.('All')} 
                  className="hover:text-amber-300 transition-colors text-left cursor-pointer"
                >
                  New Season Arrivals 2025
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="space-y-3 text-xs">
            <h5 className="font-bold text-white uppercase tracking-widest text-[11px] text-amber-400">
              Customer Support
            </h5>
            <ul className="space-y-2.5 text-neutral-400">
              <li>
                <button
                  type="button"
                  onClick={onOpenTrackOrder}
                  className="hover:text-amber-300 transition-colors text-left cursor-pointer"
                >
                  Track Your Order
                </button>
              </li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Shipping &amp; Delivery Policy</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Return &amp; Exchange</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Size Guide &amp; Chart</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4 text-xs">
            <h5 className="font-bold text-white uppercase tracking-widest text-[11px] text-amber-400">
              Stay Connected
            </h5>
            
            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email for offers"
                className="w-full px-3.5 py-2.5 bg-neutral-900 border border-neutral-700 text-white text-xs placeholder-neutral-500 rounded focus:outline-none focus:border-amber-500"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-black font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer rounded"
              >
                {subscribed ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>

            <div className="space-y-2 text-neutral-400 pt-2 text-[11px]">
              <p className="flex items-center gap-2">
                <Phone size={13} className="text-amber-500 shrink-0" />
                <span>+91 1800 200 4567 (Toll Free)</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail size={13} className="text-amber-500 shrink-0" />
                <span>care@uniquefashion.com</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin size={13} className="text-amber-500 shrink-0 mt-0.5" />
                <span>Connaught Place, New Delhi 110001</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Rights & Payments Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-4">
          <p>© 2026 unique_fashion. All Rights Reserved. Crafted with pride in India.</p>
          <div className="flex items-center space-x-3 text-neutral-400 text-[10px] uppercase tracking-wider font-semibold">
            <span>Instant UPI</span>
            <span>•</span>
            <span>Google Pay</span>
            <span>•</span>
            <span>PhonePe</span>
            <span>•</span>
            <span>Visa</span>
            <span>•</span>
            <span>Mastercard</span>
            <span>•</span>
            <span>Cash on Delivery</span>
          </div>
        </div>

      </div>
    </footer>
  )
}
