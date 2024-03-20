import { useEffect, useState } from 'react';
import { useTarefaDataUpdate } from '../../hooks/useTarefaDataPut';
import { TarefaData, StatusTarefa } from '../../interface/TarefaData';


interface InputProps {
    label: string,
    value: string, 
    updateValue(value: string): void 
}   

interface ModalProps {
    closeModal(): void,
    tarefaData?: TarefaData
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value ?? ''} onChange={event => updateValue(event.target.value)}></input>
        </>
    )
}

export function UpdateModal({ closeModal, tarefaData }: ModalProps){
  const [titulo, setTitulo] = useState(tarefaData?.titulo || "");
  const [descricao, setDescricao] = useState(tarefaData?.descricao || "");
  const [status, setStatus] = useState<StatusTarefa | null>(tarefaData?.status || null); 

  const { mutate: update, isSuccess: updateSuccess, isPending: updatePending } = useTarefaDataUpdate();

  const submit = () => {
    if (!titulo || !descricao || status === null) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    if (!tarefaData) {
        alert("Dados da tarefa não encontrados.");
        return;
    }

    const updatedTarefaData: TarefaData = {
        id: tarefaData.id, 
        titulo, 
        descricao,
        status: status as StatusTarefa 
    }
    update(updatedTarefaData);
}

  useEffect(() => {
      if(!updateSuccess) return 
      closeModal();
  }, [updateSuccess])

  return(
      <div className="modal-overlay">
          <div className="modal-body">
              <div className="header">
                    <h2>Edite os campos da tarefa</h2>
                    <button className="close-button" onClick={closeModal}>X</button>
                </div>
              <form className="input-container">
                  <Input label="Título" value={titulo} updateValue={setTitulo}/>
                  <Input label="Descrição" value={descricao} updateValue={setDescricao}/>
                  <label htmlFor="Status">Status:</label>
                  <select id="status" value={status ?? ''} onChange={event => setStatus(event.target.value as StatusTarefa)}>
                      <option value="">Selecione um status</option>
                      <option value={StatusTarefa.NAO_INICIADO}>Não Iniciado</option>
                      <option value={StatusTarefa.EM_ANDAMENTO}>Em Andamento</option>
                      <option value={StatusTarefa.CONCLUIDO}>Concluído</option>
                  </select>
              </form>
              <button onClick={submit} className="btn-secondary-edit">
                  {updatePending ? 'Editando tarefa...' : 'Editar'} 
              </button>
          </div>
      </div>
  )
}

