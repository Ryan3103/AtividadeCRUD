package com.Escola.Escola.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Escola.Escola.model.Aluno;
import com.Escola.Escola.repository.alunoRepository;

@Service
public class alunoService {

    @Autowired
    private alunoRepository repository;


    public List<Aluno> listarTodos(){
        return repository.findAll();
    }

    public Optional<Aluno> buscarporId(long id){
        return repository.findById(id);
    }

    public Aluno salvar(Aluno aluno){
        return repository.save(aluno);
    }

    public void deletar(Long id){
        repository.deleteById(id);
    }
 
}
