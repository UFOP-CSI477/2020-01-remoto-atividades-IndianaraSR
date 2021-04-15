import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import FormRegistro from 'components/Forms/FormRegistro';
import AppBar from 'components/AppBar';

import { Root, Titulo, SubTitulo, FormContainer, Hyperlink } from 'styles/registrar.styles';

export default function Login() {
    const router = useRouter();

    useEffect(() => {
        function verificarLogin() {
            const token = localStorage.getItem('token');

            if(token) {
                router.push("/");
            }
        }

        global.onTokenChange = verificarLogin;

        return () => {
            global.onTokenChange = null;
        }
    }, []);
    
    return (
        <>
            <AppBar />
            
            <Root>
                <SubTitulo>Juntar-se ao CovidController</SubTitulo>
                <Titulo>Criar uma conta</Titulo>
                
                <FormContainer>
                    <FormRegistro />

                    <Link href="/login">
                        <Hyperlink>
                            Já tenho uma conta
                        </Hyperlink>
                    </Link>
                </FormContainer>
            </Root>
        </>
    );
}