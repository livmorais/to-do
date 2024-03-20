package com.example.backend.tarefa;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TarefaRepository extends JpaRepository<Tarefa, Long>{
    Optional<Tarefa> findById(Long id);
}
