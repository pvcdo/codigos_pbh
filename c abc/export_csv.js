function doPost(e) { /*exportar() {/**/
  try{
    // Os dados enviados no corpo da requisição POST estarão em e.postData.contents
    
    var dadosRecebidos = JSON.parse(e.postData.contents)
    /*var dadosRecebidos = {
          "colunas": [
              32,
              9,
              63,
              0
          ],
          "colunas_data": [
              63
          ],
          "tickets": [
              "31.00316963/2024-64",
              "55-015.585/22-89",
              "55-013.225/22-42",
              "55-178.008/21-13",
              "55-070.832/22-37",
              "55-075.969/22-79",
              "55-094.996/22-69",
              "55-105.462/22-27",
              "55-116.033/22-02",
              "55-119.078/22-57",
              "55-104.226/22-39",
              "55-146.123/22-82",
              "55-155.461/22-04",
              "55-158.210/22-82",
              "55-158.721/22-21",
              "55-002.629/23-09",
              "55-013.701/23-98",
              "55-019.770/23-23",
              "55-021.050/23-37",
              "55-028.522/23-82",
              "55-032.089/23-34",
              "55-038.730/23-26",
              "55-043.082/23-57",
              "55-048.289/23-72",
              "55-051.197/23-24",
              "55-051.200/23-37",
              "55-051.202/23-62",
              "55-051.204/23-98",
              "55-051.207/23-86",
              "55-051.208/23-49",
              "55-051.194/23-36",
              "55-071.101/23-08",
              "55-051.220/23-44",
              "55-048.597/23-34",
              "55-051.807/23-53",
              "55-060.005/23-52",
              "55-045.507/23-35",
              "55-045.503/23-84",
              "55-045.501/23-59",
              "55-045.505/23-00",
              "55-064.855/23-39",
              "55-069.841/23-01",
              "55-069.840/23-49",
              "55-076.022/23-10",
              "55-082.930/23-34",
              "55-083.065/23-43",
              "55-085.754/23-10",
              "55-083.231/23-10",
              "55-084.692/23-29",
              "55-086.007/23-53",
              "55-087.149/23-83",
              "55-088.645/23-90",
              "55-089.807/23-26",
              "55-089.528/23-62",
              "55-092.466/23-85",
              "55-078.989/22-92",
              "55-085.013/22-30",
              "55-096.998/23-46",
              "55-096.922/23-84",
              "55-096.924/23-00",
              "55-096.995/23-58",
              "55-097.509/23-73",
              "55-097.556/23-53",
              "55-097.626/23-37",
              "55-097.502/23-24",
              "55-097.826/23-26",
              "55-097.822/23-75",
              "55-097.641/23-20",
              "55-097.828/23-51",
              "55-097.625/23-74",
              "55-097.812/23-11",
              "55-097.569/23-03",
              "55-097.718/23-53",
              "55-097.726/23-81",
              "55-097.720/23-03",
              "55-097.729/23-70",
              "55-097.836/23-80",
              "55-097.710/23-41",
              "55-097.708/23-08",
              "55-098.002/23-37",
              "55-097.990/23-70",
              "55-099.436/23-72",
              "55-093.369/23-64",
              "55-101.045/23-69",
              "55-178.409/21-64",
              "55-012.075/22-96",
              "55-006.612/22-69",
              "55-004.842/22-48",
              "55-024.294/22-27",
              "55-098.706/21-48",
              "55-009.288/22-59",
              "55-026.563/22-08",
              "55-000.342/22-73",
              "55-011.218/22-06",
              "55-014.711/22-04",
              "55-083.482/23-40",
              "31.00591214/2024-73",
              "31.00570880/2024-71",
              "31.00708033/2024-12",
              "31.00748236/2024-58",
              "31.00944563/2024-85",
              "55-097.723/23-93",
              "31.00171745/2025-13",
              "31.00323541/2025-62",
              "31.00457125/2025-45",
              "31.00455669/2025-72",
              "31.00462193/2025-76",
              "31.00508675/2025-48",
              "31.00498206/2025-53",
              "31.00523363/2025-08",
              "31.00544943/2025-27",
              "31.00593450/2025-32",
              "31.00595055/2025-56",
              "31.00594870/2025-07",
              "31.00524022/2025-63",
              "31.00516852/2025-41",
              "31.00659988/2025-43",
              "31.00686042/2025-29",
              "31.00694842/2025-79",
              "31.00691919/2025-42",
              "31.00679548/2025-88",
              "31.00694745/2025-79",
              "31.00749651/2025-68",
              "31.00731605/2025-79",
              "31.00762654/2025-30",
              "31.00762305/2025-44",
              "31.00740820/2025-79",
              "31.00751929/2025-60",
              "31.00760490/2025-64",
              "31.00765763/2025-89",
              "31.00766189/2025-33",
              "31.00767206/2025-25",
              "31.00763721/2025-30",
              "31.00764202/2025-41",
              "31.00557615/2025-02",
              "31.00702705/2025-14",
              "31.00769592/2025-11",
              "31.00769900/2025-37",
              "31.00772443/2025-52",
              "31.00764726/2025-55",
              "31.00770139/2025-83",
              "31.00774292/2025-84",
              "31.00774740/2025-16",
              "31.00775462/2025-19",
              "31.00776204/2025-64",
              "31.00776420/2025-52",
              "31.00777266/2025-05",
              "31.00783273/2025-97",
              "31.00783902/2025-89",
              "31.00783759/2025-70",
              "31.00781674/2025-08",
              "31.00779733/2025-35",
              "31.00779962/2025-60",
              "31.00780101/2025-90",
              "31.00780140/2025-07",
              "31.00780190/2025-15",
              "31.00780246/2025-55",
              "31.00780281/2025-80",
              "31.00780304/2025-41",
              "31.00780343/2025-55",
              "31.00773019/2025-20",
              "31.00789564/2025-87",
              "31.00789913/2025-73",
              "31.00790129/2025-61",
              "31.00790669/2025-31",
              "31.00790722/2025-55"
          ],
          "coluna_ticket": 33,
          "nome_aba_fonte": "GERAL",
          "fonte": "CADM OCUPADO POR ABC"
      }*/

    // Acessa os parâmetros
    const colunas = dadosRecebidos.colunas;
    const colunas_data = dadosRecebidos.colunas_data
    const tickets_enviados = dadosRecebidos.tickets;
    const coluna_ticket = dadosRecebidos.coluna_ticket;
    const nome_aba_fonte = dadosRecebidos.nome_aba_fonte;
    const fonte = dadosRecebidos.fonte;

    // Abre a planilha pelo ID
    var planilha = SpreadsheetApp.getActiveSpreadsheet();
    
    var aba = planilha.getSheetByName(nome_aba_fonte);

    var ind_linhas = []
    
    
    const n_linhas = aba.getMaxRows()
    
    
    var tickets_aba = []
    aba.getRange(1,coluna_ticket,n_linhas).getValues().forEach((linha,ind)=>{
      if(coluna_ticket === 33){
        const tickets_oc = linha[0].toString().split(";")
        tickets_oc.forEach(ticket => {
          ind_linhas.push(ind)
          tickets_aba.push(ticket)
        })
      }else{
        ind_linhas.push(ind)
        tickets_aba.push(linha[0])
      }
      
    });

    // Obtém todos os dados da aba
    const n_colunas = aba.getMaxColumns()
    var dados = []
    tickets_enviados.forEach(ticket => {
      const linha = ind_linhas[tickets_aba.indexOf(ticket)] + 1
      if(linha > 0){
        const dados_linha = aba.getRange(linha,1,1,n_colunas).getValues()[0]
        if(coluna_ticket === 33){
          dados_linha[32] = ticket
        }
        dados.push(dados_linha)
      }
    })

    //protocolos
    let colunas_export_abc = colunas
    
    // Converte os dados para o formato CSV
    var csv = dados.map(function(linha) {
      if(linha[colunas_export_abc[0]] === "") return undefined
      var dados_linha = colunas_export_abc.map((coluna,i) => {
        var conteudoCelula = linha[coluna].toString().replace(/"/g, '""');
        if(conteudoCelula !== "" && conteudoCelula !== undefined && conteudoCelula !== null) {
          if (colunas_data.indexOf(coluna) >= 0) {
            var data = new Date(conteudoCelula);
            // Se a data for válida (não um "Invalid Date"), formata a data
            if (!isNaN(data.getTime())) {
              conteudoCelula = Utilities.formatDate(data, Session.getScriptTimeZone(), "dd/MM/yyyy");
            }
            return conteudoCelula;
          }
          if(i === colunas_export_abc.length-1){
            return fonte
          }
          return '"' + conteudoCelula + '"';
        }
        
      })
      //console.log(dados_linha.join(','))
      return dados_linha.join(',');
    })
    
    csv = csv.filter(linha => linha !== undefined)
    csv = csv.join('\n');
    
    // Retorna o CSV com o tipo de conteúdo adequado
    return ContentService
      .createTextOutput(csv)
      .setMimeType(ContentService.MimeType.CSV);
  }catch(e){
    console.log("Deus, por que tudo é tão difícil para mim?")
    return "Deus, por que tudo é tão difícil para mim?"
  }
}