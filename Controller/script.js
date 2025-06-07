const db_client = 'db_client';

function carregarDados() {
    const dbClient = localStorage.getItem(db_client);
    return dbClient ? JSON.parse(dbClient) : [
        { name: "Kaique lemos", email: "Kaique@email.com" },
        { name: "Kaio lemos", email: "kaiolemos@email.com" },
        { name: "Cauã Verissimo", email: "Cauã@email.com" },
        { name: "Matheus Hustenir", email: "Matheus@email.com" }
    ];
}

function salvarDados(usuarios) {
    localStorage.setItem(db_client, JSON.stringify(usuarios));
}

function carregarUsuarios(lista = carregarDados()) {
    const corpoTabela = document.getElementById('corpo-tabela');
    corpoTabela.innerHTML = '';

    lista.forEach((usuario, index) => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${index + 1}</td>
            <td>${usuario.name}</td>
            <td>${usuario.email}</td>
            <td class="acoes">
                <button class="editar" onclick="editarUsuario(${index})">Editar</button>
                <button class="excluir" onclick="excluirUsuario(${index})">Excluir</button>
            </td>
        `;
        corpoTabela.appendChild(linha);
    });
}

function filtrarUsuarios() {
    const termo = document.getElementById('busca').value.toLowerCase();
    const usuariosFiltrados = carregarDados().filter(usuario =>
        usuario.name.toLowerCase().includes(termo)
    );
    carregarUsuarios(usuariosFiltrados);
}

function editarUsuario(index) {
    const usuarios = carregarDados();
    const usuario = usuarios[index];

    const novoNome = prompt("Editar nome:", usuario.name);
    const novoEmail = prompt("Editar email:", usuario.email);

    if (novoNome && novoEmail) {
        usuario.name = novoNome;
        usuario.email = novoEmail;
        salvarDados(usuarios);
        carregarUsuarios();
    }
}

function excluirUsuario(index) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        const usuarios = carregarDados();
        usuarios.splice(index, 1);
        salvarDados(usuarios);
        carregarUsuarios();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    carregarUsuarios();
});
