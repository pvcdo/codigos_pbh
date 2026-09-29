/**
 * ============================================================
 * Cadastro.gs
 * Responsável por gravar novos processos na aba Base
 * ============================================================
 */


/**
 * Cadastro chamado pelo HTML
 */
function cadastrarProcesso(dados){

  try{

    const validacao = validarCadastro(dados);

    if(!validacao.ok)
      return validacao;

    const sh = getBase();

    // Encontra a primeira linha em branco (evita pular para o fim da planilha)
    const linha = getPrimeiraLinhaLivre(sh);

    const registro = montarLinhaBase(dados);

    sh.getRange(
      linha,
      1,
      1,
      registro.length
    ).setValues([registro]);

    return sucesso("Processo cadastrado com sucesso!");

  }catch(e){

    Logger.log(e);

    return erro(
      "Erro ao cadastrar o processo.\n\n" +
      e.message
    );

  }

}

/**
 * Busca a primeira linha realmente em branco na Coluna A
 */
function getPrimeiraLinhaLivre(sh) {
  const valores = sh.getRange("A:A").getValues();
  
  for (let i = 0; i < valores.length; i++) {
    if (valores[i][0] === "" || valores[i][0] === null || valores[i][0] === undefined) {
      return i + 1;
    }
  }
  
  return valores.length + 1;
}

/**
 * Converte datas para objeto Date do Google Apps Script
 */
function converterData(valor){

  if(valor instanceof Date)
    return valor;

  if(vazio(valor))
    return "";

  const textoData = String(valor).trim().replace(/-/g, "/");
  const partes = textoData.split("/");

  if(partes.length !== 3)
    return "";

  if(partes[0].length === 4) {
    return new Date(
      Number(partes[0]),
      Number(partes[1]) - 1,
      Number(partes[2])
    );
  }

  return new Date(
    Number(partes[2]),
    Number(partes[1]) - 1,
    Number(partes[0])
  );

}

/**
 * Monta exatamente a estrutura da aba Base
 */
function montarLinhaBase(d){

  const linha = new Array(24).fill("");

  linha[0]  = d.processo;
  linha[2]  = d.pdg;
  linha[3]  = d.idProcesso;
  linha[4]  = converterData(d.dataRecebimento);

  linha[6]  = d.responsavel;

  linha[7]  = d.bm;
  linha[8]  = d.nome;
  linha[9]  = d.cargo;

  linha[11] = d.lotacao;
  linha[12] = d.regional;
  linha[13] = d.vinculo;
  linha[14] = d.situacaoFuncional;

  linha[15] = converterData(d.dataEncaminhamento);

  linha[17] = d.motivacao;

  linha[19] = d.status;

  linha[20] = d.encaminhadoPara;

  linha[22] = d.publicacaoDOM;

  linha[23] = d.observacoes;

  return linha;

}



/**
 * Validação geral
 */
function validarCadastro(d){

  // Se o tipo de processo for PPA, ignora completamente a validação e permite salvar
  if(String(d.processo).trim().toUpperCase() === "PPA") {
    return sucesso();
  }

  // --- Validações padrão para os demais tipos de processo ---

  if(vazio(d.processo))
    return erro("Informe o tipo do processo.");

  if(vazio(d.pdg))
    return erro("Informe o número do PDG.");

  if(vazio(d.dataRecebimento))
    return erro("Informe a data de recebimento.");

  if(vazio(d.bm))
    return erro("Informe o BM.");

  if(vazio(d.nome))
    return erro("Servidor não localizado.");

  if(vazio(d.status))
    return erro("Informe o status.");

  if(vazio(d.motivacao))
    return erro("Informe a motivação.");

  if(vazio(d.responsavel))
    return erro("Informe o responsável.");

  return sucesso();

}



/**
 * Limpa espaços
 */
function normalizarCadastro(d){

  Object.keys(d).forEach(campo=>{

    if(typeof d[campo] === "string")
      d[campo] = d[campo].trim();

  });

  return d;

}



/**
 * Apenas para testes
 */
function testeCadastro(){

  const dados = {

    processo:"PAD",

    pdg:"12345",

    idProcesso:"PROC-001",

    dataRecebimento:"22/07/2026",

    bm:"987654",

    nome:"Servidor Teste",

    cargo:"Agente",

    lotacao:"Corregedoria",

    regional:"Centro",

    vinculo:"Efetivo",

    situacaoFuncional:"Ativo",

    dataEncaminhamento:"23/07/2026",

    encaminhadoPara:"Comissão",

    status:"Instauração PAD",

    motivacao:"Proceder de forma desidiosa",

    responsavel:"Karen",

    publicacaoDOM:"",

    observacoes:"Teste"

  };

  Logger.log(
    cadastrarProcesso(dados)
  );

}
