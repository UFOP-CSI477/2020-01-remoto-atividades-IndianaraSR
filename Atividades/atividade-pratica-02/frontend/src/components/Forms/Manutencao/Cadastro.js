import { useForm } from "react-hook-form";
import React from "react";

import {
    Typography,
    TextField,
    Button,
    FormControl,
    Select,
    InputLabel,
    OutlinedInput,
    CircularProgress
} from "@material-ui/core";
import { store } from 'react-notifications-component';
import { useRouter } from "next/router";

import { listarEquipamentos, listarUsuarios, cadastrarManutencao } from 'api';
import { Container, CustomCard, CustomCardContent, CustomCardActions } from "../styles";

export default function FormCadastro() {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [usuarios, setUsuarios] = React.useState([]);
    const [equipamentos, setEquipamentos] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [disabled, setDisabled] = React.useState(false);

    async function onSubmit({ equipamento_id, usuario_id, descricao, data_limite, type }) {
        setDisabled(true);
        
        try {
            await cadastrarManutencao(equipamento_id, usuario_id, descricao, data_limite, type);
        
            store.addNotification({
                title: "Agendada com sucesso",
                message: "A manutenção foi agendada com sucesso",
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
        
            router.push('/manutencao');
        } catch(error) {

            store.addNotification({
                title: "Falha ao agendar",
                message: error?.response?.data?.error || "Não foi possível agendar a manutenção",
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

            console.log(error);
        }

        setDisabled(false);
    }

    React.useEffect(async () => {
        setLoading(true);

        const resUsuarios = await listarUsuarios();
        const resEquipamentos = await listarEquipamentos();

        setUsuarios(resUsuarios.data);
        setEquipamentos(resEquipamentos.data);

        setLoading(false);
    }, []);

    if(loading) {
        return (
            <div>Carregando</div>
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container>
                <CustomCard>
                    <CustomCardContent>

                        <Typography color="textSecondary" gutterBottom>
                            Agendar Manutenção
                        </Typography>

                        <TextField
                            inputProps={register("descricao", { required: "Campo obrigatório" })}
                            label="Descrição"
                            error={errors?.descricao}
                            helperText={errors?.descricao?.message}
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            multiline
                            disabled={disabled} />

                        <TextField
                            type="date"
                            inputProps={register("data_limite", { required: "Campo obrigatório" })}
                            label="Data limite"
                            error={errors?.data_limite}
                            helperText={errors?.data_limite?.message}
                            margin="dense"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                            disabled={disabled} />

                        <FormControl variant="outlined" fullWidth>
                            <InputLabel htmlFor="type">Tipo</InputLabel>
                            
                            <Select
                                margin="dense"
                                native
                                label="Tipo"
                                inputProps={{
                                    ...register("type"),
                                    id: 'type',
                                }}
                                disabled={disabled}>
                                    <option value={1}>1 - Preventiva</option>
                                    <option value={2}>2 - Corretiva</option>
                                    <option value={3}>3 - Urgente</option>
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" fullWidth>
                            <InputLabel htmlFor="equipamento" shrink>Equipamento</InputLabel>
                            
                            <Select
                                margin="dense"
                                native
                                input={<OutlinedInput notched label="Equipamento" />}
                                inputProps={{
                                    ...register("equipamento_id"),
                                    id: 'equipamento',
                                }}
                                disabled={disabled}>
                                    {equipamentos.map(equipamento => (
                                        <option value={equipamento._id}>{equipamento.name}</option>
                                    ))}
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" fullWidth>
                            <InputLabel htmlFor="user" shrink>Usuário</InputLabel>
                            
                            <Select
                                margin="dense"
                                native
                                input={<OutlinedInput notched label="Usuário" />}
                                inputProps={{
                                    ...register("usuario_id"),
                                    id: 'user',
                                }}
                                disabled={disabled}>
                                    {usuarios.map(usuario => (
                                        <option value={usuario._id}>{usuario.name}</option>
                                    ))}
                            </Select>
                        </FormControl>

                        <CustomCardActions>
                            <Button type="submit" color="primary">
                                {disabled ? (
                                    <CircularProgress size={25} />
                                ) : "Agendar"}
                            </Button>
                        </CustomCardActions>
                    </CustomCardContent>
                </CustomCard>
            </Container>
        </form>
    );
}