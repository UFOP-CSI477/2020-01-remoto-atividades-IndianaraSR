import { useForm } from "react-hook-form";
import React from "react";
import { useRouter } from "next/router";
import { store } from 'react-notifications-component';

import {
    CardContent,
    Typography,
    TextField,
    Button,
    CircularProgress
} from "@material-ui/core";

import { cadastroUsuario } from 'api';
import { Container, CustomCard, CustomCardActions } from "../styles";

export default function FormCadastro() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = React.useState(false);
    const router = useRouter();

    async function onSubmit({ name, email, password }) {
        setLoading(true);

        try {
            const res = await cadastroUsuario(name, email, password);

            localStorage.setItem("user", JSON.stringify(res.data.user));
            localStorage.setItem("token", JSON.stringify(res.data.token));

            store.addNotification({
                title: "Usuário cadastrado com sucesso",
                message: "Usuário " + res.data.user.name + " cadastrado com sucesso",
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
                title: "Falha ao cadastrar",
                message: error?.response?.data?.error || "Não foi possível fazer o cadastro",
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

    function handleLogin() {
        router.push("/login");
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container>
                <CustomCard>
                    <CardContent>

                    <Typography color="textSecondary" gutterBottom>
                        Cadastrar Usuário
                    </Typography>

                        <TextField
                            inputProps={register("name", { required: "Campo obrigatório" })}
                            label="Nome"
                            error={errors?.name}
                            helperText={errors?.name?.message}
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            disabled={loading} />

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
                            inputProps={register("password", {
                                required: "Campo obrigatório",
                                minLength: {
                                    value: 6,
                                    message: "Mínimo de 6 caracteres"
                                }
                            })}
                            label="Senha"
                            error={errors?.password}
                            helperText={errors?.password?.message}
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            disabled={loading} />

                        <CustomCardActions>
                            <Button color="secondary" disabled={loading} onClick={handleLogin}>
                                Conectar
                            </Button>

                            <Button type="submit" color="primary" disabled={loading}>
                                    {loading ? (
                                        <CircularProgress size={25} />
                                    ) : "Cadastrar"
                                }
                            </Button>
                        </CustomCardActions>
                    </CardContent>
                </CustomCard>
            </Container>
        </form>
    );
}