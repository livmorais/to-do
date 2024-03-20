package com.example.backend.tarefa;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Table(name = "tarefas")
@Entity(name = "tarefas")
@Getter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
public class Tarefa {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String titulo;

    private String descricao;

    private StatusTarefa status;

    public enum StatusTarefa {
        NAO_INICIADO,
        EM_ANDAMENTO,
        CONCLUIDO
    }

    public Tarefa(TarefaRequestDTO data){
        this.titulo = data.titulo();
        this.descricao = data.descricao();
        this.status = data.status();
    }

    public void setTitulo(String titulo){
        this.titulo = titulo;
    }

    public void setDescricao(String descricao){
        this.descricao = descricao;
    }

    public void setStatus(StatusTarefa status){
        this.status = status;
    }
    
}
