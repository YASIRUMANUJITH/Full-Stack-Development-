import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import BoardPage from './pages/BoardPage.jsx'
import BoardsPage from './pages/BoardsPage.jsx'
import TaskPage from './pages/TaskPage.jsx'
import CreateTaskPage from './pages/CreateTaskPage.jsx'
import CreateBoardPage from './pages/CreateBoardPage.jsx'
import BoardSettingsPage from './pages/BoardSettingsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/boards"
          element={
            <ProtectedRoute>
              <BoardsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/boards/:boardId"
          element={
            <ProtectedRoute>
              <BoardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/boards/new"
          element={
            <ProtectedRoute>
              <CreateBoardPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/boards/:boardId/settings"
          element={
            <ProtectedRoute>
              <BoardSettingsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/boards/:boardId/tasks/new"
          element={
            <ProtectedRoute>
              <CreateTaskPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/boards/:boardId/tasks/:taskId"
          element={
            <ProtectedRoute>
              <TaskPage />
            </ProtectedRoute>
          }
        />
        <Route path="/board" element={<Navigate to="/boards/board-1" replace />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  )
}
