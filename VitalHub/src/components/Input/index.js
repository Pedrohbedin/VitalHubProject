import { TouchableOpacity, View } from "react-native";
import { Input } from "./style";
import { Icon } from "react-native-elements";

const PasswordInput = ({ secureTextChange, value, setValue, valid, secureTextEntry }) => {
    return (
        <View style={{ width: "90%", alignItems: 'center', flexDirection: "row", borderColor: "#49B3BA", borderWidth: 2, borderRadius: 5 }}>
            <Input
                margin={"0px"}
                placeholder="Senha"
                placeholderTextColor="#49B3BA"
                value={value}
                onChangeText={txt => setValue(txt)}
                secureTextEntry={!secureTextEntry}
                style={valid ? { borderColor: 'transparent' } : { borderColor: 'red' }}
                width={"85%"}
            />
            <TouchableOpacity style={{ padding: 10 }} onPress={() => secureTextChange(!secureTextEntry)}>
                <Icon
                    color="#8C8A97"
                    size={24}
                    name={secureTextEntry ? 'eye' : 'eye-off'}
                    type="feather"
                />
            </TouchableOpacity>
        </View>
    )
}

export default PasswordInput;

