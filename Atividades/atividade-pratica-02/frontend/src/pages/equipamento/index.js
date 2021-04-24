import AppBar from 'components/AppBar/index';
import { Content, Main } from '../../styles/pages';
import ListaEquipamentos from 'components/Lists/Equipamentos';

export default function Equipamento() {
    return (
		<>
            <AppBar logado={true} />

            <Main>

                <Content>
                    <h1>Lista de Equipamentos</h1>
                    
                    <ListaEquipamentos />
                </Content>

            </Main>
		</>
    );
}