import styled from 'styled-components';

export const Root = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    min-width: 100vw;
    padding: 32px;
`;

export const Titulo = styled.h1`
    font-weight: 500;
    font-size: 48px;
    margin: 0;
    margin-bottom: 16px;
`;

export const SubTitulo = styled.h1`
    font-weight: 400;
    font-size: 14px;
    letter-spacing: 2px;
    margin: 0;
    margin-top: 24px;
    color: rgba(0, 0, 0, .5);
`;

export const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    max-width: 500px;
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