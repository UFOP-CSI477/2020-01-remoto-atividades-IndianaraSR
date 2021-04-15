import styled from 'styled-components';
import { Form } from '@unform/web';
import { Button } from '@material-ui/core';

export const CustomForm = styled(Form)`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

export const CustomButton = styled(Button).attrs({ type:"submit", variant:"contained", color: "primary" })`
    /* background: blue; */
`;

export const SectionForm = styled.section`
    display: ${props => props?.hide ? 'none' : 'flex'};

    flex-direction: column;
    gap: 32px;

    & .title{
        font-weight: bold;
        margin: 0 0 16px 0;
        font-size: 18px;
    }

    & .split{
        display: flex;
        flex-direction: row;
    }

    & .split > section{
        flex: 1;
    }
`;

export const WarningMessage = styled.p`
    opacity: 0.6;
`;