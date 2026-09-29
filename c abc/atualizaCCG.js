function colaCCG() {
  const plan_atual = SpreadsheetApp.getActiveSpreadsheet()
  const plan_cf = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1Ntkv7CKemat5l8TIxcSbYcG50rjmDjWyDOijK48c3RA/edit?gid=1598904391#gid=1598904391")
  
  const aba_ccg_cf = plan_cf.getSheetByName("CADASTRO E SALDOS CCGs")
  const ccgs = aba_ccg_cf.getRange(2,1,aba_ccg_cf.getLastRow()).getValues()

  const aba_ccgs_abc = plan_atual.getSheetByName("CCG's")

  aba_ccgs_abc.getRange(2,4,ccgs.length).setValues(ccgs)
}
