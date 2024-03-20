import { useEffect, useState } from 'react';
import { useTarefaDataMutate } from '../../hooks/useTarefaDataMutate';
import { TarefaData, StatusTarefa } from '../../interface/TarefaData';

import "./modal.css";

interface InputProps {
    label: string,
    value: string, 
    updateValue(value: string): void 
}   

interface ModalProps {
    closeModal(): void
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value ?? ''} onChange={event => updateValue(event.target.value)}></input>
        </>
    )
}

export function CreateModal({ closeModal }: ModalProps){
    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [status, setStatus] = useState<StatusTarefa | null>(null); 

    const { mutate, isSuccess, isPending } = useTarefaDataMutate();

    const submit = () => {
        if (!titulo || !descricao || status === null) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        const tarefaData: TarefaData = {
            titulo, 
            descricao,
            status: status as StatusTarefa 
        }
        mutate(tarefaData)
    }

    useEffect(() => {
        if(!isSuccess) return 
        closeModal();
    }, [isSuccess])

    return(
        <div className="modal-overlay">
            <div className="modal-body">
                <div className="header">
                    <h2>Crie uma nova tarefa</h2>
                    <button className="close-button" onClick={closeModal}>X</button>
                </div>
                <form className="input-container">
                    <Input label="Título" value={titulo} updateValue={setTitulo}/>
                    <Input label="Descrição" value={descricao} updateValue={setDescricao}/> 
                    <label htmlFor="status">Status:</label>
                    <select id="status" value={status ?? ''} onChange={event => setStatus(event.target.value as StatusTarefa)}>
                        <option value="">Selecione um status</option>
                        <option value={StatusTarefa.NAO_INICIADO}>Não Iniciado</option>
                        <option value={StatusTarefa.EM_ANDAMENTO}>Em Andamento</option>
                        <option value={StatusTarefa.CONCLUIDO}>Concluído</option>
                    </select>
                </form>
                <button onClick={submit} className="btn-secondary">
                    {isPending ? 'Adicionando tarefa...' : 'Adicionar'} 
                </button>
            </div>
        </div>
    )
}
