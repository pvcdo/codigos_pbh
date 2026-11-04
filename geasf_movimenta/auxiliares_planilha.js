function setarInscricoesAbertas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const aba_eventos = ss.getSheetByName('Eventos')
  const coluna_datas = aba_eventos.getRange('a:b').getValues()
  const hoje = new Date()
  const abertos = []

  coluna_datas.forEach((linha,i) => {
    const id = linha[0]
    const data_evento = linha[1]

    if (id === "" || id === null || i < 4){
      return
    }
    
    if (data_evento >= hoje) {
      abertos.push(['sim'])
    }else{
      abertos.push(['não'])
    }
  })

  aba_eventos.getRange(5,11,abertos.length,1).setValues(abertos)
}
