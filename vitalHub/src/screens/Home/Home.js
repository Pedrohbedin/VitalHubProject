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

export function Home({ navigation, route }) {

    const { modal } = route.params;

    useEffect(() => {
        modal == true && setModalConsulta(true)
        console.log(modal)
    }, [modal])


    const [statusLista, setStatusLista] = useState("Agendada");
    const [modalCancelar, setModalCancelar] = useState(false);
    const [modalProntuario, setModalProntuario] = useState(false);
    const [modalConsulta, setModalConsulta] = useState(false);
    const [modalDesc, setModalDesc] = useState(false);
    const [user, setUser] = useState(null);
    const [consultasLista, setConsultasLista] = useState(null);

    async function profileLoad() {
        setUser(await userDecodeToken());
    }

    async function Get() {
        if (user?.role == "Medico") {
            await api.get(`/Consultas/ConsultasMedico?Id=${user?.id}`).then((response) =>
                setConsultasLista(response.data)
            ).catch(
                (error) => console.log(error)
            )
        }
        else {
            await api.get(`/Consultas?Id=${user?.id}`).then((response) =>
                setConsultasLista(response.data)
            ).catch(
                (error) => console.log(error)
            )
        }
    }

    useEffect(() => {
        profileLoad()
    }, [])

    useEffect(() => {
        Get()
    }, [user])

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
            consultasLista == null ?
                <ActivityIndicator animating={true} />
                :
                <>
                    <ProntuarioModal data={consultasLista} show3={modalProntuario} onAction={() => setModalProntuario(false)} />
                    <ConsultaModal show={modalConsulta} onAction={() => setModalConsulta(false)} />
                    <CancelModal show={modalCancelar} onAction={() => {
                        setModalCancelar(false)
                        handleCallNotifications()
                    }} />
                    <DescModal data={consultasLista} show={modalDesc} onAction={() => setModalDesc(false)} />
                    <Header>
                        <SpacedContainer style={{ height: "100%" }} >
                            <View style={{ flexDirection: "row", gap: 10 }}>
                                <HeaderImage source={{ uri: 'https://thumbs.dreamstime.com/b/retrato-exterior-do-doutor-masculino-35801901.jpg', }} />
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
                        <HomeCalendarComponent />
                        <SpacedContainer>
                            <BtnListAppointment textButton={"Agendadas"} clickButton={statusLista === "Agendada"} onPress={() => setStatusLista("Agendada")} />
                            <BtnListAppointment textButton={"Realizadas"} clickButton={statusLista === "Realizada"} onPress={() => setStatusLista("Realizada")} />
                            <BtnListAppointment textButton={"Canceladas"} clickButton={statusLista === "Cancelada"} onPress={() => setStatusLista("Cancelada")} />
                        </SpacedContainer>
                        <FlatList
                            data={consultasLista}
                            renderItem={({ item }) =>
                                (item.situacao.situacao == statusLista)
                                && <Card
                                    role={user?.role}
                                    data={item}
                                    onAction={
                                        () => {
                                            setData(item)
                                            statusLista == "Agendada" ?
                                                setModalCancelar(true)
                                                :
                                                user?.role == "Medico" ? setModalProntuario(true) : navigation.navigate("Prescricao")
                                        }}
                                    onClick={() => {
                                        statusLista == "Agendada" ? user?.role == "Paciente" ? setModalDesc(true) : "" : null
                                    }}
                                />}
                            keyExtractor={item => item.id}
                            showsVerticalScrollIndicator={false}
                        />
                        <Navegator tipoConta={user?.role} onAction={() => setModalConsulta(!modalConsulta)} visible={!modalConsulta} />
                    </Container>
                </>
    )
}