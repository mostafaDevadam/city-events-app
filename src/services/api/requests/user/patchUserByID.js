import { callAPI } from "../../callAPi"


export const patchUserByID = async (user_ID, data) => {
    const result = await callAPI("PATCH", "/users/"+user_ID, data)
    return result.data
}
