import TitleText from './styled'

const Title = ({children, ...props}) =>{
    const {size, margin} = props;
    return(
        <>
        <TitleText size={size} margin={margin}>{children}</TitleText>
        </>
    )
}

export default Title