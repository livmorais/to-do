import axios, { AxiosPromise } from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';

const deleteData = async (id: number): AxiosPromise<any> => {
    try {
        const response = await axios.delete(`${API_URL}/tarefa/${id}`);
        return response;
    } catch (error) {
        console.error('Erro ao deletar tarefa:', error);
        throw error;
    }
}

export function useTarefaDataDelete(){
    const queryClient = useQueryClient();
    const mutate = useMutation({
        mutationFn: deleteData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['tarefa-data']})
        }
    })

    return mutate
}
