import React, { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false)
  const phoneNumber = '919876543210'
  const message = encodeURIComponent('Hello unique_fashion! I would like to inquire about products and orders.')
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 flex items-center select-none">
      
      {/* Tooltip hint */}
      {showTooltip && (
        <div className="mr-3 bg-white text-neutral-900 text-xs py-2 px-3.5 rounded-xl shadow-xl border border-neutral-100 flex items-center gap-2 animate-fadeIn">
          <span>Need styling advice? Chat on WhatsApp</span>
          <button
            type="button"
            onClick={() => setShowTooltip(false)}
            className="text-neutral-400 hover:text-black cursor-pointer"
          >
            <X size={13} />
          </button>
        </div>
      )}

      {/* WhatsApp Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setShowTooltip(true)}
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba59] text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group"
        title="Chat on WhatsApp"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={26} className="fill-white" />
      </a>
    </div>
  )
}
