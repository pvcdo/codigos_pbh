function cadastrar_processo(){
  var ss      = SpreadsheetApp.getActiveSpreadsheet();
  var Position = ss.getSheetByName('Base');// aba BD
  Position.getRange('A3').activate();
  Position.getCurrentCell().getNextDataCell(SpreadsheetApp.Direction.DOWN).activate();
  
  var valorOrigem = ss.getSheetByName('Tela de Cadastro'); // aba de input

  var Linha = Position.getCurrentCell().getRow() + 1;

  var processo = valorOrigem.getRange('C4').getValue();
  var n_pdg = valorOrigem.getRange('E5').getValue();      
  var id_processo = valorOrigem.getRange('E7').getValue();
  var data_recebimento = valorOrigem.getRange('E8').getValue();
  
  var bm = valorOrigem.getRange('E9').getValue();
  var nome = valorOrigem.getRange('E10').getValue();
  var cargo = valorOrigem.getRange('I9').getValue();
  var lotacao = valorOrigem.getRange('I10').getValue();
  var regional = valorOrigem.getRange('I11').getValue();
  var vinculo = valorOrigem.getRange('I12').getValue();
  var s_funcional = valorOrigem.getRange('I13').getValue();
  
  var data_encaminhamento = valorOrigem.getRange('E11').getValue();
  var encaminhamento_para = valorOrigem.getRange('E12').getValue();
  var status = valorOrigem.getRange('E13').getValue();
  var motivacao = valorOrigem.getRange('E14').getValue();
  var responsavel = valorOrigem.getRange('E15').getValue();
  var publicacaoDom = valorOrigem.getRange('E16').getValue();
  var observacoes = valorOrigem.getRange('E17').getValue();

  // --- início: gera um ID aleatório a partir de paciente + data ---
  //var tz        = ss.getSpreadsheetTimeZone();
  // converte para Date se necessário
  // var dataDate  = (data instanceof Date) ? data : new Date(data);
  // var dataFmt   = Utilities.formatDate(dataDate, tz, 'yyyyMMdd');
  // var nomeClean = paciente.toString().replace(/\s+/g, '').toUpperCase();
  // var randPart  = Math.floor(Math.random() * 1e6).toString().padStart(6, '0');
  // var idMov     = nomeClean + '_' + dataFmt + '_' + randPart;
  // Position.getRange(Linha, 17).setValue(idMov);
  // --- fim da geração de ID ---

  Position.getRange(Linha,1).setValue(processo);
  Position.getRange(Linha,3).setValue(n_pdg);
  Position.getRange(Linha,4).setValue(id_processo);
  Position.getRange(Linha,5).setValue(data_recebimento);
  Position.getRange(Linha,8).setValue(bm);
  Position.getRange(Linha,9).setValue(nome);
  Position.getRange(Linha,10).setValue(cargo);
  Position.getRange(Linha,12).setValue(lotacao);
  Position.getRange(Linha,13).setValue(regional);
  Position.getRange(Linha,14).setValue(vinculo);
  Position.getRange(Linha,15).setValue(s_funcional);
  

  Position.getRange(Linha,16).setValue(data_encaminhamento);
  Position.getRange(Linha,21).setValue(encaminhamento_para);
  Position.getRange(Linha,20).setValue(status);
  Position.getRange(Linha,18).setValue(motivacao);
  Position.getRange(Linha,7).setValue(responsavel);
  Position.getRange(Linha,23).setValue(publicacaoDom);
  Position.getRange(Linha,24).setValue(observacoes);

  valorOrigem.getRange('A1').activate();
  
  valorOrigem.getRange('E5').setValue('');
  valorOrigem.getRange('E7').setValue('');
  valorOrigem.getRange('E8').setValue('');
  valorOrigem.getRange('E9').setValue('');
  valorOrigem.getRange('E10').setValue('');
  valorOrigem.getRange('E11').setValue('');
  valorOrigem.getRange('E12').setValue('');
  valorOrigem.getRange('E13').setValue('');
  valorOrigem.getRange('E14').setValue('');
  valorOrigem.getRange('E15').setValue('');
  valorOrigem.getRange('E16').setValue('');
  valorOrigem.getRange('E17').setValue('');

  Browser.msgBox("Seção Cadastrada com sucesso!");
  
}

