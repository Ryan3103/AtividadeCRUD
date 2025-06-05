package com.example.bancoimagens.repository;

import com.example.bancoimagens.model.Imagem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImagemRepository extends JpaRepository<Imagem, Long> {
}