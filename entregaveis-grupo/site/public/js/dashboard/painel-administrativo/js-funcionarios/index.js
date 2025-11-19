function listarUsuarios() {

    fetch("/usuarios/listar")
        .then(function (resposta) {
            
            if (!resposta.ok) {
                throw "Erro ao buscar usuários.";
            }

            return resposta.json();
        })
        .then(function (usuarios) {

            const tabela = document.getElementById("tabelaUsuarios");
            tabela.innerHTML = ""; // limpa antes de renderizar

            usuarios.forEach(u => {
                tabela.innerHTML += `
                    <tr>
                        <td>${u.id}</td>
                        <td>${u.nome}</td>
                        <td>${u.sobrenome}</td>
                        <td>${u.email}</td>

                        <td>
                            <a href="./atualizar.html"><img src="./../../../assets/icones/painel-administrativo/editar-icon.svg" class="action-icon" alt="Ícone de editar"></a>
                        </td>

                        <td>
                           <img src="./../../../assets/icones/painel-administrativo/delete-icon.svg" class="action-icon" alt="Ícone de deletar">
                        </td>
                    </tr>
                `;
            });

        })
        .catch(function (erro) {
            console.error("Erro:", erro);
            alert("Não foi possível listar os usuários.");
        });
}
