
import { useContext, useState } from "react"
import style from "./create.module.css"
import { DataShare } from "../../navigationStack/postLoginScreen"

const CreateTask=()=>{
    const {taskData,updateTask}=useContext(DataShare)

    const [newTitle,setNewTitle]=useState("")
    const [newDescription,setNewDescription]=useState("")

    const handleSubmit=()=>{
           
        if(newTitle=="" && newDescription==""){
            alert("enter the title")
        }
        else if( newDescription==""){
            alert("enter the description")
        }
        else{
            var obj={
                title:newTitle,
                description:newDescription
            }
           
            updateTask(obj)
            alert("The task was successfully created ")
            setNewTitle("")
            setNewDescription("")
        }
        
    }

    return(
        <>
        <div className={style.create}>
            <h1 className={style.head}>Create a New Task</h1>
            <p className={style.para}>Provide the information about the task you wish to complete</p>
             <label className={style.labels}>Title:</label><br/>
             <input type="text" placeholder="title" className={style.input} value={newTitle} onChange={(e)=>setNewTitle(e.target.value)}/>
             <br/><br/>
             <label className={style.labels}>Description:</label><br/>
             <textarea rows={5} cols={60} placeholder="Description" className={style.textarea} value={newDescription} onChange={(e)=>setNewDescription(e.target.value)}></textarea>
               
               <button className={style.button} onClick={handleSubmit}>CREATE TASK</button>

        </div>
        </>
    )
}
export default CreateTask;