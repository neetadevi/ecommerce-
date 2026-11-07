import React from 'react'
import { ShieldCheck, Sparkles, Scissors, UserCheck, RefreshCw, Truck, MapPin, HeartHandshake } from 'lucide-react'

export const BrandPromise: React.FC = () => {
  const promises = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-amber-700" />,
      title: '25+ Years of Trust',
      desc: 'Dressing generations of Indian women with authentic silhouettes and uncompromised quality.'
    },
    {
      icon: <Sparkles className="w-8 h-8 text-amber-700" />,
      title: 'In-House Craftsmanship',
      desc: 'From initial sketch to hand-finishing, every piece is master-tailored in our artisan studios.'
    },
    {
      icon: <Scissors className="w-8 h-8 text-amber-700" />,
      title: 'Signature Embroidery',
      desc: 'Heritage Kashmiri threadwork, zardozi motifs, and exquisite sequin accents.'
    },
    {
      icon: <UserCheck className="w-8 h-8 text-amber-700" />,
      title: 'Inclusive Sizing (XS - 4XL)',
      desc: 'Every woman deserves perfection. Flattering fits tailored across diverse body shapes.'
    },
    {
      icon: <RefreshCw className="w-8 h-8 text-amber-700" />,
      title: 'Free Lifetime Alterations',
      desc: 'Bring your unique_fashion pieces to any boutique for complimentary adjustments.'
    },
    {
      icon: <Truck className="w-8 h-8 text-amber-700" />,
      title: 'Same Day Dispatch',
      desc: 'Pre-inspected rapid shipping with tamper-proof packaging across India.'
    }
  ]

  return (
    <section id="promise" className="py-20 bg-white border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-2">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-800 font-bold">
            Heritage &amp; Quality
          </p>
          <h2 
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900"
          >
            THE UNIQUE_FASHION PROMISE
          </h2>
          <div className="w-16 h-0.5 bg-amber-700 mx-auto mt-2" />
        </div>

        {/* 6 Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {promises.map((p, idx) => (
            <div
              key={idx}
              className="p-8 rounded-xl bg-[#FAF9F6] border border-neutral-100 hover:border-amber-200 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center space-y-3 group"
            >
              <div className="p-4 rounded-full bg-white shadow-xs group-hover:scale-110 transition-transform duration-300">
                {p.icon}
              </div>
              <h3 
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                className="text-lg font-bold text-neutral-900 group-hover:text-amber-800 transition-colors"
              >
                {p.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-xs">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Store Banner Strip */}
        <div id="stores" className="mt-16 rounded-2xl overflow-hidden relative bg-neutral-900 text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 text-amber-400 text-xs uppercase tracking-widest font-bold">
              <MapPin size={16} />
              Visit In Person
            </div>
            <h3 
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              className="text-2xl sm:text-3xl font-bold"
            >
              Experience 90+ Flagship Boutiques Across India
            </h3>
            <p className="text-neutral-400 text-xs sm:text-sm max-w-xl">
              Delhi NCR • Mumbai • Bengaluru • Chandigarh • Jaipur • Kolkata • Hyderabad • Lucknow
            </p>
          </div>

          <button
            type="button"
            className="whitespace-nowrap px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs uppercase tracking-widest rounded-none transition-all shadow-md cursor-pointer"
          >
            Locate Nearest Store
          </button>
        </div>

      </div>
    </section>
  )
}
