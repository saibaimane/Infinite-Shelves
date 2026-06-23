import { motion } from 'framer-motion'

const floatingBooks = [
  { label: 'Stories', position: 'left-[8%] top-[14%]', delay: 0.1 },
  { label: 'Ideas', position: 'right-[8%] top-[20%]', delay: 0.25 },
  { label: 'Poems', position: 'left-[16%] bottom-[16%]', delay: 0.15 },
  { label: 'Art', position: 'right-[14%] bottom-[18%]', delay: 0.3 },
]

export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[560px]">
      <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-gold/10 via-white/5 to-transparent blur-3xl" />
      <div className="panel gold-outline relative h-full overflow-hidden rounded-[36px] bg-[radial-gradient(circle_at_top,_rgba(255,245,222,0.12),_transparent_35%),linear-gradient(160deg,_rgba(91,54,35,0.96),_rgba(39,22,16,0.98))]">
        <div className="absolute left-8 top-8 rounded-full border border-gold/35 bg-[#fff4df]/90 px-4 py-2 text-[11px] uppercase tracking-[0.34em] text-plum/90">
          InfiniteShelves
        </div>
        <div className="absolute inset-x-[20%] top-[12%] h-40 rounded-full bg-gold/20 blur-3xl" />

        {floatingBooks.map((book) => (
          <motion.div
            key={book.label}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, delay: book.delay, repeat: Infinity, ease: 'easeInOut' }}
            className={`absolute ${book.position} rounded-2xl border border-[#d7b99b]/60 bg-[#fff4df]/90 px-4 py-2 text-sm text-plum/90 backdrop-blur-lg`}
          >
            {book.label}
          </motion.div>
        ))}

        <div className="absolute inset-x-10 bottom-10 top-24">
          <div className="absolute inset-y-10 left-0 w-[18%] rounded-[28px] border border-white/10 bg-white/5" />
          <div className="absolute inset-y-16 right-0 w-[18%] rounded-[28px] border border-white/10 bg-white/5" />

          <div className="absolute left-[10%] top-[10%] grid gap-3">
            {[1, 2, 3].map((row) => (
              <div key={row} className="h-8 w-20 rounded-xl bg-gradient-to-r from-[#D7A341]/60 to-[#8B5D43]/30" />
            ))}
          </div>
          <div className="absolute right-[10%] top-[20%] grid gap-3">
            {[1, 2, 3].map((row) => (
              <div key={row} className="h-8 w-20 rounded-xl bg-gradient-to-r from-[#D7A341]/60 to-[#8B5D43]/30" />
            ))}
          </div>

          <div className="absolute bottom-[14%] left-1/2 h-[54%] w-[50%] -translate-x-1/2 rounded-[40px] border border-gold/25 bg-[#301b13]/60 shadow-glow">
            <div className="absolute left-1/2 top-[12%] h-[50%] w-[35%] -translate-x-1/2 rounded-[24px] border border-gold/50 bg-gradient-to-b from-[#6A3E29] to-[#301b13]" />
            <div className="absolute left-1/2 top-[23%] h-[30%] w-[16%] -translate-x-1/2 rounded-[18px] border border-gold/40 bg-[#1D100B]" />
            <div className="absolute bottom-[12%] left-1/2 h-[4px] w-[64%] -translate-x-1/2 rounded-full bg-gradient-to-r from-transparent via-gold to-transparent shadow-[0_0_24px_rgba(217,164,65,0.8)]" />
          </div>

          <div className="absolute bottom-[10%] left-1/2 h-[28%] w-[44%] -translate-x-1/2 rounded-[999px] bg-[radial-gradient(circle_at_center,_rgba(236,196,106,0.95),_rgba(217,164,65,0.35)_35%,_transparent_75%)] blur-lg" />
        </div>

        <motion.div
          animate={{ pathLength: [0.8, 1, 0.85], opacity: [0.85, 1, 0.9] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <path
              d="M56 16c-12 4-21 12-29 24-6 9-10 19-14 33 11-9 20-15 29-17 6-2 11-3 17-3-6 4-11 9-16 15 9-1 17-6 23-12 8-9 12-21 10-40Z"
              fill="rgba(248, 227, 163, 0.95)"
            />
            <path
              d="M21 69c14-9 26-14 36-15 9 0 16 2 22 8"
              stroke="rgba(246, 210, 122, 1)"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M34 73c11-3 21-3 30 0"
              stroke="rgba(217, 164, 65, 1)"
              strokeWidth="1.6"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M43 76c6 2 10 5 14 10"
              stroke="rgba(246, 210, 122, 0.95)"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
            />
          </svg>
        </motion.div>

        <div className="absolute bottom-8 left-8 right-8 grid grid-cols-3 gap-3">
          {[1, 2, 3].map((column) => (
            <div
              key={column}
              className="rounded-[22px] border border-white/10 bg-white/5 p-3 backdrop-blur-md"
            >
              <div className="space-y-2">
                {[1, 2, 3].map((row) => (
                  <div
                    key={row}
                    className="h-9 rounded-xl bg-gradient-to-r from-[#E2B250]/70 to-[#8B5D43]/40"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
