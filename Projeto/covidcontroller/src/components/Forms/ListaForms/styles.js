import styled from 'styled-components';
import MuiCard from '@material-ui/core/Card';

export const ListaItems = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    row-gap: 80px;
    column-gap: 40px;

    & .titulo {
        text-align: center;
    }
`;

export const Informacoes = styled.div`
    display: flex;
    flex-direction: column;
    margin: 16px 0px;
`;

export const Card = styled(MuiCard)`
    min-width: 400px;

    background-color: #fdffb6 !important;
`;