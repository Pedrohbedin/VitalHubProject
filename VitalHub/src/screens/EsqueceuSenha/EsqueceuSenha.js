import { Container } from "../../components/Container/Style"
import { LogoVitalHub } from "../../components/Logo"
import { ButtonTitle, Title } from "../../components/Title/style"
import { Input } from "../../components/Input/style";
import { Button, FuncButton } from "../../components/Button/style";
import { Icon } from "react-native-elements";
import { Text } from "../../components/Text/style";
import { useState } from "react";
import api from "../../services/services";

export function EsqueceuSenha({ navigation }) {
    const [email, setEmail] = useState("");

    async function PasswordRecovery() {
        await api.post(`/RecuperarSenha?email=${email}`).then(email && navigation.navigate('CodigoEmail', { email: email })).catch((error) => console.log(error));
    }
    return (
        <Container>
            <FuncButton onPress={() => navigation.navigate('Login')}>
                <Icon
                    color="#34898F"
                    size={30}
                    name='arrowleft'
                    type="antdesign"
                />
            </FuncButton>
            <LogoVitalHub />
            <Title>Recuperar senha</Title>
            <Text>Digite abaixo seu email cadastrado que enviaremos um link para recuperação de senha</Text>
            <Input placeholder="Usuário ou E-mail" placeholderTextColor="#49B3BA" value={email} onChangeText={txt => setEmail(txt)} />
            <Button onPress={PasswordRecovery}>
                <ButtonTitle>Continuar</ButtonTitle>
            </Button>
        </Container>
    )
}