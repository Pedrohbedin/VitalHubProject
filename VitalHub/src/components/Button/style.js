import styled from "styled-components";

export const Button = styled.TouchableOpacity`
    background-color: ${(props) => props.backgroundColor || "#496BBA"};
    width: ${(props) => props.fieldWidth || "90%"};
    align-items: center;
    border-radius: 5px;
    padding: ${(props) => props.padding || "4px"};
    margin: 15px 0px;
    border: 2px solid ;
    border-color: ${(props) => props.borderColor || "#496BBA"};
`

export const BorderedButton = styled(Button)`
    background-color: transparent;
    justify-content: center;
    flex-direction: row;
    gap: 27px;
`

export const FuncButton = styled.TouchableOpacity`
    background-color: rgba(73, 179, 186, .15);
    width: 45px;
    height: 45px;
    justify-content: center;
    align-items: center;
    border-radius: 25px;
    position: fixed;
    right: 40%;
    top: 20px;
`

export const ButtonCamera = styled.TouchableOpacity.attrs({
    activeOpacity: 0.8
})`
    padding: 12px;
    border-radius: 10px;
    border: 1px solid #fbfbfb;
    background-color: #496dba;
    position: absolute;
    right: 15px;
    bottom: -20px;
`
