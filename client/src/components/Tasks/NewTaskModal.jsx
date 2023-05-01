import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button
  } from '@chakra-ui/react'
import TaskForm from './TaskForm'

const NewTaskModal = ({ isOpen, onClose, addTask }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TaskForm onClose={onClose} addTask={addTask}/>
          </ModalBody>
        </ModalContent>
      </Modal>
  )
}

export default NewTaskModal