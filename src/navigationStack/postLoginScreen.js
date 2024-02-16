import { Route, Routes } from "react-router-dom"
import HomePage from "../components/homepage/homepage"
import CreateTask from "../components/createTask/createTask"
import { createContext, useContext, useState } from "react"


export const DataShare=createContext()

const PostLOginScreens=()=>{

   
    const [taskData,setTaskData]=useState([])
   

    const updateTask = (newData) => {
        
        setTaskData((value)=>[...value,newData])
        console.log(taskData)
      };
    
      const deleteTask = (index) => {
        const result = taskData.filter((val, ind) => ind !== index);
        setTaskData(result);
      };
    
      

    return(
        <>
       <DataShare.Provider value={{taskData,updateTask,deleteTask}}>
       <Routes>
            <Route path="/home" Component={HomePage} />
            <Route path="/createtask" Component={CreateTask} />
        </Routes>
       </DataShare.Provider>
        </>
    )
}
export default PostLOginScreens