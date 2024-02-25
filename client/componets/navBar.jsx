import { useContext } from "react";
import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../assist/Auth";

const NavBar = () => {

    const {user, LogOutUser} = useContext(AuthContext)

    return  <Navbar bg= "dark" className="mb-4" style={{height:"3.75rem" }}>
        <Container>
            <h2>
                <Link to="/" className="link-light text-decoratio-none">
                Chat app
                </Link>
            </h2>
            {user && <span className="text-warning"> Logging in  as {user?.name}</span>}
            

            <Nav>
                <Stack direction="horizontal" gap={4}>
                    {
                        user && (<>
                        <Link onClick={()=>LogOutUser()} 
                        to="/login" className="link-light text-decoratio-none">
                        Log out
                        </Link>
                        </>)
                    }

                    {
                        !user && (<>
                        <Link to="/login" className="link-light text-decoratio-none">
                            Login
                        </Link>

                        <Link to="/register" className="link-light text-decoratio-none">
                            register
                        </Link></>)
                    }
                
                </Stack>
            </Nav>
        </Container>
        </Navbar> ;
}
 
export default NavBar;