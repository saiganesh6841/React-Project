import { Route, Routes } from "react-router-dom"
import CreateAccount from "../screens/preLoginScreens/preLoginScreens/register/register"
import LoginDetails from "../screens/preLoginScreens/preLoginScreens/login/login"




const PreLoginScreens=()=>{

    return(
        <>
          <Routes>
           
          <Route path="/" element={<CreateAccount/>}/>
          <Route path="/login" element={<LoginDetails/>}/>
       
          </Routes>
        </>
    )
}
export default PreLoginScreens