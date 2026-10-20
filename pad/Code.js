/**
 * ============================================================
 * SISTEMA DE PROCESSOS DISCIPLINARES
 * Code.gs
 * ============================================================
 */

// teste de atualização

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

function doGet(e) {
  
  var action = e && e.parameter.action ? e.parameter.action : null;
  var aba = e && e.parameter.aba ? e.parameter.aba : null;

  if (action === 'export_csv'){
    if(aba === null){
      throw Error('Sem parâmetro aba')
    }
    return ContentService.createTextOutput(exportarEEncriptarCSV(aba))
  }else {
    return forms()
  }
}

function exportarEEncriptarCSV(aba) {

  const pg_dados = aba

  const props = PropertiesService.getScriptProperties()

  const secret_crypto = props.getProperty('secret_crypto')
  const iv_crypto = props.getProperty('iv_crypto')

  eval(UrlFetchApp.fetch("https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js").getContentText())

  var ss = SpreadsheetApp.getActiveSpreadsheet()
  var sheet = ss.getSheetByName(pg_dados);
  // Pega o fuso horário configurado na planilha (ex: GMT-03:00)
  var timeZone = ss.getSpreadsheetTimeZone();
  
  // Usa getValues() para manter os tipos originais (Texto, Número, Date)
  var data = sheet.getDataRange().getValues();
  
  // 1. Converter os dados para formato CSV formatando datas e aspas
  var csvContent = data.map(function(row) {
    return row.map(function(cell) {
      var text;
      
      // Se a célula for um objeto do tipo Data, formata como dd/MM/yyyy
      if (cell instanceof Date) {
        text = Utilities.formatDate(cell, timeZone, "dd/MM/yyyy");
      } else {
        text = cell.toString().replace(/"/g, '""');
      }
      
      return '"' + text + '"';
    }).join(",");
  }).join("\n");

  // 2. Definir a Chave e o IV (Vetor de Inicialização)
  // IMPORTANTE: A chave deve ter 32 caracteres (256 bits) e o IV 16 caracteres (128 bits)
  var SECRET_KEY = CryptoJS.enc.Utf8.parse(secret_crypto); // 32 bytes
  var SECRET_IV  = CryptoJS.enc.Utf8.parse(iv_crypto);                 // 16 bytes

  // 3. Criptografar a string CSV com AES-256-CBC
  var encrypted = CryptoJS.AES.encrypt(csvContent, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  // O resultado criptografado em Base64
  return encrypted.toString();
}

function forms() {

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
