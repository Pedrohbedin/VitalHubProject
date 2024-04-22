import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { Container, SpacedContainer } from "../../components/Container/Style";
import { InfoInput, LittleInfoInput } from "../../components/Input/style";
import { PerfilForm } from "../../components/Form/style";
import { PerfilImage } from "../../components/Image/style";
import { ButtonTitle, MiddleTitle, Title } from "../../components/Title/style";
import { Button } from "../../components/Button/style";
import { Text } from "../../components/Text/style";
import api from "../../services/services";
import { userDecodeToken } from "../../../utils/Auth";
import { ActivityIndicator } from "react-native";
import moment from "moment";

export function Perfil({ navigation }) {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [editable, setEditable] = useState(false);

    const [dataNascimento, setDataNascimento] = useState(null)
    const [cpf, setCpf] = useState(null)
    const [logradouro, setLogradouro] = useState(null)
    const [cep, setCep] = useState(null)
    const [cidade, setCidade] = useState(null)

    async function profileLoad() {
        setUser(await userDecodeToken());
    }

    useEffect(() => {
        profileLoad()
    }, [])

    useEffect(() => {
        fetchData()
    }, [user])

    useEffect(() => {

    })

    async function fetchData() {
        try {
            const response = await api.get(`/${user?.role}s/BuscarPorId?id=${user?.id}`);
            setUserData(response.data);
            setDataNascimento(moment(response.data.dataNascimento).format("DD/MM/YYYY"))
            setCpf(response.data.cpf)
            setLogradouro(response.data.endereco.logradouro)
            setCep(response.data.endereco.cep)
            setCidade(response.data.endereco.cidade)
        } catch (error) {
            console.log(error);
        }
    };

    const Salvar = () => {
        setEditable(false)

        userData.dataNascimento = dataNascimento;
        userData.cpf = cpf;
        userData.endereco.logradouro = logradouro;
        userData.endereco.cep = cep;
        userData.endereco.cidade = cidade;

        const dateParts = dataNascimento.split("/");
        const dateObject = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
        const isoDateString = dateObject.toISOString().split("T")[0];

        api.put(`/Pacientes?idUsuario=${user.id}`, {
            cpf: userData.cpf,
            dataNascimento: isoDateString,
            cep: userData.endereco.cep,
            logradouro: userData.endereco.logradouro,
            cidade: userData.endereco.cidade
        }).then((response) => console.log(response.data)).catch((error) => console.log(error))
    }
    return (
        user === null || userData === null || dataNascimento === null ?
            < ActivityIndicator />
            :
            user.role === "Paciente" ?
                <ScrollView>
                    <Container>
                        <PerfilImage source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqtLjcoLe9I_D5EcQ_2QHPDrx7PxSK4bC5chSDZKvU4g&s', }} />

                        <PerfilForm>
                            <Title>{user.name}</Title>
                            <Text>{user.email}</Text>
                        </PerfilForm>

                        <MiddleTitle textAlign="left">Data de nascimento</MiddleTitle>

                        <InfoInput
                            value={dataNascimento}
                            editable={editable}
                            style={[
                                editable && { borderColor: '#49B3BA', borderWidth: 1 },
                                editable && { color: '#49B3BA' }
                            ]}
                            onChangeText={(txt) => setDataNascimento(txt)}
                        />

                        <MiddleTitle textAlign="left">CPF</MiddleTitle>

                        <InfoInput
                            value={cpf}
                            editable={editable}
                            keyboardType="numeric"
                            style={[
                                editable && { borderColor: '#49B3BA', borderWidth: 1 },
                                editable && { color: '#49B3BA' }
                            ]}
                            onChangeText={(txt) => setCpf(txt)}

                        />

                        <MiddleTitle textAlign="left">Endereço</MiddleTitle>

                        <InfoInput
                            value={logradouro}
                            editable={editable}
                            style={[
                                editable && { borderColor: '#49B3BA', borderWidth: 1 },
                                editable && { color: '#49B3BA' }
                            ]}
                            onChangeText={(txt) => setLogradouro(txt)}

                        />

                        <SpacedContainer>
                            <Container>

                                <MiddleTitle textAlign="left">Cep</MiddleTitle>
                                <LittleInfoInput
                                    value={cep}
                                    editable={editable}
                                    keyboardType="numeric"
                                    style={[
                                        editable && { borderColor: '#49B3BA', borderWidth: 1 },
                                        editable && { color: '#49B3BA' }
                                    ]}
                                    onChangeText={(txt) => setCep(txt)}
                                />

                            </Container>
                            <Container>

                                <MiddleTitle textAlign="left">Cidade</MiddleTitle>
                                <LittleInfoInput
                                    value={cidade}
                                    editable={editable}
                                    style={[
                                        editable && { borderColor: '#49B3BA', borderWidth: 1 },
                                        editable && { color: '#49B3BA' }
                                    ]}
                                    onChangeText={(txt) => setCidade(txt)}
                                />

                            </Container>
                        </SpacedContainer>

                        <Button onPress={Salvar}>
                            <ButtonTitle colorText="#FFFFFF">Salvar</ButtonTitle>
                        </Button>

                        <Button onPress={() => setEditable(true)}>
                            <ButtonTitle colorText="#FFFFFF">Editar</ButtonTitle>
                        </Button>

                    </Container>
                </ScrollView>
                :
                <ScrollView>
                    <Container>
                        <PerfilImage source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqtLjcoLe9I_D5EcQ_2QHPDrx7PxSK4bC5chSDZKvU4g&s', }} />

                        <PerfilForm>
                            <Title>{user.name}</Title>
                            <Text>{user.email}</Text>
                        </PerfilForm>

                        <MiddleTitle textAlign="left">Especialidade</MiddleTitle>

                        <InfoInput
                            value={userData.especialidade.especialidade1}
                            editable={editable}
                            style={[
                                editable && { borderColor: '#49B3BA', borderWidth: 1 },
                                editable && { color: '#49B3BA' }
                            ]}
                        />

                        <MiddleTitle textAlign="left">CRM</MiddleTitle>

                        <InfoInput
                            value={userData.crm}
                            editable={editable}
                            style={[
                                editable && { borderColor: '#49B3BA', borderWidth: 1 },
                                editable && { color: '#49B3BA' }
                            ]}
                        />

                        <Button onPress={() => setEditable(false)}>
                            <ButtonTitle colorText="#FFFFFF">Salvar</ButtonTitle>
                        </Button>

                        <Button onPress={() => setEditable(true)}>
                            <ButtonTitle colorText="#FFFFFF">Editar</ButtonTitle>
                        </Button>

                    </Container>
                </ScrollView>
    );
}