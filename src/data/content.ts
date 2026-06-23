import type { LibraryCard, ShelfOption } from '@/types'

export const featuredLibraries: LibraryCard[] = [
  {
    name: "Writer's Library",
    creator: 'Amara Vale',
    description: 'Novels, poems, and fragment notebooks arranged like a moonlit reading room.',
    tags: ['Novels', 'Poems', 'Stories'],
    gradient: 'from-[#5B2D91] via-[#342056] to-[#150C26]',
  },
  {
    name: "Artist's Gallery",
    creator: 'Milo Hart',
    description: 'Illustrations, design boards, and visual experiments collected in glowing frames.',
    tags: ['Illustrations', 'Designs', 'Artwork'],
    gradient: 'from-[#8B5CF6] via-[#56307D] to-[#1A102E]',
  },
  {
    name: 'Research Archive',
    creator: 'Dr. Sana Noor',
    description: 'Notes, discoveries, and experiments indexed like a living cabinet of curiosities.',
    tags: ['Notes', 'Projects', 'Discoveries'],
    gradient: 'from-[#7A4A17] via-[#472913] to-[#170D06]',
  },
  {
    name: 'Student Vault',
    creator: 'Leah Kim',
    description: 'Study notes, planners, and practical resources for building momentum every week.',
    tags: ['Study Notes', 'Planners', 'Resources'],
    gradient: 'from-[#314E8C] via-[#222E61] to-[#10162D]',
  },
]

export const onboardingShelves: ShelfOption[] = [
  {
    title: 'Notes',
    description: 'Study guides, saved insights, and knowledge you want close at hand.',
    icon: '\u{1F4DD}',
  },
  {
    title: 'Stories',
    description: 'Draft novels, short fiction, poetry, and chapter ideas.',
    icon: '\u{1F4D6}',
  },
  {
    title: 'Art',
    description: 'Illustrations, moodboards, experiments, and creative showcases.',
    icon: '\u{1F3A8}',
  },
  {
    title: 'Journal',
    description: 'Personal reflections, memories, and the quiet pieces of your world.',
    icon: '\u{1F319}',
  },
  {
    title: 'Ideas',
    description: 'Brainstorms, sparks, half-formed concepts, and next big things.',
    icon: '\u2728',
  },
  {
    title: 'Planner',
    description: 'Goals, weekly plans, routines, and systems that keep you moving.',
    icon: '\u{1F5D3}\uFE0F',
  },
]
