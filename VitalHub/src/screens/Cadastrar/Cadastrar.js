import { Button } from "../../components/Button/style"
import { Container } from "../../components/Container/Style"
import { Input } from "../../components/Input/style"
import { DbLink } from "../../components/Link/style"
import { LogoVitalHub } from "../../components/Logo"
import { Text } from "../../components/Text/style"
import { ButtonTitle, Title } from "../../components/Title/style"
import React, { useState } from "react"
import api from "../../services/services"

export function Cadastrar({ navigation }) {
    const [usuario, setUsuario] = useState();
    const [senha, setSenha] = useState();
    const [confirmarSenha, setConfirmarSenha] = useState();

    const Cadastrar = async () => {
        await api.post("/Pacientes", {
            email: "pedro@gmail.com",
            senha: "pedro123",
            tipoUsuarioId: "9812766d-8439-4cf2-b6ef-f4d2686e9cc8",
            foto: "string"
        }).then((response) => console.log(response)).catch((error) => console.log(error))
    }

    return (
        <Container>
            <LogoVitalHub />

            <Title>Criar conta</Title>

            <Text>Insira seu endereço de e-mail e senha para realizar seu cadastro.</Text>

            <Input placeholder="Usuário ou E-mail" placeholderTextColor="#49B3BA" value={usuario} onChangeText={txt => setUsuario(txt)} />
            <Input placeholder="Senha" placeholderTextColor="#49B3BA" value={senha} onChangeText={txt => setSenha(txt)} />
            <Input placeholder="Confirmar Senha" placeholderTextColor="#49B3BA" value={confirmarSenha} onChangeText={txt => setConfirmarSenha(txt)} />

            <Button onPress={Cadastrar}>
                <ButtonTitle>Cadastrar</ButtonTitle>
            </Button>

            <DbLink onPress={() => navigation.navigate("Login")}>Cancelar</DbLink>
        </Container>
    )
}