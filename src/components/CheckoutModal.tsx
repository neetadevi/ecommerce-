import React, { useState } from 'react'
import { X, CheckCircle, CreditCard, QrCode, Banknote } from 'lucide-react'
import type { CartItem } from './CartDrawer'
import { supabase } from '../lib/supabase'

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  cartItems: CartItem[]
  discountAmount: number
  appliedCode: string
  onOrderComplete: () => void
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  discountAmount,
  appliedCode,
  onOrderComplete
}) => {
  if (!isOpen) return null

  const [step, setStep] = useState<'shipping' | 'success'>('shipping')
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    pincode: '',
    address: '',
    city: '',
    state: 'Delhi'
  })
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi' | 'card'>('cod')
  const [orderId, setOrderId] = useState<string>('')

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  const shipping = subtotal >= 2999 ? 0 : 199
  const total = Math.max(0, subtotal - discountAmount + shipping)

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const generatedId = 'UF-' + Math.floor(100000 + Math.random() * 900000)
    setOrderId(generatedId)

    // Save order into Supabase database
    try {
      const simplifiedItems = cartItems.map(item => ({
        id: item.product.id,
        title: item.product.title,
        price: item.product.price,
        size: item.size,
        quantity: item.quantity,
        image: item.product.image
      }))

      await supabase.from('orders').insert({
        id: generatedId,
        full_name: formData.fullName,
        phone: formData.phone,
        email: formData.email || null,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        pincode: formData.pincode,
        subtotal,
        discount: discountAmount,
        total,
        payment_method: paymentMethod,
        items: simplifiedItems,
        status: 'confirmed'
      })
    } catch (err) {
      console.warn('Supabase order insert note:', err)
    } finally {
      setSubmitting(false)
      setStep('success')
      onOrderComplete()
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div 
        className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 cursor-pointer"
        >
          <X size={18} />
        </button>

        {step === 'shipping' ? (
          <div className="space-y-6">
            <div>
              <h2 
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-2xl font-bold text-neutral-900"
              >
                Checkout &amp; Delivery
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                Enter your delivery address and choose your preferred payment option.
              </p>
            </div>

            {/* Order Items Summary Strip */}
            <div className="bg-[#FAF9F6] p-4 rounded-xl border border-neutral-100 flex items-center justify-between text-xs">
              <span className="font-semibold text-neutral-700">
                {cartItems.length} items in Bag
              </span>
              <span className="text-base font-bold text-neutral-900">
                Total: ₹{total.toLocaleString('en-IN')}
              </span>
            </div>

            <form onSubmit={handleSubmitOrder} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Ananya Sen"
                    className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-md focus:outline-none focus:border-amber-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-md focus:outline-none focus:border-amber-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                  Street Address &amp; Landmark *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Flat / House No., Colony / Street, Landmark"
                  className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-md focus:outline-none focus:border-amber-700"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="New Delhi"
                    className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-md focus:outline-none focus:border-amber-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder="Delhi"
                    className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-md focus:outline-none focus:border-amber-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 uppercase tracking-wider mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    placeholder="110001"
                    className="w-full px-3 py-2 text-xs border border-neutral-200 rounded-md focus:outline-none focus:border-amber-700"
                  />
                </div>
              </div>

              {/* Payment Methods */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-2">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div 
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-3.5 rounded-xl border flex flex-col items-center text-center gap-2 cursor-pointer transition-all ${
                      paymentMethod === 'cod' ? 'border-amber-700 bg-amber-50/50 shadow-xs' : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <Banknote className="text-amber-800" size={24} />
                    <span className="text-xs font-bold text-neutral-900">Cash on Delivery</span>
                    <span className="text-[10px] text-neutral-500">Pay upon receipt</span>
                  </div>

                  <div 
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-3.5 rounded-xl border flex flex-col items-center text-center gap-2 cursor-pointer transition-all ${
                      paymentMethod === 'upi' ? 'border-amber-700 bg-amber-50/50 shadow-xs' : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <QrCode className="text-amber-800" size={24} />
                    <span className="text-xs font-bold text-neutral-900">Instant UPI</span>
                    <span className="text-[10px] text-neutral-500">GPay, PhonePe, Paytm</span>
                  </div>

                  <div 
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3.5 rounded-xl border flex flex-col items-center text-center gap-2 cursor-pointer transition-all ${
                      paymentMethod === 'card' ? 'border-amber-700 bg-amber-50/50 shadow-xs' : 'border-neutral-200 hover:border-neutral-300'
                    }`}
                  >
                    <CreditCard className="text-amber-800" size={24} />
                    <span className="text-xs font-bold text-neutral-900">Card / NetBanking</span>
                    <span className="text-[10px] text-neutral-500">Visa, Mastercard, RuPay</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#8B1E3F] hover:bg-[#721532] text-white font-bold text-xs uppercase tracking-[0.2em] rounded-none shadow-xl cursor-pointer transition-all mt-4"
              >
                PLACE ORDER • ₹{total.toLocaleString('en-IN')}
              </button>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle size={36} />
            </div>

            <div className="space-y-1">
              <p className="text-xs uppercase font-bold tracking-widest text-emerald-700">Order Confirmed</p>
              <h2 
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-2xl sm:text-3xl font-bold text-neutral-900"
              >
                Thank You, {formData.fullName || 'Valued Customer'}!
              </h2>
              <p className="text-xs text-neutral-500">
                Your order has been registered in the system.
              </p>
            </div>

            <div className="bg-[#FAF9F6] p-4 rounded-xl border border-neutral-100 max-w-sm mx-auto text-xs space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-neutral-500">Order Reference:</span>
                <span className="font-bold text-neutral-900">{orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Total Paid / Due:</span>
                <span className="font-bold text-neutral-900">₹{total.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Delivery Address:</span>
                <span className="font-medium text-neutral-900 truncate max-w-[180px]">{formData.city}, {formData.state}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500">Estimated Delivery:</span>
                <span className="font-semibold text-emerald-800">In 2 - 4 Business Days</span>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 bg-neutral-900 hover:bg-amber-800 text-white font-bold text-xs uppercase tracking-widest rounded-none cursor-pointer transition-colors"
            >
              Continue Exploring
            </button>
          </div>
        )}

      </div>
    </div>
  )
}

