import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

export const CustomCard = styled(Card)`
    max-width: 420px;
    margin-top: 50px;
`;

export const CustomCardActions = styled(CardActions)`
    display: flex;
    justify-content: flex-end;
`;

export const CustomCardContent = styled(CardContent)`
    display: flex;
    flex-direction: column;
    gap: 24px;

    & > * {
        margin: 0px !important;
    }
`;