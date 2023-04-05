import styled from "styled-components";

export const Header = styled.div`
    width: 100%;
    height: 123px;
    display: flex;
    flex-direction: space-between;
    justify-content: center;
    align-items: center;
    background-color: #111111;
    padding: 0 50px;
    position: fixed;

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

    nav img { 
        align-items: center;

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
    padding: 230px 50px 100px;
    display: flex;
    flex-direction: column;
    gap: 18px;
    font-size: 20px;
`

export const Title = styled.h2`
    padding: 0 50px;
    margin-bottom: 50px;
`
export const Card = styled.div`
    display: flex;
    flex-wrap: wrap;
    padding: 0 50px;
    gap: 10px;

    > div { 
        flex: 1 1 200px;
    }
`
export const CardProject = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    

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
    padding: 0 50px 35px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 50px 0 50px 0;

    img { 
    width: 5%;
    }
`
export const Contact = styled.div`
    display: flex;
    justify-content: center;
    padding: 0 50px;

    button {
    width: 30%;
    height: 55px;
    background-color: #000000;
    border-top: 1px solid  #10D7E2;
    border-bottom: 1px solid  #FBF2B1;
    border-right: 1px solid  #6518B4;
    border-left: 1px solid  #D24074;
    margin: 0px 0 50px 0;
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

`