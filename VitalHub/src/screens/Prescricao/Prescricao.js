import { ScrollView, TouchableOpacity, View } from "react-native"
import { Container, SpacedContainer } from "../../components/Container/Style"
import { PerfilImage } from "../../components/Image/style"
import { ButtonTitle, MiddleTitle, Title } from "../../components/Title/style"
import { Text } from "../../components/Text/style"
import { InfoInput } from "../../components/Input/style"
import { Button } from "../../components/Button/style"
import { DbLink } from "../../components/Link/style"
import { Icon, Image } from "react-native-elements"
import { CameraModal } from "../Camera/Camera"
import { useEffect, useState } from "react"
import api from "../../services/services"

export function Prescricao({ navigation, route }) {
    const [showCameraModal, setShowCameraModal] = useState(false)
    const [uriCameraCapture, setUriCameraCapture] = useState(null)
    const [descricao, setDescricao] = useState("")

    async function InserirExame() {
        const formData = new FormData();

        formData.append("ConsultaId", route.params.data.id);
        console.log(uriCameraCapture)
        formData.append("Imagem", {
            uri: uriCameraCapture,
            name: `Imagem.${uriCameraCapture.split(".").pop()}`,
            type: `Imagem/${uriCameraCapture.split(".").pop()}`
        })
        await api.post('/Exame/Cadastrar', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        }).then((response) => setDescricao(response.data.descricao)).catch((error) => console.log(error))
    }

    useEffect(() => {
        InserirExame()
    }, [uriCameraCapture])


    return (
        <ScrollView>
            <Container paddingTop="0">
                <PerfilImage source={{ uri: route.params.data.medicoClinica.medico.idNavigation.foto, }} />
                <Title>Dr. {route.params.data.medicoClinica.medico.idNavigation.nome}</Title>
                <View style={{ flexDirection: "row", gap: 20 }}>
                    <Text fieldWidth="auto">{route.params.data.medicoClinica.medico.especialidade.especialidade1}</Text>
                    <Text fieldWidth="auto">CRM - {route.params.data.medicoClinica.medico.crm}</Text>
                </View>
                <MiddleTitle textAlign="left">Descrição da consulta</MiddleTitle>
                <InfoInput editable={false} multiline numberOfLines={5} style={{ textAlignVertical: 'top' }} value={route.params.data.descricao} />
                <MiddleTitle textAlign="left">Diagnóstico do paciente</MiddleTitle>
                <InfoInput editable={false} style={{ textAlignVertical: 'top' }} value={route.params.data.diagnostico} />
                <MiddleTitle textAlign="left">Prescrição médica</MiddleTitle>
                <InfoInput editable={false} multiline numberOfLines={5} style={{ textAlignVertical: 'top' }} value={route.params.data.receita.medicamento} />
                <MiddleTitle textAlign="left">Exames médicos</MiddleTitle>
                <View style={{ width: "90%" }}>
                    <Image
                        style={uriCameraCapture != null ? { width: "100%", height: 500, borderRadius: 10 } : { width: "100%", height: 0, borderRadius: 10 } }
                        source={{ uri: uriCameraCapture }} />
                </View>
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
                        <TouchableOpacity onPress={() => setUriCameraCapture(null)}>
                            <Text fieldWidth="auto" colorText="#C81D25">Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </SpacedContainer>

                <View style={{ width: "90%", height: 2, backgroundColor: "#8C8A97" }}></View>
                <InfoInput editable={false} multiline numberOfLines={5} style={{ textAlign: "center" }} placeholder="Resultado do exame de sangue : tudo normal" value={descricao} />
                <TouchableOpacity onPress={() => navigation.navigate("Main")}>
                    <DbLink>Voltar</DbLink>
                </TouchableOpacity>
            </Container>
            <CameraModal
                visible={showCameraModal}
                setUriCameraCapture={setUriCameraCapture}
                setShowCameraModal={setShowCameraModal}
            />
        </ScrollView >
    )
}