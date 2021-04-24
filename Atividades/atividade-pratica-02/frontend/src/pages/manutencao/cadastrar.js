import AppBar from 'components/AppBar/index';
import { Content, Main } from '../../styles/pages';
import CadastroManutencao from 'components/Forms/Manutencao/Cadastro';

export default function Manutencao() {
    return (
		<>
            <AppBar />

            <Main>

                <Content>
                    <h1>Cadastro Manutenção</h1>

                    <CadastroManutencao />
                </Content>

            </Main>
		</>
    );
}