/**
 * ============================================================
 * SISTEMA DE PROCESSOS DISCIPLINARES
 * Code.gs - Versão Segura com Dual Auth (Token + Workspace)
 * ============================================================
 */

const ABA_BASE = "Base";
const ABA_USUARIOS = "Usuarios";
const PAGINA_PRINCIPAL = "Index";
const DOMINIO_PERMITIDO = "@pbh.gov.br";

const PERMISSOES = {
  GESTOR: "Gestor",
  OPERADOR: "Operador",
  LEITURA: "Leitura"
};

/**
 * Valida se o token enviado corresponde à janela de tempo atual (blocos de 5 min)
 */
function validarTokenTemporal(tokenEnviado) {
  var secret = PropertiesService.getScriptProperties().getProperty('API_BOT_SECRET');
  if (!secret) return false;

  var windowSizeInSeconds = 300; // Janela de 5 minutos (300 segundos)
  var nowInSeconds = Math.floor(Date.now() / 1000);
  var currentWindow = Math.floor(nowInSeconds / windowSizeInSeconds);

  // Calcula o token esperado para a janela atual e para a janela anterior (tolerância de delay)
  var tokenAtual = gerarHmacToken(secret, currentWindow);
  var tokenAnterior = gerarHmacToken(secret, currentWindow - 1);

  return (tokenEnviado === tokenAtual || tokenEnviado === tokenAnterior);
}

function gerarHmacToken(secret, windowStep) {
  var message = windowStep.toString();
  var byteSignature = Utilities.computeHmacSha256Signature(message, secret);
  
  // Converte o array de bytes em string Hexadecimal
  return byteSignature.map(function(byte) {
    var hex = (byte < 0 ? byte + 256 : byte).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}

function doGet(e) {
  var action = e && e.parameter.action ? e.parameter.action : null;

  // ============================================================
  // FLUXO 1: EXPORTAÇÃO AUTOMATIZADA (Python / Bot via Token API)
  // ============================================================
  if (action === 'export_csv') {
    try {
      var tokenEnviado = e && e.parameter.token ? e.parameter.token : null;

      // Validação do Token Dinâmico por Tempo
      if (!tokenEnviado || !validarTokenTemporal(tokenEnviado)) {
        return ContentService
          .createTextOutput("Erro: Acesso negado. Token expirado, inválido ou ausente.")
          .setMimeType(ContentService.MimeType.TEXT);
      }

      var aba = e && e.parameter.aba ? e.parameter.aba : null;
      if (!aba) throw new Error('Parâmetro "aba" não informado.');

      return ContentService
        .createTextOutput(exportarEEncriptarCSV(aba))
        .setMimeType(ContentService.MimeType.TEXT);

    } catch (err) {
      return ContentService
        .createTextOutput("Erro: " + err.message)
        .setMimeType(ContentService.MimeType.TEXT);
    }
  }

  // ============================================================
  // FLUXO 2: INTERFACE WEB (Usuário Humano via Google Workspace)
  // ============================================================
  try {
    console.log('iniciando validação do usuário')
    // Valida o e-mail corporativo @pbh.gov.br e o perfil na planilha
    var usuario = validarPermissaoUsuario([PERMISSOES.GESTOR, PERMISSOES.OPERADOR, PERMISSOES.LEITURA]);

    console.log('usuário validado')
    
    return forms(usuario);
  } catch (error) {
    return HtmlService.createHtmlOutput(
      "<div style='font-family:sans-serif; padding: 20px; color: #721c24; background-color: #f8d7da; border-radius: 5px; border: 1px solid #f5c6cb;'>" +
      "<h3>Bloqueio de Segurança</h3>" +
      "<p>" + error.message + "</p>" +
      "</div>"
    );
  }
}

function validarPermissaoUsuario(perfisPermitidos) {
  var email = Session.getActiveUser().getEmail();

  console.log('validando usuario')
  
  if (!email || !email.toLowerCase().endsWith(DOMINIO_PERMITIDO)) {
    throw new Error("Acesso negado: É necessário estar autenticado com uma conta " + DOMINIO_PERMITIDO);
  }

  email = email.toLowerCase();
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheetUsuarios = ss.getSheetByName(ABA_USUARIOS);
  
  if (!sheetUsuarios) {
    throw new Error("Aba '" + ABA_USUARIOS + "' para controle de permissões não foi encontrada.");
  }

  var dados = sheetUsuarios.getDataRange().getValues();
  
  for (var i = 1; i < dados.length; i++) {
    var userEmail = dados[i][0] ? dados[i][0].toString().toLowerCase().trim() : "";
    var perfil = dados[i][2];
    var status = dados[i][3];

    if (userEmail === email && status === "Ativo") {
      if (!perfisPermitidos || perfisPermitidos.includes(perfil)) {
        return { email: email, perfil: perfil };
      } else {
        throw new Error("Seu perfil (" + perfil + ") não possui privilégios para acessar este módulo.");
      }
    }
  }

  throw new Error("O e-mail " + email + " não está cadastrado ou está inativo no sistema.");
}

function forms(usuario) {
  var template = HtmlService.createTemplateFromFile(PAGINA_PRINCIPAL);
  template.userEmail = usuario.email;
  template.userPerfil = usuario.perfil;

  return template
    .evaluate()
    .setTitle("Cadastro de Processos - PBH")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getDadosBase() {
  // Proteção da chamada de dados do frontend (google.script.run)
  validarPermissaoUsuario([PERMISSOES.GESTOR, PERMISSOES.OPERADOR, PERMISSOES.LEITURA]);

  const sh = getBase();
  if (sh.getLastRow() < 3) return [];

  return sh.getRange(3, 1, sh.getLastRow() - 2, sh.getLastColumn()).getValues();
}

function exportarEEncriptarCSV(aba) {
  const props = PropertiesService.getScriptProperties();
  const secret_crypto = props.getProperty('secret_crypto');
  const iv_crypto = props.getProperty('iv_crypto');

  eval(UrlFetchApp.fetch("https://cdnjs.cloudflare.com/ajax/libs/crypto-js/4.2.0/crypto-js.min.js").getContentText());

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(aba);
  if (!sheet) {
    throw new Error("Aba '" + aba + "' não encontrada na planilha.");
  }

  var timeZone = ss.getSpreadsheetTimeZone();
  var data = sheet.getDataRange().getValues();

  var csvContent = data.map(function(row) {
    return row.map(function(cell) {
      var text = (cell instanceof Date) 
        ? Utilities.formatDate(cell, timeZone, "dd/MM/yyyy") 
        : cell.toString().replace(/"/g, '""');
      return '"' + text + '"';
    }).join(",");
  }).join("\n");

  var SECRET_KEY = CryptoJS.enc.Utf8.parse(secret_crypto);
  var SECRET_IV  = CryptoJS.enc.Utf8.parse(iv_crypto);

  var encrypted = CryptoJS.AES.encrypt(csvContent, SECRET_KEY, {
    iv: SECRET_IV,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  return encrypted.toString();
}

function include(nomeArquivo) { return HtmlService.createHtmlOutputFromFile(nomeArquivo).getContent(); }
function getSS() { return SpreadsheetApp.getActiveSpreadsheet(); }
function getBase() { return getSS().getSheetByName(ABA_BASE); }
function formatarData(data) { return (data instanceof Date) ? Utilities.formatDate(data, Session.getScriptTimeZone(), "dd/MM/yyyy") : ""; }
function hoje() { return formatarData(new Date()); }
function limparTexto(valor) { return (valor === null || valor === undefined) ? "" : valor.toString().trim(); }
function vazio(valor) { return limparTexto(valor) === ""; }
function sucesso(msg, dados) { return { ok: true, mensagem: msg, dados: dados || null }; }
function erro(msg) { return { ok: false, mensagem: msg }; }