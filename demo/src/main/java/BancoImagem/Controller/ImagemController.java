package main.java.BancoImagem.Controller;

import com.example.bancoimagens.model.Imagem;
import com.example.bancoimagens.service.ImagemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/imagens")
public class ImagemController {

    @Autowired
    private ImagemService imagemService;

    @GetMapping
    public List<Imagem> listarTodas() {
        return imagemService.listarTodas();
    }

    @PostMapping
    public Imagem adicionar(@RequestBody Imagem imagem) {
        return imagemService.salvar(imagem);
    }

    @DeleteMapping("/{id}")
    public void remover(@PathVariable Long id) {
        imagemService.excluir(id);
    }

    @PutMapping("/{id}")
    public Imagem atualizar(@PathVariable Long id, @RequestBody Imagem imagem) {
        return imagemService.atualizar(id, imagem);
    }
}