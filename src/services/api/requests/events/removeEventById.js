import { callAPI } from "../../callAPi"


export const removeEventById = async (_id) => {
    const result = await callAPI("DELETE", "/events/remove/"+_id)
    return result.data
}
