import { TouchableWithoutFeedback, View } from "react-native"
import { CardContainer, SpacedContainer } from "../Container/Style"
import { CardImage } from "../Image/style"
import { Title } from "../Title/style"
import { Text } from "../Text/style"
import { Icon } from "react-native-elements"
import { TouchableOpacity } from "react-native"

export const Card = ({
    data,
    onAction,
    role,
    onClick,
    urlFotoPaciente = "https://thumbs.dreamstime.com/b/retrato-exterior-do-doutor-masculino-35801901.jpg"
}) => {
    return (
        <TouchableWithoutFeedback onPress={() => onClick()}>
            <CardContainer
                style={{
                    marginVertical: 20,
                    marginHorizontal: 20, flexDirection: 'row', alignItems: 'center'
                }}>
                <SpacedContainer>
                    <View style={{ gap: 10, flexDirection: 'row', alignItems: 'center', flex: 1 }}>
                        <CardImage source={{ uri: `${urlFotoPaciente}`, }} />
                        <View style={{ gap: 7, alignItems: "left", padding: 0, flexDirection: "column" }}>
                            <Title fieldWidth="100%" textAlign="left" margin="0">{role == "Medico" ? data.paciente.idNavigation.nome : data.medicoClinica.medico.idNavigation.nome}</Title>
                            <View style={{ flexDirection: 'row', gap: 15 }}>
                                <Text margin="0px" fieldWidth="auto">17 anos</Text>

                                <Text margin="0px" fieldWidth="auto">{data.prioridade.prioridade == 1 ? "Rotina" : data.prioridade.prioridade == 2 ? "Consulta" : "Urgência"}</Text>
                            </View>
                            <Text margin="0" colorText={data.situacao.situacao == "Agendada" ? '#49B3BA' : '#4E4B59'} fieldWidth="100px" textAlign="center" backgroundColor={data.situacao.situacao == "Agendada" ? '#E8FCFD' : '#F1F0F5'} borderRadius="5px">
                                <Icon
                                    size={14}
                                    name='clockcircle'
                                    type='antdesign'
                                    color={data.situacao.situacao == "Agendada" ? '#49B3BA' : '#4E4B59'}
                                /> 15:00</Text>
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

export function CardMedico({ data, borderColor, onPress, urlFotoPaciente = "https://thumbs.dreamstime.com/b/retrato-exterior-do-doutor-masculino-35801901.jpg" }) {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <CardContainer borderColor={borderColor} style={{
                marginVertical: 20,
                marginHorizontal: 20
            }} flexDirection="row">
                <View style={{ flex: 1 }}>
                    <CardImage source={{ uri: `${urlFotoPaciente}`, }} />
                </View>
                <View style={{ flex: 2 }}>
                    <Title textAlign="left" fieldWidth="auto">{data.idNavigation.nome}</Title>
                    <Text textAlign="left" colorText="#8C8A97" fieldWidth="auto" fontFamily="Quicksand_600SemiBold">{data.especialidade.especialidade1}</Text>
                </View>
            </CardContainer >
        </TouchableWithoutFeedback>
    )
}

