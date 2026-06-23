import { motion } from 'framer-motion'

type FeatureCardProps = {
  icon: string
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ duration: 0.25 }}
      className="panel gold-outline h-full rounded-[28px] p-7"
    >
      <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-2xl">
        {icon}
      </div>
      <h3 className="font-display text-2xl text-cream">{title}</h3>
      <p className="mt-3 text-base leading-7 text-mist/80">{description}</p>
    </motion.div>
  )
}
