import { ScrollView, TouchableOpacity, View } from "react-native"
import { Container, SpacedContainer } from "../../components/Container/Style"
import { PerfilImage } from "../../components/Image/style"
import { ButtonTitle, MiddleTitle, Title } from "../../components/Title/style"
import { Text } from "../../components/Text/style"
import { InfoInput } from "../../components/Input/style"
import { Button } from "../../components/Button/style"
import { DbLink } from "../../components/Link/style"
import { Icon } from "react-native-elements"
import { CameraModal } from "../Camera/Camera"
import { useEffect, useState } from "react"
import api from "../../services/services"

export function Prescricao({ navigation, route }) {
    const [showCameraModal, setShowCameraModal] = useState(false)
    const [uriCameraCapture, setUriCameraCapture] = useState("")
    const [descricao, setDescricao] = useState("")

    async function InserirExame() {
        const formData = new FormData();

        formData.append("ConsultaId", route.params.data.id);
        formData.append("Imagem", {
            uri: uriCameraCapture,
            name: `Imagem.${uriCameraCapture.split(".").pop()}`,
            type: `Imagem/${uriCameraCapture.split(".").pop()}`
        })
        await api.post('Exame/Cadastrar', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then((response) => setDescricao(response.data.descricao)).catch((error) => console.log(error))
    }

    useEffect(() => {
        InserirExame()
    }, [uriCameraCapture])

    return (
        <ScrollView>
            <Container>
                <PerfilImage source={{ uri: 'https://media.istockphoto.com/id/1226551176/pt/foto/advertisement-concept-side-view-half-face-profile-with-copy-space-of-perfect-smiling-man.jpg?s=612x612&w=0&k=20&c=5Hf34eKWwSFbRKoWfX1GlgxZvjKvURk_Id0PERH2MmE=', }} />
                <Title>Dr. {route.params.data.medicoClinica.medico.idNavigation.nome}</Title>
                <View style={{ flexDirection: "row", gap: 20 }}>
                    <Text fieldWidth="auto">{route.params.data.medicoClinica.medico.especialidade.especialidade1}</Text>
                    <Text fieldWidth="auto">CRM - {route.params.data.medicoClinica.medico.crm}</Text>
                </View>
                <MiddleTitle textAlign="left">Descrição da consulta</MiddleTitle>
                <InfoInput multiline numberOfLines={5} style={{ textAlignVertical: 'top' }} value={route.params.data.descricao} />
                <MiddleTitle textAlign="left">Diagnóstico do paciente</MiddleTitle>
                <InfoInput style={{ textAlignVertical: 'top' }} value={route.params.data.diagnostico} />
                <MiddleTitle textAlign="left">Prescrição médica</MiddleTitle>
                <InfoInput multiline numberOfLines={5} style={{ textAlignVertical: 'top' }} />
                <MiddleTitle textAlign="left">Exames médicos</MiddleTitle>
                <InfoInput multiline numberOfLines={5} style={{ textAlign: "center" }} placeholder={"Nenhuma foto informada"} value={descricao} />
                <SpacedContainer>
                    <Button onPress={() => setShowCameraModal(true)} backgroundColor="#49B3BA" borderColor="#49B3BA" style={{ flex: 1, flexDirection: "row", justifyContent: "center" }} >
                        <Icon
                            size={25}
                            name='camera-plus-outline'
                            type='material-community'
                            color='white'
                        /><ButtonTitle colorText="#FFFFFF">  Enviar</ButtonTitle>
                    </Button>
                    <View style={{ flex: 1 }}>
                        <TouchableOpacity>
                            <Text fieldWidth="auto" colorText="#C81D25">Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </SpacedContainer>

                <View style={{ width: "90%", height: 2, backgroundColor: "#8C8A97" }}></View>
                <InfoInput multiline numberOfLines={5} style={{ textAlign: "center" }} placeholder="Resultado do exame de sangue : tudo normal" />
                <TouchableOpacity onPress={() => navigation.navigate("Main")}>
                    <DbLink>Voltar</DbLink>
                </TouchableOpacity>
            </Container>
            <CameraModal
                visible={showCameraModal}
                setUriCameraCapture={setUriCameraCapture}
                setShowCameraModal={setShowCameraModal}
            />
        </ScrollView>
    )
}