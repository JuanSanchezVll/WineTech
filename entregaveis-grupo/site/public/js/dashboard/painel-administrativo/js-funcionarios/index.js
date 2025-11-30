function listarUsuarios() {

    fetch("/usuarios/listar")
        .then(function (resposta) {
            
            if (!resposta.ok) {
                throw "Erro ao buscar usuários.";
            }

            return resposta.json();
        })
        .then(function (usuarios) {

            const tabela = document.getElementById("tabela");
            tabela.innerHTML = ""; // limpa antes de renderizar

            usuarios.forEach(u => {
                tabela.innerHTML += `
                    <tr>
                        <td>${u.id_funcionario}</td>
                        <td>${u.nome}</td>
                        <td>${u.sobrenome}</td>
                        <td>${u.email}</td>

                            <td>
    <a onclick="
        sessionStorage.idFuncionarioMudar = ${u.id_funcionario};
        sessionStorage.nomeMudar = '${u.nome}';
        sessionStorage.sobrenomeMudar = '${u.sobrenome}';
        sessionStorage.emailMudar = '${u.email}';
        location.href = './atualizar.html';
    ">
        <img src="./../../../assets/icones/painel-administrativo/editar-icon.svg" class="action-icon">
    </a>
</td>

                        <td>
                           <img src="./../../../assets/icones/painel-administrativo/delete-icon.svg" class="action-icon" alt="Ícone de deletar">
                        </td>
                    </tr>
                <br>`;
            });

        })
        .catch(function (erro) {
            console.error("Erro:", erro);
            alert("Não foi possível listar os usuários.");
        });
}
