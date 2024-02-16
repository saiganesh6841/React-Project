import { BrowserRouter, Routes } from "react-router-dom"

import PostLOginScreens from "./postLoginScreen"
import PreLoginScreens from "./preLoginScreen"





const Navigation=()=>{

    return(
       <>
        
        <BrowserRouter>
        {/* <PostLOginScreens/> */}
       {/* <BasicExample/>
      <HomePage/> */}
      
        <PreLoginScreens/>
       
       </BrowserRouter>
       
       </> 
    )
}
export default Navigation