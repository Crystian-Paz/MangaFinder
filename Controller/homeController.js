async function searchMangas() {
  const query = document.getElementById("searchInput").value.trim();
  if (!query) {
    alert("Digite um nome para buscar.");
    return;
  }

  const url = `http://localhost:3000/manga/mangadex/${encodeURIComponent(query)}`;
  try { 
    const res = await fetch(url);
    const data = await res.json();

    const mangas = Array.isArray(data) ? data : data.results || data.mangas || [];

    renderMangas(mangas);
  } catch (error) {
    console.error("Erro ao buscar:", error);
   document.getElementById("mangaContainer").innerHTML = "<div class='mensagem-erro'>Erro ao carregar os mangás.</div>";

  }
}

function renderMangas(mangas) {
  const container = document.getElementById("mangaContainer");
  container.innerHTML = "";

  if (mangas.length === 0) {
    container.innerHTML = "<p>Nenhum mangá encontrado.</p>";
    return;
  }

  mangas.forEach(m => {
    const div = document.createElement("div");
    div.className = "manga-box";

    div.innerHTML = `
      <img src="${m.image}" alt="${m.title}" />
      <h3>${m.title}</h3>
    `;

    container.appendChild(div);
  });
}