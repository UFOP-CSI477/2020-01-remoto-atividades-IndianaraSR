import axios from 'axios';

const api = axios.create({
    baseURL: "http://localhost:5000"
});

export function cadastroUsuario(name, email, password) {
    return new Promise((resolve, reject) => {
        api.post("/auth/register", { name, email, password })
            .then(resolve)
            .catch(reject);
    });
}

export function login(email, password) {
    return new Promise((resolve, reject) => {
        api.post("/auth/login", { email, password })
            .then(resolve)
            .catch(reject);
    });
}

export function listarEquipamentos() {
    return new Promise((resolve, reject) => {
        api.get("/equipamento/lista")
            .then(resolve)
            .catch(reject);
    });
}

export function deletarEquipamento(id){
    return new Promise((resolve, reject) => {
        api.delete("/equipamento/" + id)
            .then(resolve)
            .catch(reject);
    })
}

export function pegarDadosEquipamento(id) {
    return new Promise((resolve, reject) => {
        api.get("/equipamento/"+id)
            .then(resolve)
            .catch(reject);
    });
}

export function editarEquipamento(id, data) {
    return new Promise((resolve, reject) =>{
        api.post("/equipamento/"+id+"/edit", data)
            .then(resolve)
            .catch(reject);
    })
}

export function listarUsuarios() {
    return new Promise((resolve, reject) => {
        api.get("/auth/lista")
            .then(resolve)
            .catch(reject);
    });
}

export function listarManutencoes() {
    return new Promise((resolve, reject) => {
        api.get('/manutencao/lista')
            .then(resolve)
            .catch(reject);
    })
}

export function cadastrarManutencao(equipamento_id, usuario_id, descricao, data_limite, type) {
    return new Promise((resolve, reject) => {
        api.post('/manutencao', { equipamento_id, usuario_id, descricao, data_limite, type })
            .then(resolve)
            .catch(reject); 
    });
}

export function pegarDadosManutencao(id) {
    return new Promise((resolve, reject) => {
        api.get("/manutencao/"+id)
            .then(resolve)
            .catch(reject);
    });
}

export function editarManutencao(id, descricao, data_limite, type, equipamento_id, usuario_id) {
    return new Promise((resolve, reject) => {
        api.post('/manutencao/'+id+"/edit", { equipamento_id, usuario_id, descricao, data_limite, type })
            .then(resolve)
            .catch(reject); 
    });
}