import BooleanInput from "components/Inputs/BooleanInput";
import { Scope } from "@unform/core";

import { SectionForm, WarningMessage } from "../../styles";

export default function Sintomas({ etapaAtual }) {
    return (
        <SectionForm hide={etapaAtual !== 2}>
            <Scope path="sintomas">
                <div className="split">
                    <section>
                        Caso moderado:
                        
                        <Scope path="moderado">
                            <BooleanInput name="tosse_persistente" type="checkbox" label="Tosse persistente" />
                            <BooleanInput name="febre_persistente" type="checkbox" label="Febre persistente" />
                            <BooleanInput name="diarreia" type="checkbox" label="Diarréia" />
                            <BooleanInput name="cansaco" type="checkbox" label="Cansaço" />
                            <BooleanInput name="dor_de_cabeca" type="checkbox" label="Dor de cabeça" />
                            <BooleanInput name="perda_paladar" type="checkbox" label="Perda de paladar" />
                            <BooleanInput name="perda_olfato" type="checkbox" label="Perda de olfato" />
                        </Scope>
                    </section>

                    <section>
                        Caso grave:
                        
                        <Scope path="grave">
                            <BooleanInput name="falta_ar" type="checkbox" label="Falta de ar" />
                            <BooleanInput name="dor_peito" type="checkbox" label="Dor no peito" />
                            <BooleanInput name="pressao_peito" type="checkbox" label="Pressão no peito" />
                            <BooleanInput name="perda_fala" type="checkbox" label="Perda de fala" />
                            <BooleanInput name="perda_movimento" type="checkbox" label="Perda de movimento" />
                            <BooleanInput name="dificuldade_alimentar" type="checkbox" label="Dificuldade para se alimentar" />
                        </Scope>
                    </section>
                </div>

                <WarningMessage>
                    Procure atendimento médico imediato se tiver sintomas graves. Sempre
                    ligue antes de ir ao médico ou posto de saúde, clínicas ou
                    hospitais. Pessoas saudáveis que apresentarem os sintomas leves
                    devem acompanhar seus sintomas em casa. Em média, os sintomas
                    aparecem após 5 ou 6 dias depois de ser infectado com o vírus.
                    Porém, isso pode levar até 14 dias.
                        </WarningMessage>
            </Scope>
        </SectionForm>
    );
}