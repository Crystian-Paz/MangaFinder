let currentOffset = 0;
const limit = 20;

async function searchMangas(loadMore = false) {
  const query = document.getElementById("searchInput").value.trim();
  const genre = document.getElementById("genreSelect").value;

  if (!query) {
    alert("Digite um nome para buscar.");
    return;
  }

  if (!loadMore) {
    currentOffset = 0;
    document.getElementById("mangaContainer").innerHTML = "";
  }

  let url = `https://kitsu.io/api/edge/manga?filter[text]=${encodeURIComponent(query)}&page[limit]=${limit}&page[offset]=${currentOffset}`;
  if (genre !== "all") {
    url += `&filter[categories]=${encodeURIComponent(genre)}`;
  }

  try {
    const res = await fetch(url);
    const data = await res.json();
    const mangas = data.data.map(item => ({
      title: item.attributes.canonicalTitle,
      image: item.attributes.posterImage?.original || ""
    }));

    renderMangas(mangas, loadMore);
    currentOffset += limit;

    const loadMoreBtn = document.getElementById("loadMoreBtn");
    if (data.data.length < limit) {
      loadMoreBtn.style.display = "none";
    } else {
      loadMoreBtn.style.display = "block";
    }
  } catch (error) {
    console.error("Erro ao buscar:", error);
    document.getElementById("mangaContainer").innerHTML = "<div class='mensagem-erro'>Erro ao carregar os mangás.</div>";
  }
}

function renderMangas(mangas, append = false) {
  const container = document.getElementById("mangaContainer");
  if (!append) {
    container.innerHTML = "";
  }
  if (mangas.length === 0 && !append) {
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
