import { useContext } from "react";
import { Alert, Button, Form, Row, Col , Stack } from "react-bootstrap";
import { AuthContext } from "../assist/Auth";

const Login = () => {

    const {updateLoginInfo, LoginUser, loginError, loginInfo, isLoginLaoding } = useContext(AuthContext);

    return  <>
        <Form onSubmit={LoginUser}>
            <Row style={{height: "100vh", justifyContent:"center", paddingTop:"5%"}}>
                <Col xs={3}>
                <Stack gap={3}>
                    <h2>log in</h2>

                    <Form.Control type="email" placeholder="Email" 
                    onChange={(e)=>{ updateLoginInfo({...loginInfo, email: e.target.value})
                        }}/>

                    <Form.Control type="password" placeholder="Password" 
                    onChange={(e)=>{ updateLoginInfo({...loginInfo, password: e.target.value})
                        }}/>

                    <Button variant="primary" type="submit">
                        {isLoginLaoding? "logging" : "Log in"}
                    </Button>

                    {loginError?.error && ( <Alert 
                        variant="danger"> 
                        <p>{loginError?.message}</p> 
                        </Alert>)}

                </Stack>
                </Col>
            </Row>
        </Form>
    </> 
}
 
export default Login;