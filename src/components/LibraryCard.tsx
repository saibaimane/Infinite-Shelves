import { motion } from 'framer-motion'
import type { LibraryCard as LibraryCardType } from '@/types'

type LibraryCardProps = {
  card: LibraryCardType
}

export function LibraryCard({ card }: LibraryCardProps) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.28 }}
      className="panel group overflow-hidden rounded-[30px] border border-white/10"
    >
      <div className={`relative h-56 bg-gradient-to-br ${card.gradient} p-5`}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(245,235,221,0.18),_transparent_38%)]" />
        <div className="relative flex h-full flex-col justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-plum/80">Featured Library</p>
            <h3 className="mt-3 font-display text-3xl text-cream">{card.name}</h3>
            <div className="mt-3 inline-flex rounded-full border border-white/10 bg-black/20 px-3 py-1 text-sm text-cream/75">
              by {card.creator}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {card.tags.map((tag) => (
              <div
                key={tag}
                className="rounded-2xl border border-white/10 bg-white/10 px-3 py-4 text-center text-xs text-cream/80"
              >
                {tag}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="p-6">
        <p className="text-sm leading-7 text-mist/80">{card.description}</p>
        <div className="mt-5 flex items-center justify-between">
          <div className="flex gap-2">
            {card.tags.slice(0, 2).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-gold/20 bg-gold/10 px-3 py-1 text-xs text-plum"
              >
                {tag}
              </span>
            ))}
          </div>
          <span className="text-sm text-plum transition group-hover:translate-x-1">{'->'}</span>
        </div>
      </div>
    </motion.div>
  )
}
