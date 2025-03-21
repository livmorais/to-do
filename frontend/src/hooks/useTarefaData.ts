import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios"
import { TarefaData } from '../interface/TarefaData';

const API_URL = 'http://localhost:8080';

const fetchData = async (): AxiosPromise<TarefaData[]> => {
    const response = axios.get(API_URL + '/tarefa');
    return response;
}

export function useTarefaData(){
    const query = useQuery({
        queryFn: fetchData,
        queryKey: ['tarefa-data'],
        retry: 2
    })

    return {
        ...query,
        data: query.data?.data
    }
}