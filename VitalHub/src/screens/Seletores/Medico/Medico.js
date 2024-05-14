import { FlatList, TouchableOpacity, View } from "react-native";
import { ButtonTitle, Title } from "../../../components/Title/style";
import { Button } from "../../../components/Button/style";
import { DbLink } from "../../../components/Link/style";
import { Container } from "../../../components/Container/Style";
import { CardMedico } from "../../../components/Card/Card";
import { useState, useEffect } from "react";
import api from "../../../services/services";

export function Medico({ navigation, route }) {
    const [medico, setMedico] = useState(null);
    const [medicoLista, setMedicoLista] = useState(null);

    useEffect(() => {
        Get();
    }, [medico]);

    function handleContinue() {
        if (medico) {
            navigation.replace("Data", {
                agendamento: {
                    ...route.params.agendamento,
                    ...medico
                }
            });
        }
    }

    async function Get() {
        try {
            const response = await api.get(`/Medicos/BuscarPorIdClinica?id=${route.params.agendamento.id}`);
            setMedicoLista(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Container>
            <Title>Selecionar médico</Title>
            <FlatList
                style={{ width: "100%" }}
                data={medicoLista}
                renderItem={({ item }) => <CardMedico data={item} onPress={() => setMedico(item)} borderColor={medico != null && item.id === medico.id ? '#496BBA' : '#FFFFFF'} />}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
            />
            <Button onPress={handleContinue} disabled={!medico} backgroundColor={!medico && '#ccc'} borderColor={!medico && '#ccc'}>
                <ButtonTitle colorText="white">Continuar</ButtonTitle>
            </Button>
            <TouchableOpacity onPress={() => navigation.navigate("Main")}>
                <DbLink>Cancelar</DbLink>
            </TouchableOpacity>
        </Container>
    );
}
