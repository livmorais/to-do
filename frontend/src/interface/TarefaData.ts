export interface TarefaData {
    id?: number,
    titulo: string,
    descricao: string,
    status?: StatusTarefa
}

export enum StatusTarefa {
    NAO_INICIADO = 'NAO_INICIADO',
    EM_ANDAMENTO = 'EM_ANDAMENTO',
    CONCLUIDO = 'CONCLUIDO'
}