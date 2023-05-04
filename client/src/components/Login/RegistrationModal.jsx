import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
  import RegistrationForm from './RegistrationForm'

const RegistrationModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="cyan.100">
          <ModalHeader>Create New Account</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <RegistrationForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
  )
}

export default RegistrationModal