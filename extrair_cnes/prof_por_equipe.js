const url =
  //'https://cnes.datasus.gov.br/services/estabelecimentos-equipes/3106205432243?competencia=202401';
  'https://cnes.datasus.gov.br/services/estabelecimentos-equipes/profissionais/3106204908732?coMun=310620&coArea=0997&coEquipe=225649&competencia=202411'

const resp = await fetch(url,{
  headers: {
    "Accept": "application/json, text/plain, */*",
    "Referer":
      "https://cnes.datasus.gov.br/pages/estabelecimentos/ficha/equipes/3106204908732?comp=202411",
    "Cookie":
      "TS0142589a=01e9f7e51f3e494b591fcc8da0ba7ec660b086ea86ef78096fa03ccd1572116cb278a6a180c181e0682b50c487cca885b0bf6cb7bc; TS42893502027=08b6e4e1d8ab2000e016ca9637bb948c4815dcd8ec6e1a774cf4d3c3d5d27ceacc12e540c722c30a0883be1fe3113000072deb4f5a1dccc75bde21c08dab69801cf19813801d5b4edf7122d29dd578a83ce6888f3e39f1b754f938636fd11995"
  }
});

const data = await resp.json();

console.dir(data, { depth: null });