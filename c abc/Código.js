function gerarDespacho() {

  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const aba_geral = ss.getSheetByName("GERAL")

  const linha = SpreadsheetApp.getActiveRange().getRow()
  const ui = SpreadsheetApp.getUi()

  const data_inicio_contrato = new Date(aba_geral.getRange("k"+linha).getValue())
  const nome = aba_geral.getRange("i"+linha).getValue()
  const matricula = aba_geral.getRange("j"+linha).getValue()
  const cargo = aba_geral.getRange("l"+linha).getValue()
  const ch_atual = aba_geral.getRange("n"+linha).getValue()
  const escala_atual = aba_geral.getRange("o"+linha).getValue()
  const lotacao_atual = aba_geral.getRange("q"+linha).getValue()
  const abono_atual = aba_geral.getRange("p"+linha).getValue()
  var inciso_atual
  var inciso_atual_item = parseInt(ui.prompt(`Digite o número do inciso atual

                                4 - TEMPORÁRIO 2 ANOS - Inciso IV
                                5 - DEFINITIVO 2 ANOS - Inciso V
                                6 - TEMPORÁRIO 4 ANOS - Inciso VI`).getResponseText())

  switch(inciso_atual_item){
    case 4:
      inciso_atual = "TEMPORÁRIO 2 ANOS - Inciso IV"
      break
    case 5:
      inciso_atual = "DEFINITIVO 2 ANOS - Inciso V"
      break
    case 6:
      inciso_atual = "TEMPORÁRIO 4 ANOS - Inciso VI"
      break
  }
  
  if(inciso_atual_item === 4){
    var motivo_atual = ui.prompt(`Escreva o motivo atual da licença/afastamento`).getResponseText()
    var profissional_substituido_atual = ui.prompt(`Nome do profissional atualmente substituído`).getResponseText()
    var matricula_profissional_atual = ui.prompt(`Matrícula do profissional atualmente substituído`).getResponseText()
    var inicio_afastamento_atual = ui.prompt(`Data de início do afastamento de ${profissional_substituido_atual}`).getResponseText()
    var fim_afastamento_atual = ui.prompt(`Data fim do afastamento de ${profissional_substituido_atual}`).getResponseText()
  }

  if(inciso_atual_item === 5){
    var data_fim_atual = new Date(data_inicio_contrato.getFullYear()+2,data_inicio_contrato.getMonth(),data_inicio_contrato.getDate()).toLocaleDateString('pt-BR')
  }

  if(inciso_atual_item === 6){
    var data_inicio_projeto_atual = ui.prompt(`Data de início na campanha/projeto sazonal`).getResponseText()
    var data_fim_projeto_atual = ui.prompt(`Data fim na campanha/projeto sazonal`).getResponseText()
  }
  

  const ch_novo = aba_geral.getRange("aj"+linha).getValue()
  const escala_novo = aba_geral.getRange("ak"+linha).getValue()
  const abono_novo = aba_geral.getRange("al"+linha).getValue()
  const lotacao_novo = aba_geral.getRange("am"+linha).getValue()
  const motivo_novo = aba_geral.getRange("ai"+linha).getValue()
  const profissional_substituido_novo = aba_geral.getRange("ah"+linha).getValue()

  var inciso_novo
  var inciso_novo_item = parseInt(ui.prompt(`Digite o número do inciso novo

                                4 - TEMPORÁRIO 2 ANOS - Inciso IV
                                5 - DEFINITIVO 2 ANOS - Inciso V
                                6 - TEMPORÁRIO 4 ANOS - Inciso VI`).getResponseText())

  switch(inciso_novo_item){
    case 4:
      inciso_novo = "TEMPORÁRIO 2 ANOS - Inciso IV"
      break
    case 5:
      inciso_novo = "DEFINITIVO 2 ANOS - Inciso V"
      break
    case 6:
      inciso_novo = "TEMPORÁRIO 4 ANOS - Inciso VI"
      break
  }

  if(inciso_novo_item === 4){
    var matricula_profissional_novo = ui.prompt(`Matrícula de ${profissional_substituido_novo} a ser substituído(a)`).getResponseText()
    var inicio_afastamento_novo = ui.prompt(`Data de início do afastamento de ${profissional_substituido_novo}`).getResponseText()
    var fim_afastamento_novo = ui.prompt(`Data fim do afastamento de ${profissional_substituido_novo}`).getResponseText()
  }

  if(inciso_novo_item === 5){
    var data_fim_novo = new Date(data_inicio_contrato.getFullYear()+2,data_inicio_contrato.getMonth(),data_inicio_contrato.getDate()).toLocaleDateString('pt-BR')
    var matricula_profissional_novo = ui.prompt(`Matrícula de ${profissional_substituido_novo} a ser substituído(a)`).getResponseText()
  }

  if(inciso_novo_item === 6){
    var data_inicio_projeto_novo = ui.prompt(`Data de início na campanha/projeto sazonal`).getResponseText()
    var data_fim_projeto_novo = ui.prompt(`Data fim na campanha/projeto sazonal`).getResponseText()
  }

  const observacoes = ui.prompt("Insira informações adicionais que julga relevantes")

  var despacho_parte_atual_inciso
  
  //Despacho inciso atual = IV
  if(inciso_atual_item === 4){
    despacho_parte_atual_inciso = 
    `Motivo de licença/afastamento: ${motivo_atual}
    Nome profissional licenciado/afastado: ${profissional_substituido_atual}
    Matricula profissional licenciado/afastado: ${matricula_profissional_atual}
    Data inicio periodo atual (inicio licenca/afastamento): ${inicio_afastamento_atual}
    Data fim periodo atual (fim licenca/afastamento): ${fim_afastamento_atual}`
  }
  
  //Despacho inciso atual = V
  if(inciso_atual_item === 5){
    despacho_parte_atual_inciso = 
    `Data fim atual: ${data_fim_atual}`
  }
  
  //Despacho inciso atual = VI
  if(inciso_atual_item === 6){
    despacho_parte_atual_inciso = 
    `Data início da campanha/projeto atual: ${data_inicio_projeto_atual}
    Data fim da campanha/projeto atual: ${data_fim_projeto_atual}`
  }

  var despacho_parte_novo_inciso

  //Despacho inciso novo = IV
  if(inciso_novo_item === 4){
    despacho_parte_novo_inciso = 
    `Motivo de licença/afastamento: ${motivo_novo}
    Nome profissional licenciado/afastado: ${profissional_substituido_novo}
    Matricula profissional licenciado/afastado: ${matricula_profissional_novo}
    Data inicio periodo novo (inicio licenca/afastamento): ${inicio_afastamento_novo}
    Data fim periodo novo (fim licenca/afastamento): ${fim_afastamento_novo}`
  }
  
  //Despacho inciso novo = V
  if(inciso_novo_item === 5){
    if(profissional_substituido_novo !== ""){
      despacho_parte_novo_inciso = 
      `Data fim novo: ${data_fim_novo}
      Motivo do ABC: ${motivo_novo}
      Nome profissional a ser substituído: ${profissional_substituido_novo}
      Matrícula do profissional a ser substituído: ${matricula_profissional_novo}`
    }else{
      despacho_parte_novo_inciso = 
      `Data fim novo: ${data_fim_novo}`
    }
  }
  
  //Despacho inciso novo = VI
  if(inciso_novo_item === 6){
    despacho_parte_novo_inciso = 
    `Data início da campanha/projeto novo: ${data_inicio_projeto_novo}
    Data fim da campanha/projeto novo: ${data_fim_projeto_novo}`
  }

  const despacho = 


  `Nome do profissional: ${nome}
  Matrícula do profissional ${matricula}
  Cargo: ${cargo}

  Carga horária atual: ${ch_atual}
  Escala de trabalho atual: ${escala_atual}
  Tipo de equipe atual: ${abono_atual}
  Unidade de lotação atual: ${lotacao_atual}
  ${despacho_parte_atual_inciso}

  Carga horária nova: ${ch_novo}
  Escala de trabalho nova: ${escala_novo}
  Tipo de equipe nova: ${abono_novo}
  Unidade de lotação nova: ${lotacao_novo}
  ${despacho_parte_novo_inciso}
  
  ${observacoes}`

  ui.alert(despacho)
}

function onOpen(){
  const ui = SpreadsheetApp.getUi()
  ui
  .createMenu('Despacho')
  .addItem('Gerar despacho', 'gerarDespacho')
  .addToUi();
}
