import { BrowserRouter, Routes } from "react-router-dom"

import PreLoginScreens from "./preLoginScreen"
import { createContext, useEffect, useState } from "react"
import PostLoginScreens from "./postLoginScreen"


  export const LoginInformation=createContext()


const Navigation=()=>{

  const[login,setLogin]=useState(false)

  useEffect(() => {
    const storedLogin = sessionStorage.getItem("loggedIn");
    if (storedLogin) {
      setLogin(true);
    }
  }, []);

  const loginTrue = () => {
    setLogin(true);
    sessionStorage.setItem("loggedIn", "true"); 
  };

    return(
       <>
       <LoginInformation.Provider value={{loginTrue}}>
          
       <BrowserRouter>
        
        {
          login?
          <PostLoginScreens/>
          :
          <PreLoginScreens/>
        }
       
       
       </BrowserRouter>
       </LoginInformation.Provider>
       
       </> 
    )
}
export default Navigation