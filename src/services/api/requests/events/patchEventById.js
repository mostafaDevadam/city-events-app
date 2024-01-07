import { callAPI } from "../../callAPi"


export const patchEventById = async (_id, data) => {
    const result = await callAPI("PATCH", "/events/update/"+_id, data)
    return result.data
}
