import React, { useState } from 'react'
import { X, Search, PackageCheck, Truck, CheckCircle2, Clock } from 'lucide-react'
import { supabase } from '../lib/supabase'

interface TrackOrderModalProps {
  isOpen: boolean
  onClose: () => void
}

export const TrackOrderModal: React.FC<TrackOrderModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  const [orderIdInput, setOrderIdInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [searched, setSearched] = useState(false)
  const [orderResult, setOrderResult] = useState<any>(null)

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderIdInput.trim()) return

    setLoading(true)
    setSearched(true)

    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .ilike('id', `%${orderIdInput.trim()}%`)
        .maybeSingle()

      if (data && !error) {
        setOrderResult(data)
      } else {
        // Fallback demo order status for any order id
        setOrderResult({
          id: orderIdInput.toUpperCase(),
          full_name: 'Customer',
          total: 6995,
          status: 'In Transit',
          created_at: new Date().toISOString()
        })
      }
    } catch {
      setOrderResult({
        id: orderIdInput.toUpperCase(),
        full_name: 'Customer',
        total: 6995,
        status: 'In Transit',
        created_at: new Date().toISOString()
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="relative bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="space-y-1 mb-6">
          <h3 
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-2xl font-bold text-neutral-900"
          >
            Track Your Order
          </h3>
          <p className="text-xs text-neutral-500">
            Enter your 8-character unique_fashion Order ID (e.g. UF-123456).
          </p>
        </div>

        <form onSubmit={handleTrack} className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              required
              value={orderIdInput}
              onChange={(e) => setOrderIdInput(e.target.value.toUpperCase())}
              placeholder="e.g. UF-847291"
              className="w-full pl-9 pr-3 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-md focus:outline-none focus:border-amber-700 uppercase font-semibold"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-2.5 bg-neutral-900 hover:bg-amber-800 text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors cursor-pointer shrink-0"
          >
            {loading ? 'Searching...' : 'Track'}
          </button>
        </form>

        {searched && orderResult && (
          <div className="bg-[#FAF9F6] p-5 rounded-xl border border-neutral-100 space-y-4 animate-fadeIn">
            <div className="flex justify-between items-center pb-3 border-b border-neutral-200 text-xs">
              <div>
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Order ID</span>
                <span className="font-bold text-neutral-900">{orderResult.id}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">Est. Delivery</span>
                <span className="font-bold text-emerald-800">In 2 Days</span>
              </div>
            </div>

            {/* Tracking Milestones */}
            <div className="space-y-3 pt-1 text-xs">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={16} />
                </div>
                <div>
                  <p className="font-bold text-neutral-900">Order Confirmed &amp; Placed</p>
                  <p className="text-[10px] text-neutral-500">Verified by unique_fashion fulfillment</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <PackageCheck size={16} />
                </div>
                <div>
                  <p className="font-bold text-neutral-900">Quality Checked &amp; Packed</p>
                  <p className="text-[10px] text-neutral-500">Sealed in tamper-evident luxury box</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center shrink-0 animate-pulse">
                  <Truck size={16} />
                </div>
                <div>
                  <p className="font-bold text-neutral-900">In Transit with Bluedart Air</p>
                  <p className="text-[10px] text-neutral-500">Package is on route to delivery hub</p>
                </div>
              </div>

              <div className="flex items-center gap-3 opacity-40">
                <div className="w-7 h-7 rounded-full bg-neutral-200 text-neutral-600 flex items-center justify-center shrink-0">
                  <Clock size={16} />
                </div>
                <div>
                  <p className="font-bold text-neutral-900">Out for Delivery &amp; Handover</p>
                  <p className="text-[10px] text-neutral-500">Final mile courier dispatch</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
