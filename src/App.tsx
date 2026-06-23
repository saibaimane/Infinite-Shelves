import { Route, Routes } from 'react-router-dom'
import { LandingPage } from '@/pages/LandingPage'
import { AuthPage } from '@/pages/AuthPage'
import { ShelfWorkspacePage } from '@/pages/ShelfWorkspacePage'
import { LibrarySetupPage } from '@/pages/LibrarySetupPage'
import { AppMenu } from '@/components/AppMenu'
import { BookPage } from '@/pages/BookPage'

function App() {
  return (
    <>
      <AppMenu />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-library" element={<AuthPage />} />
        <Route path="/library-setup" element={<LibrarySetupPage />} />
        <Route path="/book/:bookId" element={<BookPage />} />
        <Route path="/shelf/:shelfType" element={<ShelfWorkspacePage />} />
      </Routes>
    </>
  )
}

export default App
