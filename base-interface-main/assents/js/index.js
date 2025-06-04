document.addEventListener('DOMContentLoaded', () => {
  // Carregar dados da API ao carregar a página
  fetchAlunos();
});

// Função para carregar todos os alunos da API
function fetchAlunos() {
  fetch('http://localhost:8080/api/aluno', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then(data => {
    addlinha(data); // Adiciona as linhas na tabela com os dados
  })
  .catch(error => {
    console.error('Erro ao buscar alunos:', error);
  });
}

// Função para adicionar linha na tabela
function addlinha(dadosAPI) {
  const tabela = document.getElementById('tabelaCorpo');
  tabela.innerHTML = ''; // Limpar tabela antes de adicionar novos dados
  dadosAPI.forEach(element => {   
    const linha = document.createElement('tr');
    linha.innerHTML = `
      <td class="px-4 py-2">${element.id}</td>
      <td class="px-4 py-2">${element.nome}</td>
      <td class="px-4 py-2">${element.email}</td>
      <td class="px-4 py-2">
        <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="remover(this, ${element.id})">remover</button>
      </td>
    `;
    tabela.appendChild(linha);
  });
}

// Função para cadastrar novos alunos
function cadastrar(event) {
  event.preventDefault();  // Impede o envio do formulário e o recarregamento da página
  
  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  
  if (nome && email) {
    // Adicionando Linha com o novo cadastro
    addlinha([{ "nome": nome.trim(), "email": email.trim() }]);

    // Limpando os campos
    document.getElementById('nome').value = "";
    document.getElementById('email').value = "";

    // Enviando dados para a API
    fetch('http://localhost:8080/api/aluno', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ "nome": nome, "email": email })
    })
    .then(response => response.json())
    .then(data => {
      console.log("Resposta da API:", data);
      // Atualizar a tabela com o novo aluno, ou você pode recarregar os dados diretamente
      fetchAlunos(); // Recarregar a lista de alunos
    })
    .catch(error => {
      console.error("Erro ao enviar dados:", error);
    });

    // Notificação de sucesso
    Swal.fire({
      icon: 'success',
      title: 'Sucesso!',
      text: 'Cadastro feito com sucesso'
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Erro!',
      text: 'Faltam dados para cadastrar'
    });
  }
}

// Função para remover aluno da tabela e da API
function remover(botao, id) {
  Swal.fire({
    icon: 'question',
    title: 'Are you Sure?',
    showCancelButton: true,
    confirmButtonText: 'Sim',
    cancelButtonText: 'Não'
  }).then((result) => {
    if (result.isConfirmed) {
      // Remover a linha da tabela
      const linhaRemover = botao.closest('tr');
      linhaRemover.remove();

      // Remover o aluno da API
      fetch(`http://localhost:8080/api/aluno/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          Swal.fire('Confirmado!', 'Aluno removido com sucesso.', 'success');
        } else {
          Swal.fire('Erro!', 'Erro ao remover aluno.', 'error');
        }
      })
      .catch(error => {
        console.error("Erro ao remover aluno:", error);
        Swal.fire('Erro!', 'Erro ao remover o aluno.', 'error');
      });
    } else {
      Swal.fire('Cancelado', '', 'info');
    }
  });
}
