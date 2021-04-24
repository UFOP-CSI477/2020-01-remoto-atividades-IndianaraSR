import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { AppBar, Button, Toolbar } from '@material-ui/core';
import { Add, List, ExitToApp } from '@material-ui/icons';

function RedirectButton({ href, children }) {
    return (
        <Link href={href}>
            <Button uppercase={false} color="inherit">{children}</Button>
        </Link>
    );
}

export default function CustomAppBar({ logado, admin }) {
    const router = useRouter();
    const [user, setUser] = useState();
    const [conectado, setConectado] = useState(false);
  
    function handleDesconectar() {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
        setConectado(false);
        router.push("/");

        window.dispatchEvent(new Event('storage'));
    }

    useEffect(() => {
        function verificarLogin() {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user'));
            const conectado = (token && user);

            if(!conectado) {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }

            if(logado && !conectado) {
                router.push("/login");
                return;
            }

            if(admin && !user.admin) {
                router.push("/");
                return;
            }

            setUser(user);
            setConectado(conectado);
        }

        verificarLogin();
    }, [router]);
    
    return (

        <div>
            <AppBar position="static">
                <Toolbar style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    {(user?.admin) && (
                        <>
                            <RedirectButton color="inherit" href="/registrar"><Add /> Usuário</RedirectButton>
                            <RedirectButton color="inherit" href="/usuarios"><List /> Lista de usuários</RedirectButton>
                        </>
                    )}

                    {(conectado) ? (
                        <>
                            <RedirectButton color="inherit" href="/equipamento"><List /> Equipamentos</RedirectButton>
                            <RedirectButton color="inherit" href="/manutencao"><List /> Manutenções</RedirectButton>
                            <RedirectButton color="inherit" href="/manutencao/cadastrar"><Add /> Manutenções</RedirectButton>
                            <RedirectButton color="inherit" href="/manutencao/cadastrar"><Add /> Equipamento</RedirectButton>
                            <Button color="inherit" onClick={handleDesconectar}><ExitToApp /></Button>
                        </>
                    ) : (
                        <RedirectButton color="inherit" href="/login">Login</RedirectButton>
                    )}       
                </Toolbar>
            </AppBar>
        </div>
            
    );
  }