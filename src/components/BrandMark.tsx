import logoArt from '@/assets/infinite-shelves-logo.png'

type BrandMarkProps = {
  className?: string
}

export function BrandMark({ className = '' }: BrandMarkProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-gold/60 bg-[#170b2b] shadow-glow">
        <img
          src={logoArt}
          alt=""
          className="h-full w-full scale-[1.42] object-cover object-center"
          style={{ transformOrigin: '50% 35%' }}
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-inset ring-white/15" />
      </div>
      <div>
        <div className="font-display text-lg tracking-[0.24em] !text-[#38241b]">InfiniteShelves</div>
      </div>
    </div>
  )
}
