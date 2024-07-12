import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { endpoints } from "../apis";
import { setLoading, setToken } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";

const {
    SIGNUP_API,
    LOGIN_API,
  } = endpoints

export function signup(
    formData,navigate
) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
    
        const { name, email, password, about } = formData;

    try {
      const response = await apiConnector("POST", SIGNUP_API, {
        name,
        email,
        password,
        about,
      });

            console.log("SIGNUP API RESPONSE............", response)
            
            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("SIgnup Successful")
            navigate("/login")
        }
        catch(error) {
            console.log("SIGNUP API ERROR............", error)
            toast.error("Signup Failed")
            navigate("/signup")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function login(email,password,navigate) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST", LOGIN_API,{
                email,password,
            })

            console.log("LOGIN API RESPONSE............", response)

            if(!response.data.success) {
                throw new Error(response.data.message) 
            }

            toast.success("Login Successfully")
            dispatch(setToken(response.data.token))

            dispatch(setUser(response.data.user))

            localStorage.setItem("token",JSON.stringify(response.data.token))
            localStorage.setItem("user", JSON.stringify(response.data.user))
            navigate("/")
        }
        catch(error) {
            console.log("LOGIN API ERROR............", error)
            toast.error("Login Failed")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function logout(navigate) {
    return (dispatch) => {
        dispatch(setToken(null))
        dispatch(setUser(null))
        localStorage.removeItem("token")
        localStorage.removeItem("user")
        toast.success("Logged Out")
        navigate("/")
    }
}