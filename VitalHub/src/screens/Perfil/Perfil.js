import { ButtonTitle, MiddleTitle, Title } from "../../components/Title/style";
import { Container, SpacedContainer } from "../../components/Container/Style";
import { InfoInput, LittleInfoInput } from "../../components/Input/style";
import { Button, ButtonCamera } from "../../components/Button/style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { PerfilImage } from "../../components/Image/style";
import { PerfilForm } from "../../components/Form/style";
import { userDecodeToken } from "../../../utils/Auth";
import { Text } from "../../components/Text/style";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { CameraModal } from "../Camera/Camera";
import { ScrollView } from "react-native";
import api from "../../services/services";
import moment from "moment";
import { DbLink } from "../../components/Link/style";
import DialogComponent from "../../components/Dialog";



export function Perfil({ navigation }) {
    const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
    const [editable, setEditable] = useState(false);

    const [dataNascimento, setDataNascimento] = useState(null)
    const [cpf, setCpf] = useState(null)
    const [logradouro, setLogradouro] = useState(null)
    const [cep, setCep] = useState(null)
    const [cidade, setCidade] = useState(null)
    const [rg, setRg] = useState(null)
    const [dialogText, setDialogText] = useState("")
    const [visible, setVisible] = useState(false)


    const [showCamera, setShowCamera] = useState(false);


    useEffect(() => {
        profileLoad()
    }, [])

    useEffect(() => {
        fetchData()
    }, [user])

    async function profileLoad() {
        setUser(await userDecodeToken());
        fetchData(await userDecodeToken())
    }

    async function fetchData() {
        try {
            const response = await api.get(`/${user?.role}s/BuscarPorId?id=${user?.id}`);
            setUserData(response.data);
            setDataNascimento(moment(response.data.dataNascimento).format("DD/MM/YYYY"))
            setCpf(response.data.cpf)
            setLogradouro(response.data.endereco.logradouro)
            setCep(response.data.endereco.cep)
            setCidade(response.data.endereco.cidade)
            setRg(response.data.rg)
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

        api.put(`/Pacientes?idUsuario=${user?.id}`, {
            cpf: userData.cpf,
            dataNascimento: isoDateString,
            cep: userData.endereco.cep,
            rg: userData.rg,
            logradouro: userData.endereco.logradouro,
            cidade: userData.endereco.cidade
        }).then((response) => { console.log("Perfil atualizado!!!"), navigation.navigate("Main") }).catch((error) => console.log(error))

    }

    //Fução para alterar a imagem do usuario

    async function AlterarFotoPerfil(uri) {
        const formData = new FormData();

        formData.append("Arquivo", {
            uri: uri,
            name: `image.${uri.split(".")[1]}`,
            type: `image/${uri.split(".")[1]}`
        });

        await api.put(`/Usuario/AlterarFotoPerfil?idUsuario=${user?.id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(setUser({
            ...user,
            foto: uri
        })).catch((error) => console.log(error))
    }

    return (
        user === null || userData === null || dataNascimento === null ?
            < ActivityIndicator />
            :
            user.role === "Paciente" ?
                <ScrollView>
                    <DialogComponent visible={visible} contentMessage={dialogText} setVisible={setVisible} />

                    <CameraModal getMediaLibrary={true} visible={showCamera} setShowCameraModal={() => setShowCamera(false)} setUriCameraCapture={AlterarFotoPerfil} />
                    <Container paddingTop="0">
                        <View style={{ width: "100%" }}>
                            <PerfilImage source={{ uri: user.foto, }} />
                            <ButtonCamera onPress={() => setShowCamera(true)}>
                                <MaterialCommunityIcons
                                    name="camera-plus"
                                    size={20}
                                    color={"#fbfbfb"} />
                            </ButtonCamera>
                        </View>

                        <View style={{ marginTop: 30, marginBottom: 30 }}>
                            <Text fontFamily="MontserratAlternates_600SemiBold" fontSize="20px" colorText="#33303E">{user.name}</Text>
                            <Text>{user.email}</Text>
                        </View>

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

                        <MiddleTitle textAlign="left">RG</MiddleTitle>

                        <InfoInput
                            value={rg}
                            editable={editable}
                            keyboardType="numeric"
                            style={[
                                editable && { borderColor: '#49B3BA', borderWidth: 1 },
                                editable && { color: '#49B3BA' }
                            ]}
                            onChangeText={(txt) => setRg(txt)}

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

                        <Button onPress={() => { cpf != null && cpf.length == 11 || cep != null && cep.length == 8 || rg != null && rg.length == 9 ? Salvar() : setVisible(true), setDialogText("Informações incorretas") }}>
                            <ButtonTitle colorText="#FFFFFF">Salvar</ButtonTitle>
                        </Button>

                        <Button onPress={() => setEditable(true)}>
                            <ButtonTitle colorText="#FFFFFF">Editar</ButtonTitle>
                        </Button>

                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <DbLink>Sair</DbLink>
                        </TouchableOpacity>
                    </Container>
                </ScrollView>
                :
                <>
                    <CameraModal getMediaLibrary={true} visible={showCamera} setShowCameraModal={() => setShowCamera(false)} setUriCameraCapture={AlterarFotoPerfil} />
                    <Container paddingTop="0">
                        <View style={{ width: "100%" }}>
                            <PerfilImage source={{ uri: user.foto, }} />
                            <ButtonCamera onPress={() => setShowCamera(true)}>
                                <MaterialCommunityIcons
                                    name="camera-plus"
                                    size={20}
                                    color={"#fbfbfb"} />
                            </ButtonCamera>
                        </View>

                        <View style={{ marginTop: 30, marginBottom: 30, justifyContent: "center", alignItems: "center" }}>
                            <Text fontFamily="MontserratAlternates_600SemiBold" fontSize="20px" colorText="#33303E">{user.name}</Text>
                            <Text>{user.email}</Text>
                        </View>

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
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>

                            <DbLink>Sair</DbLink>
                        </TouchableOpacity>
                    </Container>
                </>
    );
}