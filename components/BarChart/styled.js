import styled from "styled-components";

const ChartContainer = styled.div`
    height: 400px;
    margin-bottom: 0px;

    @media (max-width: 768px) {
        width:100%;
    }
`

const BarDescription = styled.div`
    color:rgb(10,10,10);
    font-size:14px;
    width:350px;
    padding:16px;
    line-height:23px;

    ::after{
        content:'';
        position:absolute;
        display:block;
        width: 0;
        height: 0;
        border-left: 40px solid transparent;
        border-right: 40px solid transparent;
        border-top: 50px solid #fff;
        top:100%;
        left:50%;
        transform: translate(-50%, -50%);
    }
`

export {ChartContainer, BarDescription}