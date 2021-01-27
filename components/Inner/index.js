import InnerContainer from './styled'

const Inner = ({children, ...props}) => {
    return(
        <InnerContainer>
            {children}
        </InnerContainer>
    )
}

export default Inner