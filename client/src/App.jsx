import "./App.css";
import Login from "./components/Auth/Login";
import TaskDashboard from "./components/Tasks/TaskDashboard";
import useAuth from "./hooks/useAuth";
import { Flex, Center } from "@chakra-ui/react";



function App() {
  const { auth, setAuth } = useAuth();

  return (
    <div className="App">
      <Flex height="100vh">
        <Center width="100%">
          {auth.accessToken ? <TaskDashboard  /> : <Login />}
        </Center>
      </Flex>
    </div>
  );
}

export default App;
