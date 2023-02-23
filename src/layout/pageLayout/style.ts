import styled from "styled-components"

export const Layout = styled.div`
    text-align: center;
    overflow: hidden;
    height: 100vh;
    display: grid;
    grid-template-rows: 15% 75% 10%;
    grid-template-columns: 1fr 10fr;
    grid-template-areas: 
    "h h"
    "a m"
    "f f"
    ;

    .Header{
        grid-area: h;
        background-color: cornflowerblue;
    }

    .Aside{
        grid-area: a;
        background-color: blanchedalmond;
    }

    .Main{
        grid-area: m;
        overflow: auto;
        padding:0;
        display: flex;
        flex-direction: column;
    }

    .Footer{
        grid-area: f;
        background-color: cornflowerblue;
    }
`