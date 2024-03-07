// postLoginScreen.js

import { Route, Routes } from "react-router-dom";
import HomePage from "../components/homepage/homepage";
import CreateTask from "../components/createTask/createTask";
import { createContext, useEffect, useState } from "react";

export const DataShare = createContext();

const PostLoginScreens = () => {
  const [taskData, setTaskData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3010/gettasks");
      if (response.ok) {
        const data = await response.json();
        setTaskData(data);
        setLoading(false);
      } else {
        console.error("Failed to fetch tasks");
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateTask = (newData) => {
    console.log("Updating Task:", newData);
    setTaskData((value) => [...value, newData]);
  };

  const deleteTask = (index) => {
    const result = taskData.filter((val, ind) => ind !== index);
    setTaskData(result);
  };

  return (
    <DataShare.Provider value={{ taskData, updateTask, deleteTask }}>
      <Routes>
        <Route
          path="/home"
          element={loading ? <div>Loading...</div> : <HomePage />}
        />
        <Route path="/createtask" element={<CreateTask />} />
      </Routes>
    </DataShare.Provider>
  );
};

export default PostLoginScreens;
