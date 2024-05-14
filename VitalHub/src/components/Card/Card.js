import { TouchableWithoutFeedback, View } from "react-native"
import { CardContainer, SpacedContainer } from "../Container/Style"
import { CardImage } from "../Image/style"
import { Title } from "../Title/style"
import { Text } from "../Text/style"
import { Icon } from "react-native-elements"
import { TouchableOpacity } from "react-native"
import { useEffect, useState } from "react"

export const Card = ({
    data,
    onAction,
    role,
    onClick,
}) => {

    const [idade, setIdade] = useState()

    useEffect(() => {
        if (data.paciente != null) {
            const dataPasciente = new Date(data.paciente.dataNascimento)
            const teste = new Date()
            setIdade(Math.floor((teste.getTime() - dataPasciente.getTime()) / (1000 * 60 * 60 * 24 * 365.25)))
        }
    }, [data])

    return (
        <TouchableWithoutFeedback style={{ elevation: 20 }} onPress={() => onClick()}>
            <CardContainer
                style={{
                    elevation: 7,
                    marginVertical: 20,
                    marginHorizontal: 20, flexDirection: 'row', alignItems: 'center'
                }}>
                <SpacedContainer>
                    <View style={{ gap: 10, flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                        <CardImage source={role == "Medico" ? { uri: `${data.paciente.idNavigation.foto}` } : { uri: `${data.medicoClinica.medico.idNavigation.foto}` }} />
                        <View style={{ gap: 7, alignItems: "left", padding: 0, flexDirection: "column" }}>
                            <Text fontFamily="MontserratAlternates_700Bold" fontSize="16px" fieldWidth="100%" textAlign="left" margin="0">{role == "Medico" ? data.paciente.idNavigation.nome : data.medicoClinica.medico.idNavigation.nome}</Text>
                            <View style={{ flexDirection: 'row', gap: 15 }}>
                                <Text fontFamily="Quicksand_400Regular" margin="0px" fieldWidth="auto" colorText="#8C8A97">{role == "Paciente" ? data.medicoClinica.medico.crm : `${idade} anos`}</Text>
                                <View style={{ backgroundColor: "#D9D9D9", width: 3, height: 3, borderRadius: 6, position: "absolut", top: 10 }} />
                                <Text colorText="#4E4B59" margin="0px" fieldWidth="auto">{data.prioridade.prioridade == 1 ? "Rotina" : data.prioridade.prioridade == 2 ? "Consulta" : "Urgência"}</Text>
                            </View>
                            <Text style={{ textAlign: "center" }} margin="0" colorText={data.situacao.situacao == "Agendada" ? '#49B3BA' : '#4E4B59'} fieldWidth="100px" textAlign="center" backgroundColor={data.situacao.situacao == "Agendada" ? '#E8FCFD' : '#F1F0F5'} borderRadius="5px">
                                <Icon
                                    size={14}
                                    name='clockcircle'
                                    type='antdesign'
                                    color={data.situacao.situacao == "Agendada" ? '#49B3BA' : '#4E4B59'}
                                /> {new Date(data.dataConsulta).getHours()}:00</Text>
                        </View>
                    </View>
                    <View style={{ justifyContent: "flex-end", height: 80 }}>
                        <TouchableOpacity onPress={onAction}>
                            <Text fieldWidth="auto" margin="0" fontFamily="MontserratAlternates_500Medium" colorText={data.situacao.situacao == "Agendada" ? "#C81D25" : "#344F8F"} fontSize="12px">
                                {
                                    data.situacao.situacao == "Agendada" ? "Cancelar" :
                                        data.situacao.situacao == "Realizada" ? "Ver prontuário" : ""
                                }
                            </Text>
                        </TouchableOpacity>
                    </View>
                </SpacedContainer>
            </CardContainer>
        </TouchableWithoutFeedback>
    )
}

export function CardClinica({ data, borderColor, onPress }) {

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <CardContainer borderColor={borderColor} style={{
                marginVertical: 20,
                marginHorizontal: 20
            }} flexDirection="row">
                <View style={{ flex: 1, justifyContent: "flex-start" }}>
                    <Title textAlign="left">{data.nomeFantasia}</Title>
                    <Text textAlign="left">{data.endereco.cidade}</Text>
                </View>
                <View>
                    <Text fieldWidth="auto" textAlign="right" fontFamily="Quicksand_600SemiBold" colorText="#F9A620">
                        <Icon size={14} name='star' type='antdesign'
                            color={"#F9A620"}
                        /> 3,6</Text>
                    <Text borderRadius="5px" padding="5px" fieldWidth="auto" backgroundColor="#E8FCFD" colorText="#49B3BA" fontFamily="Quicksand_600SemiBold">
                        <Icon size={14} name='calendar' type='antdesign'
                            color={"#49B3BA"}
                        /> Seg - Sex</Text>
                </View>
            </CardContainer >
        </TouchableWithoutFeedback>
    )
}

export function CardMedico({ data, borderColor, onPress }) {

    return (
        <TouchableOpacity onPress={onPress}>
            <CardContainer borderColor={borderColor} flexDirection="row" style={{
                marginVertical: 20,
                marginHorizontal: 20
            }}>
                <View style={{ flex: 1 }}>
                    <CardImage source={{ uri: `${data.idNavigation.foto}`, }} />
                </View>
                <View style={{ flex: 2 }}>
                    <Title textAlign="left" fieldWidth="auto">{data.idNavigation.nome}</Title>
                    <Text textAlign="left" colorText="#8C8A97" fieldWidth="auto" fontFamily="Quicksand_600SemiBold">{data.especialidade.especialidade1}</Text>
                </View>
            </CardContainer >
        </TouchableOpacity>
    )
}

