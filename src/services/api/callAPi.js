
import axios from 'axios'
import { AuthService } from '../auth.service'

const base_url = process.env.REACT_APP_API



const buildHeader = async () => {
    return {
        ...(await AuthService.getToken && {"auth-token": await AuthService.getToken()})
    }
}



export const callAPI = async (method, url, data) => {

    const res = await axios({
        method: method,
        url: base_url + url,
        data: data,
        headers: await buildHeader(),
    })

    return res

}



