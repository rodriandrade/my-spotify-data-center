import styled from 'styled-components'

const TitleText = styled.h1`
    font-size: ${(props) => {
    switch (props.size) {
      case "extra-large":
        //return "72px";
        return "64px"
      case "h1":
        return "48px";
      case "h2":
        return "36px";
      case "h3":
        return "20px";
      case "h4":
        return "16px";
      case "componentsHeading":
        return "60px";
    }
  }};
    font-family: 'Poppins', sans-serif; 
    color: #fff;
    //margin-top:160px;
    //margin-bottom:20px;
    text-align:left;
    margin: ${(props) => (props.margin ? props.margin : "160px 0 20px 0")};

    @media (max-width: 480px) {
        font-size: ${(props) => {
          switch (props.size) {
            case "extra-large":
              //return "72px";
              return "36px"
            case "h1":
              return "48px";
            case "h2":
              return "36px";
            case "h3":
              return "20px";
            case "h4":
              return "24px";
            case "componentsHeading":
              return "60px";
          }
        }};
        margin: ${(props) => (props.margin ? props.margin : "160px 0 20px 0")};
    }
`

export default TitleText