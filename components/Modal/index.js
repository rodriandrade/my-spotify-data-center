import {Button, Container, CloseButton, InfoContainer, InfoText, InfoTitle } from './styled'
import React, {useRef} from 'react'
import ClientOnlyPortal from '../ClientOnlyPortal'

const Modal = props => {

    const modalRef = useRef();

    const closeModal = e =>{
        if(modalRef.current === e.target){
            props.setModalIsOpen(false)
        }
    }

    return(
        <div>
        {props.modalIsOpen ? 
        <ClientOnlyPortal selector="#modal">
            <Container ref={modalRef} onClick={closeModal}>
                <InfoContainer>
                    <CloseButton src="/cancel.svg" onClick={ () => props.setModalIsOpen(!props.modalIsOpen)} />
                    <InfoTitle>{props.title}</InfoTitle>
                    <InfoText>{props.text}</InfoText>
                    {props.buttonText && <Button onClick={ () => props.setModalIsOpen(!props.modalIsOpen)}>{props.buttonText}</Button>}
                </InfoContainer>  
            </Container>
        </ClientOnlyPortal>
        : null}
        </div>
    )
}

export default Modal