import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
import { GlobalStyle } from './styles/global'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Lazy load routes for better performance
const Projects = lazy(() => import('./routes/projects'))
const About = lazy(() => import('./routes/about'))
const Skills = lazy(() => import('./routes/skills'))
const Contact = lazy(() => import('./routes/contact'))
const Inicio = lazy(() => import('./routes/inicio'))
const App = lazy(() => import('./App'))

// Loading fallback component
const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#0f172a' }}>
    <p style={{ color: '#94a3b8', fontSize: '14px' }}>Carregando...</p>
  </div>
)

const router = createBrowserRouter([
  {
    path: "/",
    element: <Suspense fallback={<LoadingFallback />}><App /></Suspense>,    
  },
  {
    path: "/inicio",
    element: <Suspense fallback={<LoadingFallback />}><Inicio /></Suspense>
  },
  {
    path: "about",
    element: <Suspense fallback={<LoadingFallback />}><About /></Suspense>
  },
  {
    path: "projects",
    element: <Suspense fallback={<LoadingFallback />}><Projects /></Suspense>
  },
  {
    path: "skills",
    element: <Suspense fallback={<LoadingFallback />}><Skills /></Suspense>
  },
  {
    path: "contact",
    element: <Suspense fallback={<LoadingFallback />}><Contact /></Suspense>
  } 
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
     <RouterProvider router={router} />
    <GlobalStyle />
  </React.StrictMode>,
)
