import { motion } from 'framer-motion'
import type { PropsWithChildren } from 'react'

type AnimatedSectionProps = PropsWithChildren<
  {
    className?: string
    delay?: number
    id?: string
  }
>

export function AnimatedSection({
  className = '',
  delay = 0,
  children,
  ...props
}: AnimatedSectionProps) {
  return (
    <motion.section
      {...props}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.section>
  )
}
