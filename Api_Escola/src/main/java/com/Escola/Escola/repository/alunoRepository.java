package com.Escola.Escola.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.Escola.Escola.model.Aluno;

@Repository
public interface alunoRepository extends JpaRepository<Aluno, Long> {

}
