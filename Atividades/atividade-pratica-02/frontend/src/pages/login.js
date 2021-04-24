import AppBar from 'components/AppBar/index';
import { Content, Main } from 'styles/pages';
import FormLogin from 'components/Forms/Usuario/Login';

export default function Manutencao(){
	return(
		<>
			<AppBar />

			<Main>

				<Content>
					<h1>Conectar</h1>
					<FormLogin />
				</Content>

			</Main>
		</>
  	);
}