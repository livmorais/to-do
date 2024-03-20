import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios"
import { TarefaData } from '../interface/TarefaData';

const API_URL = 'http://localhost:8080';

const putData = async (data: TarefaData): AxiosPromise<any> => {
    const response = axios.put(`${API_URL}/tarefa/${data.id}`, data);
    return response;
}

export function useTarefaDataUpdate(){
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: putData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['tarefa-data']})
        }
    })

    return mutate
}
