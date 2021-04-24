import { useForm } from "react-hook-form";
import React from "react";

import {
    CardContent,
    Typography,
    TextField,
    Button
} from "@material-ui/core";

import { Container, CustomCard, CustomCardActions } from "../styles";

export default function FormCadastro() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    function onSubmit(data) {
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container>
                <CustomCard>
                    <CardContent>

                    <Typography color="textSecondary" gutterBottom>
                        Cadastrar Equipamento
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
                            <Button type="submit" color="primary">
                                Cadastrar
                            </Button>
                        </CustomCardActions>
                    </CardContent>
                </CustomCard>
            </Container>
        </form>
    );
}