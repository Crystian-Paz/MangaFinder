const URL = 'http://localhost:3000/meta/anilist/attack-on-titan';

async function callapi(URL) {
    try {
        const resp = await fetch(URL);
        const data = await resp.json();  // Aqui pega o conteúdo da resposta
        console.log(data);               // Aqui você vê os dados mesmo
    } catch (error) {
        console.error('Erro ao chamar API:', error);
    }
}

callapi(URL);
