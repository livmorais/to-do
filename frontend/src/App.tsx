import { useState } from 'react';
import { Card } from './components/card/card';
import { TarefaData } from './interface/TarefaData';
import { useTarefaData } from './hooks/useTarefaData';
import './App.css'
import { CreateModal } from './components/create-modal/create-modal';
import { UpdateModal } from './components/update-modal/update-modal';
import { useTarefaDataDelete } from './hooks/useTarefaDataDelete';


function App() {
  const { data } = useTarefaData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate: deleteTarefa } = useTarefaDataDelete();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedTarefa, setSelectedTarefa] = useState<TarefaData | null>(null);

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev)
  }

  const handleOpenUpdateModal = (tarefa: TarefaData) => {
    setSelectedTarefa(tarefa);
    setIsUpdateModalOpen(true);
  }

  const handleCloseUpdateModal = () => {
    setSelectedTarefa(null);
    setIsUpdateModalOpen(false);
  }

  const handleDeleteTarefa = (id: number) => {
    if (window.confirm('Tem certeza de que deseja deletar essa tarefa?')) {
        deleteTarefa(id);
    }
}

  return (
    <div className="container">
      <h1>Lista de Tarefas</h1>
      <div className="card-grid">
      {data?.map(tarefaData => 
          tarefaData.status !== undefined && ( 
            <Card
              key={tarefaData.id}
              status={tarefaData.status} 
              titulo={tarefaData.titulo} 
              descricao={tarefaData.descricao}
              onEdit={() => handleOpenUpdateModal(tarefaData)}
              onDelete={() => tarefaData.id && handleDeleteTarefa(tarefaData.id)}
            />
          )
        )}
      </div>
      {isUpdateModalOpen && selectedTarefa && <UpdateModal closeModal={handleCloseUpdateModal} tarefaData={selectedTarefa}/>}
      {isModalOpen && <CreateModal closeModal={handleOpenModal}/>}
      <button className='create-button' onClick={handleOpenModal}>Adicionar Tarefa</button>
    </div>
  )
}

export default App
