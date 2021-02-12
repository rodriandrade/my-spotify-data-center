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
                    <InfoTitle>No encontramos reproductores activos</InfoTitle>
                    <InfoText>Para reproducir esta canción es necesario que tengas algún reproductor de Spotify abierto. Para que el dispositivo pueda ser detectado hay que empezar a reproducir una canción. Cuando lo hagas podés volver a intentar :)</InfoText>
                    <Button onClick={ () => props.setModalIsOpen(!props.modalIsOpen)} >Volver a intentar</Button>
                </InfoContainer>  
            </Container>
        </ClientOnlyPortal>
        : null}
        </div>
    )
}

export default Modal