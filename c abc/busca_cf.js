function buscaCF() {

  //PLANILHA FONTE
  
  const plans_fonte = [
    "https://docs.google.com/spreadsheets/d/15z-k2I9mhPlzOErxic9zSpcRCmM3tx7E4QpxFXiXzlE/edit?gid=0#gid=0", //abc
    "https://docs.google.com/spreadsheets/d/15z-k2I9mhPlzOErxic9zSpcRCmM3tx7E4QpxFXiXzlE/edit?gid=0#gid=0",//abc
  ]

  const colunas_fontes = [
    ["a",	"j",	"bl"], //abc
    ["ag",	"j",	"bl"], //abc
  ]

  const abas_fontes = [
    "GERAL", //abc
    "GERAL", //abc
  ]

  const nomes_fontes = [
    "ABC",
    "CADM OCUPADO POR ABC",
  ]

  const planilha_fonte = SpreadsheetApp.getActiveSpreadsheet()

  const linhas_cabecalho = [3,3]

  //var exportacao = []

  const aba_destino = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Paulo")

  var linha_export = 2

  plans_fonte.forEach((url,i) => {
    
    const aba_fonte = planilha_fonte.getSheetByName(abas_fontes[i])
    const nome_fonte = nomes_fontes[i]
    console.log("iniciou busca de " + nome_fonte)
    const qtd_lins = aba_fonte.getRange("a1").getValue()
    const linha_cabecalho = linhas_cabecalho[i]
    const loop_lins = 5000
    var n_lins = qtd_lins > loop_lins ? loop_lins : qtd_lins
    const qtd_voltas = Math.ceil(qtd_lins/loop_lins)
    var lin = linha_cabecalho

    colunas_fontes[i].forEach((endereco_coluna,j) => {
      for(let volta = 0; volta < qtd_voltas; volta++){
      
        const faltam_lins = qtd_lins - lin

        if((volta+1) == qtd_voltas){
          n_lins = faltam_lins
          //console.log("últimas linhas na volta " + (volta+1) + " de " + qtd_voltas)
        }

        const end_range_coluna_fonte = (endereco_coluna+(lin+1)+":"+endereco_coluna+n_lins)
        const range_coluna_fonte = aba_fonte.getRange(end_range_coluna_fonte)
        const dados_coluna_fonte = range_coluna_fonte.getValues()
        aba_destino.getRange(linha_export,j+1,dados_coluna_fonte.length,1).setValues(dados_coluna_fonte)  

        console.log(`volta ${(volta+1)} de ${qtd_voltas} da fonte ${nome_fonte} na coluna ${endereco_coluna} finalizada`)
      }
      
    })

    console.log("iniciando nome das fontes")

    for(let volta = 0; volta < qtd_lins - linha_cabecalho; volta++){
      aba_destino.getRange(linha_cabecalho+1,colunas_fontes[i].length+1).setValue(nome_fonte)
    }

    console.log("iniciando nome das fontes")

    linha_export += qtd_lins
  })

}
