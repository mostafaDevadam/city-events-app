import { callAPI } from "../../callAPi"


export const getUserByID = async (_id) => {
    const result = await callAPI("GET", "/users/"+_id)
    return result.data
}
