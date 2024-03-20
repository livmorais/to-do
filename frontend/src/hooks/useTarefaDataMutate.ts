import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios"
import { TarefaData } from '../interface/TarefaData';

const API_URL = 'http://localhost:8080';

const postData = async (data: TarefaData): AxiosPromise<any> => {
    const response = axios.post(API_URL + '/tarefa', data);
    return response;
}

export function useTarefaDataMutate(){
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['tarefa-data']})
        }
    })

    return mutate
}