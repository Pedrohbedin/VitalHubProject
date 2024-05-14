import { Dialog } from "react-native-paper";
import styled from "styled-components";
// import { Paragraph } from "../Paragraph/style";
import { Text } from "../Text/style";

export const DialogStyle = styled(Dialog)`
  background-color: ${(props) =>
        props.status === "erro" ? "white" : "#fff"};
  z-index: 100;
  align-items: center;
`;

export const DialogTitle = styled(Dialog.Title)`
  text-align: center;
  font-family: "MontserratAlternates_500Medium";
  color: ${(props) =>
        props.status === "erro"
            ? "#D53B32"
            : props.status === "sucesso"
                ? "white"
                : "orange"};
`;

export const DialogIcon = styled(Dialog.Icon)`
  color: ${(props) =>
        props.status === "erro"
            ? "#D53B32"
            : props.status === "sucesso"
                ? "white"
                : "orange"};
`;

export const DialogContent = styled(Dialog.Content)``;

export const DialogContentText = styled(Text)``;