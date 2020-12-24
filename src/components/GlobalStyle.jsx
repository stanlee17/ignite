import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    html {
        &::-webkit-scrollbar {
            width: 0.5rem;
        }

        &::-webkit-scrollbar-thumb {
            background-color: #d74f4f;
        }

        &::-webkit-scrollbar-track {
            background: white;
        }
    }

    body {
        font-family: 'Montserrat', sans-serif;
        width: 100%;
        background: #f8f8f8;
    }

    h2 {
        font-size: 3rem;
        font-family: 'Montserrat', sans-serif;
        color: #333;
    }

    h3 {
        font-size: 1.5rem;
        color: #333;
        padding: 1.2rem 0rem;
    }

    p, a {
        font-size: 1.2rem;
        line-height: 200%;
        color: #696969;
    }

    a {
        text-decoration: none;
    }

    img {
        display: block;
    }

    input {
        font-weight: bold;
        font-family: 'Montserrat', sans-serif;
    }
`

export default GlobalStyles
