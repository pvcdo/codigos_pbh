const cpfs = [
  "70464987687",
]

const comps = [
  "202401",
  "202402",
  "202403",
  "202404",
  "202405",
  "202406",
  "202407",
  "202408",
  "202409",
  "202410",
  "202411",
  "202412"
]

async function getProfissional() {
  for (const cpf of cpfs) {
    const url =
      `https://cnes.datasus.gov.br/services/profissionais?cpf=${cpf}`

    const resp = await fetch(url,{
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Referer":
          `https://cnes.datasus.gov.br/pages/profissionais/consulta.jsp?search=${cpf}` ,
        "Cookie":
          "TS0142589a=01e9f7e51f3e494b591fcc8da0ba7ec660b086ea86ef78096fa03ccd1572116cb278a6a180c181e0682b50c487cca885b0bf6cb7bc; TS42893502027=08b6e4e1d8ab2000e016ca9637bb948c4815dcd8ec6e1a774cf4d3c3d5d27ceacc12e540c722c30a0883be1fe3113000072deb4f5a1dccc75bde21c08dab69801cf19813801d5b4edf7122d29dd578a83ce6888f3e39f1b754f938636fd11995"
      }
    });

    const data = await resp.json();

    const id = data[0].id

    const urlHistorico = `https://cnes.datasus.gov.br/services/historico-profissional/${id}`;

    const respHistorico = await fetch(urlHistorico,{
      headers: {
        "Accept": "application/json, text/plain, */*",
        "Referer":
          `https://cnes.datasus.gov.br/pages/profissionais/consulta.jsp?search=${cpf}` ,
        "Cookie":
          "TS0142589a=01e9f7e51f3e494b591fcc8da0ba7ec660b086ea86ef78096fa03ccd1572116cb278a6a180c181e0682b50c487cca885b0bf6cb7bc; TS42893502027=08b6e4e1d8ab2000e016ca9637bb948c4815dcd8ec6e1a774cf4d3c3d5d27ceacc12e540c722c30a0883be1fe3113000072deb4f5a1dccc75bde21c08dab69801cf19813801d5b4edf7122d29dd578a83ce6888f3e39f1b754f938636fd11995"
      }
    })

    const historicoData = await respHistorico.json();

    const historicoFiltrado = historicoData.vinculos.filter((item) => {
      if (comps.includes(item.nuComp)) {
        if(item.noMun === 'BELO HORIZONTE') {
          return item;
        }
      }
    });

    console.log(historicoFiltrado);
  }
}

getProfissional()