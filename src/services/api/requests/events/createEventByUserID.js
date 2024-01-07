import { callAPI } from "../../callAPi"


export const createEventByUserID = async (userID, data) => {
    const result = await callAPI("POST", "/events/create/"+userID, data)
    return result.data
}
