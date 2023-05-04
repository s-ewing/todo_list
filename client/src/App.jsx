import "./App.css";
import Main from "./components/Login/Main";
import TaskDashboard from "./components/Tasks/TaskDashboard";
import useAuth from "./hooks/useAuth";
import { Flex, Center, Text } from "@chakra-ui/react";
import useRefreshToken from "./hooks/useRefreshToken";
import { useState, useEffect } from "react";

function App() {
  const { auth, persist } = useAuth();
  const refresh = useRefreshToken();
  const [isLoading, setIsLoading] = useState(true);

  //persist login if refresh token is valid
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    if (!auth?.accessToken && persist) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="App">
      <Flex height="100vh" bg="teal.900">
        <Center width="100%">
          {isLoading ? (
            <Text fontSize="5xl">Loading...</Text>
          ) : auth.accessToken ? (
            <TaskDashboard />
          ) : (
            <Main />
          )}
        </Center>
      </Flex>
    </div>
  );
}

export default App;
