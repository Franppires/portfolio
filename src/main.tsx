import React from 'react'
import ReactDOM from 'react-dom/client'
import { GlobalStyle } from './styles/global'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Projects from './routes/projects'
import About from './routes/about'
import Skills from './routes/skills'
import Data from './routes/contact'
import Inicio from './routes/inicio'
import App from './App';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,    
  },
  {
    path: "/inicio",
    element: <Inicio /> 
  },
  {
    path: "about",
    element: <About /> 
  },
  {
    path: "projects",
    element: <Projects />
  },
  
  {
    path: "skills",
    element: <Skills />
  },
  {
    path: "contact",
    element: <Data />
  } 


 

])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
     <RouterProvider router={router} />
    <GlobalStyle />
      {/* <App /> */}
  </React.StrictMode>,
)
