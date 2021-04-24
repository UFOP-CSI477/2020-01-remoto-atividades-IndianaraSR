import UsuarioCard from './Items/UsuarioCard';
import { Lista } from './styles';

export default function Item({ carregarLista, data }) {
    const usuarios = [
        {
            id: "1",
            name: "admin",
            email: "admin@admin.com"
        }, {
            id: "2",
            name: "indianara",
            email: "indianara@gmail.com"
        }
    ];

    return(
        <Lista>
            {usuarios.map(usuario => (
                <UsuarioCard usuario={usuario} carregarLista={carregarLista}/>
            ))}
        </Lista>
    );
}