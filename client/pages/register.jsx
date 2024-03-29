import { useContext } from "react";
import { Alert, Button, Form, Row, Col , Stack } from "react-bootstrap";
import { AuthContext } from "../assist/Auth.jsx";

const register = () => {
    const {registerInfo, updateRegisterInfo, registerUser, registerError, isregisterLaoding} = useContext(AuthContext);

    return  <>
        <Form onSubmit={registerUser}>
            <Row style={{height: "100vh", justifyContent:"center", paddingTop:"5%"}}>
                <Col xs={3}>
                <Stack gap={3}>
                    <h2>Register</h2>

                    <Form.Control 
                        type="text"
                        placeholder="Name" 
                        onChange={(e)=> 
                         updateRegisterInfo({...registerInfo, name: e.target.value})}/>

                    <Form.Control 
                        type="email" 
                        placeholder="Email"
                        onChange={(e)=> 
                             updateRegisterInfo({...registerInfo, email: e.target.value})} />

                    <Form.Control 
                        type="password" 
                        placeholder="Password" 
                        onChange={(e)=> 
                            updateRegisterInfo({...registerInfo, password: e.target.value})}/>

                    <Button variant="primary" type="submit">
                        {isregisterLaoding? "Loading " :"Register"}
                    </Button>

                            {
                                registerError?.error 
                                &&
                                <Alert variant="danger"> 
                    <p>{registerError?.message}</p>
                    </Alert>
                            }
                    
                </Stack>
                </Col>
            </Row>
        </Form>
    </> ;
}
 
export default register;