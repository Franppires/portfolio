import html from "../assets/html.svg"
import css from "../assets/css.svg"
import javascript from "../assets/javascript.svg"
import react from "../assets/react.svg"
import styled_components from "../assets/styled_components.svg"
import typescript from "../assets/typescript.svg"
import figma from "../assets/figma.svg"
import { Technologies, Title } from '../styles/style'


export default function Skills() {
  return (
    <>
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
    </>
  )
}
