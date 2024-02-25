import{Routes, Route, Navigate} from "react-router-dom";
import Chat from "../pages/chat";
import Login from "../pages/login";
import Register from "../pages/register";
import "bootstrap/dist/css/bootstrap.min.css";
import {Container} from "react-bootstrap";
import NavBar from "../componets/navBar";
import { useContext } from "react";
import { AuthContext } from "../assist/Auth";
import { ChatContextProvider } from "../assist/chatContext";

function App() {

    const {user} = useContext(AuthContext)
  return (
    <ChatContextProvider user={user}>
    <NavBar />
    <Container className="text-success">
    <Routes>
      <Route path="/" element= {user ?<Chat />: <Login />} />
      <Route path="/register" element= {user ?<Chat />: <Register />} />
      <Route path="/login" element= {user ?<Chat />: <Login />} />
      <Route path="*" element= {<Navigate to = "/"/>} />

    </Routes>
    </Container>
    </ChatContextProvider>
  )
}

export default App
