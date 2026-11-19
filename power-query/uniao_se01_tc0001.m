let
    // 1. Conecta à pasta local
    Fonte = Folder.Files("I:\Meu Drive\Projetos\Estudos Afastamento\Planilhas fonte\Movimentacoes\2024\CADM"),

    // 2. Filtra arquivos com extensão .xlsx e ignora arquivos temporários do Excel (iniciados com ~$)
    #"Arquivos Filtrados" = Table.SelectRows(Fonte, each ([Extension] = ".xlsx") and not Text.StartsWith([Name], "~$")),

    // 3. Lê o conteúdo de cada arquivo, captura o nome da aba e insere como coluna na tabela
    #"Processar Planilhas" = Table.AddColumn(#"Arquivos Filtrados", "DadosTabela", each 
        let
            PastaExcel = Excel.Workbook([Content]),
            RegistroAba = PastaExcel{[Kind="Sheet"]}, // Seleciona o registro da primeira aba
            NomeAba = RegistroAba[Item], // Extrai o nome da aba (ex: "SE01 01-24")
            CabecalhosPromovidos = Table.PromoteHeaders(RegistroAba[Data], [PromoteAllScalars=true]),
            TabelaComNomeAba = Table.AddColumn(CabecalhosPromovidos, "Nome da Aba", each "CADM - "&NomeAba)
        in
            TabelaComNomeAba
    ),

    // 4. Seleciona a coluna com o nome do arquivo e a coluna com a tabela processada
    #"Colunas Selecionadas" = Table.SelectColumns(#"Processar Planilhas", {"Name", "DadosTabela"}),

    // 5. Identifica dinamicamente o nome de todas as colunas presentes nas planilhas
    ListaNomesColunas = List.Distinct(List.Combine(List.Transform(#"Colunas Selecionadas"[DadosTabela], Table.ColumnNames))),

    // 6. Empilha todas as planilhas em uma única tabela
    #"Tabela Final" = Table.ExpandTableColumn(#"Colunas Selecionadas", "DadosTabela", ListaNomesColunas),
    #"Colunas Removidas" = Table.RemoveColumns(#"Tabela Final",{"Name"}),
    #"Duplicatas Removidas" = Table.Distinct(#"Colunas Removidas")
in
    #"Duplicatas Removidas"