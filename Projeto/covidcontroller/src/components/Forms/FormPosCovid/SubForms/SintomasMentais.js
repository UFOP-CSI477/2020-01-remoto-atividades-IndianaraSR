import BooleanInput from 'components/Inputs/BooleanInput';

import { SectionForm } from '../../styles';

export default function Sintomas({ hide }) {
    return (
        <SectionForm hide={hide}>
            <label>O período de pandemia trouxe algumas consequencias, você se encontra em algum grupo abaixo:</label>
            
            <BooleanInput name="medo" type="checkbox" label="Medo" />
            <BooleanInput name="tedio" type="checkbox" label="Tédio" />
            <BooleanInput name="solidao" type="checkbox" label="Solidão" />
            <BooleanInput name="insonia" type="checkbox" label="Insônia" />
            <BooleanInput name="raiva" type="checkbox" label="Raiva" />
            <BooleanInput name="stress" type="checkbox" label="Stress" />
            <BooleanInput name="ansiedade" type="checkbox" label="Ansiedade" />
            <BooleanInput name="depressao" type="checkbox" label="Depressão" />
            <BooleanInput name="interrupcao" type="checkbox" label="Interrupção do acompanhamento de doenças crônicas (como câncer e outras doenças crônicas como diabetes, obesidade e hipertensão arterial)" />
            <BooleanInput name="medo_infec" type="checkbox" label="Medo de contrair a infecção" />
            <BooleanInput name="falta_perspectiva" type="checkbox" label="Falta de perspectiva" />
            <BooleanInput name="perda_peso" type="checkbox" label="Perda de peso" />
            <BooleanInput name="ganho_peso" type="checkbox" label="Ganho de peso" />
            <BooleanInput name="mudanca_alimentacao" type="checkbox" label="Mudança na alimentação" />				
        </SectionForm>
    );
}