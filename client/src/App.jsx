import "./App.css";
import Login from "./components/Auth/Login";
import TaskDashboard from "./components/Tasks/TaskDashboard";
import useAuth from "./hooks/useAuth";
import { Flex, Center } from "@chakra-ui/react";
import useRefreshToken from "./hooks/useRefreshToken";
import { useEffect } from "react";

function App() {
  const { auth, setAuth } = useAuth();
  const refresh = useRefreshToken();

  //persist login if refresh token is valid
  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.error(err);
      }
    };
    if (!auth?.accessToken) {
      verifyRefreshToken();
    }
  }, []);

  return (
    <div className="App">
      <Flex height="100vh">
        <Center width="100%">
          {auth.accessToken ? <TaskDashboard /> : <Login />}
        </Center>
      </Flex>
    </div>
  );
}

export default App;
