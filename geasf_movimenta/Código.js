function onEdit(e) {
  const abaEditada = e.source.getActiveSheet();
  const celulaEditada = e.range;

  // Verifica se estamos na aba 'Eventos' e na coluna D (coluna 4) a partir da linha 5
  if (
    abaEditada.getName() === "Eventos" &&
    celulaEditada.getColumn() === 4 && // Coluna D
    celulaEditada.getRow() >= 5
  ) {
    const valorRegional = celulaEditada.getValue();

    if (valorRegional !== "") {
      const abaFiltro = e.source.getSheetByName("Filtro Unidades");
      abaFiltro.getRange("F2").setValue(valorRegional);
    }
  }
}

function testes(){
  const ss_eventos = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Eventos')

  const eventos = ss_eventos.getDataRange().getValues().filter((linha)=>{
    if(linha[0]!=="" && linha[0]!=="id_evento"){
      return linha
    }
  }).map(linha=>linha[0])

  console.log(eventos.length)
}

const EVENTOS_ABA = 'Eventos';
const PRESENCA_ABA = 'Lista_presenca'
const EVENTOS_LINHA_CABECALHO = 4;
const EVENTOS_PRIMEIRA_LINHA = 5;
const EVENTOS_CAMPOS = [
  { nome: 'DATA DO EVENTO' },
  { nome: 'DISTRITO' },
  { nome: 'UNIDADES' },
  { nome: 'Calendário' },
  { nome: 'TEMAS' },
  { nome: 'OBJETIVO' },
  { nome: 'TIPO DE AÇÃO' },
  { nome: 'ESPECIFICAÇÃO' },
  { nome: 'ONLINE/PRESENCIAL' },
  { nome: 'TOTAL DE PARTICIPANTES' },
  { nome: 'Área de Atuação' },
  { nome: 'Calendário da Saúde MS' },
  { nome: 'Calendário de Cores MS' },
  { nome: 'Calendário POEPS' },
  { nome: 'Calendário Nacional' },
  { nome: 'PARCEIROS' },
  { nome: 'Inscrições abertas'}
];

function carregarUnidades() {
  const aba_unidades = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Unidades');
  const unidades_dados = aba_unidades.getDataRange()

  return unidades_dados
}

function normalizarCabecalhoEvento_(valor) {
  return String(valor)
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toUpperCase();
}

function obterAbaEventos_() {
  const aba = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(EVENTOS_ABA);
  if (!aba) {
    throw new Error('A aba "Eventos" não foi encontrada.');
  }
  return aba;
}

function obterAbaPresenca_() {
  const aba = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(PRESENCA_ABA);
  if (!aba) {
    throw new Error('A aba "Lista_presenca" não foi encontrada.');
  }
  return aba;
}

function obterMapaColunasEvento_(aba = "Eventos", criarCabecalhos) {
  let ultimaColuna = Math.max(aba.getLastColumn(), 1);
  let cabecalhos = aba
    .getRange(EVENTOS_LINHA_CABECALHO, 1, 1, ultimaColuna)
    .getDisplayValues()[0];

  if (!cabecalhos[0] && aba.getRange(EVENTOS_PRIMEIRA_LINHA, 1).getValue() !== '') {
    aba.getRange(EVENTOS_LINHA_CABECALHO, 1).setValue('id_evento');
    cabecalhos[0] = 'id_evento';
  }

  const aliases = {
    UNIDADES: ['UNIDADE'],
    PARCEIROS: ['PARCEIRO']
  };
  const mapa = {};
  cabecalhos.forEach((cabecalho, indice) => {
    const normalizado = normalizarCabecalhoEvento_(cabecalho);
    if (normalizado) {
      mapa[normalizado] = indice;
    }
  });

  const campos = [{ nome: 'id_evento' }].concat(EVENTOS_CAMPOS);
  campos.forEach(campo => {
    const nome = normalizarCabecalhoEvento_(campo.nome);
    const nomesAceitos = [nome].concat((aliases[campo.nome] || []).map(normalizarCabecalhoEvento_));
    const existente = nomesAceitos.find(alias => mapa[alias] !== undefined);

    if (existente !== undefined) {
      mapa[nome] = mapa[existente];
    } else if (criarCabecalhos) {
      ultimaColuna += 1;
      aba.getRange(EVENTOS_LINHA_CABECALHO, ultimaColuna).setValue(campo.nome);
      mapa[nome] = ultimaColuna - 1;
    }
  });

  return { mapa: mapa, ultimaColuna: Math.max(ultimaColuna, cabecalhos.length) };
}

function listarEventos_() {
  const aba = obterAbaEventos_();
  const colunas = obterMapaColunasEvento_(aba, false);
  const colunaData = colunas.mapa[normalizarCabecalhoEvento_('DATA DO EVENTO')];
  const colunaEspecificacao = colunas.mapa[normalizarCabecalhoEvento_('ESPECIFICAÇÃO')];
  const colunaTema = colunas.mapa[normalizarCabecalhoEvento_('TEMAS')];
  const colunaId = colunas.mapa[normalizarCabecalhoEvento_('id_evento')];

  if (colunaData === undefined || colunaEspecificacao === undefined || colunaId === undefined) {
    throw new Error('A aba "Eventos" precisa ter os cabeçalhos id_evento, DATA DO EVENTO e TEMAS na linha 4.');
  }

  const ultimaLinha = aba.getLastRow();
  if (ultimaLinha < EVENTOS_PRIMEIRA_LINHA) {
    return [];
  }

  return aba
    .getRange(
      EVENTOS_PRIMEIRA_LINHA,
      1,
      ultimaLinha - EVENTOS_PRIMEIRA_LINHA + 1,
      colunas.ultimaColuna
    )
    .getDisplayValues()
    .filter(linha => linha[colunaId] !== '')
    .map(linha => ({
      id: linha[colunaId],
      data: linha[colunaData],
      especificacao: linha[colunaEspecificacao],
      tema: colunaTema !== undefined ? linha[colunaTema] : ''
    }))
    .reverse();
}

function ultimaLinha_(aba){
  return aba.getRange('a5:a').getValues().filter(linha => linha[0] !== "").length + 5
}

// Busca um evento específico na planilha pelo seu ID para preencher o formulário
function obterEventoPorId(id) {
  if (!id) {
    throw new Error('ID do evento não fornecido.');
  }

  const aba = obterAbaEventos_();
  const aba_presencas = obterAbaPresenca_()
  const colunas = obterMapaColunasEvento_(aba, false);
  const colunaId = colunas.mapa[normalizarCabecalhoEvento_('id_evento')];

  if (colunaId === undefined) {
    throw new Error('Coluna id_evento não encontrada.');
  }

  const ultimaLinha = aba.getLastRow();
  if (ultimaLinha < EVENTOS_PRIMEIRA_LINHA) {
    throw new Error('Nenhum evento cadastrado.');
  }

  const dados_presencas = aba_presencas.getDataRange().getValues()

  const dados = aba.getRange(
    EVENTOS_PRIMEIRA_LINHA,
    1,
    ultimaLinha - EVENTOS_PRIMEIRA_LINHA + 1,
    colunas.ultimaColuna
  ).getValues();

  for (let i = 0; i < dados.length; i++) {
    const linha = dados[i];
    if (String(linha[colunaId]) === String(id)) {
      const evento = { id_evento: id };

      EVENTOS_CAMPOS.forEach(campo => {
        const colIdx = colunas.mapa[normalizarCabecalhoEvento_(campo.nome)];
        let val = colIdx !== undefined ? linha[colIdx] : '';

        // Formata a data para aAA-MM-DD para preencher o <input type="date">
        if (campo.nome === 'DATA DO EVENTO') {
          if (val instanceof Date) {
            const ano = val.getFullYear();
            const mes = String(val.getMonth() + 1).padStart(2, '0');
            const dia = String(val.getDate()).padStart(2, '0');
            val = `${ano}-${mes}-${dia}`;
          } else if (typeof val === 'string' && val.includes('/')) {
            const partes = val.split('/');
            if (partes.length === 3) {
              val = `${partes[2]}-${partes[1].padStart(2, '0')}-${partes[0].padStart(2, '0')}`;
            }
          }
        }

        if (campo.nome === 'TOTAL DE PARTICIPANTES') {
          val = dados_presencas.filter(linha => linha[0] === evento.id_evento).length
        }

        evento[campo.nome] = val !== null && val !== undefined ? String(val) : '';
      });

      return evento;
    }
  }

  throw new Error('Evento não encontrado na base de dados.');
}

// Atualiza as informações do evento na linha correspondente na planilha
function editarEvento(dados) {
  if (!dados || !dados.id_evento) {
    throw new Error('ID do evento não fornecido para edição.');
  }
  if (!dados['DATA DO EVENTO'] || !String(dados.TEMAS || '').trim()) {
    throw new Error('Informe a data do evento e o tema.');
  }

  const dataPartes = String(dados['DATA DO EVENTO']).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!dataPartes) {
    throw new Error('A data do evento é inválida.');
  }
  const dataEvento = new Date(
    Number(dataPartes[1]),
    Number(dataPartes[2]) - 1,
    Number(dataPartes[3])
  );
  if (
    dataEvento.getFullYear() !== Number(dataPartes[1]) ||
    dataEvento.getMonth() !== Number(dataPartes[2]) - 1 ||
    dataEvento.getDate() !== Number(dataPartes[3])
  ) {
    throw new Error('A data do evento é inválida.');
  }

  const total = dados['TOTAL DE PARTICIPANTES'] || '';
  if (total !== '' && (!/^\d+$/.test(String(total)) || Number(total) < 0)) {
    throw new Error('O total de participantes deve ser um número inteiro não negativo.');
  }

  const aba = obterAbaEventos_();
  const colunas = obterMapaColunasEvento_(aba, true);
  const colunaId = colunas.mapa[normalizarCabecalhoEvento_('id_evento')];

  const ultimaLinha = aba.getLastRow();
  if (ultimaLinha < EVENTOS_PRIMEIRA_LINHA) {
    throw new Error('Nenhum evento disponível para edição.');
  }

  const ids = aba.getRange(
    EVENTOS_PRIMEIRA_LINHA,
    colunaId + 1,
    ultimaLinha - EVENTOS_PRIMEIRA_LINHA + 1,
    1
  ).getValues();

  let linhaEdicao = -1;
  for (let i = 0; i < ids.length; i++) {
    if (String(ids[i][0]) === String(dados.id_evento)) {
      linhaEdicao = EVENTOS_PRIMEIRA_LINHA + i;
      break;
    }
  }

  if (linhaEdicao === -1) {
    throw new Error('Evento não encontrado para edição.');
  }

  const valores = new Array(colunas.ultimaColuna).fill('');
  valores[colunaId] = dados.id_evento;

  EVENTOS_CAMPOS.forEach(campo => {
    const valor = dados[campo.nome] || '';
    const colIdx = colunas.mapa[normalizarCabecalhoEvento_(campo.nome)];
    if (colIdx !== undefined) {
      valores[colIdx] =
        campo.nome === 'DATA DO EVENTO' ? dataEvento :
        campo.nome === 'TOTAL DE PARTICIPANTES' && valor !== '' ? Number(valor) :
        valor;
    }
  });

  aba.getRange(linhaEdicao, 1, 1, valores.length).setValues([valores]);

  // Retorna a lista atualizada
  return listarEventos_();
}

function salvarEvento(dados) {
  if (!dados || !dados['DATA DO EVENTO'] || !String(dados.TEMAS || '').trim()) {
    throw new Error('Informe a data do evento e o tema.');
  }

  const dataPartes = String(dados['DATA DO EVENTO']).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!dataPartes) {
    throw new Error('A data do evento é inválida.');
  }
  const dataEvento = new Date(
    Number(dataPartes[1]),
    Number(dataPartes[2]) - 1,
    Number(dataPartes[3])
  );
  if (
    dataEvento.getFullYear() !== Number(dataPartes[1]) ||
    dataEvento.getMonth() !== Number(dataPartes[2]) - 1 ||
    dataEvento.getDate() !== Number(dataPartes[3])
  ) {
    throw new Error('A data do evento é inválida.');
  }

  const total = dados['TOTAL DE PARTICIPANTES'] || '';
  if (total !== '' && (!/^\d+$/.test(String(total)) || Number(total) < 0)) {
    throw new Error('O total de participantes deve ser um número inteiro não negativo.');
  }

  const aba = obterAbaEventos_();
  const colunas = obterMapaColunasEvento_(aba, true);
  const valores = new Array(colunas.ultimaColuna).fill('');
  valores[colunas.mapa[normalizarCabecalhoEvento_('id_evento')]] = Utilities.getUuid();

  EVENTOS_CAMPOS.forEach(campo => {
    const valor = dados[campo.nome] || '';
    valores[colunas.mapa[normalizarCabecalhoEvento_(campo.nome)]] =
      campo.nome === 'DATA DO EVENTO' ? dataEvento :
      campo.nome === 'TOTAL DE PARTICIPANTES' && valor !== '' ? Number(valor) :
      valor;
  });

  const ultima_linha = ultimaLinha_(aba)

  aba.getRange(ultima_linha, 1, 1, valores.length).setValues([valores]);
  return listarEventos_()
}

// Registra a presença na aba "Lista_presenca"
function registrarPresenca(dados) {
  if (
    !dados ||
    !dados.id_evento ||
    !String(dados.matricula || '').trim() ||
    !String(dados.nome || '').trim() ||
    !String(dados.unidade || '').trim()
  ) {
    throw new Error('Por favor, preencha todos os campos obrigatórios (Matrícula, Nome e Unidade).');
  }

  // Validação adicional de segurança no servidor
  const evento = obterEventoPorId(dados.id_evento);
  const inscricoesAbertas = String(evento['Inscrições abertas'] || '').trim().toLowerCase() === 'sim';
  
  if (!inscricoesAbertas) {
    throw new Error('As inscrições para este evento não estão abertas.');
  }

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let abaPresenca = ss.getSheetByName('Lista_presenca');

  // Cria a aba se ela não existir e adiciona os cabeçalhos
  if (!abaPresenca) {
    abaPresenca = ss.insertSheet('Lista_presenca');
    abaPresenca.appendRow(['id_evento', 'matricula', 'nome', 'unidade']);
  } else if (abaPresenca.getLastRow() === 0) {
    abaPresenca.appendRow(['id_evento', 'matricula', 'nome', 'unidade']);
  }

  // Insere o novo registro de presença
  abaPresenca.appendRow([
    dados.id_evento,
    dados.matricula.trim(),
    dados.nome.trim(),
    dados.unidade.trim()
  ]);

  return true;
}

function doGet(e) {
  const parametros = e && e.parameter ? e.parameter : {};
  const action = parametros.action;

  if (['cadastro', 'presenca'].indexOf(action) === -1) {
    throw new Error('Página não encontrada.');
  }

  const template = HtmlService.createTemplateFromFile(action);
  if (action === 'presenca') {
    if (!parametros.evento) {
      throw new Error('Sem parâmetro evento');
    }
    try {
      // Busca os dados do evento pelo ID passado na URL
      const evento = obterEventoPorId(parametros.evento);
      template.evento = evento;
      
      // Verifica se a propriedade "Inscrições abertas" é exatamente "sim" (independente de maiúsculas/minúsculas)
      const abertas = String(evento['Inscrições abertas'] || '').trim().toLowerCase() === 'sim';
      template.inscricoesAbertas = abertas;
      template.mensagemErro = abertas ? '' : 'Este evento não está aceitando inscrições no momento.';
    } catch (err) {
      template.evento = null;
      template.inscricoesAbertas = false;
      template.mensagemErro = 'Evento não encontrado ou ID inválido.';
    }
  } else if (action === 'cadastro') {
    template.eventos = listarEventos_();
  }

  // Captura o e-mail do usuário atual
  //template.userEmail = Session.getActiveUser().getEmail();

  return template
    .evaluate()
    .setTitle("Eventos Movimenta - SMSA")
    .addMetaTag("viewport", "width=device-width, initial-scale=1")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename, data) {
  const template = HtmlService.createTemplateFromFile(filename);
  if (data) {
    template.data = data;
  }
  return template.evaluate().getContent();
}
