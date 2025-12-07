async function carregarUvas() {
    const uvas = await obterUvas();
    exibirTabela(uvas);
}

async function pesquisarUvas(pesquisa) {
    const resultado = await fetch(`/uvas/pesquisar?idEmpresa=${sessionStorage.ID_EMPRESA}&pesquisa=${pesquisa}`);
    const uvas = await resultado.json();

    exibirTabela(uvas);
}

async function deletarUva(idUva) {
    const confirmacao = confirm("Tem certeza que deseja excluir?");

    if (confirmacao) {
        const resultado = await fetch(`/uvas/deletar?idUva=${idUva}`);
        alert("Uva deletada com sucesso");
    }
}

async function obterUvas() {
    const resultado = await fetch(`/uvas/listar?idEmpresa=${sessionStorage.ID_EMPRESA}`);
    return await resultado.json();
}

async function exibirTabela(dados) {
    const tabela = document.getElementById("conteudo-tabela-uva");

    tabela.innerHTML = "";

    if (!dados || dados.lenght === 0) {
        tabela.innerHTML = "Nenhuma uva encontrada";
        return;
    }

    for (let i = 0; i < dados.length; i++) {
        tabela.innerHTML += `
            <tr>
                <td>${dados[i].id_uva}</td>
                <td>${dados[i].nome}</td>
                <td>${dados[i].temperatura_minima}</td>
                <td>${dados[i].temperatura_maxima}</td>
                <td>${dados[i].umidade_minima}</td>
                <td>${dados[i].umidade_maxima}</td>
                <td>
                    <a href="./atualizar.html?id=${dados[i].id_uva}">
                        <img src="./../../../assets/icones/painel-administrativo/editar-icon.svg" class="action-icon">
                    </a>
                </td>
                <td>
                    <img onclick="deletarUva(${dados[i].id_uva}), recarregar()" src="./../../../assets/icones/painel-administrativo/delete-icon.svg" class="action-icon">
                </td>
            </tr>
        `;
    }
}

function recarregar() {
    window.location.reload();
}