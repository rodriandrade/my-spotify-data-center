import SubtitleText from './styled'

const Subtitle = ({children, ...props}) =>{
    const {size} = props;
    return(
        <>
        <SubtitleText size={size}>{children}</SubtitleText>
        </>
    )
}

export default Subtitle