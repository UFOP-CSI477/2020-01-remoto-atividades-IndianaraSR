import { useRouter } from 'next/router';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { store } from 'react-notifications-component';
import { deletarEquipamento } from 'api';

export default function EquipamentoCard({ equipamento, loadEquipamentos }) {
    const router = useRouter();

    async function handleApagar(id) {
        try {
            await deletarEquipamento(id);

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

            loadEquipamentos();
        } catch (error) {
            console.log("error", error);
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
        router.push("/equipamento/"+ id);
    }

    return (
        <li>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {equipamento.name}
                    </Typography>

                    <Typography color="textSecondary">
                        {equipamento.modelo}
                    </Typography>
                </CardContent>

                <CardActions>
                    <Button color="secondary" onClick={() => handleApagar(equipamento._id)}>
                        Remover
                    </Button>

                    <Button color="primary" onClick={e => handleEdit(equipamento._id)}>
                        Editar
                    </Button>
                </CardActions>
            </Card>
        </li>
    );
}