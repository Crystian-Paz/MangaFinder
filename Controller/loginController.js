const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? [];

document.getElementById('formLogin').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('emailLogin').value.trim();
    const senha = document.getElementById('senhaLogin').value;
    const usuarios = getLocalStorage();

    const usuarioValido = usuarios.find(usuario => usuario.email === email && usuario.password === senha);

    if (usuarioValido) {
        localStorage.setItem('usuarioLogado', JSON.stringify(usuarioValido));
        alert("Login bem-sucedido! Redirecionando...");
        window.location.href = "perfil.html";
    } else {
        alert("Email ou senha incorretos.");
    }
});