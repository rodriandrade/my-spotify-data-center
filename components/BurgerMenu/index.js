import { StyledBurger, MenuContainer } from './styled';

const BurgerMenu = ({ open, setOpen }) => {
  return (
    <MenuContainer>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
    </MenuContainer>
  )
}

export default BurgerMenu;