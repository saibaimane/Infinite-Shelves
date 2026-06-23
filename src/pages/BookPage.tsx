import { type PointerEvent, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

type BookData = {
  id: number
  name: string
  kind: string
  cover: string
  pageColour: string
}

type BookLocationState = {
  notebook?: BookData
  shelfType?: string
}

type ImageShape = 'Square' | 'Rounded' | 'Circle'

type PlacedImage = {
  id: number
  pageIndex: number
  src: string
  shape: ImageShape
  zoom: number
  x: number
  y: number
}

type CropBox = {
  x: number
  y: number
  width: number
  height: number
}

type PlacedTable = {
  id: number
  pageIndex: number
  rows: number
  columns: number
  cellWidth: number
  cellHeight: number
  lineThickness: number
  lineColour: string
  solidFill: boolean
  fillColour: string
  x: number
  y: number
}

type ChartKind = 'Pie' | 'Doughnut' | 'Line' | 'Column' | 'Bar' | 'Area'

type ChartPoint = {
  label: string
  value: number
  color: string
}

type PlacedChart = {
  id: number
  pageIndex: number
  name: string
  kind: ChartKind
  points: ChartPoint[]
  showPercentages: boolean
  x: number
  y: number
}

function ShapeIcon({ shape }: { shape: ImageShape }) {
  const shapeClass = shape === 'Circle' ? 'rounded-full' : shape === 'Rounded' ? 'rounded-lg' : 'rounded-none'

  return <span className={`block h-5 w-5 border-2 border-[#6a3e29] ${shapeClass}`} />
}

function pagePattern(kind: string) {
  const normalizedKind = kind.toLowerCase()

  if (normalizedKind.includes('lined') || normalizedKind.includes('ruled')) {
    return 'repeating-linear-gradient(to bottom, transparent 0, transparent 30px, rgba(106,62,41,0.3) 31px, rgba(106,62,41,0.3) 32px)'
  }

  if (normalizedKind.includes('checked') || normalizedKind.includes('grid')) {
    return 'linear-gradient(rgba(106,62,41,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(106,62,41,0.25) 1px, transparent 1px)'
  }

  return undefined
}

function imageShapeClass(shape: ImageShape) {
  if (shape === 'Circle') return 'rounded-full'
  if (shape === 'Square') return 'rounded-none'
  return 'rounded-2xl'
}

function ChartGraphic({ chart }: { chart: PlacedChart }) {
  const total = chart.points.reduce((sum, point) => sum + Math.max(0, point.value), 0) || 1

  if (chart.kind === 'Pie' || chart.kind === 'Doughnut') {
    let progress = 0
    const stops = chart.points.map((point) => {
      const start = (progress / total) * 100
      progress += Math.max(0, point.value)
      const end = (progress / total) * 100
      return `${point.color} ${start}% ${end}%`
    }).join(', ')

    return (
      <div className="h-full">
        {chart.name ? <p className="mb-2 font-display text-base !text-[#38241b]">{chart.name}</p> : null}
        <div className="flex h-[calc(100%-1.75rem)] items-center gap-4">
          <div className="relative h-32 w-32 shrink-0 rounded-full" style={{ background: `conic-gradient(${stops})` }}>
            {chart.kind === 'Doughnut' ? <div className="absolute inset-8 rounded-full bg-[#fffaf3]" /> : null}
          </div>
          <div className="space-y-2 text-xs !text-[#624333]">
            {chart.points.map((point) => (
              <div key={point.label} className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: point.color }} /><span>{point.label}</span>{chart.showPercentages ? <span>{Math.round((point.value / total) * 100)}%</span> : <span>{point.value}</span>}</div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const maxValue = Math.max(...chart.points.map((point) => point.value), 1)
  if (chart.kind === 'Column' || chart.kind === 'Bar') {
    const horizontal = chart.kind === 'Bar'

    return (
      <div className="h-full">
        {chart.name ? <p className="mb-2 font-display text-base !text-[#38241b]">{chart.name}</p> : null}
        <div className={`flex h-[calc(100%-1.75rem)] gap-3 ${horizontal ? 'flex-col justify-center' : 'items-end border-b border-[#bba893] px-2 pb-5'}`}>
          {chart.points.map((point) => horizontal ? (
            <div key={point.label} className="flex items-center gap-2 text-xs !text-[#624333]"><span className="w-12 truncate">{point.label}</span><div className="h-5 rounded-r" style={{ width: `${(point.value / maxValue) * 150}px`, backgroundColor: point.color }} /></div>
          ) : (
            <div key={point.label} className="flex flex-1 flex-col items-center justify-end gap-2 text-xs !text-[#624333]"><div className="w-full max-w-9 rounded-t" style={{ height: `${(point.value / maxValue) * 120}px`, backgroundColor: point.color }} /><span>{point.label}</span></div>
          ))}
        </div>
      </div>
    )
  }

  const linePoints = chart.points.map((point, index) => {
    const x = chart.points.length === 1 ? 50 : 8 + (index / (chart.points.length - 1)) * 84
    const y = 88 - (point.value / maxValue) * 72
    return `${x},${y}`
  }).join(' ')

  return (
    <div className="h-full">
      {chart.name ? <p className="mb-2 font-display text-base !text-[#38241b]">{chart.name}</p> : null}
      <svg viewBox="0 0 100 100" className="h-[calc(100%-1.75rem)] w-full" preserveAspectRatio="none">
        <path d="M8 92H94M8 10V92" stroke="#bba893" strokeWidth="1" fill="none" />
        {chart.kind === 'Area' ? <polygon points={`8,92 ${linePoints} 92,92`} fill={`${chart.points[0]?.color || '#b98535'}55`} /> : null}
        <polyline points={linePoints} fill="none" stroke={chart.points[0]?.color || '#b98535'} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
    </div>
  )
}

export function BookPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const { notebook, shelfType } = (location.state || {}) as BookLocationState
  const [pages, setPages] = useState([''])
  const [insertOpen, setInsertOpen] = useState(false)
  const [activePageIndex, setActivePageIndex] = useState(0)
  const [imageDialogOpen, setImageDialogOpen] = useState(false)
  const [tableDesignerOpen, setTableDesignerOpen] = useState(false)
  const [tableRows, setTableRows] = useState(3)
  const [tableColumns, setTableColumns] = useState(3)
  const [tableLineThickness, setTableLineThickness] = useState(1)
  const [tableLineColour, setTableLineColour] = useState('#6a3e29')
  const [tableSolidFill, setTableSolidFill] = useState(false)
  const [tableFillColour, setTableFillColour] = useState('#fffaf3')
  const [tableCellWidth, setTableCellWidth] = useState(120)
  const [tableCellHeight, setTableCellHeight] = useState(44)
  const [chartDesignerOpen, setChartDesignerOpen] = useState(false)
  const [chartKind, setChartKind] = useState<ChartKind>('Pie')
  const [chartName, setChartName] = useState('')
  const [chartShowPercentages, setChartShowPercentages] = useState(true)
  const [chartPoints, setChartPoints] = useState<ChartPoint[]>([
    { label: 'Item A', value: 40, color: '#b98535' },
    { label: 'Item B', value: 35, color: '#b87951' },
    { label: 'Item C', value: 25, color: '#8fba9a' },
  ])
  const [calculatorOpen, setCalculatorOpen] = useState(false)
  const [calculatorMode, setCalculatorMode] = useState<'Simple' | 'Scientific'>('Simple')
  const [calculation, setCalculation] = useState('')
  const [calculationResult, setCalculationResult] = useState('0')
  const [imageSourceTab, setImageSourceTab] = useState<'Upload' | 'URL' | 'Paste'>('Upload')
  const [imageUrl, setImageUrl] = useState('')
  const [imageSrc, setImageSrc] = useState('')
  const [imageShape, setImageShape] = useState<ImageShape>('Rounded')
  const [shapeMenuOpen, setShapeMenuOpen] = useState(false)
  const [lassoEnabled, setLassoEnabled] = useState(false)
  const [lassoing, setLassoing] = useState(false)
  const [lassoPoints, setLassoPoints] = useState<Array<{ x: number; y: number }>>([])
  const [placedImages, setPlacedImages] = useState<PlacedImage[]>([])
  const [placedTables, setPlacedTables] = useState<PlacedTable[]>([])
  const [placedCharts, setPlacedCharts] = useState<PlacedChart[]>([])
  const [editingImageId, setEditingImageId] = useState<number | null>(null)
  const dragRef = useRef<{ id: number; startX: number; startY: number; x: number; y: number } | null>(null)
  const tableDragRef = useRef<{ id: number; startX: number; startY: number; x: number; y: number } | null>(null)
  const chartDragRef = useRef<{ id: number; startX: number; startY: number; x: number; y: number } | null>(null)
  const selectionRangeRef = useRef<Range | null>(null)
  const [cropBox, setCropBox] = useState<CropBox>({ x: 12, y: 10, width: 76, height: 80 })
  const cropDragRef = useRef<{ mode: 'move' | 'resize'; startX: number; startY: number; crop: CropBox; rect: DOMRect } | null>(null)

  if (!notebook) {
    return (
      <main className="min-h-screen px-5 py-8 sm:px-8">
        <button type="button" onClick={() => navigate('/library-setup')} className="rounded-full bg-gold px-5 py-3 text-sm font-semibold !text-[#38241b]">
          Back to library
        </button>
        <p className="mt-12 font-display text-3xl !text-[#38241b]">This book is not open yet.</p>
      </main>
    )
  }

  const pattern = pagePattern(notebook.kind)
  const isRuled = notebook.kind.toLowerCase().includes('lined') || notebook.kind.toLowerCase().includes('ruled')
  const pageStyle = {
    backgroundColor: notebook.pageColour,
  }
  const editorStyle = {
    backgroundImage: pattern,
    backgroundSize: notebook.kind.toLowerCase().includes('checked') ? '32px 32px' : undefined,
    backgroundPosition: isRuled ? '0 -8px' : undefined,
  }

  function updatePage(index: number, content: string) {
    setPages((currentPages) => currentPages.map((page, pageIndex) => (pageIndex === index ? content : page)))
  }

  function addPage() {
    setPages((currentPages) => [...currentPages, ''])
  }

  function saveSelection() {
    const selection = window.getSelection()
    if (selection?.rangeCount) selectionRangeRef.current = selection.getRangeAt(0).cloneRange()
  }

  function restoreSelection() {
    const selection = window.getSelection()
    if (!selection || !selectionRangeRef.current) return
    selection.removeAllRanges()
    selection.addRange(selectionRangeRef.current)
  }

  function runCommand(command: string, value?: string) {
    restoreSelection()
    document.execCommand(command, false, value)
    saveSelection()
  }

  function openImageWorkspace(image?: PlacedImage) {
    setImageSourceTab(image ? 'Paste' : 'Upload')
    setImageUrl('')
    setImageSrc(image?.src || '')
    setImageShape(image?.shape || 'Rounded')
    setShapeMenuOpen(false)
    setCropBox({ x: 12, y: 10, width: 76, height: 80 })
    setLassoEnabled(false)
    setLassoPoints([])
    setEditingImageId(image?.id || null)
    setImageDialogOpen(true)
  }

  function loadImageFile(file: File) {
    const reader = new FileReader()
    reader.onload = () => setImageSrc(String(reader.result))
    reader.readAsDataURL(file)
  }

  async function cropImage(source: string) {
    const image = new Image()
    if (!source.startsWith('data:')) image.crossOrigin = 'anonymous'
    image.src = source
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve()
      image.onerror = () => reject(new Error('Image could not be cropped'))
    })

    const sourceX = (cropBox.x / 100) * image.naturalWidth
    const sourceY = (cropBox.y / 100) * image.naturalHeight
    const sourceWidth = (cropBox.width / 100) * image.naturalWidth
    const sourceHeight = (cropBox.height / 100) * image.naturalHeight
    const canvas = document.createElement('canvas')
    canvas.width = Math.max(1, Math.round(sourceWidth))
    canvas.height = Math.max(1, Math.round(sourceHeight))
    canvas.getContext('2d')?.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, canvas.width, canvas.height)
    return canvas.toDataURL('image/png')
  }

  async function placeImage() {
    const source = imageSrc || imageUrl.trim()
    if (!source) return

    let croppedSource = source
    try {
      croppedSource = await cropImage(source)
    } catch {
      // Some external image URLs block canvas access. The image is still placed without a destructive crop.
    }

    setPlacedImages((images) => {
      if (editingImageId) {
        return images.map((image) => image.id === editingImageId ? { ...image, src: croppedSource, shape: imageShape, zoom: 1 } : image)
      }

      return [
        ...images,
        {
          id: Date.now(),
          pageIndex: activePageIndex,
          src: croppedSource,
          shape: imageShape,
          zoom: 1,
          x: 56,
          y: 72,
        },
      ]
    })
    setEditingImageId(null)
    setImageDialogOpen(false)
    setInsertOpen(false)
  }

  function startImageDrag(event: PointerEvent<HTMLDivElement>, image: PlacedImage) {
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    dragRef.current = { id: image.id, startX: event.clientX, startY: event.clientY, x: image.x, y: image.y }
  }

  function moveImage(event: PointerEvent<HTMLDivElement>) {
    const drag = dragRef.current
    if (!drag) return

    setPlacedImages((images) => images.map((image) => (
      image.id === drag.id
        ? { ...image, x: Math.max(0, drag.x + event.clientX - drag.startX), y: Math.max(0, drag.y + event.clientY - drag.startY) }
        : image
    )))
  }

  function startTableDrag(event: PointerEvent<HTMLDivElement>, table: PlacedTable) {
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    tableDragRef.current = { id: table.id, startX: event.clientX, startY: event.clientY, x: table.x, y: table.y }
  }

  function moveTable(event: PointerEvent<HTMLDivElement>) {
    const drag = tableDragRef.current
    if (!drag) return

    setPlacedTables((tables) => tables.map((table) => (
      table.id === drag.id
        ? { ...table, x: Math.max(0, drag.x + event.clientX - drag.startX), y: Math.max(0, drag.y + event.clientY - drag.startY) }
        : table
    )))
  }

  function startChartDrag(event: PointerEvent<HTMLDivElement>, chart: PlacedChart) {
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    chartDragRef.current = { id: chart.id, startX: event.clientX, startY: event.clientY, x: chart.x, y: chart.y }
  }

  function moveChart(event: PointerEvent<HTMLDivElement>) {
    const drag = chartDragRef.current
    if (!drag) return

    setPlacedCharts((charts) => charts.map((chart) => (
      chart.id === drag.id
        ? { ...chart, x: Math.max(0, drag.x + event.clientX - drag.startX), y: Math.max(0, drag.y + event.clientY - drag.startY) }
        : chart
    )))
  }

  function addLassoPoint(event: PointerEvent<SVGSVGElement>) {
    if (!lassoEnabled) return
    const rect = event.currentTarget.getBoundingClientRect()
    const point = {
      x: ((event.clientX - rect.left) / rect.width) * 300,
      y: ((event.clientY - rect.top) / rect.height) * 200,
    }
    setLassoPoints((points) => [...points, point])
  }

  function startCropDrag(event: PointerEvent<HTMLDivElement>, mode: 'move' | 'resize') {
    event.preventDefault()
    event.stopPropagation()
    const preview = event.currentTarget.closest('[data-crop-preview]')
    if (!preview) return
    event.currentTarget.setPointerCapture(event.pointerId)
    cropDragRef.current = { mode, startX: event.clientX, startY: event.clientY, crop: cropBox, rect: preview.getBoundingClientRect() }
  }

  function moveCropDrag(event: PointerEvent<HTMLDivElement>) {
    const drag = cropDragRef.current
    if (!drag) return
    const deltaX = ((event.clientX - drag.startX) / drag.rect.width) * 100
    const deltaY = ((event.clientY - drag.startY) / drag.rect.height) * 100

    setCropBox(() => {
      if (drag.mode === 'move') {
        return {
          ...drag.crop,
          x: Math.min(100 - drag.crop.width, Math.max(0, drag.crop.x + deltaX)),
          y: Math.min(100 - drag.crop.height, Math.max(0, drag.crop.y + deltaY)),
        }
      }

      return {
        ...drag.crop,
        width: Math.min(100 - drag.crop.x, Math.max(20, drag.crop.width + deltaX)),
        height: Math.min(100 - drag.crop.y, Math.max(20, drag.crop.height + deltaY)),
      }
    })
  }

  function openTableDesigner() {
    saveSelection()
    setTableDesignerOpen(true)
  }

  function insertDesignedTable() {
    setPlacedTables((tables) => [
      ...tables,
      {
        id: Date.now(),
        pageIndex: activePageIndex,
        rows: tableRows,
        columns: tableColumns,
        cellWidth: tableCellWidth,
        cellHeight: tableCellHeight,
        lineThickness: tableLineThickness,
        lineColour: tableLineColour,
        solidFill: tableSolidFill,
        fillColour: tableFillColour,
        x: 64,
        y: 120,
      },
    ])
    setTableDesignerOpen(false)
    setInsertOpen(false)
  }

  function openChartDesigner() {
    setChartName('')
    setChartDesignerOpen(true)
  }

  function updateChartPoint(index: number, updates: Partial<ChartPoint>) {
    setChartPoints((points) => points.map((point, pointIndex) => pointIndex === index ? { ...point, ...updates } : point))
  }

  function evaluateCalculation() {
    try {
      const source = calculation.toLowerCase().replace(/\s/g, '').replace(/π/g, 'pi')
      const remaining = source.replace(/sin|cos|tan|log|sqrt|pi/g, '')
      if (!remaining || !/^[0-9+\-*/().,^]*$/.test(remaining)) throw new Error('Invalid expression')

      const expression = source.replace(/\^/g, '**')
      const sin = (value: number) => Math.sin((value * Math.PI) / 180)
      const cos = (value: number) => Math.cos((value * Math.PI) / 180)
      const tan = (value: number) => Math.tan((value * Math.PI) / 180)
      const result = Function('sin', 'cos', 'tan', 'log', 'sqrt', 'pi', `return (${expression})`)(sin, cos, tan, Math.log10, Math.sqrt, Math.PI) as number
      setCalculationResult(Number.isFinite(result) ? String(Number(result.toFixed(10))) : 'Error')
    } catch {
      setCalculationResult('Error')
    }
  }

  function calculatorInput(value: string) {
    if (value === 'C') {
      setCalculation('')
      setCalculationResult('0')
      return
    }
    if (value === 'Back') {
      setCalculation((current) => current.slice(0, -1))
      return
    }
    if (value === '=') {
      evaluateCalculation()
      return
    }
    setCalculation((current) => current + value)
  }

  function insertDesignedChart() {
    setPlacedCharts((charts) => [
      ...charts,
      {
        id: Date.now(),
        pageIndex: activePageIndex,
        name: chartName.trim(),
        kind: chartKind,
        points: chartPoints,
        showPercentages: chartShowPercentages,
        x: 78,
        y: 110,
      },
    ])
    setChartDesignerOpen(false)
    setInsertOpen(false)
  }

  function insertLink() {
    const url = window.prompt('Paste the link URL')
    if (url) runCommand('createLink', url)
    setInsertOpen(false)
  }

  return (
    <main className="min-h-screen px-4 py-5 sm:px-6 lg:px-8">
      <div className="section-shell">
        <header className="sticky top-4 z-20 rounded-2xl border border-[#d7b99b] bg-[#fffaf3]/95 px-4 py-3 shadow-soft backdrop-blur-xl sm:px-5">
          <div className="flex items-center gap-4">
            <div className="flex min-w-0 items-center gap-3 pl-12 sm:pl-14">
              <button type="button" onClick={() => navigate('/library-setup')} className="rounded-full border border-[#d7b99b] px-3 py-2 text-sm font-semibold transition hover:bg-gold/15">
                Back
              </button>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] !text-[#6a3e29]">{shelfType || 'Personal library'}</p>
                <h1 className="truncate font-display text-xl !text-[#38241b] sm:text-2xl">{notebook.name}</h1>
              </div>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-1 border-t border-[#d7b99b]/70 pt-3">
            {insertOpen ? (
              <>
                <button type="button" onClick={() => setInsertOpen(false)} className="rounded-lg border border-[#d7b99b] px-3 py-2 text-sm font-semibold transition hover:bg-gold/15">Home</button>
                <button type="button" onClick={() => openImageWorkspace()} className="rounded-lg px-3 py-2 text-sm transition hover:bg-[#ead6b9]/55">Image</button>
                <button type="button" onMouseDown={(event) => { event.preventDefault(); saveSelection() }} onClick={openTableDesigner} className="rounded-lg px-3 py-2 text-sm transition hover:bg-[#ead6b9]/55">Table</button>
                <button type="button" onClick={openChartDesigner} className="rounded-lg px-3 py-2 text-sm transition hover:bg-[#ead6b9]/55">Chart</button>
                <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={insertLink} className="rounded-lg px-3 py-2 text-sm transition hover:bg-[#ead6b9]/55">Link</button>
                <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => { runCommand('insertHorizontalRule'); setInsertOpen(false) }} className="rounded-lg px-3 py-2 text-sm transition hover:bg-[#ead6b9]/55">Divider</button>
                <button type="button" onClick={() => setInsertOpen(false)} className="ml-auto rounded-lg border border-gold bg-gold/15 px-3 py-2 text-sm font-semibold transition hover:bg-gold/25">Insert</button>
              </>
            ) : (
              <>
                <select
                  aria-label="Font family"
                  defaultValue="Georgia"
                  onChange={(event) => runCommand('fontName', event.target.value)}
                  className="max-w-28 rounded-lg border border-[#d7b99b] bg-white/70 px-2 py-2 text-sm outline-none"
                >
                  <option value="Georgia">Serif</option>
                  <option value="Arial">Sans</option>
                  <option value="Courier New">Mono</option>
                  <option value="Trebuchet MS">Modern</option>
                </select>
                <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => runCommand('bold')} className="rounded-lg px-2.5 py-2 text-sm font-bold transition hover:bg-[#ead6b9]/55">B</button>
                <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => runCommand('italic')} className="rounded-lg px-2.5 py-2 text-sm italic transition hover:bg-[#ead6b9]/55">I</button>
                <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => runCommand('underline')} className="rounded-lg px-2.5 py-2 text-sm underline transition hover:bg-[#ead6b9]/55">U</button>
                <button type="button" onMouseDown={(event) => event.preventDefault()} onClick={() => runCommand('insertUnorderedList')} className="rounded-lg px-2.5 py-2 text-sm transition hover:bg-[#ead6b9]/55">List</button>
                <label className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg transition hover:bg-[#ead6b9]/55" title="Text colour">
                  <input type="color" defaultValue="#38241b" onChange={(event) => runCommand('foreColor', event.target.value)} className="h-5 w-5 cursor-pointer border-0 bg-transparent p-0" />
                </label>
                <button type="button" onClick={() => { setCalculatorOpen(true); setCalculatorMode('Simple') }} className="rounded-lg px-3 py-2 text-sm transition hover:bg-[#ead6b9]/55">Calculator</button>
                <button type="button" onClick={() => setInsertOpen(true)} className="ml-auto rounded-lg border border-[#d7b99b] px-3 py-2 text-sm font-semibold transition hover:bg-[#ead6b9]/55">Insert</button>
              </>
            )}
          </div>
        </header>

        <section className="mx-auto mt-10 max-w-[700px] space-y-8">
          {pages.map((content, index) => (
            <article key={index}>
              <div className="mb-4 flex items-center justify-between px-2 text-sm !text-[#624333]">
                <span>{notebook.kind}</span>
                <span>Page {index + 1}</span>
              </div>
              <div className="relative min-h-[110vh] overflow-hidden rounded-[12px] border border-[#bba893]/70 px-8 py-10 shadow-[0_18px_35px_rgba(75,43,28,0.16)] sm:px-14 sm:py-14" style={pageStyle}>
                {placedImages.filter((image) => image.pageIndex === index).map((image) => (
                  <div
                    key={image.id}
                    role="button"
                    tabIndex={0}
                    onPointerDown={(event) => startImageDrag(event, image)}
                    onPointerMove={moveImage}
                    onPointerUp={() => { dragRef.current = null }}
                    className={`group absolute z-20 cursor-move touch-none ${image.shape === 'Circle' ? 'h-36 w-36' : 'h-32 w-44'}`}
                    style={{ left: image.x, top: image.y }}
                    aria-label="Drag image to reposition it"
                  >
                    <div className={`h-full w-full overflow-hidden ${imageShapeClass(image.shape)}`}>
                      <img
                        src={image.src}
                        alt="Inserted by user"
                        className="h-full w-full object-cover"
                        style={{ transform: `scale(${image.zoom})` }}
                      />
                    </div>
                    <button
                      type="button"
                      onPointerDown={(event) => event.stopPropagation()}
                      onClick={() => openImageWorkspace(image)}
                      className="absolute -right-1 -top-9 rounded-full border border-[#d7b99b] bg-[#fffaf3] px-3 py-1.5 text-xs font-semibold opacity-0 shadow-soft transition group-hover:opacity-100"
                    >
                      Crop
                    </button>
                  </div>
                ))}
                {placedTables.filter((table) => table.pageIndex === index).map((table) => (
                  <div
                    key={table.id}
                    className="group absolute z-20 touch-none"
                    style={{ left: table.x, top: table.y }}
                  >
                    <div
                      onPointerDown={(event) => startTableDrag(event, table)}
                      onPointerMove={moveTable}
                      onPointerUp={() => { tableDragRef.current = null }}
                      className="flex h-7 cursor-move items-center rounded-t-lg border border-[#bba893] bg-[#fffaf3] px-3 text-xs font-semibold !text-[#624333] shadow-soft"
                    >
                      Drag table
                    </div>
                    <table style={{ borderCollapse: 'collapse', backgroundColor: table.solidFill ? table.fillColour : 'transparent' }}>
                      <tbody>
                        {Array.from({ length: table.rows }).map((_, rowIndex) => (
                          <tr key={rowIndex}>
                            {Array.from({ length: table.columns }).map((__, columnIndex) => (
                              <td
                                key={columnIndex}
                                contentEditable
                                suppressContentEditableWarning
                                style={{ width: table.cellWidth, height: table.cellHeight, border: `${table.lineThickness}px solid ${table.lineColour}`, backgroundColor: table.solidFill ? table.fillColour : 'transparent', padding: 8 }}
                              />
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ))}
                {placedCharts.filter((chart) => chart.pageIndex === index).map((chart) => (
                  <div
                    key={chart.id}
                    onPointerDown={(event) => startChartDrag(event, chart)}
                    onPointerMove={moveChart}
                    onPointerUp={() => { chartDragRef.current = null }}
                    className="group absolute z-20 w-72 cursor-move rounded-2xl border border-[#d7b99b] bg-[#fffaf3] p-4 shadow-soft"
                    style={{ left: chart.x, top: chart.y }}
                    aria-label="Drag chart to reposition it"
                  >
                    <div className="h-44"><ChartGraphic chart={chart} /></div>
                  </div>
                ))}
                <div
                  contentEditable
                  suppressContentEditableWarning
                  role="textbox"
                  aria-multiline="true"
                  aria-label={`Book page ${index + 1}`}
                  onFocus={() => setActivePageIndex(index)}
                  onKeyUp={saveSelection}
                  onMouseUp={saveSelection}
                  onInput={(event) => updatePage(index, event.currentTarget.innerHTML)}
                  className="min-h-[95vh] w-full bg-transparent font-display text-xl leading-8 !text-[#38241b] outline-none empty:before:content-['Start_writing...'] empty:before:!text-[#624333]/65 sm:text-2xl"
                  style={editorStyle}
                />
              </div>
            </article>
          ))}
          <div className="flex justify-end pb-10">
            <button
              type="button"
              onClick={addPage}
              aria-label="Add page"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#bba893] bg-[#fffaf3] text-3xl font-light !text-[#38241b] shadow-soft transition hover:-translate-y-0.5 hover:bg-gold/20"
            >
              +
            </button>
          </div>
        </section>

        {imageDialogOpen ? (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#38241b]/35 p-4 backdrop-blur-sm">
            <section role="dialog" aria-modal="true" aria-labelledby="image-workspace-title" className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[30px] border border-[#d7b99b] bg-[#fffaf3] p-6 shadow-soft sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] !text-[#6a3e29]">Insert image</p>
                  <h2 id="image-workspace-title" className="mt-2 font-display text-3xl !text-[#38241b]">Prepare your image</h2>
                </div>
                <button type="button" onClick={() => { setImageDialogOpen(false); setEditingImageId(null) }} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d7b99b] text-xl transition hover:bg-gold/15">&times;</button>
              </div>

              <div className="mt-6 flex flex-wrap gap-2 border-b border-[#d7b99b]/70 pb-3">
                {(['Upload', 'URL', 'Paste'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setImageSourceTab(tab)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${imageSourceTab === tab ? 'bg-gold/20' : 'hover:bg-[#ead6b9]/55'}`}
                  >
                    {tab === 'Upload' ? 'Upload from device' : tab}
                  </button>
                ))}
              </div>

              <div className="mt-6 grid gap-7 lg:grid-cols-[0.85fr_1.15fr]">
                <div>
                  {imageSourceTab === 'Upload' ? (
                    <label className="flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-[#9d806c] bg-white/45 p-5 text-center transition hover:border-gold hover:bg-gold/10">
                      <span className="text-3xl !text-[#38241b]">+</span>
                      <span className="mt-2 text-sm font-semibold !text-[#38241b]">Choose an image from your device</span>
                      <span className="mt-1 text-xs !text-[#624333]">PNG, JPG, WEBP, and GIF</span>
                      <input type="file" accept="image/*" className="sr-only" onChange={(event) => { const file = event.target.files?.[0]; if (file) loadImageFile(file) }} />
                    </label>
                  ) : null}
                  {imageSourceTab === 'URL' ? (
                    <label className="block">
                      <span className="text-sm font-semibold !text-[#624333]">Image URL</span>
                      <input value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} placeholder="https://example.com/image.jpg" className="mt-3 w-full rounded-xl border border-[#d7b99b] bg-white/60 px-4 py-3 outline-none focus:border-gold focus:ring-2 focus:ring-gold/15" />
                    </label>
                  ) : null}
                  {imageSourceTab === 'Paste' ? (
                    <div
                      tabIndex={0}
                      onPaste={(event) => {
                        event.preventDefault()
                        const file = event.clipboardData.files[0]
                        if (file) loadImageFile(file)
                        else setImageUrl(event.clipboardData.getData('text'))
                      }}
                      className="flex min-h-32 items-center justify-center rounded-2xl border border-dashed border-[#9d806c] bg-white/45 p-5 text-center text-sm !text-[#624333] outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/15"
                    >
                      Click here, then paste an image or image URL from your clipboard.
                    </div>
                  ) : null}

                  <div className="relative mt-6">
                    <p className="text-sm font-semibold !text-[#624333]">Image shape</p>
                    <button type="button" onClick={() => setShapeMenuOpen((open) => !open)} className="mt-3 flex w-full items-center justify-between rounded-xl border border-[#d7b99b] bg-white/60 px-4 py-3 transition hover:bg-[#ead6b9]/45">
                      <span className="flex items-center gap-3"><ShapeIcon shape={imageShape} />{imageShape}</span>
                      <span aria-hidden="true">v</span>
                    </button>
                    {shapeMenuOpen ? (
                      <div className="absolute z-30 mt-2 w-full rounded-xl border border-[#d7b99b] bg-[#fffaf3] p-2 shadow-soft">
                        {(['Square', 'Rounded', 'Circle'] as ImageShape[]).map((shape) => (
                          <button
                            key={shape}
                            type="button"
                            onClick={() => { setImageShape(shape); setShapeMenuOpen(false) }}
                            className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition ${imageShape === shape ? 'bg-gold/15 font-semibold' : 'hover:bg-[#ead6b9]/45'}`}
                          >
                            <ShapeIcon shape={shape} />
                            {shape}
                          </button>
                        ))}
                      </div>
                    ) : null}
                  </div>

                  <p className="mt-6 text-sm leading-6 !text-[#624333]">Drag the crop frame in the preview to reposition it. Use the corner handle to resize it.</p>
                </div>

                <div>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold !text-[#624333]">Preview</p>
                    <button type="button" onClick={() => { setLassoEnabled((enabled) => !enabled); setLassoPoints([]) }} className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${lassoEnabled ? 'border-gold bg-gold/15' : 'border-[#d7b99b] hover:bg-[#ead6b9]/55'}`}>
                      Lasso select
                    </button>
                  </div>
                  <div data-crop-preview className={`relative mt-3 overflow-hidden border border-[#d7b99b] bg-[#f0e2cc] ${imageShape === 'Circle' ? 'mx-auto aspect-square max-w-[280px]' : 'aspect-[3/2]'} ${imageShapeClass(imageShape)}`}>
                    {imageSrc || imageUrl ? <img src={imageSrc || imageUrl} alt="Image preview" className="h-full w-full object-fill" /> : <p className="flex h-full items-center justify-center px-8 text-center text-sm !text-[#624333]">Choose, paste, or link an image to preview it here.</p>}
                    {imageSrc || imageUrl ? (
                      <div
                        onPointerDown={(event) => startCropDrag(event, 'move')}
                        onPointerMove={moveCropDrag}
                        onPointerUp={() => { cropDragRef.current = null }}
                        className="absolute z-10 cursor-move border-2 border-white shadow-[0_0_0_999px_rgba(56,36,27,0.38)]"
                        style={{ left: `${cropBox.x}%`, top: `${cropBox.y}%`, width: `${cropBox.width}%`, height: `${cropBox.height}%` }}
                      >
                        <div
                          onPointerDown={(event) => startCropDrag(event, 'resize')}
                          onPointerMove={moveCropDrag}
                          onPointerUp={() => { cropDragRef.current = null }}
                          className="absolute -bottom-2 -right-2 h-4 w-4 cursor-se-resize rounded-sm border-2 border-white bg-[#b98535]"
                        />
                      </div>
                    ) : null}
                    {lassoEnabled ? (
                      <svg
                        viewBox="0 0 300 200"
                        className="absolute inset-0 h-full w-full cursor-crosshair"
                        onPointerDown={(event) => { event.currentTarget.setPointerCapture(event.pointerId); setLassoPoints([]); setLassoing(true); addLassoPoint(event) }}
                        onPointerMove={(event) => { if (lassoing) addLassoPoint(event) }}
                        onPointerUp={() => setLassoing(false)}
                      >
                        <polyline points={lassoPoints.map((point) => `${point.x},${point.y}`).join(' ')} fill="rgba(217,164,65,0.12)" stroke="#b98535" strokeWidth="2" strokeDasharray="5 4" />
                      </svg>
                    ) : null}
                  </div>
                  {lassoEnabled ? <p className="mt-2 text-xs !text-[#624333]">Draw around the part of the image you want to keep. This selection is saved with the image setup.</p> : null}
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button type="button" onClick={() => { setImageDialogOpen(false); setEditingImageId(null) }} className="rounded-full px-5 py-3 text-sm font-semibold transition hover:bg-[#ead6b9]/55">Cancel</button>
                <button type="button" disabled={!(imageSrc || imageUrl.trim())} onClick={placeImage} className="rounded-full bg-gold px-5 py-3 text-sm font-semibold !text-[#38241b] transition hover:bg-[#e4b558] disabled:cursor-not-allowed disabled:opacity-40">Place image</button>
              </div>
            </section>
          </div>
        ) : null}

        {tableDesignerOpen ? (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#38241b]/35 p-4 backdrop-blur-sm">
            <section role="dialog" aria-modal="true" aria-labelledby="table-designer-title" className="max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-[30px] border border-[#d7b99b] bg-[#fffaf3] p-6 shadow-soft sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] !text-[#6a3e29]">Insert table</p>
                  <h2 id="table-designer-title" className="mt-2 font-display text-3xl !text-[#38241b]">Design your table</h2>
                  <p className="mt-2 text-sm !text-[#624333]">It will appear on the active page with a drag handle, so you can place it exactly where you want.</p>
                </div>
                <button type="button" onClick={() => setTableDesignerOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d7b99b] text-xl transition hover:bg-gold/15">&times;</button>
              </div>

              <div className="mt-7 grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <label>
                      <span className="text-sm font-semibold !text-[#624333]">Rows</span>
                      <input type="number" min="1" max="12" value={tableRows} onChange={(event) => setTableRows(Math.max(1, Math.min(12, Number(event.target.value) || 1)))} className="mt-2 w-full rounded-xl border border-[#d7b99b] bg-white/60 px-4 py-3 outline-none focus:border-gold focus:ring-2 focus:ring-gold/15" />
                    </label>
                    <label>
                      <span className="text-sm font-semibold !text-[#624333]">Columns</span>
                      <input type="number" min="1" max="12" value={tableColumns} onChange={(event) => setTableColumns(Math.max(1, Math.min(12, Number(event.target.value) || 1)))} className="mt-2 w-full rounded-xl border border-[#d7b99b] bg-white/60 px-4 py-3 outline-none focus:border-gold focus:ring-2 focus:ring-gold/15" />
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <label>
                      <span className="text-sm font-semibold !text-[#624333]">Cell width (px)</span>
                      <input type="number" min="50" max="300" value={tableCellWidth} onChange={(event) => setTableCellWidth(Math.max(50, Math.min(300, Number(event.target.value) || 50)))} className="mt-2 w-full rounded-xl border border-[#d7b99b] bg-white/60 px-4 py-3 outline-none focus:border-gold focus:ring-2 focus:ring-gold/15" />
                    </label>
                    <label>
                      <span className="text-sm font-semibold !text-[#624333]">Cell height (px)</span>
                      <input type="number" min="28" max="160" value={tableCellHeight} onChange={(event) => setTableCellHeight(Math.max(28, Math.min(160, Number(event.target.value) || 28)))} className="mt-2 w-full rounded-xl border border-[#d7b99b] bg-white/60 px-4 py-3 outline-none focus:border-gold focus:ring-2 focus:ring-gold/15" />
                    </label>
                  </div>

                  <label className="block">
                    <span className="flex justify-between text-sm font-semibold !text-[#624333]"><span>Line thickness</span><span>{tableLineThickness}px</span></span>
                    <input type="range" min="1" max="8" step="1" value={tableLineThickness} onChange={(event) => setTableLineThickness(Number(event.target.value))} className="mt-3 w-full accent-[#b98535]" />
                  </label>

                  <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#d7b99b] bg-white/45 p-4">
                    <div>
                      <p className="text-sm font-semibold !text-[#38241b]">Solid colour table</p>
                      <p className="mt-1 text-xs leading-5 !text-[#624333]">Use an opaque fill so page lines do not show through your table.</p>
                    </div>
                    <input type="checkbox" checked={tableSolidFill} onChange={(event) => setTableSolidFill(event.target.checked)} className="h-5 w-5 accent-[#b98535]" />
                  </div>

                  <div className="flex gap-5">
                    <label className="flex items-center gap-3 text-sm font-semibold !text-[#624333]">Line colour <input type="color" value={tableLineColour} onChange={(event) => setTableLineColour(event.target.value)} className="h-9 w-10 cursor-pointer rounded border border-[#d7b99b] bg-transparent p-1" /></label>
                    <label className={`flex items-center gap-3 text-sm font-semibold !text-[#624333] ${tableSolidFill ? '' : 'opacity-45'}`}>Fill colour <input type="color" disabled={!tableSolidFill} value={tableFillColour} onChange={(event) => setTableFillColour(event.target.value)} className="h-9 w-10 cursor-pointer rounded border border-[#d7b99b] bg-transparent p-1 disabled:cursor-not-allowed" /></label>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold !text-[#624333]">Live preview</p>
                  <div className="mt-3 max-h-[410px] overflow-auto rounded-2xl border border-[#d7b99b] bg-[#f0e2cc] p-5">
                    <div
                      className="grid w-fit"
                      style={{ gridTemplateColumns: `repeat(${tableColumns}, ${tableCellWidth}px)` }}
                    >
                      {Array.from({ length: tableRows * tableColumns }).map((_, index) => (
                        <div
                          key={index}
                          style={{ height: `${tableCellHeight}px`, border: `${tableLineThickness}px solid ${tableLineColour}`, backgroundColor: tableSolidFill ? tableFillColour : 'transparent' }}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 text-xs leading-5 !text-[#624333]">The preview shows the exact row, column, cell-size, line, and fill settings that will be inserted.</p>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button type="button" onClick={() => setTableDesignerOpen(false)} className="rounded-full px-5 py-3 text-sm font-semibold transition hover:bg-[#ead6b9]/55">Cancel</button>
                <button type="button" onClick={insertDesignedTable} className="rounded-full bg-gold px-5 py-3 text-sm font-semibold !text-[#38241b] transition hover:bg-[#e4b558]">Insert table</button>
              </div>
            </section>
          </div>
        ) : null}

        {chartDesignerOpen ? (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-[#38241b]/35 p-4 backdrop-blur-sm">
            <section role="dialog" aria-modal="true" aria-labelledby="chart-designer-title" className="max-h-[92vh] w-full max-w-5xl overflow-y-auto rounded-[30px] border border-[#d7b99b] bg-[#fffaf3] p-6 shadow-soft sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] !text-[#6a3e29]">Insert chart</p>
                  <h2 id="chart-designer-title" className="mt-2 font-display text-3xl !text-[#38241b]">Build your chart</h2>
                </div>
                <button type="button" onClick={() => setChartDesignerOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d7b99b] text-xl transition hover:bg-gold/15">&times;</button>
              </div>

              <div className="mt-7 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <div>
                  <p className="text-sm font-semibold !text-[#624333]">Chart type</p>
                  <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
                    {(['Pie', 'Doughnut', 'Line', 'Column', 'Bar', 'Area'] as ChartKind[]).map((kind) => (
                      <button key={kind} type="button" onClick={() => setChartKind(kind)} className={`rounded-xl border px-3 py-3 text-sm transition ${chartKind === kind ? 'border-gold bg-gold/15 font-semibold' : 'border-[#d7b99b] bg-white/45 hover:bg-[#ead6b9]/45'}`}>
                        {kind}
                      </button>
                    ))}
                  </div>

                  <label className="mt-5 block">
                    <span className="text-sm font-semibold !text-[#624333]">Chart name <span className="font-normal">(optional)</span></span>
                    <input value={chartName} onChange={(event) => setChartName(event.target.value)} placeholder="Name your chart" className="mt-2 w-full rounded-xl border border-[#d7b99b] bg-white/60 px-4 py-3 outline-none focus:border-gold focus:ring-2 focus:ring-gold/15" />
                  </label>

                  <div className="mt-7 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold !text-[#624333]">{chartKind === 'Pie' || chartKind === 'Doughnut' ? 'Slices' : 'Data points'}</p>
                      <p className="mt-1 text-xs !text-[#624333]">Add a label, value, and colour for each item.</p>
                    </div>
                    <button type="button" onClick={() => setChartPoints((points) => [...points, { label: `Item ${String.fromCharCode(65 + points.length)}`, value: 20, color: '#7ca6df' }])} className="rounded-full border border-[#d7b99b] px-3 py-2 text-xs font-semibold transition hover:bg-gold/15">+ Add item</button>
                  </div>

                  <div className="mt-3 space-y-2">
                    {chartPoints.map((point, index) => (
                      <div key={`${point.label}-${index}`} className="grid grid-cols-[1fr_74px_42px_32px] items-center gap-2 rounded-xl border border-[#d7b99b] bg-white/45 p-2">
                        <input value={point.label} onChange={(event) => updateChartPoint(index, { label: event.target.value })} aria-label={`Label ${index + 1}`} className="min-w-0 bg-transparent px-2 py-2 text-sm outline-none" />
                        <input type="number" min="0" value={point.value} onChange={(event) => updateChartPoint(index, { value: Math.max(0, Number(event.target.value) || 0) })} aria-label={`Value ${index + 1}`} className="w-full rounded-lg border border-[#d7b99b] bg-white/60 px-2 py-2 text-sm outline-none" />
                        <input type="color" value={point.color} onChange={(event) => updateChartPoint(index, { color: event.target.value })} aria-label={`Colour ${index + 1}`} className="h-9 w-10 cursor-pointer rounded border border-[#d7b99b] bg-transparent p-1" />
                        <button type="button" disabled={chartPoints.length <= 2} onClick={() => setChartPoints((points) => points.filter((_, pointIndex) => pointIndex !== index))} className="text-lg !text-[#6a3e29] disabled:opacity-30">&times;</button>
                      </div>
                    ))}
                  </div>

                  {chartKind === 'Pie' || chartKind === 'Doughnut' ? (
                    <label className="mt-6 flex items-center justify-between rounded-2xl border border-[#d7b99b] bg-white/45 p-4">
                      <span><span className="block text-sm font-semibold !text-[#38241b]">Show percentages</span><span className="mt-1 block text-xs !text-[#624333]">Show each slice as a percentage in the legend.</span></span>
                      <input type="checkbox" checked={chartShowPercentages} onChange={(event) => setChartShowPercentages(event.target.checked)} className="h-5 w-5 accent-[#b98535]" />
                    </label>
                  ) : null}
                </div>

                <div>
                  <p className="text-sm font-semibold !text-[#624333]">Live preview</p>
                  <div className="mt-3 h-72 rounded-2xl border border-[#d7b99b] bg-[#fffdf8] p-5">
                    <ChartGraphic chart={{ id: 0, pageIndex: activePageIndex, name: chartName, kind: chartKind, points: chartPoints, showPercentages: chartShowPercentages, x: 0, y: 0 }} />
                  </div>
                  <p className="mt-3 text-xs leading-5 !text-[#624333]">After insertion, use the chart's drag handle to move it anywhere on the active page.</p>
                </div>
              </div>

              <div className="mt-8 flex justify-end gap-3">
                <button type="button" onClick={() => setChartDesignerOpen(false)} className="rounded-full px-5 py-3 text-sm font-semibold transition hover:bg-[#ead6b9]/55">Cancel</button>
                <button type="button" onClick={insertDesignedChart} className="rounded-full bg-gold px-5 py-3 text-sm font-semibold !text-[#38241b] transition hover:bg-[#e4b558]">Insert chart</button>
              </div>
            </section>
          </div>
        ) : null}

        {calculatorOpen ? (
          <div className="fixed inset-0 z-[120] flex items-center justify-center bg-[#38241b]/35 p-4 backdrop-blur-sm">
            <section role="dialog" aria-modal="true" aria-labelledby="calculator-title" className="w-full max-w-sm rounded-[30px] border border-[#d7b99b] bg-[#fffaf3] p-6 shadow-soft">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] !text-[#6a3e29]">Writing tools</p>
                  <h2 id="calculator-title" className="mt-1 font-display text-3xl !text-[#38241b]">Calculator</h2>
                </div>
                <button type="button" onClick={() => setCalculatorOpen(false)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d7b99b] text-xl transition hover:bg-gold/15">&times;</button>
              </div>

              <div className="mt-5 grid grid-cols-2 rounded-xl border border-[#d7b99b] p-1">
                {(['Simple', 'Scientific'] as const).map((mode) => (
                  <button key={mode} type="button" onClick={() => setCalculatorMode(mode)} className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${calculatorMode === mode ? 'bg-gold/20' : 'hover:bg-[#ead6b9]/45'}`}>{mode}</button>
                ))}
              </div>

              <div className="mt-5 rounded-2xl border border-[#d7b99b] bg-white/60 p-4 text-right">
                <p className="min-h-6 break-all text-sm !text-[#624333]">{calculation || '0'}</p>
                <p className="mt-2 min-h-8 break-all font-display text-2xl !text-[#38241b]">{calculationResult}</p>
              </div>

              {calculatorMode === 'Scientific' ? (
                <div className="mt-4 grid grid-cols-4 gap-2">
                  {['sin(', 'cos(', 'tan(', 'log(', 'sqrt(', 'pi', '^', '('].map((value) => (
                    <button key={value} type="button" onClick={() => calculatorInput(value)} className="rounded-xl border border-[#d7b99b] bg-white/45 px-2 py-2 text-sm transition hover:bg-gold/15">{value}</button>
                  ))}
                </div>
              ) : null}

              <div className="mt-4 grid grid-cols-4 gap-2">
                {['C', 'Back', '(', ')', '7', '8', '9', '/', '4', '5', '6', '*', '1', '2', '3', '-', '0', '.', '=', '+'].map((value) => (
                  <button key={value} type="button" onClick={() => calculatorInput(value)} className={`rounded-xl px-3 py-3 text-sm font-semibold transition ${value === '=' ? 'bg-gold hover:bg-[#e4b558]' : value === 'C' ? 'border border-[#d7b99b] bg-[#ead6b9]/45 hover:bg-[#ead6b9]' : 'border border-[#d7b99b] bg-white/45 hover:bg-gold/15'}`}>{value}</button>
                ))}
              </div>
              {calculatorMode === 'Scientific' ? <p className="mt-4 text-center text-xs !text-[#624333]">Scientific trigonometry uses degrees.</p> : null}
            </section>
          </div>
        ) : null}
      </div>
    </main>
  )
}
