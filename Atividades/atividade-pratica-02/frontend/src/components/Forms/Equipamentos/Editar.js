import { useForm } from "react-hook-form";
import React from "react";

import {
    CardContent,
    Typography,
    TextField,
    Button
} from "@material-ui/core";

import { pegarDadosEquipamento, editarEquipamento } from 'api';
import { Container, CustomCard, CustomCardActions } from "../styles";
import { useRouter } from 'next/router';
import { store } from 'react-notifications-component';

export default function FormCadastro({ id }) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [loading, setLoading] = React.useState(true);
    const router = useRouter();

    async function onSubmit(data) {
        try {
            await editarEquipamento(id, data);

            store.addNotification({
                title: "Editado com sucesso",
                message: "O equipamento foi editado com suceso",
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

            router.push("/equipamento");
        } catch(error) {
            console.log(error);

            store.addNotification({
                title: "Falha ao editar",
                message: error?.response?.data?.error || "Não foi possível editar o equipamento",
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
    }

    React.useEffect(async () => {
        setLoading(true);

        try {
            const res = await pegarDadosEquipamento(id);

            setValue("name", res.data.name);
            setValue("modelo", res.data.modelo);
        } catch(error) {
            console.log(error);
        }

        setLoading(false);
    }, []);

    if(loading) {
        return (
            <div>carregando</div>
        );
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container>
                <CustomCard>
                    <CardContent>

                    <Typography color="textSecondary" gutterBottom>
                        Editar Equipamento
                    </Typography>

                        <TextField
                            inputProps={register("name", { required: "Campo obrigatório" })}
                            label="Nome"
                            error={errors?.name}
                            helperText={errors?.name?.message}
                            margin="dense"
                            variant="outlined"
                            fullWidth />

                        <TextField
                            inputProps={register("modelo", { required: "Campo obrigatório" })}
                            label="Modelo"
                            error={errors?.modelo}
                            helperText={errors?.modelo?.message}
                            margin="dense"
                            variant="outlined"
                            fullWidth />

                        <CustomCardActions>
                            <Button color="secondary" onClick={() => { }}>
                                Remover
                            </Button>

                            <Button type="submit" color="primary">
                                Salvar
                            </Button>
                        </CustomCardActions>
                    </CardContent>
                </CustomCard>
            </Container>
        </form>
    );
}