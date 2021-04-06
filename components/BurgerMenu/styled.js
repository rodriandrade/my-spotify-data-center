import styled from 'styled-components';

const StyledBurger = styled.button`
  position: fixed;
  top: 15px;
  left: 5%;
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 100;
  position: fixed;
  &:focus {
    outline: none;
  }
  div {
    width: 2rem;
    height: 0.25rem;
    background: #fff;
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
    :first-child {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }
    :nth-child(2) {
      opacity: ${({ open }) => open ? '0' : '1'};
      transform: ${({ open }) => open ? 'translateX(20px)' : 'translateX(0)'};
    }
    :nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }

  @media (max-width: 480px) {
      display:flex;
      z-index: 3001;
  }
`;

const MenuContainer = styled.div`
  @media (max-width: 480px) {
      width:100%;
      height:60px;
      position:fixed;
      top:0;
      background-color:${({ open }) => open ? 'rgba(5,5,5,0.0)' : 'rgba(5,5,5,0.9)'};
      z-index:3001;
      backdrop-filter:blur(20px);
  }
`

export { StyledBurger, MenuContainer }