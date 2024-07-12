import { Task } from "../models/Task.js";
import { User } from "../models/User.js";
import { respond } from "../utils/response.js";

export const addTask = async (req,res) => {
    try{
        const userId = req.user.id;

        const{title,content,status} = req.body

        if(!userId) {
            return respond(res,"user not found",404,false)
        }

        if(!title || !content) {
            return respond(res,"all fields are required",200,true)
        }

        const newTask = await Task.create({
            title,content,status
        })

        const user = await User.findByIdAndUpdate(userId, {
            $push : {
                Task: newTask._id
            }
        })

        return respond(res,"task is created",200,true,user)

    }
    catch(error) {
        console.log(error)
        return respond(res,"something went wrong while adding the task",500,false)
    }
}

export const editTask = async(req,res) => {
    try {
        const { taskId, title, content, status } = req.body;

        if (!taskId) {
            return respond(res, "Task not found", 404, false);
        }

        const updatedTask = await Task.findByIdAndUpdate(
            taskId,
            { title, content, status },
            { new: true }
        );

        if (!updatedTask) {
            return respond(res, "Task not found", 404, false);
        }

        return respond(res, "Task updated successfully", 200, true, updatedTask);
    } catch (error) {
        console.log(error);
        return respond(res, "something went wrong while editing the task", 500, false);
    }
}

export const deleteTask = async (req,res) => {
    try{
        const {taskId} = req.body

        if(!taskId) {
            return respond(res,"task is not found",404,false)
        }

        const userId = req.user.id

        const updatedTasks = await User.findByIdAndUpdate(userId, {
            $pull: {
                Task:taskId
            }
        })

        const task = await Task.findByIdAndDelete(taskId)

        return respond(res,"task deleted successfully",200,true,updatedTasks)
    }catch(error) {
        console.log(error) 
        return respond(res,"something went wrong while deleting the task",500,false)
    }
}

export const getAllUserTasks = async(req,res) => {
    try{
        const userId = req.user.id;

        if(!userId) {
            return respond(res,"User not found",404,false)
        }

        const allTasks = await User.findById(userId).populate("Task").exec()

        return respond(res,"all tasks fetched successfully",200,true,allTasks)

    }catch(error) {
        console.log(error) 
        return respond(res,"something went wrong while fetching the user's all tasks",500,false)
    }
}