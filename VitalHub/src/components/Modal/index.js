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
import React, { useEffect, Component, Fragment } from 'react';
import { useState } from "react"
import moment from "moment"
import { userDecodeToken } from "../../../utils/Auth"
import api from "../../services/services"
import { SelectList } from "react-native-dropdown-select-list"
import { Icon } from "react-native-elements"

export const CancelModal = ({ show = false, onAction, onCancel }) => {

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
                <TouchableOpacity onPress={onCancel}>
                    <DbLink>Cancelar</DbLink>
                </TouchableOpacity>
            </ModalContent>
        </ModalBackground>
        // </Modal>
    )
}




export const ProntuarioModal = ({ show, data, onAction }) => {
    const navigation = useNavigation();

    const [idade, setIdade] = useState()

    const Inserir = () => {
        navigation.navigate("Prontuario", { data: data })
    }


    useEffect(() => {
        if (data.paciente != null) {
            const dataPasciente = new Date(data.paciente.dataNascimento)
            const teste = new Date()
            setIdade(Math.floor((teste.getTime() - dataPasciente.getTime()) / (1000 * 60 * 60 * 24 * 365.25)))
        }
    }, [data])
    console.log(data)
    return (
        show &&
        <ModalBackground show={show} marginTop="70px">
            <ModalContent height="auto">
                <PerfilImage border="10px" padding="30%" source={{ uri: data.paciente.idNavigation.foto }} />
                <Title margin="20px 0 0 0">{data.paciente.idNavigation.nome}</Title>
                <View style={{ flexDirection: "row", gap: 20 }}>
                    <Text margin="20px 0px" fieldWidth="auto">{idade} anos</Text>
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
    const [statusLista, setStatusLista] = useState('');
    const [nivelPrioridade, setNivelPrioridade] = useState(null);
    const [agendamento, setAgendamento] = useState(null);
    const [isButtonPressed, setIsButtonPressed] = useState(false);
    const navigation = useNavigation();
    const [value, setValue] = useState(null);
    const [items, setItems] = useState();

    function SyncValues(clinicas) {
        clinicas.forEach(element => {
            setItems([
                { key: `${element.endereco.id}`, value: `${element.endereco.cidade}` }
            ])
        });
    }

    async function ClinicaLoad() {
        await api.get("/Clinica/ListarTodas").then((response) => SyncValues(response.data)).catch((error) => console.log(error))
    }


    const handleContinue = () => {
        if (isButtonPressed) {
            navigation.replace('Clinica', { agendamento: agendamento });
        }
    };

    useEffect(() => {
        setAgendamento({
            ...agendamento,
            prioridadeId: nivelPrioridade,
            prioridadeLabel: statusLista,
            localizacao: value
        });
    }, [nivelPrioridade, statusLista, value]);

    return (
        show && (
            <Modal onShow={ClinicaLoad} transparent animationType="fade" visible={true}>
                <ModalBackground show={show}>
                    <ModalContent
                        fieldWidth="100%"
                        height="auto"
                        position="absolute"
                        padding="50px 10px"
                        justify="center"
                    >
                        <Title margin="0px 0px 20px 0px">Agendar consulta</Title>
                        <Text>Qual o nível da consulta</Text>
                        <SpacedContainer padding="0px 0px 20px 0px">
                            <BtnListAppointment
                                backgroundColor="a"
                                borderColor={'#60BFC5'}
                                colorText="#60BFC5"
                                textButton={'Rotina'}
                                clickButton={statusLista === 'Rotina'}
                                onPress={() => {
                                    setNivelPrioridade('07929CCD-218F-4749-A171-ECF7E0E57682'),
                                        setStatusLista('Rotina'),
                                        setIsButtonPressed(true);
                                }}
                            />

                            <BtnListAppointment
                                backgroundColor="a"
                                borderColor={'#60BFC5'}
                                colorText="#60BFC5"
                                textButton={'Exame'}
                                clickButton={statusLista === 'Exame'}
                                onPress={() => {
                                    setNivelPrioridade('7F09D39C-F2AE-4F3E-BE10-72D76B20450E'),
                                        setStatusLista('Exame'),
                                        setIsButtonPressed(true);
                                }}
                            />

                            <BtnListAppointment
                                backgroundColor="a"
                                borderColor={'#60BFC5'}
                                colorText="#60BFC5"
                                textButton={'Urgência'}
                                clickButton={statusLista === 'Urgência'}
                                onPress={() => {
                                    setNivelPrioridade('9AD5E3B8-9032-4A3E-88BA-E2A3510CD081'),
                                        setStatusLista('Urgência'),
                                        setIsButtonPressed(true);
                                }}
                            />
                        </SpacedContainer>
                        <Text>Informe a localização desejada</Text>

                        <View style={{ width: "90%" }}>
                            <SelectList
                                onPress={() => ClinicaLoad()}
                                setSelected={(val) => setValue(val)}
                                data={items}
                                boxStyle={{ colorText: "blue" }}
                                save="value"
                                placeholder="Informe a localização"
                                fontFamily="MontserratAlternates_600SemiBold"
                                boxStyles={{ borderColor: "#60BFC5", borderWidth: 2 }}
                                inputStyles={{ color: "#34898F" }}
                                dropdownItemStyles={{ color: "#60BFC5" }}
                                arrowicon={<Icon
                                    size={22}
                                    name='caret-down'
                                    type='font-awesome'
                                    color='#34898F'
                                />}
                                closeicon={<Icon
                                    size={22}
                                    name='close'
                                    type='antDesign'
                                    color='#34898F'
                                />}
                                searchicon={
                                    <Icon
                                        size={22}
                                        name='search'
                                        type='antDesign'
                                        color='#34898F'
                                    />
                                }
                                dropdownStyles={{ borderColor: "#60BFC5", borderWidth: 2 }}
                                dropdownTextStyles={{ color: "#60BFC5" }}
                            />
                        </View>

                        <Button onPress={handleContinue} backgroundColor={!isButtonPressed && "#ccc"} disabled={!isButtonPressed} borderColor={!isButtonPressed && "#ccc"}>
                            <ButtonTitle colorText="#FFFFFF">Continuar</ButtonTitle>
                        </Button>
                        <TouchableOpacity onPress={onAction}>
                            <DbLink>Cancelar</DbLink>
                        </TouchableOpacity>
                    </ModalContent>
                </ModalBackground>
            </Modal>
        )
    );
};

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
                <PerfilImage border="10px" padding="30%" source={{ uri: data.medicoClinica.medico.idNavigation.foto }} />
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