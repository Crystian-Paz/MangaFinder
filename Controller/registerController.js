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

const saveCliente = () => {
    if (isValidFields()) {
        const client =  {
            name: document.getElementById('nome').value,
            email: document.getElementById('email').value,
            user: document.getElementById('usuario').value,
            city: document.getElementById('cidade').value,
            password: document.getElementById('senha').value,
            confirmpassword: document.getElementById('confirmaSenha').value
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
