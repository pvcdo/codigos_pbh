/**
 * ============================================================
 * Constantes.gs
 * Configurações gerais do sistema
 * ============================================================
 */


/**
 * Planilhas
 */
const CONFIG = {

  ABA_BASE: "Base",

  ABA_ARTE_BETA: "Arte_Beta",

  ID_ARTE_BETA: "1GXZ-dWfg5cDkXu5uMH1CpcERCZ8A3BRQdCJ6n9DtN4w",

  PRIMEIRA_LINHA_DADOS: 3,

  CABECALHO: 2

};



/**
 * Tipos de Processo
 */
const PROCESSOS = [

  "PPA",

  "PAD",

  "SUSPAD",

  "TAD",

  "Acordo Subs"

];



/**
 * Status
 */
const STATUS = [

  "Instauração PAD",

  "Absolvição",

  "Demissão",

  "Multa",

  "Nulidade",

  "Penalidade",

  "Repreensão",

  "Recisão Contratual",

  "Suspensão",

  "Arquivamento"

];



/**
 * Responsáveis
 */
const RESPONSAVEIS = [

  "Karen",

  "Rafaela",

  "Juliana"

];



/**
 * Motivações
 */
const MOTIVACOES = [

"Ausentar-se do trabalho, sem se justificar legalmente, por mais de 30 (trinta) dias consecutivos",

"Deixar de observar as leis, os regulamentos e o Código de Ética",

"Deixar de manter assiduidade e pontualidade no serviço",

"Deixar de trajar uniforme e usar equipamento de proteção e segurança, quando exigidos",

"Deixar de desempenhar com zelo e presteza as atribuições do cargo ou função",

"Deixar de participar de atividades de aperfeiçoamento ou especialização",

"Deixar de discutir questões relacionadas às condições de trabalho e às finalidades da administração pública",

"Deixar de sugerir providências tendentes à melhoria do serviço",

"Deixar de cumprir fielmente as ordens superiores, salvo se manifestamente ilegais",

"Deixar de guardar sigilo sobre assunto da repartição",

"Deixar de zelar pela economia do material sob sua guarda ou utilização e pela conservação do patrimônio público",

"Deixar de atender com presteza e satisfatoriamente",

"Deixar de tratar a todos com urbanidade",

"Deixar de manter conduta compatível com a moralidade administrativa",

"Exercer, durante o horário de trabalho, atividade a ele estranha, negligenciando o serviço e prejudicando seu bom desempenho",

"Deixar de comparecer ao serviço sem justificativa legal",

"Cometer a outro servidor atribuições estranhas ao cargo que ocupa, exceto em situações de emergência e transitórias",

"Cometer a pessoa estranha à repartição, fora dos casos previstos em lei, o desempenho de atribuição que seja de responsabilidade sua ou de subordinado",

"Recusar fé a documento público",

"Opor resistência injustificada ao andamento de documento e processo ou à execução de serviço",

"Ofender a dignidade ou o decoro de colega, de particular ou propalar ofensas",

"Utilizar pessoal ou recursos materiais da repartição em serviços ou atividades particulares",

"Praticar ato contra expressa disposição de lei ou deixar de praticá-lo, em descumprimento de dever funcional, em benefício próprio ou alheio",

"Deixar de observar a lei em prejuízo alheio ou da administração pública",

"Praticar ato de nepotismo ou que envolva conflito de interesse",

"Valer-se do cargo para lograr proveito pessoal ou de outrem",

"Fazer contratos com o poder público, por si ou como representante de outrem",

"Exercer quaisquer atividades que sejam incompatíveis com o exercício do cargo ou função e com o horário de trabalho",

"Atuar, como procurador ou intermediário, junto à repartição pública, salvo quando se tratar de benefícios previdenciários ou assistenciais de parentes até o terceiro grau, de cônjuge ou companheiro",

"Receber propina, comissão, presente ou vantagem de qualquer espécie, em razão de suas atribuições",

"Praticar usura em qualquer de suas formas",

"Proceder de forma desidiosa",

"Praticar litigância de má-fé no âmbito da CTGM",

"Incontinência, má conduta ou mau procedimento",

"Insubordinação grave em serviço",

"Ofensa física, em serviço, a servidor ou a particular, salvo em legítima defesa",

"Crimes contra a dignidade sexual e crime de corrupção de menores, em serviço ou na repartição",

"Aplicação irregular de dinheiro público",

"Revelação de segredo do qual se apropriou em razão do cargo ou função, para lograr proveito próprio ou alheio",

"Lesão aos cofres públicos",

"Dilapidação do patrimônio público",

"Corrupção",

"Acumulação ilícita de cargo, emprego ou função pública, desde que provada a má-fé do servidor",

"Inassiduidade habitual",

"Assédio moral ou sexual"

];



/**
 * Índices das colunas da aba Base
 * (baseados em getValues(), iniciando em 0)
 */
const COL = {

  PROCESSO: 0,

  PDG: 2,

  ID_PROCESSO: 3,

  DATA_RECEBIMENTO: 4,

  RESPONSAVEL: 6,

  BM: 7,

  NOME: 8,

  CARGO: 9,

  LOTACAO: 11,

  REGIONAL: 12,

  VINCULO: 13,

  SITUACAO_FUNCIONAL: 14,

  DATA_ENCAMINHAMENTO: 15,

  MOTIVACAO: 17,

  STATUS: 19,

  ENCAMINHADO_PARA: 20,

  PUBLICACAO_DOM: 22,

  OBSERVACOES: 23

};



/**
 * Campos do formulário
 */
const CAMPOS = [

  "processo",

  "pdg",

  "idProcesso",

  "dataRecebimento",

  "bm",

  "nome",

  "cargo",

  "lotacao",

  "regional",

  "vinculo",

  "situacaoFuncional",

  "dataEncaminhamento",

  "encaminhadoPara",

  "status",

  "motivacao",

  "responsavel",

  "publicacaoDOM",

  "observacoes"

];
