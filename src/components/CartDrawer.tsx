import React, { useState } from 'react'
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, Tag, ShieldCheck } from 'lucide-react'
import { Product } from '../data/mockData'

export interface CartItem {
  product: Product
  size: string
  quantity: number
}

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  onUpdateQuantity: (productId: string, size: string, newQty: number) => void
  onRemoveItem: (productId: string, size: string) => void
  onCheckout: (discountAmount: number, appliedCode: string) => void
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  if (!isOpen) return null

  const [couponCode, setCouponCode] = useState('UNIQUE20')
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0)
  const [couponError, setCouponError] = useState<string | null>(null)
  const [couponSuccess, setCouponSuccess] = useState<string | null>(null)

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  const freeShippingThreshold = 2999
  const progressPercent = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100))
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal)

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault()
    setCouponError(null)
    setCouponSuccess(null)

    if (couponCode.trim().toUpperCase() === 'UNIQUE20') {
      const discount = Math.round(subtotal * 0.20)
      setAppliedDiscount(discount)
      setCouponSuccess('Coupon UNIQUE20 applied! 20% discount saved.')
    } else {
      setCouponError('Invalid coupon code. Try UNIQUE20.')
      setAppliedDiscount(0)
    }
  }

  const discountAmount = appliedDiscount
  const shipping = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 199
  const grandTotal = Math.max(0, subtotal - discountAmount + shipping)

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between transform transition-transform duration-300 ease-out"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-100 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-amber-800" />
            <h2 
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-lg font-bold text-neutral-900"
            >
              Shopping Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
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

        {/* Free Shipping Progress Bar */}
        <div className="bg-amber-50/80 px-4 py-2.5 border-b border-amber-100 text-xs text-amber-900 font-medium">
          {remainingForFreeShipping > 0 ? (
            <p>
              Add <strong className="font-bold">₹{remainingForFreeShipping.toLocaleString('en-IN')}</strong> more for <strong className="underline decoration-amber-700">FREE Express Delivery</strong>!
            </p>
          ) : (
            <p className="flex items-center gap-1.5 text-emerald-800 font-bold">
              <Sparkles size={14} className="text-emerald-600" />
              🎉 You unlocked FREE Express Delivery!
            </p>
          )}
          <div className="w-full h-1.5 bg-amber-200/60 rounded-full mt-1.5 overflow-hidden">
            <div 
              className="h-full bg-amber-700 transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-3">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400">
                <ShoppingBag size={32} />
              </div>
              <p className="text-neutral-700 font-bold text-base">Your shopping bag is empty</p>
              <p className="text-xs text-neutral-400 max-w-xs">
                Explore our festive collections, regal velvet suit sets, and handcrafted accessories.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="mt-2 px-6 py-2.5 bg-neutral-900 text-white text-xs uppercase tracking-widest font-semibold rounded-none cursor-pointer"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div 
                key={`${item.product.id}-${item.size}-${idx}`}
                className="flex gap-3.5 pb-4 border-b border-neutral-100 items-start"
              >
                {/* Thumbnail */}
                <div className="w-20 h-24 rounded-md overflow-hidden bg-neutral-100 flex-shrink-0">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col justify-between h-24">
                  <div className="space-y-1">
                    <div className="flex items-start justify-between">
                      <h4 
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                        className="text-xs font-bold text-neutral-900 line-clamp-1"
                      >
                        {item.product.title}
                      </h4>
                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.product.id, item.size)}
                        className="text-neutral-400 hover:text-red-600 transition-colors cursor-pointer p-0.5"
                        title="Remove"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    <p className="text-[11px] text-neutral-500">
                      Size: <span className="font-semibold text-neutral-800">{item.size}</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    {/* Qty increment/decrement */}
                    <div className="flex items-center border border-neutral-200 rounded text-xs">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, item.size, item.quantity - 1)}
                        className="px-2 py-0.5 hover:bg-neutral-100 cursor-pointer font-bold"
                      >
                        -
                      </button>
                      <span className="px-2 py-0.5 font-bold text-neutral-900">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(item.product.id, item.size, item.quantity + 1)}
                        className="px-2 py-0.5 hover:bg-neutral-100 cursor-pointer font-bold"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="text-sm font-bold text-neutral-900">
                        ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout Action */}
        {cartItems.length > 0 && (
          <div className="p-4 sm:p-5 bg-neutral-50 border-t border-neutral-100 space-y-4">
            
            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="space-y-1">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                    placeholder="Enter Coupon Code"
                    className="w-full pl-8 pr-3 py-2 bg-white border border-neutral-200 rounded text-xs uppercase tracking-wider font-semibold focus:outline-none focus:border-amber-700"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-neutral-900 hover:bg-amber-800 text-white text-xs font-bold uppercase tracking-wider rounded cursor-pointer transition-colors"
                >
                  Apply
                </button>
              </div>
              {couponSuccess && <p className="text-[11px] text-emerald-700 font-semibold">{couponSuccess}</p>}
              {couponError && <p className="text-[11px] text-red-600 font-semibold">{couponError}</p>}
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-neutral-900">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Coupon Discount (UNIQUE20)</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? <strong className="text-emerald-700 font-bold uppercase">Free</strong> : `₹${shipping}`}</span>
              </div>
              <div className="pt-2 border-t border-neutral-200 flex justify-between text-sm font-bold text-neutral-900">
                <span>Total Amount</span>
                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              type="button"
              onClick={() => onCheckout(discountAmount, couponSuccess ? 'UNIQUE20' : '')}
              className="w-full py-3.5 bg-[#8B1E3F] hover:bg-[#721532] text-white font-bold text-xs uppercase tracking-[0.2em] rounded-none flex items-center justify-center gap-2 shadow-lg cursor-pointer transition-all hover:shadow-rose-900/20"
            >
              PROCEED TO CHECKOUT <ArrowRight size={15} />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-neutral-400">
              <ShieldCheck size={13} className="text-emerald-600" />
              <span>Safe &amp; Secure 256-Bit SSL Encrypted Checkout</span>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}

