import React from 'react';
import { Stepper, Step, StepLabel, Button } from '@material-ui/core';

import { GrNext, GrPrevious } from 'react-icons/gr';
import { ContainerButtonsControle, ButtonControle, ButtonFinalizar } from './styles';

export function BotoesDeControle({ etapas, etapaAtual, setEtapaAtual }) {
    const ultimaEtapa = (etapaAtual >= etapas.length - 1);

    function handleProximaEtapa() {
        setEtapaAtual(state => state+1);
    }

    function handleEtapaAnterior() {
        setEtapaAtual(state => state-1);
    }

    return (
        <ContainerButtonsControle>
            <ButtonControle onClick={handleEtapaAnterior} disabled={(etapaAtual === 0)}>
                <GrPrevious />
            </ButtonControle>

            {(ultimaEtapa) ? (
                <ButtonFinalizar>
                    Finalizar
                </ButtonFinalizar>
            ) : (
                <ButtonControle onClick={handleProximaEtapa}>
                    <GrNext />
                </ButtonControle>
            )}

        </ContainerButtonsControle>
    );
}

export default function FormEtapas({ etapas, etapaAtual, setEtapaAtual, formRef, children }) {
    function handleNext() {
        if(etapaAtual !== etapas.length - 1)
            return setEtapaAtual(prevState => prevState+1);

        formRef.current.submitForm();
    }
    
    function handleBack() {
        setEtapaAtual((prevState) => prevState - 1);
    };

    return (
        <>
            <Stepper activeStep={etapaAtual} alternativeLabel>
                {etapas.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {etapaAtual === etapas.length && (
                <div>
                    O questionário foi respondido com sucesso!
                </div>
            )}

            { children }
        </>
    );
}