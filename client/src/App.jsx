import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import BoardPage from './pages/BoardPage.jsx'
import BoardsPage from './pages/BoardsPage.jsx'
import TaskPage from './pages/TaskPage.jsx'
import BoardSettingsPage from './pages/BoardSettingsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/boards" element={<BoardsPage />} />
        <Route path="/boards/:boardId" element={<BoardPage />} />
        <Route path="/boards/:boardId/settings" element={<BoardSettingsPage />} />
        <Route path="/boards/:boardId/tasks/:taskId" element={<TaskPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
