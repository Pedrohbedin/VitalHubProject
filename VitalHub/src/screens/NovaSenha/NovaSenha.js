import { Icon } from "react-native-elements"
import { Button, FuncButton } from "../../components/Button/style"
import { Container } from "../../components/Container/Style"
import { LogoVitalHub } from "../../components/Logo"
import { Input } from "../../components/Input/style"
import { ButtonTitle, Title } from "../../components/Title/style"
import { Text } from "../../components/Text/style"
import { useEffect, useState } from "react"
import api from "../../services/services"

export function NovaSenha({ navigation, route }) {

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState();

    useEffect(() => {
        setEmail(route.params.email)
    }, [route.params])


    const RedefinirSenha = async () => {
        if (password == confirmPassword) {
            await api.put(`/Usuario/AlterarSenha?email=${email}`, {
                senhaNova: password
            }).then(navigation.navigate("Login"));
        }
        else {
            alert('Senhas incompativeis');
        }
    }

    return (
        <Container>
            <FuncButton onPress={() => navigation.navigate("Login")}>
                <Icon
                    color="#34898F"
                    size={30}
                    name='close'
                    type="antdesign"
                />
            </FuncButton>

            <LogoVitalHub />

            <Title>Redefinir senha</Title>
            <Text>Insira e confirme a sua nova senha</Text>

            <Input secureTextEntry={true} placeholder="Nova Senha" placeholderTextColor="#34898F" onChangeText={txt => setPassword(txt)} value={password} />
            <Input secureTextEntry={true} placeholder="Confirmar nova senha" placeholderTextColor="#34898F" onChangeText={txt => setConfirmPassword(txt)} value={confirmPassword} />

            <Button onPress={RedefinirSenha}>
                <ButtonTitle colorText="#FFFFFF">Confirmar senha nova</ButtonTitle>
            </Button>
        </Container>
    )
}