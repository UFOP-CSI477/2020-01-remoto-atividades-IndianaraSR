import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

export default function UsuarioCard({ usuario }) {
    return (
        <li>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        {usuario.name}
                    </Typography>

                    <Typography color="textSecondary">
                        {usuario.email}
                    </Typography>
                </CardContent>
            </Card>
        </li>
    );
}