/**
 * ============================================================
 * SISTEMA DE PROCESSOS DISCIPLINARES
 * Code.gs
 * ============================================================
 */

/**
 * Nome da aba que contém o banco de dados.
 */
const ABA_BASE = "Base";

/**
 * Nome da página HTML principal.
 */
const PAGINA_PRINCIPAL = "Index";

/**
 * Exibe a aplicação Web.
 */
function doGet() {

  return HtmlService
    .createTemplateFromFile(PAGINA_PRINCIPAL)
    .evaluate()
    .setTitle("Cadastro de Processos")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Permite incluir arquivos HTML (CSS e JS)
 * dentro do index.html
 *
 * Exemplo:
 * <?!= include('style'); ?>
 * <?!= include('javascript'); ?>
 */
function include(nomeArquivo) {

  return HtmlService
    .createHtmlOutputFromFile(nomeArquivo)
    .getContent();

}

/**
 * Retorna a planilha ativa.
 */
function getSS() {
  return SpreadsheetApp.getActiveSpreadsheet();
}

/**
 * Retorna a aba Base.
 */
function getBase() {
  return getSS().getSheetByName(ABA_BASE);
}

/**
 * Retorna a última linha ocupada.
 */
function ultimaLinhaBase() {

  const sh = getBase();

  return Math.max(sh.getLastRow(),3);

}

/**
 * Retorna o cabeçalho da Base.
 */
function getCabecalho() {

  const sh = getBase();

  return sh
    .getRange(2,1,1,sh.getLastColumn())
    .getValues()[0];

}

/**
 * Retorna todas as linhas da Base.
 */
function getDadosBase(){

  const sh = getBase();

  if(sh.getLastRow()<3)
    return [];

  return sh.getRange(
      3,
      1,
      sh.getLastRow()-2,
      sh.getLastColumn()
  ).getValues();

}

/**
 * Formata datas para dd/MM/yyyy
 */
function formatarData(data){

  if(!(data instanceof Date))
    return "";

  return Utilities.formatDate(
      data,
      Session.getScriptTimeZone(),
      "dd/MM/yyyy"
  );

}

/**
 * Data atual
 */
function hoje(){

  return formatarData(new Date());

}

/**
 * Limpa espaços extras.
 */
function limparTexto(valor){

  if(valor===null || valor===undefined)
    return "";

  return valor.toString().trim();

}

/**
 * Converte vazio para null.
 */
function vazio(valor){

  return limparTexto(valor)==="";

}

/**
 * Resposta padrão de sucesso.
 */
function sucesso(msg,dados){

  return {
    ok:true,
    mensagem:msg,
    dados:dados || null
  };

}

/**
 * Resposta padrão de erro.
 */
function erro(msg){

  return {
    ok:false,
    mensagem:msg
  };

}
