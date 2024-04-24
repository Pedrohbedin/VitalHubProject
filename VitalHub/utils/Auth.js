import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import { encode, decode } from 'base-64';
import api from "../src/services/services";

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
    let fotoUsuario
    const decoded = jwtDecode(token);
    await api.get(`/Usuario/BuscarPorId?id=${decoded.jti}`).then((response) => fotoUsuario = response.data.foto)
    return {
        email: decoded.email,
        name: decoded.name,
        role: decoded.role,
        token: token,
        id: decoded.jti,
        foto: fotoUsuario
    }
}