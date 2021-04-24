import AppBar from 'components/AppBar/index';
import { Content, Main } from '../../styles/pages';
import { useRouter } from 'next/router';
import EditarEquipamento from 'components/Forms/Equipamentos/Editar';

export default function Equipamento() {
    const router = useRouter();

    return (
		<>
            <AppBar />

            <Main>

                <Content>
                    <h1>Editar Equipamento</h1>
                    
                    <EditarEquipamento id={router.query.id} />
                </Content>

            </Main>
		</>
    );
}