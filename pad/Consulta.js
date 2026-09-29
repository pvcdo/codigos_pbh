/**
 * ============================================================
 * Consultas.gs
 * Responsável pelas consultas da aplicação
 * ============================================================
 */


/**
 * Pesquisa um processo pelo PDG ou pelo ID
 */
function buscarProcesso(valor, tipo){

  try{

    valor = limparTexto(valor);
    tipo  = limparTexto(tipo).toUpperCase();

    if(vazio(valor))
      return erro("Informe um valor para pesquisa.");

    const dados = getDadosBase();

    // PDG = coluna 2
    // ID do Processo = coluna 3
    const colunaBusca = (tipo === "SUSPAD") ? 3 : 2;

    for (const linha of dados){

      if (
        limparTexto(linha[0]).toUpperCase() === tipo &&
        limparTexto(linha[colunaBusca]) === valor
      ){

        return sucesso("Processo localizado.",{

          processo: linha[0],
          pdg: linha[2],
          idProcesso: linha[3],
          dataRecebimento: formatarData(linha[4]),
          responsavel: linha[6],
          bm: linha[7],
          nome: linha[8],
          cargo: linha[9],
          lotacao: linha[11],
          regional: linha[12],
          vinculo: linha[13],
          situacaoFuncional: linha[14],
          dataEncaminhamento: formatarData(linha[15]),
          motivacao: linha[17],
          status: linha[19],
          encaminhadoPara: linha[20],
          publicacaoDOM: linha[22],
          observacoes: linha[23]

        });

      }

    }

    return erro("Nenhum processo encontrado.");

  }catch(e){

    Logger.log(e);
    return erro(e.message);

  }

}



/**
 * Converte um texto para "Primeira Letra Maiúscula"
 */
function capitalizarTexto(texto) {
  if (!texto) return "";
  
  // Conectores que devem permanecer em minúsculo (a menos que seja a 1ª palavra)
  const preposicoes = ["de", "da", "do", "das", "dos", "e", "em", "para", "com"];

  return String(texto)
    .toLowerCase()
    .trim()
    .split(/\s+/)
    .map((palavra, index) => {
      if (index > 0 && preposicoes.includes(palavra)) {
        return palavra;
      }
      return palavra.charAt(0).toUpperCase() + palavra.slice(1);
    })
    .join(" ");
}

/**
 * Busca servidor pelo BM e formata os textos em Primeira Letra Maiúscula
 */
function buscarServidorPorBM(bm){

  bm = limparTexto(bm);

  if(vazio(bm))
    return erro("Informe o BM.");

  const ID_PLANILHA =
    "1GXZ-dWfg5cDkXu5uMH1CpcERCZ8A3BRQdCJ6n9DtN4w";

  const aba = SpreadsheetApp
      .openById(ID_PLANILHA)
      .getSheetByName("Arte_Beta");

  const dados = aba.getDataRange().getValues();

  for(let i=1; i<dados.length; i++){

    const linha = dados[i];

    if(String(linha[0]).trim() == bm){

      return sucesso("Servidor localizado.",{

        nome: capitalizarTexto(linha[1]),
        cargo: capitalizarTexto(linha[3]),
        lotacao: capitalizarTexto(linha[22]),
        regional: capitalizarTexto(linha[23]),
        vinculo: capitalizarTexto(linha[24]),
        situacaoFuncional: capitalizarTexto(linha[32])

      });

    }

  }

  return erro("Servidor não localizado.");

}




/**
 * Data de hoje
 */
function getDataAtual(){

  return formatarData(new Date());

}



/**
 * Lista de processos
 */
function listaProcessos(){

  return [

    "PPA",

    "PAD",

    "SUSPAD",

    "TAD",

    "Acordo Subs"

  ];

}



/**
 * Lista de Status
 */
function listaStatus(){

  return [

    "Instauração PAD",

    "Absolvição",

    "Demissão",

    "Multa",

    "Nulidade",

    "Penalidade",

    "Repreensão",

    "Recisão Contratual",

    "Suspensão",

    "Arquivamento"

  ];

}



/**
 * Lista de Responsáveis
 */
function listaResponsaveis(){

  return [

    "Karen",

    "Rafaela",

    "Juliana"

  ];

}


/**
 * Retorna as listas para preenchimento dos selects
 */
function getListasFormulario() {
  
  // Mapeamento exato da sua imagem
  const statusPorTipo = {
    "PAD": [
      "Instauração PAD", "Absolvição", "Demissão", "Multa", 
      "Nulidade", "Penalidade", "Repreensão", "Rescisão Contratual", 
      "Suspensão", "Arquivamento"
    ],
    "PPA": [
      "Em andamento", "Arquivamento", "Instauração de PAD"
    ],
    "SUSPAD": [
      "Em andamento", "Extinta a Punibiliade", "Rescisão de SUSPAD"
    ],
    "TAD": [
      "Em andamento", "Extinta a Punibiliade", "Rescisão de TAD"
    ],
    "Acordo Subs": [
      "Em andamento", "Penalidade", "Suspensão"
    ]
  };

  return {
    processos: Object.keys(statusPorTipo), // Pega automaticamente ["PAD", "PPA", "SUSPAD", ...]
    statusPorTipo: statusPorTipo,
    responsaveis: ["Rafaela", "Karen", "Bruna"], // Mantenha suas opções de responsáveis aqui
    motivacoes: listaMotivacoes() //depois temos que alterar para autocomplete de um input para motivação
  };

}

/**
 * Lista de Motivações
 */
function listaMotivacoes(){

  return [

"Ausentar-se do trabalho, sem se justificar legalmente, por mais de 30 (trinta) dias consecutivos",

"Deixar de observar as leis, os regulamentos e o Código de Ética",

"Deixar de manter assiduidade e pontualidade no serviço",

"Deixar de trajar uniforme e usar equipamento de proteção e segurança, quando exigidos",

"Deixar de desempenhar com zelo e presteza as atribuições do cargo ou função",

"Deixar de participar de atividades de aperfeiçoamento ou especialização",

"Deixar de discutir questões relacionadas às condições de trabalho e às finalidades da administração pública",

"Deixar de sugerir providências tendentes à melhoria do serviço",

"Deixar de cumprir fielmente as ordens superiores, salvo se manifestamente ilegais",

"Deixar de guardar sigilo sobre assunto da repartição",

"Deixar de zelar pela economia do material sob sua guarda ou utilização e pela conservação do patrimônio público",

"Deixar de atender com presteza e satisfatoriamente",

"Deixar de tratar a todos com urbanidade",

"Deixar de manter conduta compatível com a moralidade administrativa",

"Exercer, durante o horário de trabalho, atividade a ele estranha, negligenciando o serviço e prejudicando seu bom desempenho",

"Deixar de comparecer ao serviço sem justificativa legal",

"Cometer a outro servidor atribuições estranhas ao cargo que ocupa, exceto em situações de emergência e transitórias",

"Cometer a pessoa estranha à repartição, fora dos casos previstos em lei, o desempenho de atribuição que seja de responsabilidade sua ou de subordinado",

"Recusar fé a documento público",

"Opor resistência injustificada ao andamento de documento e processo ou à execução de serviço",

"Ofender a dignidade ou o decoro de colega, de particular ou propalar ofensas",

"Utilizar pessoal ou recursos materiais da repartição em serviços ou atividades particulares",

"Praticar ato contra expressa disposição de lei ou deixar de praticá-lo, em descumprimento de dever funcional, em benefício próprio ou alheio",

"Deixar de observar a lei em prejuízo alheio ou da administração pública",

"Praticar ato de nepotismo ou que envolva conflito de interesse",

"Valer-se do cargo para lograr proveito pessoal ou de outrem",

"Fazer contratos com o poder público",

"Exercer atividades incompatíveis com o exercício do cargo",

"Atuar como procurador ou intermediário junto à repartição pública",

"Receber propina, comissão, presente ou vantagem",

"Praticar usura",

"Proceder de forma desidiosa",

"Praticar litigância de má-fé no âmbito da CTGM",

"Incontinência, má conduta ou mau procedimento",

"Insubordinação grave em serviço",

"Ofensa física em serviço",

"Crimes contra a dignidade sexual",

"Aplicação irregular de dinheiro público",

"Revelação de segredo",

"Lesão aos cofres públicos",

"Dilapidação do patrimônio público",

"Corrupção",

"Acumulação ilícita de cargo",

"Inassiduidade habitual",

"Assédio moral ou sexual"

  ];

}
