import { callAPI } from "../../callAPi"


export const getAllEventsByUserID = async (user_ID) => {
    const result = await callAPI("GET", "/events/all/user/"+user_ID)
    return result.data
}
