 // Carrega os dados do usuário logado
    function carregarDadosUsuario() {
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        if (usuarioLogado) {
            // Modo View
            document.getElementById('viewNome').textContent = usuarioLogado.name;
            document.getElementById('viewUsuario').textContent = usuarioLogado.user;
            document.getElementById('viewPais').textContent = usuarioLogado.country;
            document.getElementById('viewEmail').textContent = usuarioLogado.email;

            // Modo Edit
            document.getElementById('editNome').value = usuarioLogado.name;
            document.getElementById('editUsuario').value = usuarioLogado.user;
            document.getElementById('editPais').value = usuarioLogado.country;
            document.getElementById('editEmail').value = usuarioLogado.email;
        } else {
            alert("Nenhum usuário logado. Redirecionando...");
            window.location.href = "index.html";
        }
    }

   // entrar no modo edição
    document.getElementById('btnEditar').addEventListener('click', function() {
        document.querySelector('.view-mode').style.display = 'none';
        document.querySelector('.edit-mode').style.display = 'block';
    });

   // cancela a edição
    document.getElementById('btnCancelar').addEventListener('click', function() {
        document.querySelector('.view-mode').style.display = 'block';
        document.querySelector('.edit-mode').style.display = 'none';
    });

    // salva mudanças 
    document.getElementById('btnSalvar').addEventListener('click', function() {
        const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
        const dbClient = JSON.parse(localStorage.getItem('db_client')) || [];

        const updatedUser = {
            ...usuarioLogado,
            name: document.getElementById('editNome').value.trim(),
            user: document.getElementById('editUsuario').value.trim(),
            country: document.getElementById('editPais').value.trim(),
            email: document.getElementById('editEmail').value.trim()
        };

        const userIndex = dbClient.findIndex(u => u.email === usuarioLogado.email);
        if (userIndex !== -1) {
            dbClient[userIndex] = updatedUser;
            localStorage.setItem('db_client', JSON.stringify(dbClient));
        }

        localStorage.setItem('usuarioLogado', JSON.stringify(updatedUser));
        carregarDadosUsuario(); // Recarrega os dados na tela

        document.querySelector('.view-mode').style.display = 'block';
        document.querySelector('.edit-mode').style.display = 'none';
        alert("Perfil atualizado com sucesso!");
    });

    window.onload = carregarDadosUsuario;