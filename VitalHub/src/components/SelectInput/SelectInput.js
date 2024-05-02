import RNPickerSelect from "react-native-picker-select";
import { StyleSheet, View } from "react-native";

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { Text } from "../Text/style";
import moment from "moment";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

const InputSelect = ({setHoraSelecionada}) => {
  const dataAtual = moment().format('YYYY-MM-DD');
  const [arrayOptions, setArrayOptions] = useState(null);
  //const [horaSelecionada, setHoraSelecionada] = useState(null);

  async function loadOptions() {
    // capturar a quantidade que faltam para as 24h
    const horasRestantes = moment(dataAtual).add(24, "hours").diff(moment(), "hours");

    // criar um laço que rode a qauntidade de horas
    const options = Array.from({ length: horasRestantes }, (_, index) => {
      let valor = new Date().getHours() + (index + 1)

      return {
        label: `${valor}:00`, value: `${valor}:00`
      }
    })

    setArrayOptions(options)
    console.log(options)

    // pra cada hora sera uma nova option
  }

  useEffect(() => {
    loadOptions();
  }, []);


  return (

    <View style={{ width: "90%", marginTop: 30, marginBottom: 42 }}>
      <Text textAlign="left" colorText="#000000" fontFamily=" Quicksand_600SemiBold">Selecione um horário disponível</Text>

      {
        arrayOptions ?
          (
            <RNPickerSelect

              style={style}
              useNativeAndroidPickerStyle={false}
              Icon={() => {
                return <FontAwesomeIcon icon={faCaretDown} color='#34898F' size={22} />
              }}
              onValueChange={(value) => setHoraSelecionada(value)}
              placeholder={{

                label: 'Selecione um valor',
                value: null,
                color: '#34898F'
              }}
              items={arrayOptions}
            />
          ) : (<ActivityIndicator />)
      }

    </View>
  )
}

const style = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#60BFC5',
    borderRadius: 5,
    color: '#34898F',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'MontserratAlternates_600SemiBold'
  },
  inputAndroid: {
    fontSize: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: '#60BFC5',
    borderRadius: 5,
    color: '#34898F',
    alignItems: 'center',
    justifyContent: 'center',

    fontFamily: 'MontserratAlternates_600SemiBold'
  },
  iconContainer: {
    top: '30%',
    marginRight: 13
  },
  placeholder: {
    color: '#34898F',
  }
})

export default InputSelect