const path = require('node:path');
const ExcelJS = require('exceljs');

const cpfs = [
  "06984139627",
  "12679793641",
  "89193920644",
  "13239587629",
  "04199363602",
  "70464987687",
  "81461038634",
  "03926134682",
  "06888499626",
  "10155728636",
  "02697889647",
  "09920988669",
  "07059789669",
  "08794459630",
  "04270536683",
  "99782430625",
  "98034553620",
  "03829395655",
  "07055776600",
  "97092746604",
  "52666530604",
  "73664693604",
  "02596757680",
  "93266324668",
  "11157128610",
  "03836341646",
  "05757183667",
  "00016611675",
  "08098116697",
  "09278821675",
  "06295802605",
  "12994280612",
  "13134907844",
  "07233416648",
  "94763011200",
  "10363156658",
  "13283877637",
  "09020874608",
  "11104026600",
  "11395408661",
  "16779572802",
  "06683493600",
  "01409503623",
  "03262869180",
  "02739644612",
  "29868149649",
  "38376903772",
  "12138017613",
  "09874556641",
  "05402509611",
  "08292597670",
  "89518543615",
  "12363062604",
  "06961382630",
  "09779807667",
  "10181936690",
  "14427287603",
  "47788542687",
  "01187451665",
  "03092108604",
  "93994087600",
  "06422631677",
  "03976252603",
  "01688538682",
  "55911293668",
  "01411258614",
  "78812380620",
  "73798231672",
  "55916325649",
  "10345293665",
  "05561734652",
  "03927745693",
  "10384660673",
  "12622026633",
  "08749768638",
  "02309897647",
  "03987495669",
  "97081590691",
  "41794119892",
  "85406325604",
  "00965369692",
  "13160666654",
  "10669061654",
  "00046308660",
  "65917898634",
  "10585568600",
  "03514497605",
  "00649757629",
  "60977655687",
  "05443872605",
  "05122924694",
  "03761590652",
  "73657077634",
  "03923461682",
  "08032819606",
  "04386813632",
  "03425008641",
  "03287287648",
  "06415980688",
  "06902263655",
  "03989000608",
  "06008710614",
  "07457759697",
  "03375401604",
  "68772998687",
  "09009311678",
  "05619330656",
  "06626798650",
  "03800483610",
  "92407889649",
  "86596187691",
  "03093628652",
  "51033674672",
  "66009952620",
  "63452391604",
  "00654004617",
  "00058496670",
  "02750408601",
  "54807573691",
  "63417391687",
  "93930488604",
  "10720837600",
  "72243910691",
  "04319414675",
  "05492721780",
  "15047290646",
  "08160438680",
  "06021630645",
  "87931850653",
  "61173835687",
  "65408438600",
  "02726333648",
  "01956924620",
  "23330171634",
  "76044394620",
  "03079095650",
  "12585846628",
  "03992842657",
  "12429115611",
  "03375905599",
  "09617384647",
  "06757569604",
  "10139673644",
  "80415016649",
  "08160357680",
  "02912853680",
  "80629261687",
  "03422947680",
  "07279187617",
  "59792973672",
  "04992410618",
  "06759751663",
  "05398544683",
  "93962436634",
  "06680502683",
  "08550056618",
  "04058662670",
  "01312853603",
  "43673961691",
]

const comps = [
  "202401", "202402", "202403", "202404", "202405", "202406",
  "202407", "202408", "202409", "202410", "202411", "202412"
];

// Caminho exato solicitado
const CAMINHO_ARQUIVO = String.raw`C:\usuarios\pr114067\Desktop\Desktop\codigos\extrair_cnes\historico_159.xlsx`;

const headersRequisicao = {
  "Accept": "application/json, text/plain, */*",
  "Cookie": "TS0142589a=01e9f7e51f3e494b591fcc8da0ba7ec660b086ea86ef78096fa03ccd1572116cb278a6a180c181e0682b50c487cca885b0bf6cb7bc; TS42893502027=08b6e4e1d8ab2000e016ca9637bb948c4815dcd8ec6e1a774cf4d3c3d5d27ceacc12e540c722c30a0883be1fe3113000072deb4f5a1dccc75bde21c08dab69801cf19813801d5b4edf7122d29dd578a83ce6888f3e39f1b754f938636fd11995"
};

async function getProfissional() {
  const todosRegistros = [];

  for (const cpf of cpfs) {
    try {
      const url = `https://cnes.datasus.gov.br/services/profissionais?cpf=${cpf}`;
      const resp = await fetch(url, {
        headers: {
          ...headersRequisicao,
          "Referer": `https://cnes.datasus.gov.br/pages/profissionais/consulta.jsp?search=${cpf}`
        }
      });

      const data = await resp.json();

      // Verifica se o CPF retornou algum resultado válido antes de acessar data[0]
      if (!Array.isArray(data) || data.length === 0) {
        console.log(`CPF ${cpf} não encontrado no CNES.`);
        continue;
      }

      const id = data[0].id;
      const nomeProfissional = data[0].nome || '';

      const urlHistorico = `https://cnes.datasus.gov.br/services/historico-profissional/${id}`;
      const respHistorico = await fetch(urlHistorico, {
        headers: {
          ...headersRequisicao,
          "Referer": `https://cnes.datasus.gov.br/pages/profissionais/consulta.jsp?search=${cpf}`
        }
      });

      const historicoData = await respHistorico.json();

      if (historicoData && Array.isArray(historicoData.vinculos)) {
        const historicoFiltrado = historicoData.vinculos.filter(
          (item) => comps.includes(item.nuComp) && item.noMun === 'BELO HORIZONTE'
        );

        // Adiciona CPF e Nome a cada vínculo encontrado e guarda na lista geral
        for (const vinculo of historicoFiltrado) {
          todosRegistros.push({
            cpf_consultado: cpf,
            nome_profissional: nomeProfissional,
            ...vinculo
          });
        }

        console.log(`CPF ${cpf} (${nomeProfissional}): ${historicoFiltrado.length} vínculos encontrados.`);
      }
    } catch (erro) {
      console.error(`Erro ao processar o CPF ${cpf}:`, erro.message);
    }
  }

  if (todosRegistros.length === 0) {
    console.log('Nenhum registro encontrado para gerar a planilha.');
    return;
  }

  // Criação da planilha com ExcelJS
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Historico');

  // Gera as colunas dinamicamente a partir das propriedades do primeiro registro encontrado
  const colunas = Object.keys(todosRegistros[0]).map((chave) => ({
    header: chave,
    key: chave,
    width: 20
  }));

  worksheet.columns = colunas;

  // Adiciona todas as linhas coletadas
  worksheet.addRows(todosRegistros);

  // Deixa o cabeçalho em negrito e aplica filtro automático
  worksheet.getRow(1).font = { bold: true };
  worksheet.autoFilter = {
    from: { row: 1, column: 1 },
    to: { row: 1, column: colunas.length }
  };

  // Salva o arquivo no destino
  await workbook.xlsx.writeFile(CAMINHO_ARQUIVO);
  console.log(`\nSucesso! ${todosRegistros.length} registros salvos em:\n${CAMINHO_ARQUIVO}`);
}

getProfissional();