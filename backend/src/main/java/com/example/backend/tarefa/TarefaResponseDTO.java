package com.example.backend.tarefa;

import com.example.backend.tarefa.Tarefa.StatusTarefa;

public record TarefaResponseDTO(Long id, String titulo, String descricao, StatusTarefa status) {
    
    public TarefaResponseDTO(Tarefa tarefa){
        this(tarefa.getId(), tarefa.getTitulo(), tarefa.getDescricao(), tarefa.getStatus());
    }
}
