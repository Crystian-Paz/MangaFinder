 // Carrega os dados do usuário logado, o usuário exista no localStorage, ele validará e levará o usuário para a página de perfil.

    function carregarDadosUsuario() {
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        if (usuarioLogado) {

            // Modo View, mostra os dados que estão carregados no localStorage
            document.getElementById('viewNome').textContent = usuarioLogado.name;
            document.getElementById('viewUsuario').textContent = usuarioLogado.user;
            document.getElementById('viewPais').textContent = usuarioLogado.country;
            document.getElementById('viewEmail').textContent = usuarioLogado.email;

            // Modo Edit, mostra o campo de input e ao clicar no salvar ele sobrescreve os dados do usuário logado no LocalStorage
            document.getElementById('editNome').value = usuarioLogado.name;
            document.getElementById('editUsuario').value = usuarioLogado.user;
            document.getElementById('editPais').value = usuarioLogado.country;
            document.getElementById('editEmail').value = usuarioLogado.email;
        }
    }

   // entrar no modo edição, esconde o modo view e mostra o modo edit com os campos de input como quadrados
    document.getElementById('btnEditar').addEventListener('click', function() {
        document.querySelector('.view-mode').style.display = 'none';
        document.querySelector('.edit-mode').style.display = 'block';
    });

   // cancela a edição, volta para o modo view e esconde os campos de input
    document.getElementById('btnCancelar').addEventListener('click', function() {
        document.querySelector('.view-mode').style.display = 'block';
        document.querySelector('.edit-mode').style.display = 'none';
    });

    // Botão salvar e carrega os dados no banco local que serão alterados
    document.getElementById('btnSalvar').addEventListener('click', function() {
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        const dbClient = JSON.parse(localStorage.getItem('db_client')) || [];


        // Atualiza os dados e exibe os dados atualizados
        const updatedUser = {
            ...usuarioLogado,
            name: document.getElementById('editNome').value.trim(),
            user: document.getElementById('editUsuario').value.trim(),
            country: document.getElementById('editPais').value.trim(),
            email: document.getElementById('editEmail').value.trim()
        };

        // Atualiza no banco de clientes que vai ser exibido na página de Kaique e Matheus
        const userIndex = dbClient.findIndex(u => u.email === usuarioLogado.email);
        if (userIndex !== -1) {
            dbClient[userIndex] = updatedUser;
            localStorage.setItem('db_client', JSON.stringify(dbClient));
        }

        // Atualiza o LocalStorage com os novos dados do usuário
        localStorage.setItem('usuarioLogado', JSON.stringify(updatedUser));
        carregarDadosUsuario(); // Recarrega os dados na tela

        // Sair do modo edit depois de salvar
        document.querySelector('.view-mode').style.display = 'block';
        document.querySelector('.edit-mode').style.display = 'none';
        alert("Perfil atualizado com sucesso!");
    });

    // faz funcionar quando a pagina ou abre ou é recarregada
    window.onload = carregarDadosUsuario;