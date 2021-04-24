import EquipamentoCard from './Items/EquipamentoCard';
import { Lista } from './styles';
import { listarEquipamentos } from 'api';
import React from 'react';

export default function Item({ carregarLista, data }) {
    const [equipamentos, setEquipamentos] = React.useState([]);
    const [loading, setLoading] = React.useState();

    async function loadEquipamentos() {
        setLoading(true);

        try {
            const res = await listarEquipamentos();

            setEquipamentos(res.data);
        } catch(error) {
            console.log(error);
        }

        setLoading(false);
    }

    React.useEffect(() => {
        loadEquipamentos();
    }, []);

    if(loading) {
        return (
            <div>Carregando</div>
        );
    }

    if(equipamentos.length <= 0){
        return (
            <div>Lista vazia.</div>
        );
    }

    return(
        <Lista>
            {equipamentos.map(equipamento => (
                <EquipamentoCard equipamento={equipamento} loadEquipamentos={loadEquipamentos}/>
            ))}
        </Lista>
    );
}