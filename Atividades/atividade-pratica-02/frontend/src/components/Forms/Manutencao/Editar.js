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

import { Container, CustomCard, CustomCardContent, CustomCardActions } from "../styles";
import { pegarDadosManutencao, listarUsuarios, listarEquipamentos, editarManutencao } from 'api';

export default function FormCadastro({ id }) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const router = useRouter();
    const [equipamentos, setEquipamentos] = React.useState([]);
    const [usuarios, setUsuarios] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [disabled, setDisabled] = React.useState(false);

    function pad(d) {
        if (d < 10) {
            return '0' + d.toString();
        } else {
            return d.toString();
        }
    }

    function formatDate(d) {
        const date = new Date(d);
        
        return pad(date.getFullYear()) + "-" + pad(date.getMonth()+1) + "-" + pad(date.getDate());
    }

    async function onSubmit({ descricao, data_limite, type, equipamento_id, usuario_id }) {
        setDisabled(true);

        try {
            await editarManutencao(id, descricao, data_limite, type, equipamento_id, usuario_id);
        
            store.addNotification({
                title: "Agendamento editado com sucesso",
                message: "O agendamento da manutenção foi editada com sucesso",
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
            console.log(error);

            store.addNotification({
                title: "Falha ao editar agendamento",
                message: error?.response?.data?.error || "Não foi possível editar o agendamento da manutenção",
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

        setDisabled(false);
    }

    React.useEffect(async () => {
        if(!id)
            return;

        setLoading(true);
        
        const res = await pegarDadosManutencao(id);
        const resEquipamentos = await listarEquipamentos();
        const resUsuarios = await listarUsuarios();

        setUsuarios(resUsuarios.data);
        setEquipamentos(resEquipamentos.data);

        setValue("descricao", res.data.descricao);
        setValue("data_limite", formatDate(res.data.data_limite));
        setValue("type", res.data.type);
        setValue("usuario_id", res.data.usuario_id._id);
        setValue("equipamento_id", res.data.equipamento_id._id);

        setLoading(false);
    }, [id]);

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
                            Editar Agendamento
                        </Typography>

                        <TextField
                            inputProps={register("descricao", { required: "Campo obrigatório" })}
                            label="Descrição"
                            error={errors?.descricao}
                            helperText={errors?.descricao?.message}
                            margin="dense"
                            variant="outlined"
                            fullWidth
                            multiline />

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
                            fullWidth />

                        <FormControl variant="outlined" fullWidth>
                            <InputLabel htmlFor="type">Tipo</InputLabel>
                            
                            <Select
                                margin="dense"
                                native
                                label="Tipo"
                                inputProps={{
                                    ...register("type"),
                                    id: 'type',
                                }}>
                                    <option value={1}>Preventiva</option>
                                    <option value={2}>Corretiva</option>
                                    <option value={3}>Urgente</option>
                            </Select>
                        </FormControl>

                        <FormControl variant="outlined" fullWidth>
                            <InputLabel htmlFor="equipamento" shrink>Equipamento</InputLabel>
                            
                            <Select
                                margin="dense"
                                native
                                label="Equipamento"
                                input={<OutlinedInput notched label="Equipamento" />}
                                inputProps={{
                                    ...register("equipamento_id"),
                                    id: 'equipamento',
                                }}>
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
                                label="Usuário"
                                input={<OutlinedInput notched label="Usuário" />}
                                inputProps={{
                                    ...register("usuario_id"),
                                    id: 'user',
                                }}>
                                    {usuarios.map(usuario => (
                                        <option value={usuario._id}>{usuario.name}</option>
                                    ))}
                            </Select>
                        </FormControl>

                        <CustomCardActions>
                            <Button color="secondary" onClick={() => { }}>
                                Remover
                            </Button>

                            <Button type="submit" color="primary">
                                Editar
                            </Button>
                        </CustomCardActions>
                    </CustomCardContent>
                </CustomCard>
            </Container>
        </form>
    );
}