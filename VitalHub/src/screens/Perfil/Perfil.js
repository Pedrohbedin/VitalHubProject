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


    async function profileLoad() {
        setUser(await userDecodeToken());
    }

    useEffect(() => {
        profileLoad()
    }, [])

    useEffect(() => {
        fetchData()
    }, [user])

    async function fetchData() {
        try {
            const response = await api.get(`/${user?.role}s/BuscarPorId?id=${user?.id}`);
            setUserData(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        user === null || userData === null ?
            <ActivityIndicator />
            :
            <ScrollView>
                <Container>
                    <PerfilImage source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqtLjcoLe9I_D5EcQ_2QHPDrx7PxSK4bC5chSDZKvU4g&s', }} />

                    <PerfilForm>
                        <Title>{user.name}</Title>
                        <Text>{user.email}</Text>
                    </PerfilForm>

                    <MiddleTitle textAlign="left">Data de nascimento</MiddleTitle>

                    <InfoInput
                        value={moment(userData.dataNascimento).format("DD/MM/YYYY")}
                        editable={false}
                        style={[
                            editable && { borderColor: '#49B3BA', borderWidth: 1 },
                            editable && { color: '#49B3BA' }
                        ]}
                    />

                    <MiddleTitle textAlign="left">CPF</MiddleTitle>

                    <InfoInput
                        value={userData.cpf}
                        editable={false}
                        keyboardType="numeric"
                        style={[
                            editable && { borderColor: '#49B3BA', borderWidth: 1 },
                            editable && { color: '#49B3BA' }
                        ]}
                    />

                    <MiddleTitle textAlign="left">Endereço</MiddleTitle>

                    <InfoInput
                        value={userData.endereco.logradouro}
                        editable={false}
                        style={[
                            editable && { borderColor: '#49B3BA', borderWidth: 1 },
                            editable && { color: '#49B3BA' }
                        ]}
                    />

                    <SpacedContainer>
                        <Container>

                            <MiddleTitle textAlign="left">Cep</MiddleTitle>
                            <LittleInfoInput
                                value={userData.endereco.cep}
                                editable={false}
                                keyboardType="numeric"
                                style={[
                                    editable && { borderColor: '#49B3BA', borderWidth: 1 },
                                    editable && { color: '#49B3BA' }
                                ]}
                            />

                        </Container>
                        <Container>

                            <MiddleTitle textAlign="left">Cidade</MiddleTitle>
                            <LittleInfoInput
                                value={userData.endereco.cidade}
                                editable={false}
                                style={[
                                    editable && { borderColor: '#49B3BA', borderWidth: 1 },
                                    editable && { color: '#49B3BA' }
                                ]}
                            />

                        </Container>
                    </SpacedContainer>

                    <Button onPress={() => setEditable(false)}>
                        <ButtonTitle colorText="#FFFFFF">Salvar</ButtonTitle>
                    </Button>

                    <Button onPress={() => setEditable(!editable)}>
                        <ButtonTitle colorText="#FFFFFF">Editar</ButtonTitle>
                    </Button>

                </Container>
            </ScrollView>
    );
}