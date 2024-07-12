const BASE_URL = "http://localhost:4000/api/v1";

export const endpoints = {
  SIGNUP_API: BASE_URL + "/auth/signup",
  LOGIN_API: BASE_URL + "/auth/login",
};

export const taskpoints = {
  ADD_TASK: BASE_URL + "/task/addTask",
  EDIT_TASK: BASE_URL + "/task/editTask",
  DELETE_TASK: BASE_URL + "/task/deleteTask",
  GET_ALL_TASK: BASE_URL + "/task/getAllTask"
}