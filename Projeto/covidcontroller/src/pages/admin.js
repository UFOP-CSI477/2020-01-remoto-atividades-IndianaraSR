import { useState, useEffect, useRef } from 'react';
import { pegarFormulariosCovid, pegarFormulariosPosCovid } from 'api/routes';
import ListaForms from 'components/Forms/ListaForms';

import { Root } from '../styles/admin.styles';
import AppBar from 'components/AppBar';

export default function Admin() {
    const [formsCovid, setFormsCovid] = useState();
    const [formsPosCovid, setFormsPosCovid] = useState();
    const [tokenLoaded, setTokenLoaded] = useState(false);
    const [loading, setLoading] = useState(true);
    const [filtro, setFiltro] = useState("covid");
    
    function handleSetFiltro(filtro) {
        setFiltro(filtro);
    }

    async function atualizaLista() {
        setLoading(true);

        try {
            const formCovid = await pegarFormulariosCovid();
            const formPosCovid = await pegarFormulariosPosCovid();
        
            setFormsCovid(formCovid);
            setFormsPosCovid(formPosCovid);
        } catch(error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        function verificarLogin() {
            setTokenLoaded(true);
        }

        global.onTokenChange = verificarLogin;

        return () => {
            global.onTokenChange = null;
        }
    }, []);

    useEffect(async () => {

        if(tokenLoaded) {
            await atualizaLista();
        }
    }, [tokenLoaded]);

    if(loading)
        return (
            <Root>
                Carregando...
            </Root>
        );

    return (
        <>
            <AppBar />
            <Root>
                <button
                    disabled={filtro === "covid"}
                    onClick={() => handleSetFiltro("covid")}>Form Covid</button>
                
                <button
                    disabled={filtro === "sindrome"}
                    onClick={() => handleSetFiltro("sindrome")}>Form Pos Covid</button>

                {(filtro === "covid") && (
                    <ListaForms tipo="covid" atualizaLista={atualizaLista} forms={formsCovid} titulo="Form Covid" />
                )}

                {(filtro === "sindrome") && (
                    <ListaForms tipo="sindrome" atualizaLista={atualizaLista} forms={formsPosCovid} titulo="Form Pos Covid" />
                )}
            </Root>
        </>
    );
}