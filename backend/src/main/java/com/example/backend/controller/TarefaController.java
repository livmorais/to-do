package com.example.backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.backend.tarefa.Tarefa;
import com.example.backend.tarefa.TarefaRepository;
import com.example.backend.tarefa.TarefaRequestDTO;
import com.example.backend.tarefa.TarefaResponseDTO;

@RestController
@RequestMapping("tarefa")
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class TarefaController {

    @Autowired
    private TarefaRepository repository;

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @GetMapping
    public List<TarefaResponseDTO> getAll(){
        
        List<TarefaResponseDTO> tarefaList = repository.findAll().stream().map(TarefaResponseDTO::new).toList();
        return tarefaList;
    }

    @GetMapping("/{id}")
    public ResponseEntity<TarefaResponseDTO> getTarefaById(@PathVariable("id") Long id) {
        Optional<Tarefa> optionalTarefa = repository.findById(id);
        if (optionalTarefa.isPresent()) {
            Tarefa tarefa = optionalTarefa.get();
            TarefaResponseDTO tarefaResponseDTO = new TarefaResponseDTO(tarefa);
            return ResponseEntity.ok(tarefaResponseDTO);
        }
        return ResponseEntity.notFound().build();
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping
    public void saveTarefa(@RequestBody TarefaRequestDTO data){
        Tarefa tarefaData = new Tarefa(data);
        repository.save(tarefaData);
        return;
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PutMapping("/{id}")
    public void updateTarefa(@PathVariable("id") Long id, @RequestBody TarefaRequestDTO data) {
        Optional<Tarefa> optionalTarefa = repository.findById(id);
        if (optionalTarefa.isPresent()) {
        Tarefa tarefa = optionalTarefa.get();
        tarefa.setTitulo(data.titulo());
        tarefa.setDescricao(data.descricao());
        tarefa.setStatus(data.status());
        repository.save(tarefa);
        }
    }

    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @DeleteMapping("/{id}")
    public void deleteTarefa(@PathVariable("id") Long id) {
        repository.deleteById(id);
    }
}
