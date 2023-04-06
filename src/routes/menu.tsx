import logo from "../assets/logo.svg"
import Mobile from "../components/mobile"
import {  Header } from "../styles/style"
import { Link } from "react-router-dom"
import { HiMenu } from "react-icons/hi"
import { useState } from "react"

export default function Menu() {

  const [menuIsVisible, setMenuIsVisible] = useState<boolean>(false)
  
  return (
    <>
      <Mobile 
        menuIsVisible={menuIsVisible}
        setMenuIsVisible={setMenuIsVisible}
      />
      <Header >
        <img src={logo} className="logo" alt="Vite logo" />
        <nav>
          <li><Link to="/inicio">INICIO</Link></li>
          <li><Link to="/about">SOBRE</Link></li>
          <li><Link to="/projects">PROJETOS</Link></li>
          <li><Link to="/skills">HABILIDADES</Link></li>
          <li><Link to="/contact">CONTATO</Link></li>
        </nav>
        <HiMenu onClick={() => setMenuIsVisible(true)} size={45}/>
      </Header>
    </>
  )
}
