const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? [];

document.getElementById('formLogin').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const email = document.getElementById('emailLogin').value.trim();
    const senha = document.getElementById('senhaLogin').value;

    const usuarios = getLocalStorage();

    const usuarioValido = usuarios.find(usuario => usuario.email === email && usuario.password === senha);

    if (usuarioValido) {
        alert("Login bem-sucedido! Bem-vindo, " + usuarioValido.name);
    } else {
        alert("Email ou senha incorretos. Tente novamente.");
    }
});
