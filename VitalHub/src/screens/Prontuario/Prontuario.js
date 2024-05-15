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
import { CameraModal } from "../Camera/Camera";

export function Prontuario({ navigation, route }) {
    const [descricao, setDescricao] = useState(null)
    const [diagnostico, setDiagnostico] = useState(null)
    const [prescricao, setPrescricao] = useState(null)
    const [idade, setIdade] = useState()

    const [editable, setEditable] = useState(false);

    const [consultaAtualizada, setConsultaAtualizada] = useState([]);

    async function Salvar() {
        await api.put('/Consultas/Prontuario', consultaAtualizada).then((response) => console.log("Consulta atualizada"))
            .catch(error => console.log(error))
        setEditable(false)
    }

    useEffect(() => {
        setConsultaAtualizada(route.params.data);
        setPrescricao(route.params.data.receita.medicamento)
        setDescricao(route.params.data.descricao);
        setDiagnostico(route.params.data.diagnostico);
    }, [route])

    useEffect(() => {
        setConsultaAtualizada({
            consultaId: route.params.data.id,
            medicamento: prescricao,
            descricao: descricao,
            diagnostico: diagnostico,
        })
    }, [descricao, diagnostico, prescricao])


    useEffect(() => {
        if (route.params.data.paciente != null) {
            const dataPasciente = new Date(route.params.data.paciente.dataNascimento)
            const teste = new Date()
            setIdade(Math.floor((teste.getTime() - dataPasciente.getTime()) / (1000 * 60 * 60 * 24 * 365.25)))
        }
    }, [route.params.data])

    return (
        descricao === null ? <ActivityIndicator /> :
            <ScrollView>
                <Container paddingTop="0">
                    <PerfilImage source={{ uri: route.params.data.paciente.idNavigation.foto }} />
                    <Title>{route.params.data.paciente.idNavigation.nome}</Title>
                    <SpacedContainer style={{ width: "auto", gap: 20 }}>
                        <Text fieldWidth="auto">{idade} anos</Text>
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