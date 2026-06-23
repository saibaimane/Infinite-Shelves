import { Link } from 'react-router-dom'
import { BrandMark } from '@/components/BrandMark'

export function Footer() {
  return (
    <footer className="section-shell pb-10 pt-16">
      <div className="panel gold-outline flex flex-col gap-8 rounded-[32px] px-6 py-8 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <BrandMark />
          <p className="mt-4 max-w-md text-sm leading-6 text-mist/75">
            InfiniteShelves is a digital universe where every person can build a library for ideas,
            stories, art, and the worlds they want to share.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-mist/80">
          <a href="#about" className="transition hover:text-cream">
            About
          </a>
          <a href="#community" className="transition hover:text-cream">
            Community
          </a>
          <a href="#privacy" className="transition hover:text-cream">
            Privacy
          </a>
          <a href="#terms" className="transition hover:text-cream">
            Terms
          </a>
          <Link to="/create-library" className="transition hover:text-cream">
            Create Library
          </Link>
        </div>
      </div>
      <p className="mt-6 text-center text-sm text-mist/50">(c) 2026 InfiniteShelves</p>
    </footer>
  )
}
