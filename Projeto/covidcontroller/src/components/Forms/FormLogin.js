import React, { useRef } from 'react';
import { useRouter } from 'next/router';
import TextInput from '../Inputs/TextInput';
import { store } from 'react-notifications-component';

import { login } from 'api/routes';
import { Button } from '@material-ui/core';
import { CustomForm } from './styles';

export default function FormLogin(){
    const formRef = useRef(null);
    const router = useRouter();

    async function handleSubmit(data){
        const { email, password } = data;

        if(!email || !password) {
            store.addNotification({
                title: "Falha ao fazer login",
                message: "Email ou senha não informados",
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
        }

        try {
            const usuario = await login(email, password);

            localStorage.setItem("token", usuario.token);
            localStorage.setItem("user", JSON.stringify(usuario.user));

            router.push('/');

            store.addNotification({
                title: "Login efetuado com sucesso",
                message: "Bem vindo " + usuario.user.name,
                type: "success",
                insert: "top",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__flipIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                }
            });
        } catch(error) {
            console.log("error", { error });

            store.addNotification({
                title: "Falha ao fazer login",
                message: error.response.data.error,
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
        }

        window.dispatchEvent(new Event('storage'));
	}

    return(   
        <CustomForm ref={formRef} onSubmit={handleSubmit}>
			<TextInput type="email" name="email" label="E-mail" />
			<TextInput type="password" name="password" label="Senha" />

			<Button type="submit" variant="contained" color="primary">
                Entrar
            </Button>
		</CustomForm>
    );
}