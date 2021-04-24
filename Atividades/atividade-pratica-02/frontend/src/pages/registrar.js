import AppBar from 'components/AppBar/index';
import { Content, Main } from 'styles/pages';
import FormCadastro from 'components/Forms/Usuario/Cadastro';

export default function Manutencao(){
	return(
		<>
			<AppBar admin={true} />

			<Main>

				<Content>
					<h1>Cadastrar Usuário</h1>
					<FormCadastro />
				</Content>

			</Main>
		</>
  	);
}