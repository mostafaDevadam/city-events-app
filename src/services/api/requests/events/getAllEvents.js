import { callAPI } from "../../callAPi"


export const getAllEvents = async () => {
    const result = await callAPI("GET", "/events/all")
    return result.data
}
