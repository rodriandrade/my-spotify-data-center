import styled from 'styled-components'

const TitleText = styled.h1`
    font-size: ${(props) => {
    switch (props.size) {
      case "h1":
        return "48px";
      case "h2":
        return "36px";
      case "h3":
        return "24px";
      case "h4":
        return "18px";
      case "componentsHeading":
        return "60px";
    }
  }};
    font-family: 'Poppins', sans-serif; 
    color: #fff;
    margin:80px 0;
    text-align:center;
`

export default TitleText