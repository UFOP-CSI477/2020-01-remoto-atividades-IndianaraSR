import { useEffect } from 'react';
import { useRouter } from 'next/router';

import FormCovid from 'components/Forms/FormCovid';

import { Root, FormContainer } from 'styles/form.covid.styles';
import AppBar from 'components/AppBar';

export default function formCovid(){
    const router = useRouter();

    useEffect(() => {
        function verificarLogin() {
            const token = localStorage.getItem('token');

            if(!token) {
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
                <FormContainer>
                    <FormCovid />
                </FormContainer>
            </Root>
        </>
    );
}