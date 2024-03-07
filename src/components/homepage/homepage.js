import { Link } from "react-router-dom";
import styles from "./homepage.module.css";
import { useContext, useEffect, useState } from "react";
import { DataShare } from "../../navigationStack/postLoginScreen";
import axios from "axios";

const HomePage = () => {
  const { taskData, updateTask, deleteTask } = useContext(DataShare);
  const [searchTerm, setSearchTerm] = useState("");
  const [taskStatus, setTaskStatus] = useState({}); // Manage task statuses



  const handleChange = (index, selectedValue) => {
    setTaskStatus((prevStatus) => ({
      ...prevStatus,
      [index]: selectedValue === "Done" ? !prevStatus[index] : false,
    }));
  };

  const deleteTodo = (task_id) => {
    console.log(task_id)
    const userConfirmed = window.confirm("Are you sure to delete?");
    if (userConfirmed) {
      // deleteTask(index);
      axios.delete(`http://localhost:3010/delete/${task_id}`)
      .then(res=>{
        console.log(res)
        window.location.reload()
      })
      .catch(error=>console.log(error))
    }
  };

  // Filter tasks based on search term
  const filteredTasks = taskData.filter(
    (task) =>
      task &&
      task.title &&
      task.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div>
        <div className={styles.header}>
          <h1 className={styles.heading}>TASK HUB.</h1>
          <Link to="/createtask">
            <button className={styles.button}>Create Task+</button>
          </Link>
        </div>
        <br />
        <br />
        {/* Search input */}
        <div className={styles.searches}>
          <div className={styles.searchContainer}>
            <input
              type="text"
              className={styles.inputSearch}
              placeholder="Search tasks... "
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {/* <div>
            <select className={styles.selection}>
              <option value="default" selected>
                No status filter
              </option>
              <option value="Incomplete">Incomplete</option>
              <option value="Progress">Progress</option>
              <option value="Done">Done </option>
            </select>
          </div> */}
        </div>
        <br />
        <br />

        <div>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((val, ind) => (
              <div key={ind} className={styles.task}>
                <h1
                  className={styles.title}
                  style={
                    taskStatus[ind]
                      ? { textDecoration: "line-through" }
                      : { textDecoration: "none" }
                  }
                >
                  {val.title}
                </h1>
                <p className={styles.description}>{val.description}</p>
                
                <div className={styles.sb}>
                {/* <button className={styles.buttonStyle}>EditTask</button> */}
                  <select
                    className={styles.select}
                    value={taskStatus[ind] ? "Done" : "Progress"}
                    onChange={(e) => handleChange(ind, e.target.value)}
                  >
                    {/* <option value="Incomplete">Incomplete</option> */}
                    <option value="Progress">Progress</option>
                    <option value="Done">Done</option>
                   
                  </select>
                    
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/6861/6861362.png"
                    style={{ width: "38hpx", height: "38px", borderRadius: "50%" }}
                    onClick={() => deleteTodo(val.task_id)}
                  />
                  
                </div>
              </div>
            ))
          ) : (
            <h1 style={{textAlign:"center",color:"lightcyan"}}>No Task are added</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;