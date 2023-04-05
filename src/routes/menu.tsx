import logo from "../assets/logo.svg"
import {  Header } from "../styles/style"
import { Link } from "react-router-dom"

export default function Menu() {
  return (
    <>
      <Header>
        <img src={logo} className="logo" alt="Vite logo" />
        <nav>
          <li><Link to="/inicio">INICIO</Link></li>
          <li><Link to="/about">SOBRE</Link></li>
          <li><Link to="/projects">PROJETOS</Link></li>
          <li><Link to="/skills">HABILIDADES</Link></li>
          <li><Link to="/contact">CONTATO</Link></li>
        </nav>
      </Header>
    </>
  )
}
