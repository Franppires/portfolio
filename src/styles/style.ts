import styled, { css } from "styled-components";

export const Header = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    flex-direction: space-between;
    justify-content: center;
    align-items: center;
    background-color: #111111;
    padding: 0 10px;
    position: fixed;
    top: 0;

    img { 
        height: 100%;
    }

    nav { 
        display: flex;
        width: 90%;
        justify-content: flex-end;
        gap: 30px;

    }

    li { 
        list-style: none;
    } 

    a {
        text-decoration: none;
        color: #FFFFFF;
        font-size: 18px;
        font-weight: bold;
    }

    > svg {
        display: none;
    }

    @media (max-width: 768px) {

        {
        justify-content: space-between;

        }

        nav {
            display: none;
        }

        > svg {
            display: flex;
        }
    }

`

export const Gradient = styled.h1`
    color: #D24074;
    background-image: -webkit-linear-gradient(20deg,  #9845E8, #33D2FF, #10D7E2,#D24074);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-feature-settings: "kern";
    font-size: 48px;
    font-weight: 700;
    line-height: 48px;
    margin: 18px 0;
    overflow-wrap: break-word;
    text-rendering: optimizelegibility;
    -moz-osx-font-smoothing: grayscale;
`

export const Main = styled.div`
    padding: 130px 10px 0;
    display: flex;
    flex-direction: column;
    gap: 18px;
    font-size: 20px;
`
export const Title = styled.h2`
    padding: 0 10px;
    margin: 100px 0 50px ;
`
export const Card = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 10px;

    > div { 
        flex: 1 1 200px;
    }
`
export const CardProject = styled.div`
    display: flex;
    flex-direction: column;
    gap: 30px;
    

    img { 
        width: 400px;
    }

    div {
        display: flex;
        gap: 15px;
    }

    div img { 
        width: 100%;
    }

    h3 { 
        font-size: 24px;
        font-weight: initial;
    }

    p {
        font-size: 16px;
        color: #C4C4C4C4;
    }

    ul { 
        display: flex;
        gap: 20px;
    }

    li {
        list-style: none;
        color: #6CACE4;
        background-color: #222222;
        padding: 5px;
        border-radius: 5px;
        margin-bottom: 50px;

    }
`
export const Technologies = styled.div`
    padding: 0 10px 35px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 50px 0 50px 0;
    width: 100%;

    img { 
    width: 8%;
    }

    /* @media (max-width: 768px) {
        flex-direction: column;
        gap: 5px;

        img { 
            width: 15%;
        }
    } */
`
export const Contact = styled.div`
    display: flex;
    justify-content: center;
    padding: 0 10px;

    button {
    width: 30%;
    height: 55px;
    background-color: #000000;
    border-top: 1px solid  #10D7E2;
    border-bottom: 1px solid  #FBF2B1;
    border-right: 1px solid  #6518B4;
    border-left: 1px solid  #D24074;
    margin: 0px 0 100px 0;
    }

    a { 
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    text-decoration: none;
    }

    p {
    align-items: center;
    font-size: 16px;
    color: #FFFFFF;
    }
    
    @media (max-width: 768px) {
        a { 
            display: flex; 
            flex-direction: column;
        }
    }

`
export const Footer = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: space-between;
    justify-content: center;
    align-items: center;
    background-color: #111111;
    padding: 0 10px;
    position: relative;
    top: 50vh;
    bottom: 0;


    nav { 
        display: flex;
        width: 90%;
        justify-content: flex-end;
        gap: 30px;
        margin-right: 30px;
    }

    li { 
        list-style: none;
    } 

    a {
        text-decoration: none;
        color: #FFFFFF;
        font-size: 18px;
        font-weight: bold;
    }

`

export const Container = styled.div`
    position: absolute;
    backdrop-filter: blur(3px);
    width: 100%;
    height: 100%;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgb(152,69,232);
    background: linear-gradient(0deg, rgba(152,69,232,1) 0%, rgba(17,17,17,1) 5%);
    color: #FFFFFF;

    opacity: 0;
    pointer-events: none;
    transform: translateY(0);


    transition: 0.5s;

    > svg {
        position: absolute;
        top: 1rem;
        right: 1rem;
        transform: rotate(45deg);
        transition: 0.7s;
    }

    nav {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 2rem;
        top: 50%;
        transform:  scale(0.7);
        transition: 0.7s;
    }

    li {
        list-style: none;
    }

    a {
        color: #FFFFFF;
        text-decoration: none;
        font-size: 18px;
    }

    
    ${({ isOpen }) => isOpen && css`
        opacity: 1;
        pointer-events: auto;
        transform: translateY(50);
        overflow: hidden;

        > svg {
            transform: rotate(0deg);
        }

        nav { 
            transform: scale(1);
        }
    `}
`

