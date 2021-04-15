import { SectionForm, WarningMessage } from '../../styles';

export default function Sobre({ hide }) {
    return (
        <SectionForm hide={hide}>
            <label>Síndrome pós-Covid</label>

            <WarningMessage>
                Mesmo após a cura, casos graves da doença, tendem a abalar o organismo a longo prazo, porém, pode acontecer nos casos leves e moderados, 
                especialmente em pessoas com pressão alta, obesidade ou com histórico de transtorno psicológicos. Nenhum mal-estar deve ser menosprezado.
                Caso os incômodos sejam intensos, procure atendimento médico.
            </WarningMessage>
        </SectionForm>
    );
}