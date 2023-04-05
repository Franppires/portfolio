
import Copyright from './routes/copyright'
import Inicio from './routes/inicio'
import Menu from './routes/menu'
import { Outlet } from 'react-router-dom'


export default function App() {
  return (

    <>
    <Menu />
    <Inicio />

    <Outlet />
    <Copyright />
    </>
  )
}
