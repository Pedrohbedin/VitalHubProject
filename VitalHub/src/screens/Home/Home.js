import { ActivityIndicator, FlatList, View } from "react-native";
import { Container, SpacedContainer } from "../../components/Container/Style";
import { Header } from "../../components/Container/Style";
import { HeaderImage } from "../../components/Image/style";
import { Text } from "../../components/Text/style";
import { MiddleTitle } from "../../components/Title/style";
import { Icon } from "react-native-elements";
import { BtnListAppointment } from "../../components/BtnListAppointment/BtnListAppointment";
import { useEffect, useState } from "react";
import { Card } from "../../components/Card/Card";
import { CancelModal, ConsultaModal, DescModal, ProntuarioModal } from "../../components/Modal";
import { Navegator } from "../../components/Navegator/Navegator";
import { HomeCalendarComponent } from "../../components/Calender";
import * as Notifications from "expo-notifications";
import { userDecodeToken } from "../../../utils/Auth";
import api from "../../services/services";
import DialogComponent from "../../components/Dialog";
import { ToastProvider } from 'react-native-toast-notifications'

//Solicita permições de notificação ao iniciar o app
Notifications.requestPermissionsAsync();

//Defini como as notificações devem ser tratadas quando recebidass
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        // Reproduzir som ao receber notificação?
        shouldPlaySound: true,
        //Número de notificações no ícone do app
        shouldSetBadge: false,
        // Mostrar alerta quando a notificação for recebidar? 
        shouldShowAlert: true
    })
})

export function Home({ navigation }) {


    const [statusLista, setStatusLista] = useState("Agendada");
    const [modalCancelar, setModalCancelar] = useState(false);
    const [modalProntuario, setModalProntuario] = useState(false);
    const [modalConsulta, setModalConsulta] = useState(false);
    const [modalDesc, setModalDesc] = useState(false);
    const [user, setUser] = useState(null);
    const [consultasLista, setConsultasLista] = useState(null);
    const [selected, setSelected] = useState([]);
    const [dataConsulta, setDataConsulta] = useState(null);
    const [dataAtual] = useState(new Date());
    const [visible, setVisible] = useState(false)
    const [dialogText, setDialogText] = useState("")

    async function profileLoad() {
        setUser(await userDecodeToken());
    }

    useEffect(() => {
        profileLoad()
    }, [])

    async function Get() {
        user?.role != null && user?.id != null && dataConsulta != null &&
            await api.get(`/${user?.role}s/BuscarPorData?data=${dataConsulta}&id=${user?.id}`).then((response) =>
                setConsultasLista(response.data),
            ).catch(() => console.log("Deu erro!!!")
            )
    }

    useEffect(() => {
        consultasLista != null &&
            consultasLista.forEach(element => {
                let dataConsulta = new Date(element.dataConsulta);
                if (parseInt(dataConsulta.getTime()) < parseInt(dataAtual.getTime()) || (element.descricao != null && element.diagnostico != null && element.receita.medicamento != null)) {
                    api.put(`/Consultas/Status?idConsulta=${element.id}&status=Realizada`)
                }
            });
    }, [consultasLista])

    function Precionado(item) {
        setModalDesc(true)
        setSelected(item)
    }

    useEffect(() => {
        Get()
    }, [user, dataConsulta])

    return (
        user == null ?
            <ActivityIndicator animating={true} />
            :
            <>
                <DialogComponent visible={visible} contentMessage={dialogText} setVisible={setVisible} />

                <ProntuarioModal data={selected} show={modalProntuario} onAction={() => setModalProntuario(false)} />
                <ConsultaModal show={modalConsulta} onAction={() => setModalConsulta(false)} />
                <CancelModal show={modalCancelar} onAction={async () => {
                    await api.put(`/Consultas/Status?idConsulta=${selected.id}&status=Cancelada`)
                    await Get()
                    setModalCancelar(false)
                }} onCancel={() => setModalCancelar(false)} />
                <DescModal data={selected} show={modalDesc} onAction={() => setModalDesc(false)} />
                <Header>
                    <SpacedContainer style={{ height: "100%" }} >
                        <View style={{ flexDirection: "row", gap: 10, justifyContent: "center", alignItems: "center" }}>
                            <HeaderImage source={{ uri: user.foto, }} />
                            <View style={{ width: "70%" }}>
                                <Text fieldwidth="100%" margin="0" textAlign="left">Bem vindo</Text>
                                <MiddleTitle textAlign="left" margin="0" colorText="#FFFFFF" fieldwidth="100%">{user?.role == "Paciente" ? "Pa. " : "Dr. "} {user.name}</MiddleTitle>
                            </View>
                        </View>
                        {/* <Icon
                            size={25}
                            name='bell'
                            type='material-community'
                            color='white'
                        /> */}
                    </SpacedContainer>
                </Header>
                <Container style={{ marginTop: -70 }}>
                    <HomeCalendarComponent setDataConsulta={setDataConsulta} />
                    <SpacedContainer padding="0px 20px">
                        <BtnListAppointment textButton={"Agendadas"} clickButton={statusLista === "Agendada"} onPress={() => setStatusLista("Agendada")} />
                        <BtnListAppointment textButton={"Realizadas"} clickButton={statusLista === "Realizada"} onPress={() => setStatusLista("Realizada")} />
                        <BtnListAppointment textButton={"Canceladas"} clickButton={statusLista === "Cancelada"} onPress={() => setStatusLista("Cancelada")} />
                    </SpacedContainer>
                    <FlatList
                        data={consultasLista}
                        renderItem={({ item }) =>
                            (item.situacao.situacao == statusLista)
                            &&
                            (
                                < Card
                                    role={user?.role}
                                    data={item}
                                    onAction={
                                        () => {
                                            setSelected(item)
                                            statusLista == "Agendada" ?
                                                setModalCancelar(true)
                                                :
                                                user?.role == "Medico" ? item.descricao != null && item.diagnostico != null && item.receita.medicamento != null ? navigation.navigate("Prontuario", { data: item }) : new Date(item.dataConsulta).getTime() < dataAtual.getTime() ? setVisible(true) + setDialogText("COnsulta não realizada") : setModalProntuario(true) : item.descricao != null && item.diagnostico != null && item.receita.medicamento != null ? navigation.navigate("Prescricao", { data: item }) : setVisible(true), setDialogText("Informações não adicionadas")
                                        }}
                                    onClick={() => {
                                        user?.role == "Paciente" && Precionado(item)
                                        statusLista == "Agendada" ? user?.role == "Paciente" ? setModalDesc(true) : "" : null
                                    }}
                                />)

                        }
                        keyExtractor={item => item?.id}
                        showsVerticalScrollIndicator={false}
                    />
                    <Navegator tipoConta={user?.role} onAction={() => setModalConsulta(!modalConsulta)} visible={!modalConsulta} />
                </Container>
            </>
    )
}