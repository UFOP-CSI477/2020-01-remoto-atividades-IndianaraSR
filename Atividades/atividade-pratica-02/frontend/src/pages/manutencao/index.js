import AppBar from 'components/AppBar/index';
import { Content, Main } from 'styles/pages';
import ListaAgendamentos from 'components/Lists/Agendamentos';

export default function Manutencao(){
	return(
		<>
			<AppBar logado={true} />

			<Main>

				<Content>
					<h1>Lista de Agendamentos</h1>
					<ListaAgendamentos />
				</Content>

			</Main>
		</>
  	);
}