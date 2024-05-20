import { Container } from "../../components/Container/Style";
import { Title, ButtonTitle, BorderedButtonTitle } from "../../components/Title/style";
import { LogoVitalHub } from "../../components/Logo";
import { Input } from "../../components/Input/style";
import { GrayLink, LbLink } from "../../components/Link/style";
import { Button, BorderedButton } from "../../components/Button/style";
import { Icon } from "react-native-elements"
import { Text } from "../../components/Text/style";
import { useState } from "react";
import AsyncStore from '@react-native-async-storage/async-storage';
import api from "../../services/services";
import PasswordInput from "../../components/Input";
import DialogComponent from "../../components/Dialog";

export function Login({ navigation }) {

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [visible, setVisible] = useState(false);
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
                setVisible(true)
            }
            console.log("Deu error")
        })
    }

    return (
        <Container>
            <DialogComponent visible={visible} contentMessage="Usuário ou senha incorreto" setVisible={setVisible} />
            <LogoVitalHub />
            <Title>Entrar ou criar conta</Title>

            <Input
                inputMod="email"
                keyboardType="email-address"
                placeholder="Usuário ou E-mail"
                placeholderTextColor="#49B3BA"
                value={email}
                onChangeText={txt => setEmail(txt)}
            />

            <PasswordInput secureTextChange={setShow} secureTextEntry={show} value={senha} setValue={setSenha} />

            <GrayLink onPress={() => navigation.navigate('EsqueceuSenha')}>Esqueceu sua senha?</GrayLink>

            <Button onPress={Logar}>
                <ButtonTitle>Entrar</ButtonTitle>
            </Button>

            {/* <BorderedButton>
                <Icon
                    color="#496BBA"
                    size={24}
                    name='google'
                    type="antdesign"
                />
                <BorderedButtonTitle>Entrar com Google</BorderedButtonTitle>
            </BorderedButton> */}

            <Text margin="20px 0px" fontSize="14px" fontFamily="MontserratAlternates_600SemiBold">
                Não tem conta?
                <LbLink onPress={() => navigation.navigate('Cadastrar')}>Crie uma conta agora!</LbLink>
            </Text>

        </Container >
    )
}
