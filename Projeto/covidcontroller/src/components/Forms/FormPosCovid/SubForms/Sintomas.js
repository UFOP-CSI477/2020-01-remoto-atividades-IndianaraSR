import BooleanInput from 'components/Inputs/BooleanInput';

import { SectionForm } from '../../styles';

export default function Sintomas({ hide }) {
    return (
        <SectionForm hide={hide}>
            <label>Está tendo algum sistoma pós Covid?</label>
            
            <BooleanInput name="fadiga" type="checkbox" label="Fadiga" />
            <BooleanInput name="falta_ar" type="checkbox" label="Falta de ar" />
            <BooleanInput name="queda_cabelo" type="checkbox" label="Queda de cabelo" />
            <BooleanInput name="dor_muscular" type="checkbox" label="Dor muscular" />
            <BooleanInput name="perda_paladar" type="checkbox" label="Perda de paladar" />
            <BooleanInput name="perda_olfato" type="checkbox" label="Perda de olfato" />
            <BooleanInput name="tontura" type="checkbox" label="Tontura" />
            <BooleanInput name="dor_peito" type="checkbox" label="Dor no peito" />
            <BooleanInput name="trombose" type="checkbox" label="Trobose" />
            <BooleanInput name="dificuldade_linguagem" type="checkbox" label="Dificuldades de linguagem" />
            <BooleanInput name="dificuldade_raciocinio" type="checkbox" label="Dificuldades de raciocínio e memória" />
            <BooleanInput name="alteracao_menstruacao" type="checkbox" label="Alteração na menstruação" />
        </SectionForm>
    );
}