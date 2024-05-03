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
    const [email, setEmail] = useState();
    const [nome, setNome] = useState();
    const [senha, setSenha] = useState();
    const [confirmarSenha, setConfirmarSenha] = useState();

    const Cadastrar = async () => {
        if (senha == confirmarSenha) {
            await api.post("/Pacientes", {
                nome: nome,
                email: email,
                senha: senha,
                idTipoUsuario: "9812766D-8439-4CF2-B6EF-F4D2686E9CC8",
            }).then(navigation.navigate("Login")).catch((error) => console.log(error))
        }
    }


    return (
        <Container>
            <LogoVitalHub />

            <Title>Criar conta</Title>

            <Text>Insira seu endereço de e-mail e senha para realizar seu cadastro.</Text>

            <Input placeholder="Nome" placeholderTextColor="#49B3BA" value={nome} onChangeText={txt => setNome(txt)} />
            <Input placeholder="Usuário ou E-mail" placeholderTextColor="#49B3BA" value={email} onChangeText={txt => setEmail(txt)} />
            <Input placeholder="Senha" placeholderTextColor="#49B3BA" value={senha} onChangeText={txt => setSenha(txt)} />
            <Input placeholder="Confirmar Senha" placeholderTextColor="#49B3BA" value={confirmarSenha} onChangeText={txt => setConfirmarSenha(txt)} />

            <Button onPress={Cadastrar}>
                <ButtonTitle>Cadastrar</ButtonTitle>
            </Button>

            <DbLink onPress={() => navigation.navigate("Login")}>Cancelar</DbLink>
        </Container>
    )
}