import { useState } from "react";
import "./card.css";

interface CardProps {
    titulo: string,
    descricao: string,
    status: StatusTarefa,
    onEdit: () => void;
    onDelete: () => void;
}

export enum StatusTarefa {
    NAO_INICIADO = 'NAO_INICIADO',
    EM_ANDAMENTO = 'EM_ANDAMENTO',
    CONCLUIDO = 'CONCLUIDO'
}

export function Card({ titulo, descricao, status, onEdit, onDelete } : CardProps){
    const [isDescricaoExpandida, setIsDescricaoExpandida] = useState(false);
    
    return(
        <div className="card">
            <h2>{titulo}</h2>
            <p
            className={`descricao ${isDescricaoExpandida ? 'expandido' : ''}`}
            onClick={() => setIsDescricaoExpandida(!isDescricaoExpandida)}
            >
            <span><b>Descrição: </b> {descricao}</span>
            </p>
            <p className={`status ${status.toLowerCase()}`}><b>Status: </b> {status}</p>              
            <div className="button-container"> 
                <button className="editar-button" onClick={onEdit}>Editar</button>
                <button className="deletar-button" onClick={onDelete}>Deletar</button>
            </div>
        </div>
    )
}
