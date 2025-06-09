function atualizarLinksHeader() {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));
  const navList = document.getElementById('navList');
  if (!navList) return;

  const linkLogin = document.getElementById('linkLogin');
  const linkRegister = document.getElementById('linkRegister');

  if (usuarioLogado) {
    if (linkLogin) linkLogin.parentElement.remove();
    if (linkRegister) linkRegister.parentElement.remove();

    const textoDosLinks = Array.from(navList.children).map(li =>
      li.textContent.trim().toLowerCase()
    );

    if (!textoDosLinks.includes('perfil')) {
      const liPerfil = document.createElement('li');
      const aPerfil = document.createElement('a');
      aPerfil.href = './perfil.html';
      aPerfil.textContent = 'Perfil';
      liPerfil.appendChild(aPerfil);
      navList.appendChild(liPerfil);
    }

    if (!textoDosLinks.includes('gerenciador')) {
      const liGerenciador = document.createElement('li');
      const aGerenciador = document.createElement('a');
      aGerenciador.href = './index.html';
      aGerenciador.textContent = 'Gerenciador';
      liGerenciador.appendChild(aGerenciador);
      navList.appendChild(liGerenciador);
    }
  }
}

window.addEventListener('DOMContentLoaded', atualizarLinksHeader);
