package com.example.backend.tarefa;

import com.example.backend.tarefa.Tarefa.StatusTarefa;

public record TarefaRequestDTO(String titulo, String descricao, StatusTarefa status) {
    
}
