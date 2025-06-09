function atualizarLinksHeader() {
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
    const navList = document.getElementById('navList');
    if (!navList) return;

    const linkLogin = document.getElementById('linkLogin');
    const linkRegister = document.getElementById('linkRegister');

    if (usuarioLogado) {
        if (linkLogin) linkLogin.parentElement.remove();
        if (linkRegister) linkRegister.parentElement.remove();

        const linkExistente = Array.from(navList.children).some(li =>
            li.textContent.trim() === 'Perfil'
        );
        if (!linkExistente) {
            const liPerfil = document.createElement('li');
            const aPerfil = document.createElement('a');
            aPerfil.href = './perfil.html';
            aPerfil.textContent = 'Perfil';
            liPerfil.appendChild(aPerfil);
            navList.appendChild(liPerfil);
        }
    }
}

window.addEventListener('DOMContentLoaded', atualizarLinksHeader);