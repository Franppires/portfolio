import { Link } from "react-router-dom"
import { Container } from "../styles/style"
import { IoClose } from "react-icons/io5"
import { useEffect } from "react"

interface MobileProps { 
  menuIsVisible: boolean;
  setMenuIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Mobile({ menuIsVisible, setMenuIsVisible }: MobileProps): JSX.Element {

  // useEffect(() => { 
  //   document.body.style.overflowY = 'hidden'
  // }, [menuIsVisible])

  return (
    <Container menuIsVisible={menuIsVisible}>
      <IoClose size={45} onClick={() => setMenuIsVisible(false)}/>
      <nav>
        <li><Link to="/inicio">INICIO</Link></li>
        <li><Link to="/about">SOBRE</Link></li>
        <li><Link to="/projects">PROJETOS</Link></li>
        <li><Link to="/skills">HABILIDADES</Link></li>
        <li><Link to="/contact">CONTATO</Link></li>
      </nav>

    </Container>
  )
}
