import toast from "react-hot-toast";
import { taskpoints } from "../apis";
import axios from "axios";

const { ADD_TASK, EDIT_TASK, DELETE_TASK, GET_ALL_TASK } = taskpoints;

export const addTask = async (data, token) => {
    const toastId = toast.loading("Loading...");
    try {
        const response = await axios.post(ADD_TASK, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.data.success) {
            toast.success("Task added successfully");
            return response.data;
        } else {
            throw new Error(response.data.message);
        }
    } catch (error) {
        console.error("ADD TASK API ERROR............", error);
        toast.error("Adding task failed");
        return null;
    } finally {
        toast.dismiss(toastId);
    }
};


export const editTaskAPI = async (taskData, token) => {
    const toastId = toast.loading("Updating task...");
    try {
        const response = await axios.put(EDIT_TASK, taskData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.data.success) {
            throw new Error(response.data.message);
        }

        toast.success("Task updated successfully");
        return { success: true, data: response.data };
    } catch (error) {
        console.log("EDIT TASK API ERROR............", error);
        toast.error("Updating task failed");
        return { success: false, message: error.message };
    } finally {
        toast.dismiss(toastId);
    }
};

export const deleteTaskAPI = async (taskId,token) => {
    const toastId = toast.loading("Deleting...");
    try {
      const response = await axios.delete(DELETE_TASK, {
        data: { taskId },  
        headers: {
            Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
  
      toast.success("Task deleted successfully");
      return { success: true, message: "Task deleted successfully" };
    } catch (error) {
      console.log("DELETE TASK API ERROR............", error);
      toast.error("Deleting task failed");
      return { success: false, message: error.message };
    } finally {
      toast.dismiss(toastId);
    }
  };

export const getAllUserTasks = async (token) => {
    const toastId = toast.loading("Loading...");
    try {
      const response = await axios.get(GET_ALL_TASK,{
        headers: {
                Authorization: `Bearer ${token}`,
            },
      });
  
      if (!response.data.success) {
        throw new Error(response.data.message);
      }
  
      toast.success("Tasks fetched successfully");
      return response.data;
    } catch (error) {
      console.error("GET ALL TASKS API ERROR............", error);
      toast.error("Fetching tasks failed");
      throw error;
    } finally {
      toast.dismiss(toastId);
    }
  };
