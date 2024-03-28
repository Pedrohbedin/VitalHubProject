import { ActivityIndicator, FlatList, TouchableOpacity } from "react-native"
import { ButtonTitle, Title } from "../../../components/Title/style"
import { Button } from "../../../components/Button/style"
import { DbLink } from "../../../components/Link/style"
import { Container } from "../../../components/Container/Style"
import { CardMedico } from "../../../components/Card/Card"
import { useEffect, useState } from "react"
import api from "../../../services/services"

export function Medico({ navigation }) {

    const [selectedId, setSelectedId] = useState("");
    const [medicoLista, setMedicoLista] = useState(null);

    useEffect(() => {
        Get()
    }, [])

    async function Get() {
        await api.get('/Medicos').then((response) =>
            setMedicoLista(response.data)
        ).catch(
            (error) => console.log(error)
        )
    }
    
    return (
        <Container>
            <Title>Selecionar médico</Title>
            <FlatList
                style={{ width: "90%" }}
                data={medicoLista}
                keyExtractor={item => item.id}
                renderItem={({ item }) => <CardMedico data={item} onPress={() => setSelectedId(item.id)} borderColor={item.id === selectedId ? '#496BBA' : '#FFFFFF'} />}
                showsVerticalScrollIndicator={false} />
            <Button onPress={() => navigation.navigate('Data')}>
                <ButtonTitle colorText="white">Continuar</ButtonTitle>
            </Button>
            <TouchableOpacity onPress={() => navigation.navigate('Clinica')}>
                <DbLink>Cancelar</DbLink>
            </TouchableOpacity>
        </Container>
    )
}