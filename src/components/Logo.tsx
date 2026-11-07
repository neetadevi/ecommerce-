import React from 'react'

interface LogoProps {
  variant?: 'light' | 'dark'
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export const Logo: React.FC<LogoProps> = ({ variant = 'dark', className = '', size = 'md' }) => {
  const isLight = variant === 'light'
  
  const textSizes = {
    sm: 'text-lg tracking-[0.25em]',
    md: 'text-2xl tracking-[0.3em]',
    lg: 'text-4xl tracking-[0.35em]'
  }

  const subSizes = {
    sm: 'text-[9px] tracking-[0.35em]',
    md: 'text-[11px] tracking-[0.45em]',
    lg: 'text-[13px] tracking-[0.5em]'
  }

  return (
    <div className={`inline-flex flex-col items-center select-none text-center ${className}`}>
      <div className="flex items-center gap-2">
        <span 
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontWeight: 700,
            color: isLight ? '#FFFFFF' : '#1A1A1A',
            letterSpacing: '0.22em',
            textTransform: 'uppercase'
          }}
          className={`${textSizes[size]} transition-colors duration-300`}
        >
          unique<span style={{ color: '#C59B27', fontWeight: 600 }}>_fashion</span>
        </span>
      </div>
      
      <div className="flex items-center gap-2 mt-0.5">
        <span 
          style={{ backgroundColor: '#C59B27', width: '20px', height: '1px', opacity: 0.8 }}
        />
        <span 
          style={{
            fontFamily: "'Cinzel', 'Montserrat', sans-serif",
            fontSize: '9px',
            color: isLight ? '#E5E5E5' : '#777777',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            fontWeight: 500
          }}
          className={subSizes[size]}
        >
          ETHNIC &amp; INDO-WESTERN
        </span>
        <span 
          style={{ backgroundColor: '#C59B27', width: '20px', height: '1px', opacity: 0.8 }}
        />
      </div>
    </div>
  )
}

