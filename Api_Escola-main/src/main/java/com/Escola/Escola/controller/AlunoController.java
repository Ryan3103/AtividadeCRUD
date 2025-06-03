package com.Escola.Escola.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.Escola.Escola.model.Aluno;
import com.Escola.Escola.service.alunoService;



@RestController

@RequestMapping("/api/aluno")
public class AlunoController {
    
    @Autowired
    private alunoService service;
    
    @GetMapping
    public List<Aluno> listarTodos(){
        return service.listarTodos();
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Aluno> buscarPorId(@PathVariable Long id){
        return service.buscarporId(id)
                .map(aluno -> ResponseEntity.ok(aluno))
                .orElse(ResponseEntity.notFound().build());
        
    }

    @PostMapping
    public Aluno salvar(@RequestBody Aluno aluno){
        return service.salvar(aluno);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Aluno> atualizar(@PathVariable Long idUsuario, @RequestBody Aluno aluno){
        if (!service.buscarporId(idUsuario).isPresent()) {
            return ResponseEntity.notFound().build();
        }

    aluno.setIdUsuario(idUsuario);
    return ResponseEntity.ok(service.salvar(aluno));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id){
        if (!service.buscarporId(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        service.deletar(id);
        return ResponseEntity.noContent().build();
    }

}
