import { ScrollView, TextInput } from "react-native";
import { Container, SpacedContainer } from "../../components/Container/Style";
import { PerfilImage } from "../../components/Image/style"
import { InfoInput } from "../../components/Input/style";
import { Text } from "../../components/Text/style";
import { ButtonTitle, MiddleTitle, Title } from "../../components/Title/style";
import { Button } from "../../components/Button/style";
import { DbLink } from "../../components/Link/style";
import { TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import api from "../../services/services";
import { ActivityIndicator } from "react-native";

export function Prontuario({ navigation, route }) {
    const [descricao, setDescricao] = useState(null)
    const [diagnostico, setDiagnostico] = useState(null)
    const [prescricao, setPrescricao] = useState(null)
    
    const [editable, setEditable] = useState(false);

    const [consultaAtualizada, setConsultaAtualizada] = useState([]);

    async function Salvar() {
        await api.put('/Consultas/Prontuario', consultaAtualizada).then(response => console.log(response))
            .catch(error => console.log(error))
        setEditable(false)
    }

    useEffect(() => {
        setConsultaAtualizada(route.params.data);

        setDescricao(route.params.data.descricao);
        setDiagnostico(route.params.data.diagnostico);
    }, [route])

    useEffect(() => {
        consultaAtualizada.descricao = descricao;
        consultaAtualizada.diagnostico = diagnostico;
    }, [descricao, diagnostico])



    return (
        descricao === null ? <ActivityIndicator /> :
            <ScrollView>
                <Container>
                    <PerfilImage source={{ uri: 'https://media.istockphoto.com/id/1226551176/pt/foto/advertisement-concept-side-view-half-face-profile-with-copy-space-of-perfect-smiling-man.jpg?s=612x612&w=0&k=20&c=5Hf34eKWwSFbRKoWfX1GlgxZvjKvURk_Id0PERH2MmE=', }} />
                    <Title>{route.params.data.paciente.idNavigation.nome}</Title>
                    <SpacedContainer style={{ width: "auto", gap: 20 }}>
                        <Text fieldWidth="auto">22 anos</Text>
                        <Text fieldWidth="auto">{route.params.data.paciente.idNavigation.email}</Text>
                    </SpacedContainer>
                    <MiddleTitle>Descrição da consulta</MiddleTitle>
                    <InfoInput editable={editable} multiline numberOfLines={5} placeholder="Descrição" style={[editable && { borderColor: '#49B3BA', borderWidth: 1 },
                    editable && { color: '#49B3BA' }, { textAlignVertical: 'top' }]} value={descricao} onChangeText={txt => setDescricao(txt)} />
                    <MiddleTitle>Diagnóstico do paciente</MiddleTitle>
                    <InfoInput editable={editable} placeholder="Diagnóstico" value={diagnostico} style={[editable && { borderColor: '#49B3BA', borderWidth: 1 },
                    editable && { color: '#49B3BA' }]} onChangeText={txt => setDiagnostico(txt)} />
                    <MiddleTitle>Prescrição médica</MiddleTitle>
                    <InfoInput editable={editable} multiline numberOfLines={5} placeholder="Prescrição medica" style={[editable && { borderColor: '#49B3BA', borderWidth: 1 },
                    editable && { color: '#49B3BA' }, { textAlignVertical: 'top' }]} value={prescricao} onChangeText={txt => setPrescricao(txt)} />
                    <Button onPress={Salvar}>
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