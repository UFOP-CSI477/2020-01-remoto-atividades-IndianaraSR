import { store } from 'react-notifications-component';

export function validadorToken(error) {
    if(error.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        store.addNotification({
            title: "Token expirado",
            message: "Faça login novamente",
            type: "danger",
            insert: "top",
            container: "bottom-right",
            animationIn: ["animate__animated", "animate__flipIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
              duration: 5000,
              onScreen: true
            }
        });

        window.dispatchEvent(new Event('storage'));
    }
}