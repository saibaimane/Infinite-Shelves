import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { AnimatedSection } from '@/components/AnimatedSection'
import { FeatureCard } from '@/components/FeatureCard'
import { Footer } from '@/components/Footer'
import { NavBar } from '@/components/NavBar'
import { SectionHeading } from '@/components/SectionHeading'

const features = [
  {
    icon: '\u{1F4DA}',
    title: 'Create',
    description: 'Build your personal shelves and organize everything that inspires you.',
  },
  {
    icon: '\u270D\uFE0F',
    title: 'Create',
    description: 'Write stories, design collections, and turn ideas into creations.',
  },
  {
    icon: '\u{1F30E}',
    title: 'Share',
    description: 'Publish your work and let others discover your creative world.',
  },
]

function HeroOutline({ type, className }: { type: 'book' | 'quill' | 'shelves' | 'spark' | 'idea' | 'page'; className: string }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={`pointer-events-none absolute h-20 w-20 text-[#6a3e29]/30 ${className}`}>
      {type === 'book' ? (
        <>
          <path {...common} d="M8 14c9-4 18-2 24 5v32c-6-7-15-9-24-5V14Z" />
          <path {...common} d="M56 14c-9-4-18-2-24 5v32c6-7 15-9 24-5V14Z" />
          <path {...common} d="M32 19v32" />
        </>
      ) : null}
      {type === 'quill' ? (
        <>
          <path {...common} d="M49 8C31 11 18 23 14 44c9-11 17-16 27-18-7 5-12 11-16 19 12-3 20-10 25-21 4-8 4-15-1-16Z" />
          <path {...common} d="M13 51 34 29" />
          <path {...common} d="M18 52H9" />
        </>
      ) : null}
      {type === 'shelves' ? (
        <>
          <rect {...common} x="12" y="14" width="40" height="36" rx="3" />
          <path {...common} d="M12 26h40M12 38h40" />
          <path {...common} d="M19 19v5m7-5v5m12-5v5m7-5v5M20 31v5m9-5v5m10-5v5m6-5v5M18 43v5m12-5v5m8-5v5" />
        </>
      ) : null}
      {type === 'spark' ? <path {...common} d="m32 8 4.5 19.5L56 32l-19.5 4.5L32 56l-4.5-19.5L8 32l19.5-4.5L32 8Z" /> : null}
      {type === 'idea' ? (
        <>
          <path {...common} d="M22 39c-4-3-6-7-6-12a16 16 0 1 1 32 0c0 5-2 9-6 12-2 2-3 4-3 7H25c0-3-1-5-3-7Z" />
          <path {...common} d="M25 51h14M27 56h10" />
        </>
      ) : null}
      {type === 'page' ? (
        <>
          <path {...common} d="M18 8h20l8 8v40H18V8Z" />
          <path {...common} d="M38 8v10h8M25 29h14M25 37h14M25 45h9" />
        </>
      ) : null}
    </svg>
  )
}

export function LandingPage() {
  return (
    <div className="min-h-screen overflow-x-hidden text-cream">
      <NavBar />

      <main>
        <section className="section-shell relative pb-24 pt-10 sm:pt-16">
          <div className="absolute left-0 top-0 h-64 w-64 rounded-full bg-[#7A4A32]/15 blur-3xl" />
          <div className="absolute right-0 top-20 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />

          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative"
            >
              <div className="hidden lg:block">
                <HeroOutline type="book" className="-left-28 top-4 -rotate-12" />
                <HeroOutline type="quill" className="-right-24 top-16 rotate-12" />
                <HeroOutline type="shelves" className="-bottom-20 -left-14 rotate-6" />
                <HeroOutline type="spark" className="-bottom-14 -right-12 h-14 w-14" />
                <HeroOutline type="idea" className="-left-24 top-36 -rotate-6" />
                <HeroOutline type="page" className="right-8 bottom-8 rotate-6" />
              </div>
              <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-gold/20 bg-white/5 px-4 py-2 backdrop-blur-lg">
                <span className="h-2 w-2 rounded-full bg-gold shadow-[0_0_12px_rgba(217,164,65,0.95)]" />
                <p className="text-sm uppercase tracking-[0.28em] text-plum/80">
                  A creative archive for modern worldbuilders
                </p>
              </div>

              <h1 className="font-display text-5xl leading-tight text-cream sm:text-6xl lg:text-7xl">
                Your ideas.
                <br />
                Your world.
                <br />
                Infinite possibilities.
              </h1>

              <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-mist/80">
                A place where you create, organize, and share your own digital library.
              </p>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-mist/65">
                Build a personal library, create original work, share your creativity, and explore the
                worlds other people have carefully made.
              </p>

            </motion.div>
          </div>
        </section>

        <AnimatedSection className="section-shell py-20" delay={0.05} id="books">
          <SectionHeading
            eyebrow="How it works"
            title="Create your world"
            description="Start with your library, then create shelves for every interest—stories, ideas, art, study, and more. Add books and creations you love, then explore the worlds others have built."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {features.map((feature) => (
              <FeatureCard key={`${feature.title}-${feature.icon}`} {...feature} />
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection className="section-shell py-20">
          <div className="panel gold-outline relative overflow-hidden rounded-[36px] px-6 py-14 text-center sm:px-10 lg:px-16 lg:py-20">
            <div className="absolute left-1/2 top-0 h-40 w-64 -translate-x-1/2 rounded-full bg-gold/10 blur-3xl" />
            <SectionHeading
              eyebrow="Begin your archive"
              title="Your shelf is waiting."
              description="Start building your digital world today."
              align="center"
            />
            <div className="mt-10">
              <Link
                to="/create-library"
                className="inline-flex rounded-full bg-gold px-8 py-4 font-semibold text-[#241108] transition hover:-translate-y-1 hover:bg-[#E4B558]"
              >
                Create Your Library
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </main>

      <Footer />
    </div>
  )
}
