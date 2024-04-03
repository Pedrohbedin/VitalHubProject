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

export function Home(navigation) {


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
        await api.get(`/${user?.role}s/BuscarPorData?data=2024-03-20&id=${user.id}`).then((response) =>
            setConsultasLista(response.data)
        ).catch(
            (error) => console.log(error)
        )
    }

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
            // consultasLista == null ?
            //     <ActivityIndicator animating={true} />
            //     :
            <>
                <ProntuarioModal data={consultasLista} show3={modalProntuario} onAction={() => setModalProntuario(false)} />
                <ConsultaModal show={modalConsulta} onAction={() => setModalConsulta(false)} />
                <CancelModal show={modalCancelar} onAction={() => {
                    setModalCancelar(false)
                    handleCallNotifications()
                }} />
                <DescModal data={selected} show={modalDesc} onAction={() => setModalDesc(false)} />
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
                    <HomeCalendarComponent setDataConsulta={setDataConsulta} />
                    <SpacedContainer>
                        <BtnListAppointment textButton={"Agendadas"} clickButton={statusLista === "Agendada"} onPress={() => setStatusLista("Agendada")} />
                        <BtnListAppointment textButton={"Realizadas"} clickButton={statusLista === "Realizada"} onPress={() => setStatusLista("Realizada")} />
                        <BtnListAppointment textButton={"Canceladas"} clickButton={statusLista === "Cancelada"} onPress={() => setStatusLista("Cancelada")} />
                    </SpacedContainer>
                    <FlatList
                        data={consultasLista}
                        renderItem={({ item }) =>
                            (item.situacao.situacao == statusLista)
                            &&
                            (< Card
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
                                    user?.role == "Paciente" ? Precionado(item) : ""
                                    // statusLista == "Agendada" ? user?.role == "Paciente" ? setModalDesc(true) : "" : null
                                }}
                            />)

                        }
                        keyExtractor={item => item.id}
                        showsVerticalScrollIndicator={false}
                    />
                    <Navegator tipoConta={user?.role} onAction={() => setModalConsulta(!modalConsulta)} visible={!modalConsulta} />
                </Container>
            </>
    )
}