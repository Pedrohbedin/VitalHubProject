import styled from "styled-components";

export const ButtonTabsStyle = styled.TouchableOpacity`
    padding: 12px 14px;
    border-radius: ${(props) => props.borderRadius || "5px"};
    border: 2px solid;
    border-color: ${(props) => props.borderColor || "#496BBA"};
    margin-bottom: 20px;

    background-color: ${(props) => props.clickButton ? props.backgroundColor == "" ? "#496BBA" : "#34898F" : "transparent"}
`

export const ButtonTextStyle = styled.Text`
    font-family: 'MontserratAlternates_600SemiBold';
    font-size: 12px;

    color: ${(props) => props.clickButton ? "#FBFBFB" : props.colorText == "" ? "#496BBA" : "#34898F"}
`