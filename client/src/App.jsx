import { useState } from "react";
import "./App.css";
import Login from "./components/Auth/Login";
import TaskDashboard from "./components/Tasks/TaskDashboard";
import { Flex, Center } from "@chakra-ui/react";


function App() {
  const [user, setUser] = useState(null);

  return (
    <div className="App">
      <Flex height="100vh">
        <Center width="100%">
          {user ? <TaskDashboard user={user} /> : <Login setUser={setUser} />}
        </Center>
      </Flex>
    </div>
  );
}

export default App;
