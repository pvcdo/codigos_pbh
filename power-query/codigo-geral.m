let
    // 1. Arquivo .m como caminho
    Caminho = "C:\pasta\pasta\arquivo.m",
    
    //CONSTANTES
    CodigoTexto = Text.FromBinary(File.Contents(Caminho)),
    Executar = Expression.Evaluate(CodigoTexto, #shared)
in
    Executar