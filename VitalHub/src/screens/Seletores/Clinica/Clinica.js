import { FlatList } from "react-native";
import { CardClinica } from "../../../components/Card/Card";
import { Container } from "../../../components/Container/Style";
import { ButtonTitle, Title } from "../../../components/Title/style";
import { Button } from "../../../components/Button/style";
import { DbLink } from "../../../components/Link/style";
import { TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import api from "../../../services/services";

export function Clinica({ navigation, route }) {
    const [clinicaLista, setClinicaLista] = useState(null);
    const [clinica, setClinica] = useState(null);

    useEffect(() => {
        Get();
    }, []);

    function handleContinue() {
        navigation.replace("Medico", {
            agendamento: {
                ...route.params.agendamento,
                ...clinica
            }
        });
    }

    async function Get() {
        try {
            const response = await api.get(`/Clinica/BuscarPorCidade?cidade=${route.params.agendamento.localizacao}`);
            setClinicaLista(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container>
            <Title>Selecionar clínica</Title>
            <FlatList
                style={{ width: "100%" }}
                data={clinicaLista}
                renderItem={({ item }) => <CardClinica data={item} onPress={() => setClinica(item)} borderColor={clinica != null && item.id === clinica.id ? '#496BBA' : '#FFFFFF'} />}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
            <Button onPress={handleContinue} disabled={!clinica} backgroundColor={!clinica && '#ccc'} borderColor={!clinica && '#ccc'}>
                <ButtonTitle>Continuar</ButtonTitle>
            </Button>
            <TouchableOpacity onPress={() => navigation.navigate('Main', { Aparece: true })}>
                <DbLink>Cancelar</DbLink>
            </TouchableOpacity>
        </Container>
    );
}
