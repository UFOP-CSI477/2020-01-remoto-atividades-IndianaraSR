import AgendamentoCard from './Items/AgendamentoCard';
import { Lista } from './styles';
import React from 'react';
import{ listarManutencoes } from 'api';

export default function Item({ carregarLista, data }) {
    const [agendamentos, setAgendamentos] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    
    async function loadAgendamentos() {
        setLoading(true);

        const res = await listarManutencoes(); 
        setAgendamentos(res.data);

        setLoading(false)
    }

    React.useEffect(() => {
        loadAgendamentos();
    }, []);

    if(loading)
        return (
            <div>Carregando</div>
        );

    return(
        <Lista>
            {agendamentos.map(agendamento => (
                <AgendamentoCard agendamento={agendamento} carregarLista={carregarLista}/>
            ))}
        </Lista>
    );
}