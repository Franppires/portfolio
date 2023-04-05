import { createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
    * { 
        margin: 0;
        padding: 0;
        box-sizing: border-box
    }

    button {
        cursor: pointer;
    }

    body { 
        font-family: 'Inter', sans-serif;
        background-color: #000000;
        color: #FFFFFF;
    }

`

