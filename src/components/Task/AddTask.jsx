import React, { useState, useEffect } from 'react';
import loginSvg from '../../assets/login.svg';
import { addTask, editTaskAPI } from '../../services/operations/taskAPI';
import { useDispatch, useSelector } from 'react-redux';
import { setTask } from '../../slices/taskSlice';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';

const AddTask = () => {
    const { register, handleSubmit, reset, setValue} = useForm();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const location = useLocation();
    const navigate = useNavigate()

    const [editTaskId, setEditTaskId] = useState(null);

    useEffect(() => {
        if (location.state?.task) {
            const { title, content, status, _id } = location.state.task;
            setEditTaskId(_id);
            setValue('title', title);
            setValue('content', content);
            setValue('status', status);
        } else {
            reset();
        }
    }, [location.state, reset, setValue]);

    const onSubmit = async (data) => {
        setLoading(true);
        let result;
        if (editTaskId) {
            result = await editTaskAPI({
                title: data.title,
                content: data.content,
                status: data.status,
                taskId: editTaskId,
            }, token);
        } else {
            result = await addTask({
                title: data.title,
                content: data.content,
                status: data.status,
            }, token);
        }
        if (result.success) {
            dispatch(setTask(result.data));
            setEditTaskId(null);
            reset(); 
            navigate("/showTask")
        }
        setLoading(false);
    };

    return (
        <div className="grid grid-cols-12 justify-center">
            <div className="col-span-4 col-start-5 p-5 shadow-sm">
                <div className="my-8 flex justify-center">
                    <img src={loginSvg} style={{ width: '50%' }} alt="Login banner" />
                </div>
                <h1 className="text-3xl text-center">{editTaskId ? 'Edit your task here' : 'Add your task here'}</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-4">
                        <label htmlFor="title" className="block text-sm font-medium mb-2">Title</label>
                        <input
                            id="title"
                            disabled={loading}
                            placeholder="Add a title here"
                            {...register('title', { required: true })}
                            className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800 focus:text-white text-opacity-1 text-white"
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="content" className="block text-sm font-medium mb-2">Content</label>
                        <textarea
                            id="content"
                            disabled={loading}
                            placeholder="Add content here"
                            {...register('content', { required: true })}
                            className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800 focus:text-white text-opacity-1 text-white"
                            rows={5}
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block text-sm font-medium mb-2">Status</label>
                        <select
                            id="status"
                            disabled={loading}
                            {...register('status', { required: true })}
                            className="w-full p-3 rounded-3xl bg-gray-800 focus:ring-gray-400-100 border border-gray-800 focus:text-white text-opacity-1 text-white"
                        >
                            <option value="" disabled>---Select Status---</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div className="mt-4 flex justify-center">
                        <button
                            type="submit"
                            className="bg-blue-600 py-2 px-3 rounded-lg hover:bg-blue-800"
                            disabled={loading}
                        >
                            {editTaskId ? 'Edit Task' : 'Add Task'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTask;
