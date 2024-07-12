import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Task from "./Task";
import { getAllUserTasks } from "../../services/operations/taskAPI";

const ShowTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await getAllUserTasks(token);
        console.log("data...",fetchedTasks)
        setTasks(fetchedTasks.data.Task);
      } catch (error) {

      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [token]);

  console.log("hello....",tasks)

  return (
    <div className="grid grid-cols-12 mt-3">
      <div className="col-span-6 col-start-4">
        <h1 className="text-3xl mb-3 ">
          Your tasks ({tasks?.length ?? 0})
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          tasks && tasks.length > 0 ? (
            tasks.map((task) => (
              <Task task={task} key={task._id} setTasks={setTasks} />
            ))
          ) : (
            <p>No tasks found</p>
          )
        )}
      </div>
    </div>
  );
};

export default ShowTasks;
