import { useContext, createContext, useState } from 'react';

export const loginContext = createContext();
export const useLoginContext = () => {
    return useContext(loginContext)
}
export function LoginProvider(props){
    const [isLogin, setIsLoginRaw] = useState(localStorage.getItem("isLogin") == "true");
    function setIsLogin(value){
        localStorage.setItem("isLogin", value)
        setIsLoginRaw(value);
    }
    const [userId, setUserIdRaw] = useState(Number(localStorage.getItem("userId")));
    function setUserId(value){
        localStorage.setItem("userId", value)
        setUserIdRaw(value)
    }
    return(
        <loginContext.Provider value={{isLogin, setIsLogin, userId, setUserId}}>
            {props.children}
        </loginContext.Provider>
    )
}