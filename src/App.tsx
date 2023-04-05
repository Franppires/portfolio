
import Copyright from './routes/copyright'
import Menu from './routes/menu'
import { Outlet } from 'react-router-dom'


export default function App() {
  return (

    <>
    <Menu />
    <Outlet />
    <Copyright />
    </>
  )
}
