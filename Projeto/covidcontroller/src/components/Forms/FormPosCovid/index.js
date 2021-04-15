import React, { useRef, useState } from 'react';

import FormEtapas, { BotoesDeControle } from "../FormEtapas";
import { CustomForm } from '../styles';
import Sobre from './SubForms/Sobre';
import Sintomas from './SubForms/Sintomas';
import SintomasMentais from './SubForms/SintomasMentais';
import { responderFormularioPosCovid } from 'api/routes';
import { store } from 'react-notifications-component';
import { useRouter } from 'next/router';

export default function FormPosCovid(){
    const formRef = useRef(null);
    const [etapaAtual, setEtapaAtual] = useState(0);
    const etapas = ["Sobre", "Sintomas", "Sintomas"];
    const router = useRouter();

    async function handleSubmit(data) {
        try {
            const form = await responderFormularioPosCovid(data);

            store.addNotification({
                title: "Resposta enviada",
                message: "Sucesso ao submeter formulário de pós covid",
                type: "success",
                insert: "top",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__flipIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                }
            });
            router.push('/');
            
        } catch(error) {
            console.log(error);

            store.addNotification({
                title: "Erro ao enviar resposta",
                message: "Falha ao submeter formulário de pós covid",
                type: "danger",
                insert: "top",
                container: "bottom-right",
                animationIn: ["animate__animated", "animate__flipIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 5000,
                  onScreen: true
                }
            });
        } 
    }

    return(
        <FormEtapas etapaAtual={etapaAtual} etapas={etapas}>
            <CustomForm ref={formRef} onSubmit={handleSubmit}>
                <Sobre hide={(etapaAtual !== 0)} />
                <Sintomas hide={(etapaAtual !== 1)} />
                <SintomasMentais hide={(etapaAtual !== 2)} />
            
                <BotoesDeControle etapaAtual={etapaAtual} etapas={etapas} setEtapaAtual={setEtapaAtual} />
            </CustomForm>
        </FormEtapas>
    );
}