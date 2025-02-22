import { defineStore } from "pinia"
import axios from 'axios';


interface IPropsCalled {
    id:number,
    title:string,
    description: string,
    priority: string,
    userId:number,
    status: string,
}

export const useApiCalledStore = defineStore('called', () => {
    const create = async (data:Omit<IPropsCalled, 'id'>) => {
        const resp = ref('')
        const httpPost = await axios.post('http://localhost:3333/called',data)
        resp.value = JSON.stringify(httpPost.data)
        return resp.value
    }




   
  
    return { create }
  })