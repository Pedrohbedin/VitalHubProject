import { Container } from "../../components/Container/Style";
import { Title, ButtonTitle, BorderedButtonTitle } from "../../components/Title/style";
import { LogoVitalHub } from "../../components/Logo";
import { Input } from "../../components/Input/style";
import { GrayLink, LbLink } from "../../components/Link/style";
import { Button, BorderedButton } from "../../components/Button/style";
import { Icon } from "react-native-elements"
import { Text } from "../../components/Text/style";
import { useEffect, useState } from "react";
import AsyncStore from '@react-native-async-storage/async-storage';
import api from "../../services/services";
import PasswordInput from "../../components/Input";

export function Login({ navigation }) {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isSenhaValid, setIsSenhaValid] = useState(true);
    const [show, setShow] = useState(false)

    async function Logar() {
        await api.post('/Login', {
            email: email,
            senha: senha
        }).then(async (response) => {
            await AsyncStore.setItem("token", JSON.stringify(response.data))
            navigation.navigate("Main")
        }
        ).catch((error) => {
            if (error) {
                setIsEmailValid(false);
                setIsSenhaValid(false);
            }
            console.log(error)
        })
    }

    useEffect(() => {
        setIsEmailValid(true)
        setIsSenhaValid(true)
    }, [email, senha]);



    return (
        <Container>
            <LogoVitalHub />
            <Title>Entrar ou criar conta</Title>

            <Input
                inputMod="email"
                keyboardType="email-address"
                placeholder="Usuário ou E-mail"
                placeholderTextColor="#49B3BA"
                value={email}
                onChangeText={txt => setEmail(txt)}
                style={isEmailValid ? {} : { borderColor: 'red' }}
            />

            {/* <Input
                placeholder="Senha"
                placeholderTextColor="#49B3BA"
                value={senha}
                onChangeText={txt => setSenha(txt)}
                secureTextEntry={!show}
                style={isSenhaValid ? {} : { borderColor: 'red' }}
            /> */}
            <PasswordInput secureTextChange={setShow} secureTextEntry={show} value={senha} setValue={setSenha} valid={isSenhaValid}/>

            <GrayLink onPress={() => navigation.navigate('EsqueceuSenha')}>Esqueceu sua senha?</GrayLink>

            <Button onPress={Logar}>
                <ButtonTitle>Entrar</ButtonTitle>
            </Button>

            <BorderedButton>
                <Icon
                    color="#496BBA"
                    size={24}
                    name='google'
                    type="antdesign"
                />
                <BorderedButtonTitle>Entrar com Google</BorderedButtonTitle>
            </BorderedButton>

            <Text margin="20px 0px" fontSize="14px" fontFamily="MontserratAlternates_600SemiBold">
                Não tem conta?
                <LbLink onPress={() => navigation.navigate('Cadastrar')}>Crie uma conta agora!</LbLink>
            </Text>

        </Container >
    )
}
