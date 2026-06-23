import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { BrandMark } from '@/components/BrandMark'

const navItems = [
  { label: 'Explore', href: '#explore' },
  { label: 'Writers', href: '#writers' },
  { label: 'Magazines', href: '#magazines' },
  { label: 'Books', href: '#books' },
  { label: 'Art', href: '#art' },
  { label: 'Community', href: '#community' },
]

export function NavBar() {
  const [open, setOpen] = useState(false)

  return (
    <div className="sticky top-4 z-50 section-shell">
      <div className="panel gold-outline mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link to="/" className="shrink-0">
          <BrandMark />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-mist/80 transition hover:text-cream"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <NavLink
            to="/create-library"
            className="rounded-full border border-white/10 px-5 py-2.5 text-sm text-cream transition hover:border-gold/40 hover:bg-white/5"
          >
            Login
          </NavLink>
          <NavLink
            to="/create-library"
            className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-[#241108] transition hover:-translate-y-0.5 hover:bg-[#E4B558]"
          >
            Create Library
          </NavLink>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 text-cream lg:hidden"
          aria-label="Toggle navigation"
        >
          <div className="space-y-1.5">
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
            <span className="block h-0.5 w-5 bg-current" />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="panel gold-outline mt-3 overflow-hidden lg:hidden"
          >
            <div className="flex flex-col px-5 py-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-3 py-3 text-mist/85 transition hover:bg-white/5 hover:text-cream"
                >
                  {item.label}
                </a>
              ))}
              <Link
                to="/create-library"
                onClick={() => setOpen(false)}
                className="mt-3 rounded-2xl border border-white/10 px-4 py-3 text-center text-cream"
              >
                Login
              </Link>
              <Link
                to="/create-library"
                onClick={() => setOpen(false)}
                className="mt-3 rounded-2xl bg-gold px-4 py-3 text-center font-semibold text-[#241108]"
              >
                Create Library
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}
