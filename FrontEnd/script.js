document.addEventListener('DOMContentLoaded', function() {
    const API_URL = 'http://localhost:8080/api/imagens';
    const form = document.getElementById('imagemForm');
    const galeria = document.getElementById('galeria');
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    // Configurar modal
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Editar Imagem</h2>
            <form id="editForm">
                <input type="text" id="editNome" placeholder="Nome do autor" required>
                <input type="url" id="editUrl" placeholder="URL da imagem" required>
                <div class="modal-actions">
                    <button type="button" id="cancelEdit" class="btn">Cancelar</button>
                    <button type="submit" class="btn btn-edit">Salvar</button>
                </div>
            </form>
        </div>
    `;
    document.body.appendChild(modal);
    
    let imagemEditando = null;

    // Carregar imagens ao iniciar
    carregarImagens();

    // Adicionar nova imagem
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value;
        const url = document.getElementById('url').value;
        
        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, url })
        })
        .then(response => {
            if (!response.ok) throw new Error('Erro ao adicionar imagem');
            return response.json();
        })
        .then(() => {
            form.reset();
            carregarImagens();
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao adicionar imagem');
        });
    });

    // Carregar imagens da API
    function carregarImagens() {
        fetch(API_URL)
            .then(response => response.json())
            .then(imagens => {
                galeria.innerHTML = '';
                imagens.forEach(imagem => {
                    adicionarImagemNaGaleria(imagem);
                });
            })
            .catch(error => {
                console.error('Erro ao carregar imagens:', error);
            });
    }

    // Adicionar imagem na galeria
    function adicionarImagemNaGaleria(imagem) {
        const card = document.createElement('div');
        card.className = 'imagem-card';
        card.innerHTML = `
            <img src="${imagem.url}" alt="${imagem.nome}">
            <div class="imagem-info">
                <h3>${imagem.nome}</h3>
                <div class="imagem-actions">
                    <button class="btn btn-edit" data-id="${imagem.id}">Editar</button>
                    <button class="btn btn-delete" data-id="${imagem.id}">Remover</button>
                </div>
            </div>
        `;
        
        galeria.appendChild(card);
        
        // Adicionar eventos aos botões
        card.querySelector('.btn-delete').addEventListener('click', () => removerImagem(imagem.id));
        card.querySelector('.btn-edit').addEventListener('click', () => abrirModalEdicao(imagem));
    }

    // Remover imagem
    function removerImagem(id) {
        if (confirm('Tem certeza que deseja remover esta imagem?')) {
            fetch(`${API_URL}/${id}`, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) throw new Error('Erro ao remover imagem');
                carregarImagens();
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Erro ao remover imagem');
            });
        }
    }

    // Abrir modal de edição
    function abrirModalEdicao(imagem) {
        imagemEditando = imagem;
        document.getElementById('editNome').value = imagem.nome;
        document.getElementById('editUrl').value = imagem.url;
        modal.style.display = 'flex';
    }

    // Fechar modal
    document.getElementById('cancelEdit')?.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Editar imagem
    document.getElementById('editForm')?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('editNome').value;
        const url = document.getElementById('editUrl').value;
        
        fetch(`${API_URL}/${imagemEditando.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, url })
        })
        .then(response => {
            if (!response.ok) throw new Error('Erro ao editar imagem');
            return response.json();
        })
        .then(() => {
            modal.style.display = 'none';
            carregarImagens();
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Erro ao editar imagem');
        });
    });

    // Fechar modal ao clicar fora
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});