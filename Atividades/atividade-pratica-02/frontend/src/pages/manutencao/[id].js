import AppBar from 'components/AppBar/index';
import { Content, Main } from '../../styles/pages';
import { useRouter } from 'next/router';
import EditarManutencao from 'components/Forms/Manutencao/Editar';

export default function Manutencao() {
    const router = useRouter();

    return (
		<>
            <AppBar admin={true} />

            <Main>

                <Content>
                    <h1>Editar Manutenção</h1>

                    <EditarManutencao id={router.query.id} />
                </Content>

            </Main>
		</>
    );
}