import styled from 'styled-components';

export const ContainerButtonsControle = styled.div`
    display: flex;
    justify-content: space-between;
    position: fixed;
    z-index: 99999;
    bottom: 0;
    left: 0;
    right: 0;
    margin: 24px 32px;
    pointer-events: none;

    & > * {
        pointer-events: auto;
    }
`;

export const ButtonControle = styled.button.attrs({ type: "button" })`
    background: #FFFFFF;
    border: none;
    border-radius: 4px;
    box-shadow: 0px 0px 8px rgba(0, 0, 0, .2);
    height: 80px;
    width: 60px;
    cursor: pointer;
    outline: none;
    opacity: .8;

    &:hover {
        opacity: 1;
    }

    &:disabled {
        opacity: .5;
        cursor: auto;
    }
`;

export const ButtonFinalizar = styled(ButtonControle).attrs({ type: "submit" })`
    background: #3f51b5;
    color: #FFFFFF;
    font-weight: 600;
    width: 120px;
`;