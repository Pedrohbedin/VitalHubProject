import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { encode, decode } from 'base-64';

if (!global.atob) {
    global.atob = decode
}

if (!global.btoa) {
    global.btoa = encode
}

export const userDecodeToken = async () => {
    const token = JSON.parse(await AsyncStorage.getItem("token")).token;
    if (token === null) {
        return null;
    }

    //Decodifica o token recebido
    const decoded = jwtDecode(token);

    return {
        email: decoded.email,
        name: decoded.name,
        role: decoded.role,
        token: token,
        id: decoded.jti
    }
}