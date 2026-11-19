let
    // 1. URL Raw do GitHub e seu conteúdo do arquivo como texto
    //URL = "https://raw.githubusercontent.com/pvcdo/codigos_pbh/refs/heads/master/power-query/uniao_se01_tc0001.m",CodigoTexto = Text.FromBinary(Web.Contents(URL)),

    // 2. Caminho local e seu conteúdo do arquivo como texto
    Caminho = "C:\usuarios\pr114067\Desktop\Desktop\codigos\power-query\uniao_se01_tc0001.m",CodigoTexto = Text.FromBinary(File.Contents(Caminho)),
    
    Executar = Expression.Evaluate(CodigoTexto, #shared)
in
    Executar