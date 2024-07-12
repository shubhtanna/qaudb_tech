import React from 'react';
import { RxCross1, RxPencil1 } from 'react-icons/rx'; 
import { useNavigate } from 'react-router-dom'; 
import { deleteTaskAPI } from '../../services/operations/taskAPI';
import { useSelector } from 'react-redux';

const Task = ({ task, setTasks }) => {
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);

    const deleteTask = async (taskId) => {
        const result = await deleteTaskAPI(taskId, token);
        if (result.success) {
            
            setTasks((prevTasks) => prevTasks.filter((t) => t._id !== taskId));
        }
    };

    const editTask = (taskId) => {
        navigate(`/addTask`, { state: { task } }); 
    };

    return (
        <div className={`shadow-lg mt-2 rounded-md text-white ${task.status === 'completed' ? 'bg-green-800' : 'bg-gray-800'}`}>
            <div className="p-5">
                <div className="flex justify-between">
                    <h1 className="text-2xl font-semibold text-white">{task.title}</h1>
                    <div className="flex space-x-2">
                        <span onClick={() => editTask(task._id)} className="shadow-lg bg-black rounded-full w-9 h-9 flex justify-center items-center cursor-pointer">
                            <RxPencil1 />
                        </span>
                        <span onClick={() => deleteTask(task._id)} className="shadow-lg bg-black rounded-full w-9 h-9 flex justify-center items-center cursor-pointer">
                            <RxCross1 />
                        </span>
                    </div>
                </div>
                <p className="font-normal text-white">{task.content}</p>
                <div className="flex justify-between mt-3">
                    <p className="text-left">
                        Status: <span className="font-bold text-white">{task.status}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Task;
