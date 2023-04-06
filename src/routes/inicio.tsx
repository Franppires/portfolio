import logo from "../assets/logo.svg"
import html from "../assets/html.svg"
import css from "../assets/css.svg"
import javascript from "../assets/javascript.svg"
import react from "../assets/react.svg"
import styled_components from "../assets/styled_components.svg"
import typescript from "../assets/typescript.svg"
import figma from "../assets/figma.svg"
import linkedin from "../assets/linkedin.svg"
import whatsapp from "../assets/whatsapp.svg"
import email from "../assets/email.svg"
import github from "../assets/github.svg"
import link from "../assets/link.svg"
import monica_magalhaes from "../assets/monica_magalhaes.svg"
import app_pagamentos from "../assets/app_pagamentos.svg"
import controle_financeiro from "../assets/controle_financeiro.svg"
import lembrete_aniversarios from "../assets/lembrete_aniversarios.svg"
import tours from "../assets/tours.svg"
import mini from "../assets/mini.svg"
import cadastro from "../assets/cadastro.svg"
import produto from "../assets/produto.svg"
import formulario from "../assets/formulario.svg"
import starbucks from "../assets/starbucks.svg"
import { Card, CardProject, Contact, Gradient, Main, Technologies, Title } from "../styles/style"
import Copyright from "./copyright"
import Menu from "./menu"

export default function Inicio() {

  return (
    <>
      <Menu />
      <Main> 
        <span>Olá, eu sou</span>
        <Gradient>Franciane Pires</Gradient>
        <p>Sou desenvolvedora Front-end gosto de criar coisas que vivem na internet experiênte em negociação, vendas, organização, atendimento, analise de dados, gestão operacional estou construindo uma carreira em desenvolvimento Full Stack.</p>
        <p>Trabalho como freelancer construindo experiência e conhecimento valioso ao longo de meus projetos.</p>
        <p>Abaixo podem acessar meus trabalhos </p>
      </Main> 
      <Title id="projects">PROJETOS</Title>
      <Card>
        <CardProject>
          <img src={monica_magalhaes} alt="" />
          <div>
            <h3>Portfólio Mônica Magalhães</h3>
            <a href="https://github.com/Franppires/monica_magalhaes" target="_blank"><img src={github} alt="" /></a>
            <a href="https://monicamagalhaes.netlify.app" target="_blank"><img src={link} alt="" /></a>
          </div> 
          <p>Portfólio da UX Designer Mônica nele contem seus melhores trabalhos na área de designer, informações pessoais e contato.</p>
          <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>Javascript</li>
          </ul>
        </CardProject>
        <CardProject>
          <img src={app_pagamentos} alt="" />
          <div>
            <h3>App de Pagamentos</h3>
            <a href="https://github.com/Franppires/app_pagamentos_newtab" target="_blank"><img src={github} alt="" /></a>
            <a href="https://appdepagamentos.netlify.app/" target="_blank"><img src={link} alt="" /></a>
          </div>
          <p>Aplicação que simula o envio de dinheiro para uma outra pessoa, via cartão de crédito usando api. </p>
          <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>Javascript</li>
          </ul>
        </CardProject>
        <CardProject>
          <img src={controle_financeiro} alt="" />
          <div>
            <h3>Controle Financeiro</h3>
            <a href="https://github.com/Franppires/controle_financeiro_newtab" target="_blank"><img src={github} alt="" /></a>
            <a href="https://franppires.github.io/controle_financeiro_newtab/" target="_blank"><img src={link} alt="" /></a>
          </div>
          <p>Sistema para cadastrar transação de compra e venda, listagem desses cadastros com total. </p>
          <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>Javascript</li>
          </ul>
        </CardProject>
        <CardProject>
          <img src={lembrete_aniversarios} alt="" />
          <div>
            <h3>Lembrete de Aniversários</h3>
            <a href="https://github.com/Franppires/lembrete_aniversario_front_beginners" target="_blank"><img src={github} alt="" /></a>
            <a href="https://lembretedeaniversario.netlify.app/" target="_blank"><img src={link} alt="" /></a>
          </div> 
          <p>Lista de aniversários e componente para redenrizar.</p>
          <ul>
            <li>React</li>
            <li>CSS</li>
          </ul>
        </CardProject>
        <CardProject>
          <img src={tours} alt="" />
          <div>
            <h3>Tours</h3>
            <a href="https://github.com/Franppires/destinations_tours" target="_blank"><img src={github} alt="" /></a>
            <a href="https://destinationsandtours.netlify.app/" target="_blank"><img src={link} alt="" /></a>
          </div>
          <p>Aplicação que simula o envio de dinheiro para uma outra pessoa, via cartão de crédito usando api. </p>
          <ul>
            <li>React</li>
            <li>CSS</li>
          </ul>
        </CardProject>
        <CardProject>
          <img src={mini} alt="" />
          <div>
            <h3>Controle Financeiro</h3>
            <a href="https://github.com/Franppires/mini_portfolio_dev_em_dobro" target="_blank"><img src={github} alt="" /></a>
            <a href="https://franppires.github.io/mini_portfolio_dev_em_dobro/" target="_blank"><img src={link} alt="" /></a>
          </div>
          <p>Sistema para cadastrar transação de compra e venda, listagem desses cadastros com total. </p>
          <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>Javascript</li>
          </ul>
        </CardProject>
        <CardProject>
          <img src={cadastro} alt="" />
          <div>
            <h3>Cadastro de dados </h3>
            <a href="https://github.com/Franppires/cadastro_dados_newtab" target="_blank"><img src={github} alt="" /></a>
            <a href="https://franppires.github.io/cadastro_dados_newtab/" target="_blank"><img src={link} alt="" /></a>
          </div>
          <p>Cadastro e listagem de novos cadidatos, validação de   formulario e mascara de numero. </p>
          <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>Javascript</li>
          </ul>
        </CardProject>
        <CardProject>
          <img src={formulario} alt="" />
          <div>
            <h3>Formulário</h3>
            <a href="https://github.com/Franppires/form_validation_front_beginner" target="_blank"><img src={github} alt="" /></a>
            <a href="https://franppires.github.io/form_validation_front_beginner/" target="_blank"><img src={link} alt="" /></a>
          </div>
          <p>Validar campos do formulário para preenchimento. </p>
          <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>Javascript</li>
          </ul>
        </CardProject>
        <CardProject>
          <img src={starbucks} alt="" />
          <div>
            <h3>Starbucks</h3>
            <a href="https://github.com/Franppires/starbucks_devclub" target="_blank"><img src={github} alt="" /></a>
            <a href="https://franppires.github.io/starbucks_devclub/" target="_blank"><img src={link} alt="" /></a>
          </div>
          <p>Site clone do starbucks </p>
          <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>Javascript</li>
          </ul>
        </CardProject>
        <CardProject>
          <img src={produto} alt="" />
          <div>
            <h3>Visualização de produto </h3>
            <a href="https://github.com/Franppires/product_preview_frontend_mentor" target="_blank"><img src={github} alt="" /></a>
            <a href="https://franppires.github.io/product_preview_frontend_mentor/" target="_blank"><img src={link} alt="" /></a>
          </div>
          <p>Componente de cartão de visualização do produto </p>
          <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>Javascript</li>
          </ul>
        </CardProject>
      </Card>
      <Title id="skills">HABILIDADES</Title>
      <Technologies>
        <img src={html} alt="" />
        <img src={css} alt="" />
        <img src={javascript} alt="" />
        <img src={typescript} alt="" />
        <img src={react} alt="" />
        <img src={styled_components} alt="" />
        <img src={figma} alt="" />
      </Technologies>
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
          <a href="https://contate.me/franppires" target="_blank">
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



