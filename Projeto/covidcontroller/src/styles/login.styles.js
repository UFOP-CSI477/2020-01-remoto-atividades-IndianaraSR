import styled from 'styled-components';
import { GoSignIn } from 'react-icons/go';

export const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    min-width: 100vw;
    padding: 32px;
`;

export const Titulo = styled.h1`
    font-weight: 100;
    font-size: 24px;
    margin: 16px 0;
`;

export const IconeLogin = styled(GoSignIn)`
    height: 32px;
    width: 32px;
`;

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    max-width: 350px;
    padding: 24px;
`;

export const Hyperlink = styled.a`
    align-self: flex-end;
    color: #3f51b5;
    text-decoration: none;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`;