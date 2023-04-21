import { useState } from "react";
import "./App.css";
import Login from "./components/Auth/Login";
import { Flex, Center } from "@chakra-ui/react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Flex height="100vh">
        <Center width="100%">
          <Login setUser={null}/>
        </Center>
      </Flex>
    </div>
  );
}

export default App;
