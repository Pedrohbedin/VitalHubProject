import { Icon } from "react-native-elements"
import { SpacedContainer, Container } from "../../components/Container/Style"
import { Button, FuncButton } from "../../components/Button/style"
import { LogoVitalHub } from "../../components/Logo"
import { ButtonTitle, Title } from "../../components/Title/style"
import { Text } from "../../components/Text/style"
import { CodeInput } from "../../components/Input/style"
import { DbLink } from "../../components/Link/style"
import { useEffect, useState } from "react"
import api from "../../services/services"

export function CodigoEmail({ navigation, route }) {
    const [codeFirst, setCodeFirst] = useState("");
    const [codeSecond, setCodeSecond] = useState("");
    const [codeThird, setCodeThird] = useState("");
    const [codeFourth, setCodeFourth] = useState("");

    const [email, setEmail] = useState();

    useEffect(() => {
        setEmail(route.params.email)
    }, [route.params])

    const Entrar = async () => {
        // console.log(codeFirst + codeSecond + codeThird + codeFourth)
        await api.post(`/RecuperarSenha/EnivarCodigoRecuperacao?email=${email}&code=${codeFirst + codeSecond + codeThird + codeFourth}`).then((response) => response.data == "Código correto" && navigation.navigate('NovaSenha', { email: email }))
            .catch((error) => console.log(error))

    }



    // async function 
    return (
        <Container>
            <FuncButton onPress={() => navigation.navigate('Login')}>
                <Icon
                    color="#34898F"
                    size={30}
                    name='close'
                    type="antdesign"
                />
            </FuncButton>
            <LogoVitalHub />
            <Title>Verifique seu e-mail</Title>
            <Text>Digite o código de 4 dígitos enviado para
                <DbLink> {email}</DbLink></Text>
            <SpacedContainer>
                <CodeInput onChangeText={(txt) => setCodeFirst(txt)} maxLength={1} placeholder="0" placeholderTextColor="#34898F" />
                <CodeInput onChangeText={(txt) => setCodeSecond(txt)} maxLength={1} placeholder="0" placeholderTextColor="#34898F" />
                <CodeInput onChangeText={(txt) => setCodeThird(txt)} maxLength={1} placeholder="0" placeholderTextColor="#34898F" />
                <CodeInput onChangeText={(txt) => setCodeFourth(txt)} maxLength={1} placeholder="0" placeholderTextColor="#34898F" />
            </SpacedContainer>
            <Button onPress={Entrar}>
                <ButtonTitle>Entrar</ButtonTitle>
            </Button>
            <DbLink>Reenviar Código</DbLink>
        </Container >
    )
}