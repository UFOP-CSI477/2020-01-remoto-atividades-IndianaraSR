import BooleanInput from "components/Inputs/BooleanInput";
import { Scope } from "@unform/core";

import { SectionForm, WarningMessage } from "../../styles";

export default function GrupoRisco({ etapaAtual }) {
    return (
        <SectionForm hide={etapaAtual !== 1}>
            <Scope path="grupoRisco">
                <BooleanInput name="acima_peso" type="checkbox" label="Pessoas acima do peso (IMC≥40)" />
                <BooleanInput name="doencas_cardiaca" type="checkbox" label="Pessoas com doenças cardíacas" />
                <BooleanInput name="doencas_pulmonar" type="checkbox" label="Pessoas com doenças pulmonares" />
                <BooleanInput name="baixa_imunidade" type="checkbox" label="Pessoas com problemas de baixa imunidade, como pessoas transplantadas ou em quimioterapia" />
                <BooleanInput name="doencas_renais" type="checkbox" label="Pessoas com doenças renais ou em diálise" />
                <BooleanInput name="diabetico" type="checkbox" label="Diabéticos" />
                <BooleanInput name="gestantes" type="checkbox" label="Gestantes de alto risco" />
                <BooleanInput name="doencas_figado" type="checkbox" label="Pessoas com doenças do fígado" />
                <BooleanInput name="grupo_risco" type="checkbox" label="Faço parte de outro(s) grupo(s) de risco" />

                <WarningMessage>
                    Alguns grupos, como os descritos acima, têm maior chance de
                    desenvolver as formas mais graves da doença covid-19 Isso Não quer
                    dizer que esses grupos são infectados mais do que as demais pessoas.
                    De forma geral, é um maior risco de evoluir para a covid-19 grave.
                </WarningMessage>
            </Scope>
        </SectionForm>
    );
}