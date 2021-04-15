import FormPosCovid from 'components/Forms/FormPosCovid';
import { useEffect } from 'react';

import { Root, FormContainer } from 'styles/form.sindrome.styles';
import AppBar from 'components/AppBar';

export default function formPosCovid(){
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
                    <FormPosCovid />
                </FormContainer>
            </Root>
        </>
    );
}