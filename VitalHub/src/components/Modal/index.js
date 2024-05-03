import { Modal, TouchableOpacity, View } from "react-native"
import { PerfilImage } from "../Image/style"
import { ButtonTitle, Title } from "../Title/style"
import { ModalContent, ModalBackground } from "./style"
import { Text } from "../Text/style"
import { Button } from "../Button/style"
import { DbLink } from "../Link/style"
import { Input } from "../../components/Input/style"
import { SpacedContainer } from "../Container/Style"
import { BtnListAppointment } from "../BtnListAppointment/BtnListAppointment"
import { useNavigation } from "@react-navigation/native"
import React, { useEffect } from 'react';
import { useState } from "react"
import moment from "moment"
import { userDecodeToken } from "../../../utils/Auth"
import { ActivityIndicator } from "react-native"
import api from "../../services/services"

export const CancelModal = ({ show = false, onAction }) => {

    return (
        show &&
        // <Modal
        //     transparent
        //     animationType="fade"
        //     visible={true}
        // >
        <ModalBackground>
            <ModalContent height="auto">
                <Title>Cancelar consulta</Title>
                <Text fontSize="16px" textAlign="center">Ao cancelar essa consulta, abrirá uma possível disponibilidade no seu horário, deseja mesmo cancelar essa consulta?</Text>
                <Button onPress={onAction}>
                    <ButtonTitle colorText="#FFFFFF">CONFIRMAR</ButtonTitle>
                </Button>
                <TouchableOpacity onPress={onAction}>
                    <DbLink>Cancelar</DbLink>
                </TouchableOpacity>
            </ModalContent>
        </ModalBackground>
        // </Modal>
    )
}




export const ProntuarioModal = ({ show, data, onAction }) => {
    const navigation = useNavigation();
    const Inserir = () => {
        navigation.navigate("Prontuario", { data: data })
    }
    return (
        show &&
        <ModalBackground show={show} marginTop="70px">
            <ModalContent height="auto">
                <PerfilImage border="10px" padding="30%" source={{ uri: 'https://thumbs.dreamstime.com/b/retrato-exterior-do-doutor-masculino-35801901.jpg' }} />
                <Title margin="20px 0 0 0">{data.paciente.idNavigation.nome}</Title>
                <View style={{ flexDirection: "row", gap: 20 }}>
                    <Text margin="20px 0px" fieldWidth="auto">17 anos</Text>
                    <Text margin="20px 0px" fieldWidth="auto">{data.paciente.idNavigation.email}</Text>
                </View>
                <Button padding="0px 0px" onPress={Inserir}>
                    <ButtonTitle colorText="#FFFFFF">Inserir Prontuário</ButtonTitle>
                </Button>
                <TouchableOpacity onPress={onAction}>
                    <DbLink>Cancelar</DbLink>
                </TouchableOpacity>
            </ModalContent>
        </ModalBackground>
    )
}


export const ConsultaModal = ({ show, onAction }) => {

    const [statusLista, setStatusLista] = useState("")
    const navigation = useNavigation();
    const [nivelPrioridade, setNivelPrioridade] = useState(null);



    const [agendamento, setAgendamento] = useState(null);

    async function handleContinue() {

        navigation.replace("Clinica", { agendamento: agendamento }
        )
    }

    useEffect(() => {
        setAgendamento({
            ...agendamento,
            prioridadeId: nivelPrioridade,
            prioridadeLabel: statusLista
        })
    }, [nivelPrioridade, statusLista])

    return (
        show &&
        <Modal
            transparent
            animationType="fade"
            visible={true}
        >

            <ModalBackground show={show}>
                <ModalContent fieldWidth="100%" height="75%" position="absolute" padding="10px" justify="center">
                    <Title margin="0px 0px 20px 0px">Agendar consulta</Title>
                    <Text>Qual o nível da consulta</Text>
                    <SpacedContainer padding="0px 0px 20px 0px">
                        <BtnListAppointment backgroundColor="a" borderColor={"#34898F"} colorText="#34898F" textButton={"Rotina"} clickButton={statusLista === "Rotina"} onPress={() => { setNivelPrioridade("07929CCD-218F-4749-A171-ECF7E0E57682"), setStatusLista("Rotina") }} />

                        <BtnListAppointment backgroundColor="a" borderColor={"#34898F"} colorText="#34898F" textButton={"Exame"} clickButton={statusLista === "Exame"} onPress={() => { setNivelPrioridade("7F09D39C-F2AE-4F3E-BE10-72D76B20450E"), setStatusLista("Exame") }} />

                        <BtnListAppointment backgroundColor="a" borderColor={"#34898F"} colorText="#34898F" textButton={"Urgência"} clickButton={statusLista === "Urgência"} onPress={() => { ("9AD5E3B8-9032-4A3E-88BA-E2A3510CD081"), setStatusLista("Urgência") }} />

                    </SpacedContainer>
                    <Text>Informe a localização desejada</Text>
                    <Input placeholder="Informe a localização" placeholderTextColor="#34898F" margin="0px 0px 30px 0px"
                        value={agendamento ? agendamento.localizacao : null}
                        onChangeText={(txt) => setAgendamento({
                            ...agendamento,
                            localizacao: txt
                        })}

                    />

                    <Button onPress={handleContinue}>

                        <ButtonTitle colorText="#FFFFFF">Continuar</ButtonTitle>
                    </Button>
                    <TouchableOpacity onPress={onAction}>
                        <DbLink>Cancelar</DbLink>
                    </TouchableOpacity>
                </ModalContent>
            </ModalBackground>
        </Modal>
    )
}

export const AgendarModal = ({ show, onConfirm, onCancel, agendamento }) => {

    const [profile, setProfile] = useState(null);

    async function profileLoad() {

        setProfile(await userDecodeToken())

    }

    async function handleConfirm() {

        await api.post('/Consultas/Cadastrar', {
            ...agendamento,
            pacienteId: profile.id,
            situacaoId: 'C82E22AB-6156-4929-8644-E2D3224C4A8E',
            medicoClinicaId: agendamento.id,

        }).then(async () => {
            await setShowModalConfirmation(false);

            navigate.replace("Main");

        }).catch(error => {
            console.log(error)
        })
    }

    useEffect(() => {
        profileLoad();
    }, [])


    return (
        show &&
        <ModalBackground show={show} >
            {
                agendamento

                    ?
                    (
                        <ModalContent fieldWidth="95%" height="auto" justify="center">
                            <Title>Agendar consulta</Title>
                            <Text colorText="#33303E">Consulte os dados selecionados para a sua consulta</Text>

                            <Text fontFamily="MontserratAlternates_600SemiBold" textAlign="left" margin="0px 0px 10px 0px">Data da consulta</Text>

                            <Text textAlign="left">{moment(agendamento.dataConsulta).format("DD/MM/YYYY HH:mm")}</Text>

                            <Text fontFamily="MontserratAlternates_600SemiBold" textAlign="left" margin="0px 0px 10px 0px">Médico(a) da consulta</Text>

                            <Text textAlign="left" margin="0px 0px 5px 0px">{agendamento.idNavigation.nome}</Text>

                            <Text textAlign="left">{agendamento.especialidade.especialidade1}</Text>

                            <Text fontFamily="MontserratAlternates_600SemiBold" textAlign="left" margin="0px 0px 10px 0px">Local da consulta</Text>

                            <Text textAlign="left">{agendamento.localizacao}</Text>

                            <Text fontFamily="MontserratAlternates_600SemiBold" textAlign="left" margin="0px 0px 10px 0px">Tipo da consulta</Text>

                            <Text textAlign="left">{agendamento.prioridadeLabel}</Text>

                            <Button onPress={() => { handleConfirm(), onConfirm() }}>
                                <ButtonTitle colorText="#FFFFFF">CONFIRMAR</ButtonTitle>
                            </Button>
                            <TouchableOpacity onPress={onCancel}>
                                <DbLink>Cancelar</DbLink>
                            </TouchableOpacity>
                        </ModalContent>
                    ) : (
                        <ActiveIndicator />
                    )
            }

        </ModalBackground>
    )


}

export const DescModal = ({ data, show, onAction }) => {
    const navigation = useNavigation();
    const Local = () => {

        navigation.navigate('Local', { clinicaId: data.medicoClinica.clinicaId });
    }





    return (
        show &&
        <ModalBackground show={show} >
            <ModalContent fieldWidth="95%" height="auto" justify="center">
                <PerfilImage border="10px" padding="30%" source={{ uri: 'https://thumbs.dreamstime.com/b/retrato-exterior-do-doutor-masculino-35801901.jpg' }} />
                <Title>{data.medicoClinica.medico.idNavigation.nome}</Title>
                <SpacedContainer fieldWidth="70%">
                    <Text fieldWidth="auto">{data.medicoClinica.medico.especialidade.especialidade1}</Text>
                    <Text fieldWidth="auto">{data.medicoClinica.medico.crm}</Text>
                </SpacedContainer>
                <Button onPress={Local}>
                    <ButtonTitle colorText="#FFFFFF">
                        Ver local da consulta
                    </ButtonTitle>
                </Button>
                <TouchableOpacity onPress={onAction}>
                    <DbLink>Cancelar</DbLink>
                </TouchableOpacity>
            </ModalContent>
        </ModalBackground>
    )
}