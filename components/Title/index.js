import TitleText from './styled'

const Title = ({children, ...props}) =>{
    const {size} = props;
    return(
        <>
        <TitleText size={size}>{children}</TitleText>
        </>
    )
}

export default Title