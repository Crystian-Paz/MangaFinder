const CHAVE_USUARIOS = 'usuarios_cadastrados';

function carregarDados() {
    const dadosSalvos = localStorage.getItem(CHAVE_USUARIOS);
    return dadosSalvos ? JSON.parse(dadosSalvos) : [
        { id: 1, nome: "Kaique lemos", email: "Kaique@email.com" },
        { id: 2, nome: "Kaio lemos", email: "kaiolemos@email.com" },
        { id: 3, nome: "Cauã Verissimo", email: "Cauã@email.com" },
        { id: 4, nome: "Matheus Hustenir", email: "Matheus@email.com" }
    ];
}

function salvarDados(usuarios) {
    localStorage.setItem(CHAVE_USUARIOS, JSON.stringify(usuarios));
}

function carregarUsuarios(lista = carregarDados()) {
    const corpoTabela = document.getElementById('corpo-tabela');
    corpoTabela.innerHTML = '';

    lista.forEach(usuario => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${usuario.id}</td>
            <td>${usuario.nome}</td>
            <td>${usuario.email}</td>
            <td class="acoes">
                <button class="editar" onclick="editarUsuario(${usuario.id})">Editar</button>
                <button class="excluir" onclick="excluirUsuario(${usuario.id})">Excluir</button>
            </td>
        `;
        corpoTabela.appendChild(linha);
    });
}

function filtrarUsuarios() {
    const termo = document.getElementById('busca').value.toLowerCase();
    const usuariosFiltrados = carregarDados().filter(usuario =>
        usuario.nome.toLowerCase().includes(termo)
    );
    carregarUsuarios(usuariosFiltrados);
}

function editarUsuario(id) {
    const usuarios = carregarDados();
    const usuario = usuarios.find(u => u.id === id);
    
    const novoNome = prompt("Editar nome:", usuario.nome);
    const novoEmail = prompt("Editar email:", usuario.email);

    if (novoNome && novoEmail) {
        usuario.nome = novoNome;
        usuario.email = novoEmail;
        salvarDados(usuarios);
        carregarUsuarios();
    }
}

function excluirUsuario(id) {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
        const usuarios = carregarDados();
        const usuariosAtualizados = usuarios.filter(u => u.id !== id);
        salvarDados(usuariosAtualizados);
        carregarUsuarios();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    carregarUsuarios(); });
