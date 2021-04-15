import api from './index';

export function registrar(name, email, password, state, city) {
    return (
        new Promise((resolve, reject) => {
            api.post("/auth/register/", { name, email, password, state, city }).then(res => {
                resolve(res.data);
            }).catch(error => {
                reject(error);
            });
        })
    );
}

export function login(email, password) {
    return (
        new Promise((resolve, reject) => {
            api.post("/auth/login/", { email, password }).then((res) => {
                resolve(res.data);
            }).catch((error) => {
                reject(error);
            });
        })
    );
}

export function responderFormularioCovid(data) {
    return (
        new Promise((resolve, reject) => {
            api.post("/form_covid/", data).then((res) => {
                resolve(res.data.form);
            }).catch((error) => {
                reject(error);
            });
        })
    );
}

export function responderFormularioPosCovid(data) {
    return (
        new Promise((resolve, reject) => {
            api.post("/form_pos_covid/", data).then((res) => {
                resolve(res.data.form)
            }).catch((error) => {
                reject(error);
            });
        })
    );
}

export function pegarFormulariosCovid() {
    return (
        new Promise((resolve, reject) => {
            api.get("/admin/form/covid").then((res) => {
                resolve(res.data);
            }).catch((error) => {
                reject(error);
            });
        })
    );
}

export function pegarFormulariosPosCovid() {
    return (
        new Promise((resolve, reject) => {
            api.get("/admin/form/pos_covid").then((res) => {
                resolve(res.data);
            }).catch((error) => {
                reject(error);
            });
        })
    );
}

export function deletarFormulario(id) {
    return (
        new Promise((resolve, reject) => {
            api.delete("/admin/form/" + id).then((res) => {
                resolve(res.data);
            }).catch((error) => {
                reject(error);
            });
        })
    )
}