import React from "react";
import BooleanInput from "components/Inputs/BooleanInput";
import SelectInput from "components/Inputs/SelectInput";
import TextInput from "components/Inputs/TextInput";
import RangeInput from "components/Inputs/RangeInput";
import { Scope } from "@unform/core";

import { SectionForm } from "../../styles";

export default function PadraoComportamental({ etapaAtual }) {
    return (
        <SectionForm hide={etapaAtual !== 0}>
            <Scope path="padraoComportamental">
                <SelectInput name="sexo" label="Sexo:">
                    <option selected disabled value="">Selecione uma opção</option>
                    <option value="Fem">Feminino</option>
                    <option value="Masc">Masculino</option>
                    <option value="Outro">Outro</option>
                </SelectInput>

                <TextInput name="nascimento" type="date" />
                <RangeInput name="suscetivel" label="Quão suscetível você acha que está ao vírus?" min={0} max={10} step={1} marks={[{ value: 0, label: "Pouco" }, { value: 5, label: "Médio" }, { value: 10, label: "Muito" } ]} />
                <RangeInput name="necessidade_medica" label="Quanto você considera necessário ir a um médico nesse momento?" min={0} max={10} step={1} marks={[{ value: 0, label: "Pouco" }, { value: 5, label: "Médio" }, { value: 10, label: "Muito" }]} />
                <RangeInput name="contato_diario" label="Quantas pessoas tem contato diário com você" min={0} max={10} step={1} marks={[{ value: 0, label: "Ninguém" }, { value: 10, label: "10 ou mais" } ]} />
                <RangeInput name="sair_semana" label="Quantas vezes você constuma sair na semana" min={0} max={10} step={1} marks={[{ value: 0, label: "Pouco" }, { value: 10, label: "10 ou mais" }]} />
                <RangeInput name="visita_lugar_risco" label="Com qual frequência você visita lugares de risco (Bares, restaurantes, etc)" min={0} max={10} step={1} marks={[{ value: 0, label: "Nunca" }, { value: 10, label: "Muito" }]} />
                <BooleanInput name="sair_casualmente" type="checkbox" label="Costumo sair casualmente nos finais de semana" />
            </Scope>
        </SectionForm>
    );
}