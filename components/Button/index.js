import ButtonCont from './styled'

const Button = ({children, ...props}) =>{
    return(
        <ButtonCont>{children}</ButtonCont>
    )
}

export default Button