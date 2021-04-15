import ItemFormCovid from './ItemFormCovid';
import ItemFormPosCovid from './ItemFormPosCovid';

import { ListaItems } from './styles';

export default function ListaForms({ tipo, atualizaLista, forms, titulo }) {
    return (
        <div>
            <h1>{titulo}</h1>
            
            <ListaItems>
                {forms.map(form => (
                    (tipo === 'covid') ? (
                        <ItemFormCovid atualizaLista={atualizaLista} data={form} />
                    ) : (
                        <ItemFormPosCovid atualizaLista={atualizaLista} data={form} />
                    )
                ))}
            </ListaItems>
        </div>
    );
}