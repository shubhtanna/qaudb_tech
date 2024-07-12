import express from "express"
import { addTask, deleteTask, editTask, getAllUserTasks } from "../controllers/Task.js";
import {auth} from "../middleware/Auth.js"

const router = express.Router();

router.post("/addTask",auth,addTask)
router.put("/editTask",auth,editTask)
router.delete("/deleteTask",auth,deleteTask)
router.get("/getAllTask",auth,getAllUserTasks)

export default router