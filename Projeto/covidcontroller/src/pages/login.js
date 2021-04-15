import { useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import FormLogin from 'components/Forms/FormLogin';
import AppBar from 'components/AppBar';

import { Root, Titulo, IconeLogin, FormContainer, Hyperlink } from 'styles/login.styles';

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
                <IconeLogin />
                <Titulo>Conecte-se ao CovidController</Titulo>
                
                <FormContainer>
                    <FormLogin />

                    <Link href="/registrar">
                        <Hyperlink>
                            Ainda não tenho uma conta
                        </Hyperlink>
                    </Link>
                </FormContainer>
            </Root>
        </>
    );
}