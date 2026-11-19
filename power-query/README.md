# 📊 Biblioteca de Scripts Power Query (Linguagem M)

Repositório destinado ao armazenamento, versionamento e reutilização de consultas e funções personalizadas em **Linguagem M** para **Microsoft Excel**.

---

## 📁 Estrutura do Repositório

```text
├── codigo-geral.m          # Script base (loader) para importar consultas no Excel
├── scripts/                # Consultas completas de ETL (extração e tratamento)
│   └── exemplo-etl.m
├── funcoes/                # Funções personalizadas reutilizáveis (fx)
│   └── fxLimparTexto.m
└── README.md               # Documentação de uso
```

---

## 🚀 Como utilizar no Excel

Para executar qualquer script deste repositório diretamente na sua planilha sem precisar copiar e colar todo o código, utilize o arquivo **`codigo-geral.m`** como ponte.

### Passo 1: Obter o link do script
1. Navegue até o arquivo `.m` desejado neste repositório.
2. Clique no botão **Raw** (no canto superior direito da visualização do código).
3. Copie a URL gerada na barra de endereços do navegador (ela começará com `https://githubusercontent.com...`).

> **Nota para uso offline/local:** Caso tenha clonado este repositório na sua máquina, você pode usar o caminho local do arquivo (ex: `C:\GitHub\seu-repo\scripts\arquivo.m`) no lugar da URL.

### Passo 2: Configurar a Consulta no Excel
1. No Excel, acesse a aba **Dados** > **Obter Dados** > **De Outras Fontes** > **Consulta Nula**.
2. No Editor do Power Query, clique em **Editor Avançado** (aba Página Inicial).
3. Cole o conteúdo do arquivo **`codigo-geral.m`**, substituindo a URL de exemplo pelo link **Raw** copiado no Passo 1:

```powerquery
let
    // 1. Informe a URL Raw do GitHub (ou caminho local)
    URL = "https://githubusercontent.comSEU-USUARIO/SEU-REPOSITORIO/main/scripts/nome-do-script.m",
    
    // 2. Lê o conteúdo do arquivo como texto
    CodigoTexto = Text.FromBinary(Web.Contents(URL)),
    
    // Caso utilize arquivo local, comente a linha acima e use a linha abaixo:
    // CodigoTexto = Text.FromBinary(File.Contents("C:\caminho\local\nome-do-script.m")),

    // 3. Executa o código M no ambiente atual do Excel
    Resultado = Expression.Evaluate(CodigoTexto, #shared)
in
    Resultado
```

4. Clique em **Concluído**.

---

## ⚙️ Configurações Obrigatórias (Primeira Execução)

Ao rodar o script pela primeira vez em uma planilha nova, o Excel solicitará duas liberações de segurança:

1. **Credenciais de Acesso:**
   * Na barra amarela de aviso, clique em **Editar Credenciais**.
   * Selecione **Anônimo** (para links públicos do GitHub) ou **Windows** (para arquivos locais) e clique em **Conectar**.
2. **Níveis de Privacidade (`Formula.Firewall`):**
   * Como o script combina uma fonte web/local (código) com os dados da sua planilha, o Excel pode bloquear a execução por segurança.
   * Vá em **Arquivo** > **Opções e Configurações** > **Opções do Query**.
   * No menu lateral, acesse **GLOBAL** > **Privacidade**.
   * Marque a opção **"Sempre ignorar as configurações de Nível de Privacidade"** e clique em **OK**.

---

## 📌 Boas Práticas de Contribuição

* **Sem dados sensíveis:** Nunca suba planilhas, bases de dados (`.xlsx`, `.csv`), senhas ou caminhos de rede confidenciais nos scripts.
* **Nomenclatura:**
  * Use o prefixo `fx` para funções personalizadas (ex: `fxFormatarCNPJ.m`).
  * Use nomes descritivos e sem espaços ou acentos para consultas (ex: `tratamento-vendas-mensal.m`).
* **Parâmetros:** Sempre que um script depender de uma pasta ou arquivo específico do usuário, deixe isso claro nos comentários iniciais do arquivo `.m`.
