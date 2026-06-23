import { motion } from 'framer-motion'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BrandMark } from '@/components/BrandMark'

type LibraryVisibility = 'private' | 'public'

const libraryTypes: Array<{
  id: LibraryVisibility
  title: string
  description: string
  detail: string
}> = [
  {
    id: 'private',
    title: 'Private Library',
    description: 'For journals, notes, personal projects, and private memories.',
    detail: 'Only you can access this library.',
  },
  {
    id: 'public',
    title: 'Public Library',
    description: 'For stories, articles, artwork, and magazines you want to share.',
    detail: 'Let people discover your creative world.',
  },
]

function LockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
      <rect x="5" y="10" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4 12h16M12 4c2.1 2.2 3.1 4.9 3.1 8S14.1 17.8 12 20c-2.1-2.2-3.1-4.9-3.1-8S9.9 6.2 12 4Z" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}

export function AuthPage() {
  const navigate = useNavigate()
  const [visibility, setVisibility] = useState<LibraryVisibility>('private')
  const [username, setUsername] = useState('')

  function beginLibrarySetup() {
    window.localStorage.setItem('infinite-shelves-username', username.trim() || 'Creator')
    navigate('/library-setup')
  }

  return (
    <div className="min-h-screen px-4 py-6 text-cream sm:px-6 lg:px-8">
      <div className="section-shell">
        <header className="mb-8 flex items-center justify-between">
          <Link to="/" aria-label="InfiniteShelves home">
            <BrandMark />
          </Link>
          <Link to="/" className="rounded-full px-4 py-2 text-sm text-mist/80 transition hover:bg-white/5 hover:text-cream">
            Back to home
          </Link>
        </header>

        <main className="grid gap-7 pb-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-8">
          <motion.section
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="panel gold-outline rounded-[32px] p-7 sm:p-10"
          >
            <p className="text-xs font-medium uppercase tracking-[0.34em] text-plum/85">Begin your archive</p>
            <h1 className="mt-4 font-display text-4xl leading-tight text-cream sm:text-5xl">Create your library</h1>
            <p className="mt-4 max-w-lg leading-7 text-mist/80">
              Claim your own corner of InfiniteShelves—made for the ideas, stories, and discoveries that matter to you.
            </p>

            <form className="mt-9 space-y-5">
              <label className="block">
                <span className="mb-2 block text-sm text-mist/85">Username</span>
                <input
                  required
                  type="text"
                  name="username"
                  placeholder="moonlit-writer"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="w-full rounded-2xl border border-[#d7b99b] bg-[#fffaf3] px-4 py-3.5 text-plum placeholder:text-mist/60 transition focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/15"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-mist/85">Email</span>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-[#d7b99b] bg-[#fffaf3] px-4 py-3.5 text-plum placeholder:text-mist/60 transition focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/15"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-mist/85">Password</span>
                <input
                  required
                  minLength={8}
                  type="password"
                  name="password"
                  placeholder="At least 8 characters"
                  className="w-full rounded-2xl border border-[#d7b99b] bg-[#fffaf3] px-4 py-3.5 text-plum placeholder:text-mist/60 transition focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/15"
                />
              </label>
              <label className="block">
                <span className="mb-2 block text-sm text-mist/85">Phone number <span className="text-mist/45">(optional)</span></span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 98765 43210"
                  className="w-full rounded-2xl border border-[#d7b99b] bg-[#fffaf3] px-4 py-3.5 text-plum placeholder:text-mist/60 transition focus:border-gold/60 focus:outline-none focus:ring-2 focus:ring-gold/15"
                />
              </label>

              <button
                type="submit"
                className="hidden"
              >
                Continue to your first shelf
                <span aria-hidden="true">→</span>
              </button>
            </form>
          </motion.section>

          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
            className="panel relative overflow-hidden rounded-[32px] p-7 sm:p-10"
          >
            <div className="absolute right-[-10%] top-[-5%] h-56 w-56 rounded-full bg-gold/10 blur-3xl" />
            <div className="relative">
              <p className="text-xs font-medium uppercase tracking-[0.34em] text-plum/85">Library setup</p>
              <h2 className="mt-4 font-display text-3xl leading-tight text-cream sm:text-4xl">How do you want your library?</h2>
              <p className="mt-4 max-w-xl leading-7 text-mist/80">You can change this later. Choose the kind of space that feels right for your first chapter.</p>

              <div className="mt-8 grid gap-5">
                {libraryTypes.map((option) => {
                  const selected = visibility === option.id
                  const Icon = option.id === 'private' ? LockIcon : GlobeIcon

                  return (
                    <button
                      key={option.id}
                      type="button"
                      onClick={() => setVisibility(option.id)}
                      className={`group relative rounded-[28px] border p-6 text-left transition duration-300 ${
                        selected
                          ? 'border-gold/65 bg-gold/10 shadow-glow'
                          : 'border-white/10 bg-white/[0.035] hover:border-gold/35 hover:bg-white/[0.07]'
                      }`}
                      aria-pressed={selected}
                    >
                      <div className="flex gap-4">
                        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${selected ? 'bg-gold text-[#241108]' : 'bg-white/10 text-plum'}`}>
                          <Icon />
                        </div>
                        <div>
                          <div className="flex items-center gap-3">
                            <h3 className="font-display text-2xl text-cream">{option.title}</h3>
                            {selected ? <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_12px_rgba(217,164,65,0.95)]" /> : null}
                          </div>
                          <p className="mt-2 leading-7 text-mist/80">{option.description}</p>
                          <p className="mt-2 text-sm font-medium text-plum/85">{option.detail}</p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>

              <button
                type="button"
                onClick={beginLibrarySetup}
                className="mx-auto mt-10 flex w-fit items-center justify-center gap-2 rounded-2xl bg-gold px-7 py-3.5 font-semibold text-[#241108] transition hover:-translate-y-0.5 hover:bg-[#e4b558] focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 focus:ring-offset-[#fffaf3]"
              >
                Get started
                <span aria-hidden="true">&rarr;</span>
              </button>

            </div>
          </motion.aside>
        </main>
      </div>
    </div>
  )
}
