import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AppBar, Toolbar, Button } from '@material-ui/core';

import { H6 } from './styles';

function RedirectButton({ href, children }) {
    return (
        <Link href={href}>
            <Button color="inherit">{children}</Button>
        </Link>
    );
}

export default function ButtonAppBar() {
    const [conectado, setConectado] = useState(false);
    const [user, setUser] = useState();
 
    function handleDesconectar() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.dispatchEvent(new Event('storage'));
    }

    useEffect(() => {
        function verificarLogin() {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user'));

            setUser(user);

            setConectado(Boolean(token));
        }

        verificarLogin();

        global.onTokenChange = verificarLogin;

        return () => {
            global.onTokenChange = null;
        }
    }, []);

    return (
        <AppBar position="static">
            <Toolbar>
                <Link href="/">
                    <H6>CovidController</H6>
                </Link>

                {conectado ? (
                    <>
                        {(!user?.formCovid && !user?.formPosCovid) && (
                            <RedirectButton href="/form/covid">Formulário Covid</RedirectButton>
                        )}

                        {(!user?.formPosCovid) && (
                            <RedirectButton href="/form/sindrome">Já tive Covid</RedirectButton>
                        )}

                        <Button onClick={handleDesconectar} color="inherit">Desconectar</Button>
                    
                        {user?.admin && (
                            <RedirectButton href="/admin">Admin</RedirectButton>
                        )}
                    </>
                ) : (
                    <>
                        <RedirectButton href="/login">Login</RedirectButton>
                        <RedirectButton href="/registrar">Registrar</RedirectButton>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
}