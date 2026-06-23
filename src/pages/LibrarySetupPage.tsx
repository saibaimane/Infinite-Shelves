import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BrandMark } from '@/components/BrandMark'

const weekdayLabels = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su']
const shelfTypes = [
  { name: 'Study', description: 'Notes, resources, and subjects.' },
  { name: 'Short Stories', description: 'Scenes and small worlds.' },
  { name: 'Novels', description: 'Chapters and long-form writing.' },
  { name: 'Journal', description: 'Thoughts and daily reflections.' },
  { name: 'Scrapbook', description: 'Images, keepsakes, and inspiration.' },
  { name: 'Magazine', description: 'Articles and collections to share.' },
]
const bookKinds = ['Lined book', 'Plain (non-ruled) book', 'Checked book', 'Customize your own']
const pageColours = [
  { name: 'Ivory', value: '#fff8e8' },
  { name: 'Parchment', value: '#f2deb5' },
  { name: 'Sand', value: '#ddbf8d' },
  { name: 'Blush', value: '#f5c9c4' },
  { name: 'Rose', value: '#e9a2ad' },
  { name: 'Coral', value: '#ef8c72' },
  { name: 'Orange', value: '#f0aa58' },
  { name: 'Sunny yellow', value: '#f4d65d' },
  { name: 'Lemon', value: '#f7ed9b' },
  { name: 'Mint', value: '#bfe3ca' },
  { name: 'Forest', value: '#78b58a' },
  { name: 'Aqua', value: '#8ed8d0' },
  { name: 'Sky', value: '#9fceed' },
  { name: 'Blue', value: '#7ca6df' },
  { name: 'Navy', value: '#5f78ae' },
  { name: 'Lilac', value: '#cab9e1' },
  { name: 'Violet', value: '#a78bc3' },
  { name: 'Plum', value: '#815e91' },
  { name: 'Cocoa', value: '#b98265' },
  { name: 'Brown', value: '#80543e' },
  { name: 'Grey', value: '#c9c6c3' },
  { name: 'Charcoal', value: '#837d78' },
]
const coverOptions = [
  { name: 'Cream', className: 'bg-[#f7ead4]' },
  { name: 'Earth', className: 'bg-[#b87951]' },
  { name: 'Gold', className: 'bg-[#d9ad5f]' },
  { name: 'Brown', className: 'bg-[#6a3e29]' },
]

type CreatedNotebook = {
  id: number
  name: string
  kind: string
  cover: string
  pageColour: string
}

type CreatedShelf = {
  id: number
  name: string
  type: string
  notebooks: CreatedNotebook[]
}

function ShelfTypeIcon({ type }: { type: string }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
      {type === 'Study' ? <><path {...common} d="M8 3h8M9 3v4l-4 9a3 3 0 0 0 3 4h8a3 3 0 0 0 3-4l-4-9V3" /><path {...common} d="M7 14h10" /></> : null}
      {type === 'Short Stories' ? <><path {...common} d="M5 4h10a4 4 0 0 1 4 4v12H9a4 4 0 0 0-4-4V4Z" /><path {...common} d="M9 9h6M9 13h5" /></> : null}
      {type === 'Novels' ? <><path {...common} d="M5 5c3-1 5 0 7 2v12c-2-2-4-3-7-2V5ZM19 5c-3-1-5 0-7 2v12c2-2 4-3 7-2V5Z" /></> : null}
      {type === 'Journal' ? <><path {...common} d="m6 18 1-4L17 4l3 3-10 10-4 1Z" /><path {...common} d="m15 6 3 3" /></> : null}
      {type === 'Scrapbook' ? <><rect {...common} x="4" y="5" width="16" height="14" rx="2" /><circle {...common} cx="9" cy="10" r="1.5" /><path {...common} d="m6 17 4-4 3 3 2-2 3 3" /></> : null}
      {type === 'Magazine' ? <><rect {...common} x="5" y="3" width="14" height="18" rx="2" /><path {...common} d="M8 8h8M8 12h8M8 16h5" /></> : null}
    </svg>
  )
}

function BookCover({ notebook, shelfType }: { notebook: CreatedNotebook; shelfType: string }) {
  const coverClass = coverOptions.find((option) => option.name === notebook.cover)?.className || 'bg-[#f7ead4]'
  const navigate = useNavigate()

  return (
    <div className="w-24 text-center">
      <button
        type="button"
        onClick={() => navigate(`/book/${notebook.id}`, { state: { notebook, shelfType } })}
        className="group w-full text-left"
        aria-label={`Open ${notebook.name}`}
      >
        <div className={`relative h-32 w-24 overflow-visible rounded-[8px] border border-[#bba893] ${coverClass} shadow-[0_9px_14px_rgba(75,43,28,0.2)] transition group-hover:-translate-y-1 group-hover:shadow-[0_13px_18px_rgba(75,43,28,0.24)]`}>
          <div className="absolute inset-y-0 left-1.5 w-px bg-[#8e765e]/35" />
          <div className="absolute inset-y-1 left-2.5 w-px bg-white/55" />
          <div className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-[#6a3e29]/15 bg-white/20 !text-[#416c43]">
            <ShelfTypeIcon type={shelfType} />
          </div>
          <div className="absolute right-[-9px] top-1/2 h-6 w-3 -translate-y-1/2 rounded-r-md border border-l-[#bba893] border-y-[#bba893] border-r-[#bba893] bg-[#d8d6bc] shadow-[2px_2px_4px_rgba(75,43,28,0.12)]" />
        </div>
      </button>
      <p className="mt-3 truncate font-medium !text-[#38241b]" title={notebook.name}>{notebook.name}</p>
      <p className="mt-1 text-xs !text-[#624333]">0 notes</p>
    </div>
  )
}

function LibraryCalendar() {
  const today = new Date()
  const [month, setMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1))
  const [selectedDay, setSelectedDay] = useState<number | null>(today.getDate())

  const firstWeekday = (month.getDay() + 6) % 7
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate()
  const monthLabel = month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  function changeMonth(offset: number) {
    setMonth((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1))
    setSelectedDay(null)
  }

  return (
    <div className="rounded-[32px] border border-[#d7b99b]/80 bg-[#fffdf8]/90 p-6 shadow-soft sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] !text-[#6a3e29]">Library calendar</p>
          <h2 className="mt-2 font-display text-2xl !text-[#38241b]">{monthLabel}</h2>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={() => changeMonth(-1)} aria-label="Previous month" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d7b99b] bg-white/60 text-lg transition hover:bg-gold/20">
            &lsaquo;
          </button>
          <button type="button" onClick={() => changeMonth(1)} aria-label="Next month" className="flex h-9 w-9 items-center justify-center rounded-full border border-[#d7b99b] bg-white/60 text-lg transition hover:bg-gold/20">
            &rsaquo;
          </button>
        </div>
      </div>

      <div className="mt-7 grid grid-cols-7 gap-y-2 text-center">
        {weekdayLabels.map((day) => <span key={day} className="pb-1 text-xs font-semibold !text-[#6a3e29]">{day}</span>)}
        {Array.from({ length: firstWeekday }).map((_, index) => <span key={`empty-${index}`} />)}
        {Array.from({ length: daysInMonth }, (_, index) => index + 1).map((day) => {
          const selected = selectedDay === day

          return (
            <button
              key={day}
              type="button"
              onClick={() => setSelectedDay(day)}
              className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full text-sm transition ${selected ? 'bg-gold font-semibold !text-[#38241b] shadow-glow' : 'hover:bg-[#ead6b9]'}`}
              aria-pressed={selected}
            >
              {day}
            </button>
          )
        })}
      </div>

      <p className="mt-7 border-t border-[#d7b99b]/70 pt-5 text-sm !text-[#624333]">
        {selectedDay ? `Selected: ${month.toLocaleDateString('en-US', { month: 'long' })} ${selectedDay}` : 'Choose a day to start planning.'}
      </p>
    </div>
  )
}

export function LibrarySetupPage() {
  const username = window.localStorage.getItem('infinite-shelves-username') || 'Creator'
  const [shelfPickerOpen, setShelfPickerOpen] = useState(false)
  const [selectedShelfType, setSelectedShelfType] = useState<string | null>(null)
  const [pickerStep, setPickerStep] = useState<'type' | 'name'>('type')
  const [shelfName, setShelfName] = useState('')
  const [createdShelves, setCreatedShelves] = useState<CreatedShelf[]>([])
  const [notebookShelfId, setNotebookShelfId] = useState<number | null>(null)
  const [notebookName, setNotebookName] = useState('')
  const [bookKind, setBookKind] = useState(bookKinds[0])
  const [coverOption, setCoverOption] = useState(coverOptions[0].name)
  const [pageColour, setPageColour] = useState(pageColours[0].value)

  function openShelfPicker() {
    setPickerStep('type')
    setSelectedShelfType(null)
    setShelfName('')
    setShelfPickerOpen(true)
  }

  function closeShelfPicker() {
    setShelfPickerOpen(false)
  }

  function createShelf() {
    if (!selectedShelfType) return

    setCreatedShelves((shelves) => [
      ...shelves,
      {
        id: Date.now(),
        name: shelfName.trim() || `${selectedShelfType} shelf`,
        type: selectedShelfType,
        notebooks: [],
      },
    ])
    closeShelfPicker()
  }

  function createNotebook() {
    if (!notebookShelfId) return

    setCreatedShelves((shelves) => shelves.map((shelf) => (
      shelf.id === notebookShelfId
        ? {
            ...shelf,
            notebooks: [
              ...shelf.notebooks,
              {
                id: Date.now(),
                name: notebookName.trim() || 'Untitled notebook',
                kind: bookKind,
                cover: coverOption,
                pageColour,
              },
            ],
          }
        : shelf
    )))
    setNotebookName('')
    setNotebookShelfId(null)
  }

  function openNotebookCreator(shelfId: number) {
    setNotebookName('')
    setBookKind(bookKinds[0])
    setCoverOption(coverOptions[0].name)
    setPageColour(pageColours[0].value)
    setNotebookShelfId(shelfId)
  }

  return (
    <main className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="section-shell">
        <header>
          <Link to="/" aria-label="InfiniteShelves home">
            <BrandMark />
          </Link>
        </header>

        <section className="relative mt-14 py-8">
          <div className="absolute -left-24 top-10 h-64 w-64 rounded-full bg-gold/10 blur-3xl" />
          <div className="absolute -right-20 -top-24 h-72 w-72 rounded-full border border-[#b87951]/20" />
          <div className="absolute bottom-8 right-10 h-28 w-28 rounded-full border border-dashed border-[#6a3e29]/20" />

          <div className="relative grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: 'easeOut' }}>
              <p className="text-xs font-semibold uppercase tracking-[0.34em] !text-[#6a3e29]">Your personal library</p>
              <h1 className="mt-5 font-display text-5xl leading-tight !text-[#38241b] sm:text-6xl">Hi, {username}.</h1>
              <p className="mt-5 max-w-xl text-lg leading-8 !text-[#624333]">
                This is where your ideas begin to gather - one shelf at a time, in a library made entirely for you.
              </p>
              <button type="button" onClick={openShelfPicker} className="mt-8 inline-flex items-center gap-3 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold !text-[#38241b] transition hover:-translate-y-0.5 hover:bg-[#e4b558]">
                <span className="text-xl leading-none">+</span>
                Add shelf
              </button>

              {createdShelves.length ? (
                <div className="mt-12 max-w-2xl space-y-12">
                  {createdShelves.map((shelf) => (
                    <motion.article
                      key={shelf.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-full"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#d7b99b] bg-gold/10 !text-[#6a3e29]">
                          <ShelfTypeIcon type={shelf.type} />
                        </div>
                        <h2 className="font-display text-2xl !text-[#38241b]">{shelf.name}</h2>
                      </div>
                      <div className="mt-4 flex flex-wrap items-start gap-5">
                        <div className="w-20 text-center">
                          <button
                            type="button"
                            onClick={() => openNotebookCreator(shelf.id)}
                            className="flex h-32 w-20 flex-col items-center justify-center rounded-xl border border-dashed border-[#9d806c] bg-[#fffdf8]/50 transition hover:border-gold hover:bg-gold/10"
                          >
                            <span className="text-3xl font-light leading-none !text-[#38241b]">+</span>
                            <span className="mt-2 text-center text-xs font-medium leading-4 !text-[#38241b]">New<br />Notebook</span>
                          </button>
                          <p className="mt-3 text-xs font-medium !text-[#6a3e29]">Create</p>
                        </div>
                        {shelf.notebooks.map((notebook) => (
                          <BookCover key={notebook.id} notebook={notebook} shelfType={shelf.type} />
                        ))}
                      </div>
                    </motion.article>
                  ))}
                </div>
              ) : null}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.08, ease: 'easeOut' }}
              className="relative mx-auto w-full max-w-sm lg:ml-auto lg:mr-0 lg:translate-x-10 lg:-translate-y-8"
            >
              <div className="absolute inset-5 rounded-[34px] bg-gold/10 blur-2xl" />
              <div className="relative"><LibraryCalendar /></div>
            </motion.div>
          </div>
        </section>
      </div>

      <AnimatePresence>
        {shelfPickerOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close shelf type picker"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeShelfPicker}
              className="fixed inset-0 z-[70] cursor-default bg-[#38241b]/30 backdrop-blur-sm"
            />
            <div className="fixed left-1/2 top-1/2 z-[80] w-[calc(100%-2rem)] max-w-3xl -translate-x-1/2 -translate-y-1/2">
              <motion.section
                role="dialog"
                aria-modal="true"
                aria-labelledby="shelf-picker-title"
                initial={{ opacity: 0, y: 24, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 18, scale: 0.97 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="w-full rounded-[32px] border border-[#d7b99b] bg-[#fffaf3] p-6 shadow-soft sm:p-9"
              >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] !text-[#6a3e29]">Add to your library</p>
                  <h2 id="shelf-picker-title" className="mt-3 font-display text-3xl !text-[#38241b] sm:text-4xl">
                    {pickerStep === 'type' ? 'What kind of shelf do you want to create?' : `Name your ${selectedShelfType} shelf`}
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={closeShelfPicker}
                  aria-label="Close shelf type picker"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d7b99b] text-xl transition hover:bg-gold/15"
                >
                  &times;
                </button>
              </div>

              {pickerStep === 'type' ? (
                <>
                  <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {shelfTypes.map((type) => {
                      const selected = selectedShelfType === type.name

                      return (
                        <button
                          key={type.name}
                          type="button"
                          onClick={() => setSelectedShelfType(type.name)}
                          aria-pressed={selected}
                          className={`rounded-2xl border p-4 text-left transition ${
                            selected ? 'border-gold bg-gold/15 shadow-glow' : 'border-[#d7b99b] bg-white/45 hover:bg-[#ead6b9]/45'
                          }`}
                        >
                          <p className="font-display text-xl !text-[#38241b]">{type.name}</p>
                          <p className="mt-2 text-sm leading-6 !text-[#624333]">{type.description}</p>
                        </button>
                      )
                    })}
                  </div>

                  <div className="mt-8 flex items-center justify-end gap-3">
                    <button type="button" onClick={closeShelfPicker} className="rounded-full px-5 py-3 text-sm font-semibold transition hover:bg-[#ead6b9]/45">
                      Cancel
                    </button>
                    <button
                      type="button"
                      disabled={!selectedShelfType}
                      onClick={() => setPickerStep('name')}
                      className="rounded-full bg-gold px-5 py-3 text-sm font-semibold !text-[#38241b] transition hover:bg-[#e4b558] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Continue
                    </button>
                  </div>
                </>
              ) : (
                <div className="mt-9">
                  <label className="block">
                    <span className="text-sm font-semibold !text-[#624333]">Shelf name</span>
                    <input
                      autoFocus
                      type="text"
                      value={shelfName}
                      onChange={(event) => setShelfName(event.target.value)}
                      placeholder={`My ${selectedShelfType || ''} shelf`}
                      className="mt-3 w-full rounded-2xl border border-[#d7b99b] bg-white/60 px-5 py-4 text-lg !text-[#38241b] outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/15"
                    />
                  </label>
                  <p className="mt-3 text-sm !text-[#624333]">You can change this name later.</p>
                  <div className="mt-8 flex items-center justify-end gap-3">
                    <button type="button" onClick={() => setPickerStep('type')} className="rounded-full px-5 py-3 text-sm font-semibold transition hover:bg-[#ead6b9]/45">
                      Back
                    </button>
                    <button type="button" onClick={createShelf} className="rounded-full bg-gold px-5 py-3 text-sm font-semibold !text-[#38241b] transition hover:bg-[#e4b558]">
                      Create shelf
                    </button>
                  </div>
                </div>
              )}
              </motion.section>
            </div>
          </>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {notebookShelfId ? (
          <>
            <motion.button
              type="button"
              aria-label="Close notebook creator"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setNotebookShelfId(null)}
              className="fixed inset-0 z-[70] cursor-default bg-[#38241b]/30 backdrop-blur-sm"
            />
            <div className="fixed left-1/2 top-1/2 z-[80] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2">
              <motion.section
                role="dialog"
                aria-modal="true"
                aria-labelledby="notebook-creator-title"
                initial={{ opacity: 0, y: 18, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 14, scale: 0.97 }}
                className="rounded-[30px] border border-[#d7b99b] bg-[#fffaf3] p-7 shadow-soft"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] !text-[#6a3e29]">Create a book</p>
                <h2 id="notebook-creator-title" className="mt-3 font-display text-3xl !text-[#38241b]">Customize your book</h2>
                <input
                  autoFocus
                  type="text"
                  value={notebookName}
                  onChange={(event) => setNotebookName(event.target.value)}
                  placeholder="My new notebook"
                  className="mt-6 w-full rounded-2xl border border-[#d7b99b] bg-white/60 px-5 py-4 !text-[#38241b] outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/15"
                />
                <div className="mt-6">
                  <p className="text-sm font-semibold !text-[#624333]">Book format</p>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {bookKinds.map((kind) => (
                      <button
                        key={kind}
                        type="button"
                        onClick={() => setBookKind(kind)}
                        className={`rounded-xl border px-3 py-3 text-left text-sm transition ${
                          bookKind === kind ? 'border-gold bg-gold/15 font-semibold' : 'border-[#d7b99b] bg-white/45 hover:bg-[#ead6b9]/45'
                        }`}
                      >
                        {kind}
                      </button>
                    ))}
                  </div>
                </div>
                {bookKind === 'Customize your own' ? (
                  <div className="mt-6 rounded-2xl border border-[#d7b99b] bg-white/45 p-4">
                    <p className="text-sm font-semibold !text-[#624333]">Customize your pages</p>
                    <div className="mt-4">
                      <p className="text-sm !text-[#624333]">Page colour</p>
                      <div className="mt-3 grid grid-cols-8 gap-2 sm:grid-cols-11">
                        {pageColours.map((colour) => (
                          <button
                            key={colour.value}
                            type="button"
                            onClick={() => setPageColour(colour.value)}
                            aria-label={`${colour.name} pages`}
                            title={colour.name}
                            className={`h-7 w-7 rounded-full border border-[#38241b]/15 transition hover:scale-110 ${pageColour === colour.value ? 'ring-2 ring-[#38241b] ring-offset-2 ring-offset-[#fffaf3]' : ''}`}
                            style={{ backgroundColor: colour.value }}
                          />
                        ))}
                      </div>
                      <label className="mt-4 flex items-center gap-3 text-sm !text-[#624333]">
                        Any colour
                        <input
                          type="color"
                          value={pageColour}
                          onChange={(event) => setPageColour(event.target.value)}
                          className="h-9 w-12 cursor-pointer rounded border border-[#d7b99b] bg-transparent p-1"
                        />
                      </label>
                    </div>
                    <div className="mt-5">
                      <p className="text-sm !text-[#624333]">Cover colour</p>
                      <div className="mt-3 flex flex-wrap gap-3">
                        {coverOptions.map((option) => (
                          <button
                            key={option.name}
                            type="button"
                            onClick={() => setCoverOption(option.name)}
                            aria-label={`${option.name} cover`}
                            className={`h-9 w-9 rounded-full ${option.className} transition ${coverOption === option.name ? 'ring-2 ring-[#38241b] ring-offset-2 ring-offset-[#fffaf3]' : 'hover:scale-110'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : null}
                <div className="mt-7 flex justify-end gap-3">
                  <button type="button" onClick={() => setNotebookShelfId(null)} className="rounded-full px-5 py-3 text-sm font-semibold transition hover:bg-[#ead6b9]/45">
                    Cancel
                  </button>
                  <button type="button" onClick={createNotebook} className="rounded-full bg-gold px-5 py-3 text-sm font-semibold !text-[#38241b] transition hover:bg-[#e4b558]">
                    Create book
                  </button>
                </div>
              </motion.section>
            </div>
          </>
        ) : null}
      </AnimatePresence>
    </main>
  )
}
