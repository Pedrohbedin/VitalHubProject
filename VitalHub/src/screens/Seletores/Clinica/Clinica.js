import { FlatList } from "react-native";
import { CardClinica } from "../../../components/Card/Card";
import { Container } from "../../../components/Container/Style";
import { ButtonTitle, Title } from "../../../components/Title/style";
import { Button } from "../../../components/Button/style";
import { DbLink } from "../../../components/Link/style";
import { TouchableOpacity } from "react-native";
import { useState } from "react";
import { useEffect } from "react";
import api from "../../../services/services";


export function Clinica({ navigation }) {

    const [clinicaLista, setClinicaLista] = useState(null);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        Get()
    }, [])


    async function Get() {
        await api.get('/Clinica/ListarTodas').then((response) =>
            setClinicaLista(response.data)
        ).catch(
            (error) => console.log(error)
        )
    }

    return (
        <Container>
            <Title>Selecionar clínica</Title>
            <FlatList
                style={{ width: "90%" }}
                data={clinicaLista}
                renderItem={({ item }) => <CardClinica data={item} onPress={() => setSelectedId(item.id)} borderColor={item.id === selectedId ? '#496BBA' : '#FFFFFF'} />}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false} />
            <Button onPress={() => navigation.navigate('Medico')}><ButtonTitle>Continuar</ButtonTitle></Button>
            <TouchableOpacity onPress={() => navigation.navigate('Main', { Aparece: true })}>
                <DbLink>Cancelar</DbLink>
            </TouchableOpacity>
        </Container >
    )
}