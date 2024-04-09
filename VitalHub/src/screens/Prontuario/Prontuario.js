import { ScrollView, TextInput } from "react-native";
import { Container, SpacedContainer } from "../../components/Container/Style";
import { PerfilImage } from "../../components/Image/style"
import { InfoInput } from "../../components/Input/style";
import { Text } from "../../components/Text/style";
import { ButtonTitle, MiddleTitle, Title } from "../../components/Title/style";
import { Button } from "../../components/Button/style";
import { DbLink } from "../../components/Link/style";
import { TouchableOpacity } from "react-native";
import { useState } from "react";

export function Prontuario({ navigation, route }) {
    
    const [editable, setEditable] = useState(false);

    return (
        <ScrollView>
            <Container>
                <PerfilImage source={{ uri: 'https://media.istockphoto.com/id/1226551176/pt/foto/advertisement-concept-side-view-half-face-profile-with-copy-space-of-perfect-smiling-man.jpg?s=612x612&w=0&k=20&c=5Hf34eKWwSFbRKoWfX1GlgxZvjKvURk_Id0PERH2MmE=', }} />
                <Title>{route.params.data.paciente.idNavigation.nome}</Title>
                <SpacedContainer style={{ width: "auto", gap: 20 }}>
                    <Text fieldWidth="auto">22 anos</Text>
                    <Text fieldWidth="auto">{route.params.data.paciente.idNavigation.email}</Text>
                </SpacedContainer>
                <MiddleTitle>Descrição da consulta</MiddleTitle>
                <InfoInput editable={editable} multiline numberOfLines={5} placeholder="Descrição" style={{ textAlignVertical: 'top' }} value={route.params.data.descricao} />
                <MiddleTitle>Diagnóstico do paciente</MiddleTitle>
                <InfoInput editable={editable} placeholder="Diagnóstico" value={route.params.data.diagnostico} />
                <MiddleTitle>Prescrição médica</MiddleTitle>
                <InfoInput editable={editable} multiline numberOfLines={5} placeholder="Prescrição medica" style={{ textAlignVertical: 'top' }} />
                <Button onPress={() => setEditable(false)}>
                    <ButtonTitle>Salvar</ButtonTitle>
                </Button>
                <Button onPress={() => setEditable(true)}>
                    <ButtonTitle>Editar</ButtonTitle>
                </Button>
                <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                    <DbLink>Cancelar</DbLink>
                </TouchableOpacity>
            </Container>
        </ScrollView>
    )
}