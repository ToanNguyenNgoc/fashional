import { axiosConfig } from "@/configs"

export const authApi = {
    login:(body:{email:string, password:string})=>{
        return axiosConfig.post('/v1/login', body)
    }
}