import React, { useState, useEffect } from "react";
import ClinicCards from "../../components/ClinicCard/ClinicCard";
import { Container } from "../../components/Container/Style";
import { TitleSelect } from "../../components/Title/Style";
import { ListComponent } from "../../components/List/List";
import { Button, ButtonSecondary } from "../../components/Button/Style";
import { ButtonSecondaryTitle, ButtonTitle } from "../../components/ButtonTitle/Style";
import api from "../../service/service";

const SelecionarClinica = ({ navigation }) => {
  const [ClinicaLista, setClinicaLista] = useState([]);
  const clinicasEstaticas = [
    {
      id: 1,
      nome: "Clinica Natureh",
      avaliacao: 5,
      localizacao: "São Paulo, SP",
      inicioAtividade: "Seg",
      fimAtividade: "Sex",
    },
    {
      id: 2,
      nome: "Diamond pró mulher",
      avaliacao: 4.8,
      localizacao: "São Paulo, SP",
      inicioAtividade: "Seg",
      fimAtividade: "Sex",
    },
    {
      id: 3,
      nome: "Clinica Villa Lobos",
      avaliacao: 4.2,
      localizacao: "Taboão, SP",
      inicioAtividade: "Seg",
      fimAtividade: "Sab",
    },
  ];

  useEffect(() => {
    ListarClinica();
  }, []);

  async function ListarClinica() {
    try {
      const response = await api.get("/Clinica");
      setClinicaLista(response.data);
      console.log(ClinicaLista);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <TitleSelect>Selecionar clínica</TitleSelect>

      <ListComponent
        data={[...ClinicaLista, ...clinicasEstaticas]}
        keyExtractor={(item) => item.id.toString()} 
        renderItem={({ item }) => (
          <ClinicCards
            nomeClinica={item.nome}
            localClinica={item.localizacao}
            horarioAtendimento={`${item.inicioAtividade}-${item.fimAtividade}`}
          />
        )}
        showsVerticalScrollIndicator={false}
      />

      <Button onPress={() => navigation.replace("Selecionar Medico")}>
        <ButtonTitle>Continuar</ButtonTitle>
      </Button>

      <ButtonSecondary onPress={() => navigation.replace("Main")}>
        <ButtonSecondaryTitle>Cancelar</ButtonSecondaryTitle>
      </ButtonSecondary>
    </Container>
  );
};

export default SelecionarClinica;
