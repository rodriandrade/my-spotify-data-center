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
    //margin: ${(props) => (props.margin ? props.margin : "160px 0 20px 0")};
    position:relative;
    margin: ${(props) => {
          switch (props.margin) {
            case "none":
              return "0 0 0 0"
            case "subtitle":
              return "90px 0 60px 0";
            case "bigger-subtitle":
              return "90px 0 20px 0";
            case "data-subtitle":
              return "60px 0 0 0";
            case "title":
              return "160px 0 20px 0";
          }
    }};

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
              return "24px";
            case "h4":
              return "24px";
            case "componentsHeading":
              return "60px";
          }
        }};
       // margin: ${(props) => (props.margin ? props.margin : "160px 0 20px 0")};
       margin: ${(props) => {
          switch (props.margin) {
            case "none":
              return "0 0 0 0"
            case "subtitle":
              return "90px 0 0px 0";
            case "data-subtitle":
              return "60px 0 0 0";
            case "title":
              return "160px 0 20px 0";
          }
    }};
    }
`

export default TitleText