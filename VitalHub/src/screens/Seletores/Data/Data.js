import { Button } from "../../../components/Button/style";
import { Container } from "../../../components/Container/Style";
import { DbLink } from "../../../components/Link/style";
import { ButtonTitle, Title } from "../../../components/Title/style";
import CalendarComponent from "../../../components/Calender";
import InputSelect from "../../../components/SelectInput/SelectInput";
import { View, Animated } from "react-native";
import { useEffect, useState } from "react";
import { AgendarModal } from "../../../components/Modal";
import { TouchableOpacity } from "react-native";

export function DataPage({ navigation, route }) {
    const [modal, setModal] = useState(false);
    const [agendamento, setAgendamento] = useState(null);
    const [dataSelecionado, setDataSelecionado] = useState(null);
    const [horaSelecionada, setHoraSelecionada] = useState(null);
    const [buttonScale] = useState(new Animated.Value(1));

    function handleContinue() {
        setAgendamento({
            ...route.params.agendamento,
            dataConsulta: `${dataSelecionado} ${horaSelecionada}`
        });
        setModal(true);
    }

    const pulseButton = () => {
        Animated.sequence([
            Animated.timing(buttonScale, { toValue: 0.9, duration: 200, useNativeDriver: true }),
            Animated.timing(buttonScale, { toValue: 1, duration: 200, useNativeDriver: true })
        ]).start();
    };

    return (
        <>
            <AgendarModal
                show={modal}
                agendamento={agendamento}
                onCancel={() => {
                    setModal(false);
                }}
                onConfirm={() => {
                    setModal(false);
                    navigation.navigate("Main");
                }}
            />

            <Container>
                <Title>Selecionar data</Title>
                <View style={{ height: 350 }}>
                    <CalendarComponent
                        setDataSelecionada={setDataSelecionado}
                    />
                </View>
                <InputSelect
                    setHoraSelecionada={setHoraSelecionada}
                />
                <Button>
                    <ButtonTitle colorText="#FFFFFF">Confirmar</ButtonTitle>
                </Button>0 
                <TouchableOpacity onPress={() => navigation.navigate('Medico')}>
                    <DbLink>Cancelar</DbLink>
                </TouchableOpacity>
            </Container>
        </>
    );
}
