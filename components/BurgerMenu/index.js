import { StyledBurger, MenuContainer } from './styled';

const BurgerMenu = ({ open, setOpen }) => {
  return (
    <MenuContainer open={open}>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
    </MenuContainer>
  )
}

export default BurgerMenu;