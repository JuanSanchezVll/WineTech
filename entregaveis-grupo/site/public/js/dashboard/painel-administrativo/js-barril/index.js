async function carregarBarris() {
    const barris = await obterBarris();
    console.log(barris);
    exibirTabela(barris);
}

async function pesquisarBarris(pesquisa) {
    const resultado = await fetch(`/barris/pesquisar?idEmpresa=${sessionStorage.ID_EMPRESA}&pesquisa=${pesquisa}`);
    const barris = await resultado.json();
    console.log(resultado);
    exibirTabela(barris);
}

async function deletarBarril(idBarril) {
    const confirmacao = confirm("Tem certeza que deseja excluir?");

    if (confirmacao) {
        try {
            const resultado = await fetch(`/barris/deletar?idBarril=${idBarril}`);

            if (resultado.ok) {
                alert("Barril deletado com sucesso");
            } else {
                alert("Erro ao deletar barril");
            }
        } catch (erro) {
            console.error("Erro ao deletar barril: " + erro);
            alert("Erro ao deletar barril");
        }
    }
}

async function obterBarris() {
    const resultado = await fetch(`/barris/listar?idEmpresa=${sessionStorage.ID_EMPRESA}`);
    return await resultado.json();
}

async function exibirTabela(dados) {
    const tabela = document.getElementById("conteudo-tabela-barril");

    tabela.innerHTML = "";

    if (!dados || dados.lenght === 0) {
        tabela.innerHTML = "Nenhum barril encontrada";
        return;
    }

    for (let i = 0; i < dados.length; i++) {
        tabela.innerHTML += `
            <tr>
                <td>${dados[i].id}</td>
                <td>${dados[i].identificacao}</td>
                <td>${dados[i].cave_associada}</td>
                <td>${dados[i].uva_armazenada}</td>
                <td>
                    <a href="./atualizar.html?id=${dados[i].id}">
                        <img src="./../../../assets/icones/painel-administrativo/editar-icon.svg" class="action-icon">
                    </a>
                </td>
                <td>
                    <img onclick="deletarBarril(${dados[i].id}), recarregar()" src="./../../../assets/icones/painel-administrativo/delete-icon.svg" class="action-icon">
                </td>
            </tr>
        `;
    }
}

function recarregar() {
    window.location.reload();
}