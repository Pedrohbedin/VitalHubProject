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
                let dataAtual = new Date();
                let dataConsulta = new Date(element.dataConsulta);
                if (parseInt(dataConsulta.getTime()) < parseInt(dataAtual.getTime())) {
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

    const handleCallNotifications = async () => {

        // Obtém o status da permisão
        const { status } = await Notifications.getPermissionsAsync();

        if (status != "granted") {
            alert("Você não deixou as notificações ativas")
            return;
        }
        // Agenda uma notificação
        await Notifications.scheduleNotificationAsync({
            content: {
                title: "Consulta Cancelada",
                body: "Seu/Sua " + user?.role == "Paciente" ? "Médico" : "Paciênte" + " cancelou a consulta",
                sound: '',
            },
            trigger: null
        })
    }

    return (
        user == null ?
            <ActivityIndicator animating={true} />
            :
            <>
                <ProntuarioModal data={selected} show={modalProntuario} onAction={() => setModalProntuario(false)} />
                <ConsultaModal show={modalConsulta} onAction={() => setModalConsulta(false)} />
                <CancelModal show={modalCancelar} onAction={() => {
                    setModalCancelar(false)
                    api.put(`/Consultas/Status?idConsulta=${selected.id}&status=Cancelada`)
                    Get()
                    handleCallNotifications()
                }} />
                <DescModal data={selected} show={modalDesc} onAction={() => setModalDesc(false)} />
                <Header>
                    <SpacedContainer style={{ height: "100%" }} >
                        <View style={{ flexDirection: "row", gap: 10 }}>
                            <HeaderImage source={{ uri: user.foto, }} />
                            <View style={{ width: "70%" }}>
                                <Text fieldwidth="100%" margin="0" textAlign="left">Bem vindo</Text>
                                <MiddleTitle textAlign="left" margin="0" colorText="#FFFFFF" fieldwidth="100%">{user?.role == "Paciente" ? "Pa. " : "Dr. "} {user.name}</MiddleTitle>
                            </View>
                        </View>
                        <Icon
                            size={25}
                            name='bell'
                            type='material-community'
                            color='white'
                        />
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
                                            user?.role == "Medico" ? item.descricao != null && item.diagnostico != null && item.medicamento != null ? navigation.navigate("Prontuario", { data: item }) : setModalProntuario(true) : navigation.navigate("Prescricao", { data: item })
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