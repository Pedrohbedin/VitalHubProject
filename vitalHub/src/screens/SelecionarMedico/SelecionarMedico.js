import React, { useState } from "react";
import { Container } from "../../components/Container/Style";
import MedicalCard from "../../components/MedicalCard/MedicalCard";
import { TitleSelect } from "../../components/Title/Style";
import { Button, ButtonSecondary } from "../../components/Button/Style";
import { ButtonSecondaryTitle, ButtonTitle } from "../../components/ButtonTitle/Style";
import { ListComponent } from '../../components/List/List'

const Medicos = [
    {id: 1, nome: "Usmar", especialidade: "Cardiologista"},
    {id: 2, nome: "Usmar", especialidade: "Cardiologista"},
    {id: 3, nome: "Usmar", especialidade: "Cardiologista"},
    {id: 4, nome: "Usmar", especialidade: "Cardiologista"},
    {id: 5, nome: "Usmar", especialidade: "Cardiologista"},
    {id: 6, nome: "Usmar", especialidade: "Cardiologista"},
]
import api from '../../service/service'

const SelecionarMedico = ({ navigation }) => {
  const [medicoLista, setMedicoLista] = useState([]);

  async function ListarMedicos() {
    //instanciar a nossa conectat a api

  await api.get("/Medicos")
  .then(  response => {
    setMedicoLista( response.data)

    console.log( medicoLista )
    }).catch( error => {
      console.log(error)
    })
  
}

return (
  <Container>
     <TitleSelect>Selecionar médico</TitleSelect>
     
     <ListComponent
       data={medicoLista}
       keyExtractor={(item) => item.id}
       renderItem={(item) => (
         console.log(item.item),
         <MedicalCard medico={item} />
       )}
       showsVerticalScrollIndicator={false}
     />
 
     <Button onPress={() => navigation.replace("Calendar")}>
       <ButtonTitle>Continuar</ButtonTitle>
     </Button>
 
     <ButtonSecondary onPress={() => navigation.replace("Main")}>
       <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
     </ButtonSecondary>
 
  </Container>
 );
 
};

export default SelecionarMedico;
