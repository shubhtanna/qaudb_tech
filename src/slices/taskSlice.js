import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    task:null,
    editTask:false,
}

const taskSlice = createSlice({
    name:"task",
    initialState,
    reducers: {
        setTask: (state,action) => {
            state.task = action.payload
        },
        setEditTask: (state,action) => {
            state.editTask = action.payload
        },
        resetTaskState: (state) => {
            state.task = null
            state.editTask = false
        },
    },
})

export const {setTask,setEditTask,resetTaskState} = taskSlice.actions

export default taskSlice.reducer