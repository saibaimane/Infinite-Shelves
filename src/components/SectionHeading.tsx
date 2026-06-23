type SectionHeadingProps = {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow ? (
        <p className="mb-4 text-sm uppercase tracking-[0.38em] text-plum/80">{eyebrow}</p>
      ) : null}
      <h2 className="font-display text-3xl text-cream sm:text-4xl lg:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-base leading-7 text-mist/80">{description}</p> : null}
    </div>
  )
}
