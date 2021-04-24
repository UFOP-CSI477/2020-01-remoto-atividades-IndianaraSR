import { useRouter } from 'next/router';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { store } from 'react-notifications-component';

export default function AgendamentoCard({ agendamento }) {
    const router = useRouter();

    function pad(d) {
        if(d < 10) {
            return '0' + d.toString();
        } else {
            return d.toString();
        }
    }

    function formataData(d) {
        const data = new Date(d);

        return pad(data.getDate()) + "/" + pad(data.getMonth()+1) + "/" + pad(data.getFullYear());
    }

    async function handleApagar(id) {
        try {
            await deletarCadastro(id);

            store.addNotification({
                title: "Apagar",
                message: "Equipamento apagado com sucesso",
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

            atualizaLista();
        } catch (error) {
            store.addNotification({
                title: "Falha ao apagar",
                message: "Não foi possível apagar este Equimento",
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

    function handleEdit(id) {
        router.push("/manutencao/"+ id);
    }

    function getTypeValor(type) {
        if(type === 1) {
            return "Preventiva";
        } else if(type === 2) {
            return "Corretiva";
        } else if(type === 3) {
            return "Urgente";
        }
    }

    return (
        <li>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {formataData(agendamento.data_limite)}
                    </Typography>

                    <Typography color="textSecondary" gutterBottom style={{ whiteSpace: 'break-spaces' }}>
                        {agendamento.descricao}
                    </Typography>

                    <Typography color="textSecondary">
                        {agendamento.equipamento_id.name} - {agendamento.equipamento_id.modelo}
                    </Typography>

                    <Typography color="textSecondary" gutterBottom>
                        Manutenção {getTypeValor(agendamento.type)}
                    </Typography>

                    { console.log("agendamento", agendamento) }

                    {/* <Typography color="textSecondary">
                        {agendamento.usuario_id.name} - {agendamento.usuario_id.email}
                    </Typography> */}
                </CardContent>

                <CardActions>
                    <Button color="secondary" onClick={() => { }}>
                        Remover
                    </Button>

                    <Button color="primary" onClick={e => handleEdit(agendamento._id)}>
                        Editar
                    </Button>
                </CardActions>
            </Card>
        </li>
    );
}