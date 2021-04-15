import React, { useRef, useState } from "react";
import * as Yup from "yup";

import { CustomForm } from "../styles";

import FormEtapas, { BotoesDeControle } from "../FormEtapas";
import { responderFormularioCovid } from "api/routes";
import PadraoComportamental from "./SubForms/PadraoComportamental";
import GrupoRisco from "./SubForms/GrupoRisco";
import Sintomas from "./SubForms/Sintomas";
import { store } from 'react-notifications-component';
import { useRouter } from 'next/router';


export default function FormCovid() {
    const formRef = useRef(null);
    const [etapaAtual, setEtapaAtual] = useState(0);
    const etapas = ["Padrão comportamental", "Grupo de risco", "Sintomas"];
    const router = useRouter();

    async function handleSubmit(data) {

        const schema = Yup.object().shape({
            padraoComportamental: Yup.object().shape({
                sexo: Yup.string().required("*O sexo é obrigatório"),
            })
        });

        try {
            await schema.validate(data, {
            	abortEarly: false,
            });

            setEtapaAtual((prevState) => prevState + 1);

            try {
                const form = await responderFormularioCovid(data);

                store.addNotification({
                    title: "Resposta enviada",
                    message: "Sucesso ao submeter formulário de covid",
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
            } catch (error) {
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

                throw new Error(error);
            }

            formRef.current.setErrors({});

        } catch (err) {
            setEtapaAtual(0);

            if (err instanceof Yup.ValidationError) {
                const errorMessages = {};

                err.inner.forEach((error) => {
                    errorMessages[error.path] = error.message;
                });

                formRef.current.setErrors(errorMessages);
            }
        }
    }

    return (
        <FormEtapas etapaAtual={etapaAtual} etapas={etapas}>
            <CustomForm ref={formRef} onSubmit={handleSubmit}>
                <PadraoComportamental etapaAtual={etapaAtual} />
                <GrupoRisco etapaAtual={etapaAtual} />
                <Sintomas etapaAtual={etapaAtual} />

                <BotoesDeControle etapaAtual={etapaAtual} etapas={etapas} setEtapaAtual={setEtapaAtual} />
            </CustomForm>
        </FormEtapas>
    );
}
