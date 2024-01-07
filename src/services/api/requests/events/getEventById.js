import { callAPI } from "../../callAPi"


export const getEventById = async (_id) => {
    const result = await callAPI("GET", "/events/"+_id)
    return result.data

}
