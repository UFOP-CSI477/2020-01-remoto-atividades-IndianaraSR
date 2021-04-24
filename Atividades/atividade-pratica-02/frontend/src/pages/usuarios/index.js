import AppBar from 'components/AppBar/index';
import { Content, Main } from '../../styles/pages';
import ListaUsuarios from 'components/Lists/Usuarios';

export default function Usuario() {
    return (
		<>
            <AppBar logado={true} />

            <Main>

                <Content>
                    <h1>Lista de Usuários</h1>
                    
                    <ListaUsuarios />
                </Content>

            </Main>
		</>
    );
}