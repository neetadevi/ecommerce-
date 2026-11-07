import React, { useState } from 'react'
import { X, Ruler, Sparkles } from 'lucide-react'

interface SizeGuideModalProps {
  isOpen: boolean
  onClose: () => void
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null

  const [unit, setUnit] = useState<'inches' | 'cm'>('inches')

  const chartDataInches = [
    { size: 'XS', bust: '34', waist: '28', hips: '38', shoulder: '14.0', length: '46' },
    { size: 'S', bust: '36', waist: '30', hips: '40', shoulder: '14.5', length: '46' },
    { size: 'M', bust: '38', waist: '32', hips: '42', shoulder: '15.0', length: '47' },
    { size: 'L', bust: '40', waist: '34', hips: '44', shoulder: '15.5', length: '47' },
    { size: 'XL', bust: '42', waist: '36', hips: '46', shoulder: '16.0', length: '48' },
    { size: 'XXL', bust: '44', waist: '38', hips: '48', shoulder: '16.5', length: '48' },
    { size: '3XL', bust: '46', waist: '40', hips: '50', shoulder: '17.0', length: '49' },
    { size: '4XL', bust: '48', waist: '42', hips: '52', shoulder: '17.5', length: '49' },
  ]

  const chartDataCm = chartDataInches.map(row => ({
    size: row.size,
    bust: Math.round(Number(row.bust) * 2.54).toString(),
    waist: Math.round(Number(row.waist) * 2.54).toString(),
    hips: Math.round(Number(row.hips) * 2.54).toString(),
    shoulder: (Number(row.shoulder) * 2.54).toFixed(1),
    length: Math.round(Number(row.length) * 2.54).toString(),
  }))

  const activeData = unit === 'inches' ? chartDataInches : chartDataCm

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div 
        className="relative bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 cursor-pointer"
        >
          <X size={18} />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <Ruler className="text-amber-700" size={20} />
          <h3 
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-2xl font-bold text-neutral-900"
          >
            Inclusive Sizing Guide
          </h3>
        </div>
        
        <p className="text-xs text-neutral-500 mb-6">
          Crafted to flatter every Indian silhouette from XS to 4XL with precision ease allowance.
        </p>

        {/* Unit Toggle */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5 bg-amber-50 text-amber-900 px-3 py-1 rounded-full text-xs font-semibold">
            <Sparkles size={13} className="text-amber-600" />
            <span>Lakshita Tailored Fit Standards</span>
          </div>

          <div className="flex items-center border border-neutral-200 rounded-md p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setUnit('inches')}
              className={`px-3 py-1 rounded cursor-pointer font-bold ${
                unit === 'inches' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:text-black'
              }`}
            >
              Inches
            </button>
            <button
              type="button"
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 rounded cursor-pointer font-bold ${
                unit === 'cm' ? 'bg-neutral-900 text-white' : 'text-neutral-600 hover:text-black'
              }`}
            >
              CM
            </button>
          </div>
        </div>

        {/* Measurement Table */}
        <div className="overflow-x-auto border border-neutral-100 rounded-lg">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF9F6] border-b border-neutral-200 text-neutral-700 font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="p-3">Brand Size</th>
                <th className="p-3">Bust ({unit === 'inches' ? 'in' : 'cm'})</th>
                <th className="p-3">Waist ({unit === 'inches' ? 'in' : 'cm'})</th>
                <th className="p-3">Hips ({unit === 'inches' ? 'in' : 'cm'})</th>
                <th className="p-3">Shoulder</th>
                <th className="p-3">Kurta Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {activeData.map((row) => (
                <tr key={row.size} className="hover:bg-amber-50/40 transition-colors">
                  <td className="p-3 font-bold text-amber-900">{row.size}</td>
                  <td className="p-3 text-neutral-700">{row.bust}</td>
                  <td className="p-3 text-neutral-700">{row.waist}</td>
                  <td className="p-3 text-neutral-700">{row.hips}</td>
                  <td className="p-3 text-neutral-700">{row.shoulder}</td>
                  <td className="p-3 text-neutral-700">{row.length}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tip Box */}
        <div className="mt-5 p-3.5 bg-neutral-50 rounded-lg border border-neutral-100 text-[11px] text-neutral-600 leading-relaxed">
          <strong className="text-neutral-900 font-bold">Fit Tip:</strong> Our ethnic kurtas and velvet suit sets are tailored with standard 1.5-inch ease across bust and waist for effortless regal movement. We offer <strong className="text-amber-800">Free Lifetime Alterations</strong> at any brand boutique!
        </div>
      </div>
    </div>
  )
}

