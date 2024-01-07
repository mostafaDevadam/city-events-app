import { callAPI } from "./api/callAPi"
import { getUserByID } from "./api/requests/user/getUserByID"
import { UserService } from "./api/requests/user/user.index"
import { StorageService } from "./storage.service"

const base_url = process.env.REACT_APP_API
// login
const login = async (data) => {
    console.log(base_url)
    const res = await callAPI('POST', '/auth/login', data)
    console.log("login:", res)
    StorageService.saveItem("USER", res.data)
    StorageService.saveItem("TOKEN", res.data.token)

    /*if(res.data.id){
        const user = await getUserByID(res.data.id) //await UserService.getUserByID(res.data.id)
        console.log("user:", user)
        //StorageService.saveItem("user_info", user)
    }*/


    return res.data
}

// register
const register = async (data) => {
    const res = await callAPI('POST', '/auth/register', data)
    console.log("register:", res)
    return res.data
}

const getToken = async () => {
    return await StorageService.getItem("TOKEN")

}

export const AuthService = { login, register, getToken}
