import { useForm } from "react-hook-form";
import React from "react";
import { useRouter } from 'next/router';

import {
    CardContent,
    Typography,
    TextField,
    Button
} from "@material-ui/core";

import { Container, CustomCard, CustomCardActions } from "../styles";
import { login } from 'api';
import { store } from 'react-notifications-component';

export default function FormCadastro() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);

    async function onSubmit({ email, password }) {
        setLoading(true);

        try {
            const res = await login(email, password);

            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("token", JSON.stringify(res.data.token));

            store.addNotification({
                title: "Login efetuado com sucesso",
                message: "Bem vindo, " + res.data.user.name,
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

            router.push("/");
        } catch(error) {
            console.log("error", error);

            store.addNotification({
                title: "Falha ao fazer login",
                message: error?.response?.data?.error || "Não foi possível fazer login",
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

        setLoading(false);
    }

    function handleRegister() {
        router.push();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container>
                <CustomCard>
                    <CardContent>

                    <Typography color="textSecondary" gutterBottom>
                        Fazer Login
                    </Typography>

                        <TextField
                            type="email"
                            inputProps={register("email", { required: "Campo obrigatório" })}
                            label="Email"
                            error={errors?.email}
                            helperText={errors?.email?.message}
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            disabled={loading} />

                        <TextField
                            type="password"
                            inputProps={register("password", { required: "Campo obrigatório" })}
                            label="Senha"
                            error={errors?.password}
                            helperText={errors?.password?.message}
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            disabled={loading} />

                        <CustomCardActions>
                            <Button color="secondary" onClick={handleRegister} disabled={loading}>
                                Registrar
                            </Button>
                            
                            <Button type="submit" color="primary" disabled={loading}>
                                Entrar
                            </Button>
                        </CustomCardActions>
                    </CardContent>
                </CustomCard>
            </Container>
        </form>
    );
}