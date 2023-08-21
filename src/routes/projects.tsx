import github from "../assets/github.svg"
import link from "../assets/link.svg"
import monica_magalhaes from "../assets/monica_magalhaes.svg"
import app_pagamentos from "../assets/app_pagamentos.svg"
import controle_financeiro from "../assets/controle_financeiro.svg"
import cadastro from "../assets/cadastro.svg"
import produto from "../assets/produto.svg"
import { Card, CardProject, Title } from '../styles/style'
import Menu from "./menu"
import Copyright from "./copyright"

export default function Projects() {
  return (
    <>
      <Menu />
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
          <li>React</li>
          <li>Styled Components</li>
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
      </Card>
      <Copyright />
    </>
  )
}
