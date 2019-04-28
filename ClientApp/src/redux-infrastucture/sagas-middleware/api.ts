import axios from 'axios';
import { ITask } from '../store/tasksState';

export const createTask = async (requestPayload: ITask): Promise<any> => {
    try {
        const response = await axios.post<any>(`api/task/create`, requestPayload);
        
        if (response.status !== 200) {
            return { error: new Error('Failure') };
        }
        return { data: response.data };
    } catch (e) {
        return { error: e };
    }
};

export const getTasks = async (): Promise<any> => {
    try {
      const response = await axios.get<any>(`api/task/gettasks`);
      if (!response.status) {
        return { error: new Error('Failure') };
      }
      return { data: response.data };
    } catch (e) {
      return { error: e };
    }
};

export const completeTask = async(taskId: number): Promise<any> => {
    try {
      const requestPayload = {
        taskId,
      };
      const response = await axios.put<any>('api/task/completetask', requestPayload)
      if (!response.status) {
        return { error: new Error('Failure') };
      }
      return { data: response.data };
    } catch (e) {
      return { error: e };
    }
}

export const removeTask = async(taskId: number): Promise<any> => {
    try {
      const requestPayload = {
        taskId,
      };
      const response = await axios.post<any>('api/task/removetask', requestPayload);
      if (!response.status) {
        return { error: new Error('Failure') };
      }
      return { data: response.data };
    } catch (e) {
      return { error: e };
    }
}