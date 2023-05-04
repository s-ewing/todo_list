import LoginForm from "./LoginForm";
import RegistrationModal from "./RegistrationModal";
import { useDisclosure } from "@chakra-ui/react";


const Main = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <div>
      <LoginForm onOpen={onOpen}/>
      <RegistrationModal isOpen={isOpen} onClose={onClose}/>
    </div>
  );
};

export default Main;
