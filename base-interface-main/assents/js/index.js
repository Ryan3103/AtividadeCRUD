let idEdicao = null; // Se estiver editando, armazena o ID da linha
let contador = 1;

function cadastrar(event) {
  event.preventDefault();

  const nome = document.getElementById('nome').value;
  const email = document.getElementById('email').value;
  const tabela = document.getElementById('tabelaCorpo');

  if (idEdicao === null) {
    // Adiciona nova linha
    const novaLinha = document.createElement('tr');
    novaLinha.setAttribute('data-id', contador);

    novaLinha.innerHTML = `
      <td class="px-4 py-2">${contador}</td>
      <td class="px-4 py-2">${nome}</td>
      <td class="px-4 py-2">${email}</td>
      <td class="px-4 py-2">
        <button class="bg-yellow-500 text-white px-2 py-1 rounded mr-2" onclick="editarCadastro(${contador})">Editar</button>
        <button class="bg-red-500 text-white px-2 py-1 rounded" onclick="removerCadastro(${contador})">Remover</button>
      </td>
    `;

    tabela.appendChild(novaLinha);
    contador++;
  } else {
    // Atualiza linha existente
    const linha = document.querySelector(`tr[data-id="${idEdicao}"]`);
    linha.children[1].textContent = nome;
    linha.children[2].textContent = email;

    idEdicao = null;
  }

  // Limpa o formulário
  document.getElementById('formCadastro').reset();

  // Notificação
  Swal.fire({
    icon: 'success',
    title: 'Sucesso!',
    text: 'Cadastro salvo com sucesso.'
  });
}

function editarCadastro(id) {
  const linha = document.querySelector(`tr[data-id="${id}"]`);
  const nome = linha.children[1].textContent;
  const email = linha.children[2].textContent;

  document.getElementById('nome').value = nome;
  document.getElementById('email').value = email;

  idEdicao = id;
}

function removerCadastro(id) {
  const linha = document.querySelector(`tr[data-id="${id}"]`);
  linha.remove();

  // Se estava editando esta linha, cancela a edição
  if (idEdicao === id) {
    document.getElementById('formCadastro').reset();
    idEdicao = null;
  }

  Swal.fire({
    icon: 'info',
    title: 'Removido!',
    text: 'Cadastro removido com sucesso.'
  });
}
