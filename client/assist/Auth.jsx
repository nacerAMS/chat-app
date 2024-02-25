import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../src/utils/services";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [registerError, setRegisterError] = useState(null);
    const [isregisterLaoding, setIsregisterLaoding] = useState(false);
    const [registerInfo, setregisterInfo] = useState({
        name: "",
        email:"",
        password : ""
    });

    const [loginInfo, setLoginInfo] = useState({
        email:"",
        password : ""
    });
    const [loginError, setLoginError] = useState(null);
    const [isLoginLaoding, setIsLoginLaoding] = useState(false);


    useEffect(()=>{
        const user =localStorage.getItem("User");

        setUser(JSON.parse(user))
    },[]);

    const updateRegisterInfo = useCallback((info) =>{
        setregisterInfo(info);
    },[]);

    const registerUser = useCallback(async(e)=>{
        e.preventDefault();

        setIsregisterLaoding(true)
        setRegisterError(null)

        const response =await postRequest(`${baseUrl}/users/register`,JSON.stringify(registerInfo));

        setIsregisterLaoding(false)
        if (response.error) {
            return setRegisterError(response);
        }
        localStorage.setItem("User", JSON.stringify(response))
        setUser(response);

    },[registerInfo]);

    const LoginUser = useCallback(async(e)=>{
        e.preventDefault();

        setIsLoginLaoding (true);
        setLoginError(null)

        const response =await postRequest(`${baseUrl}/users/login`,JSON.stringify(loginInfo));
        
        setIsLoginLaoding (false);

        if(response.error){ 
        return setLoginError(response)}

            localStorage.setItem("User", JSON.stringify(response));

            setUser(response);
    },[loginInfo])

    const updateLoginInfo = useCallback((info) =>{
        setLoginInfo(info);
    },[]);

    const LogOutUser = useCallback(()=>{
        localStorage.removeItem("User");
        setUser(null);
    },[]);

    return (
        <AuthContext.Provider 
            value={{
                user,
                registerInfo,
                updateRegisterInfo,
                registerUser,
                registerError,
                isregisterLaoding,
                LogOutUser,
                updateLoginInfo,
                LoginUser,
                loginError,
                loginInfo,
                isLoginLaoding

            }}> 
            {children}
        </AuthContext.Provider>
    );
};
