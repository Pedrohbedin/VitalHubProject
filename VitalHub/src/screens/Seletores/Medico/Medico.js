import { FlatList, TouchableOpacity } from "react-native"
import { ButtonTitle, Title } from "../../../components/Title/style"
import { Button } from "../../../components/Button/style"
import { DbLink } from "../../../components/Link/style"
import { Container } from "../../../components/Container/Style"
import { CardMedico } from "../../../components/Card/Card"
import { useState } from "react"
import { useEffect } from "react"
import api from "../../../services/services"

export function Medico({ navigation, route }) {

    const [medico, setmedico] = useState("");
    const [medicoLista, setMedicoLista] = useState(null);

    useEffect(() => {
        Get()
        console.log(medico)
    }, [medico])

 
     function handleContinue(){
        navigation.replace("Data", {
            agendamento : {
                ...route.params.agendamento,
                ...medico
            }
        })
     }

    async function Get() {
        await api.get(`/Medicos/BuscarPorIdClinica?id=${route.params.agendamento.id}`).then((response) =>
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
                renderItem={({ item }) => <CardMedico data={item} onPress={() => setmedico(item)} borderColor={medico != null && item.id === medico.id ? '#496BBA' : '#FFFFFF'} />}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false} />
            <Button onPress={handleContinue}>
                <ButtonTitle colorText="white">Continuar</ButtonTitle>
            </Button>
            <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                <DbLink>Cancelar</DbLink>
            </TouchableOpacity>
        </Container>
    )
}