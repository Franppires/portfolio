import linkedin from "../assets/linkedin.svg"
import whatsapp from "../assets/whatsapp.svg"
import email from "../assets/email.svg"
import github from "../assets/github.svg"
import { Contact, Title } from '../styles/style'
import Menu from "./menu"
import Copyright from "./copyright"

export default function Data() {
  return (
    <>
        <Menu />
        <Title id="contact">CONTATO</Title>
        <Contact>
            <button >
            <a href="https://www.linkedin.com/in/franciane-pires/" target="_blank">
                <img src={linkedin} alt="" /> 
                <p>Linkedin</p>
            </a>  
            </button>
            <button>
            <a href="https://github.com/Franppires" target="_blank">
                <img src={github} alt="" />
                <p>Github</p>
            </a>
            </button>
            <button>
            <a href="https://wa.me/5514998098786" target="_blank">
                <img src={whatsapp} alt="" />
                <p>Whatsapp</p>
            </a>
            </button>
            <button>
            <a href="mailto:contatofranpires@gmail.com" target="_blank">
                <img src={email} alt="" />
                <p>E-mail</p>
            </a>
            </button>
        </Contact> 
        <Copyright />
    </>
  )
}
