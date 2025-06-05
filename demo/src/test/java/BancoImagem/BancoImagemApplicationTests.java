package BancoImagem;

import static org.junit.jupiter.api.Assertions.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;

@SpringBootTest
class BancoImagemApplicationTests {

    @Autowired
    private ApplicationContext context;

    @Test
    void contextLoads() {
        // Testa se o contexto da aplicação é carregado corretamente
        assertNotNull(context);
    }

    @Test
    void mainMethodStartsApplication() {
        // Testa se o método main inicia a aplicação sem erros
        BancoImagemApplication.main(new String[] {});
    }
}