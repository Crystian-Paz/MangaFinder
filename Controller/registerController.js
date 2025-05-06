const getLocalStorage = () => JSON.parse(localStorage.getItem('db_client')) ?? []
const setLocalStorage = (dbClient) => localStorage.setItem("db_client", JSON.stringify(dbClient))

const readClient = () => getLocalStorage()

const deleteClient = (index) => {
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}

const updateClient = (index, client) => {
    const dbClient = readClient()
    dbClient[index] = client
    setLocalStorage(dbClient)
}

const createClient = (client) => {
    const dbClient = getLocalStorage()
    dbClient.push(client)
    setLocalStorage(dbClient)
}

const isValidFields = () => {
    return document.getElementById('formCadastro').reportValidity()
}

const saveCliente = (event) => {
    event.preventDefault();
    if (isValidFields()) {
        const client =  {
            name: document.getElementById('nome').value.trim(),
            email: document.getElementById('email').value.trim(),
            user: document.getElementById('usuario').value.trim(),
            city: document.getElementById('cidade').value.trim(),
            password: document.getElementById('senha').value.trim(),
            confirmpassword: document.getElementById('confirmarSenha').value.trim()
        }

        if (client.password !== client.confirmpassword) {
            alert("As senhas não coincidem.")
            return
        }

        const exists = readClient().some(c => c.email === client.email || c.user === client.user)
        if (exists) {
            alert("Usuário ou email já cadastrados.")
            return
        }

        createClient(client)
        document.getElementById('formCadastro').reset()
        alert("Cadastro realizado com sucesso!")
    }
}

document.getElementById('buttonCadastrar')
.addEventListener('click', saveCliente)
