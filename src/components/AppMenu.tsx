import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { BrandMark } from '@/components/BrandMark'

const menuItems = [
  { label: 'Home', to: '/' },
  { label: 'My library', to: '/library-setup' },
  { label: 'Calendar', to: '/library-setup' },
  { label: 'Settings', to: '/library-setup' },
]

export function AppMenu() {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  if (location.pathname === '/' || location.pathname === '/create-library') {
    return null
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setMenuOpen(true)}
        aria-label="Open menu"
        className="fixed left-4 top-6 z-[60] flex h-10 w-10 flex-col items-center justify-center gap-1.5 transition hover:opacity-70"
      >
        <span className="h-0.5 w-5 rounded-full bg-[#38241b]" />
        <span className="h-0.5 w-5 rounded-full bg-[#38241b]" />
        <span className="h-0.5 w-5 rounded-full bg-[#38241b]" />
      </button>

      <AnimatePresence>
        {menuOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-[70] cursor-default bg-[#38241b]/20 backdrop-blur-[2px]"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="fixed inset-y-0 left-0 z-[80] flex w-[min(88vw,360px)] flex-col border-r border-[#d7b99b] bg-[#fffaf3] px-6 py-7 shadow-soft sm:px-8"
            >
              <div className="flex items-center justify-between">
                <BrandMark />
                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d7b99b] text-xl transition hover:bg-gold/15"
                >
                  ×
                </button>
              </div>

              <p className="mt-12 text-xs font-semibold uppercase tracking-[0.3em] !text-[#6a3e29]">Navigate</p>
              <nav className="mt-5 space-y-2">
                {menuItems.map((item, index) => (
                  <Link
                    key={item.label}
                    to={item.to}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center gap-4 rounded-2xl px-4 py-3.5 transition ${
                      index === 0 ? 'bg-gold/20 font-semibold' : 'hover:bg-[#ead6b9]/60'
                    }`}
                  >
                    <span className="text-xs !text-[#6a3e29]">0{index + 1}</span>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>

              <div className="mt-auto rounded-[24px] border border-[#d7b99b] bg-white/55 p-5">
                <p className="font-display text-xl !text-[#38241b]">Build your world</p>
                <p className="mt-2 text-sm leading-6 !text-[#624333]">Every shelf is a new place for your ideas to live.</p>
                <Link
                  to="/library-setup"
                  onClick={() => setMenuOpen(false)}
                  className="mt-4 inline-flex rounded-full bg-gold px-4 py-2.5 text-sm font-semibold !text-[#38241b] transition hover:bg-[#e4b558]"
                >
                  Add shelf
                </Link>
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  )
}
