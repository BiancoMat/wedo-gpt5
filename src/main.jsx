import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './pages/App'
import Board from './pages/Board'
import Auth from './pages/Auth'
import Groups from './pages/Groups'
import Notifications from './pages/Notifications'
import { ToastProvider } from './components/Toast'

const router = createBrowserRouter([
  { path: "/", element: <App/> },
  { path: "/board", element: <Board/> },
  { path: "/auth", element: <Auth/> },
  { path: "/groups", element: <Groups/> },
  { path: "/notifications", element: <Notifications/> },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ToastProvider>
      <RouterProvider router={router} />
    </ToastProvider>
  </React.StrictMode>,
)
