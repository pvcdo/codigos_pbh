import os
import re
import warnings
import time  # Nova importação para controlar o tempo
import pandas as pd
import oracledb
from dotenv import load_dotenv

# Silencia o aviso chato do Pandas sobre o SQLAlchemy
warnings.filterwarnings("ignore", category=UserWarning)

load_dotenv()

# Configura os dados de conexão
dsn = "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=exacc01-scan.pbh)(PORT=1521))(CONNECT_DATA=(SERVICE_NAME=DWPRD.pbh)))"
usuario = os.getenv("USUARIO")
senha = os.getenv("SENHA")

print("Buscando dados no banco Oracle... Isso pode demorar um pouco.")

# LIGA O CRONÔMETRO
tempo_inicial = time.time()

# Conecta e extrai os dados
with oracledb.connect(user=usuario, password=senha, dsn=dsn) as conexao:
    query = query = """
                        SELECT * FROM BC_ARTERH.dados_pessoa_bi_saude 
                        WHERE 
                        --TIPO_CONTRATO = '0211' AND 
                        --TO_DATE(DATA_ADMISSAO DEFAULT NULL ON CONVERSION ERROR, 'DD/MM/YYYY') >= TO_DATE('01/01/2021', 'DD/MM/YYYY') AND
                        DESCRICAO_FUNCAO_PUBLICA LIKE 'GERENTE DE UNIDADE%'

                    """
    df = pd.read_sql(query, con=conexao)

# Função mágica atualizada: limpa caracteres inválidos, quebras de linha e espaços extras
def limpar_texto(valor):
    if isinstance(valor, str):
        # 1. Remove caracteres de controle invisíveis
        valor = re.sub(r'[\x00-\x08\x0b\x0c\x0e-\x1f]', '', valor)
        # 2. Substitui quebras de linha (\n ou \r) por um espaço simples
        valor = re.sub(r'[\r\n]+', ' ', valor)
        # 3. Remove espaços inúteis no início e no fim do texto
        return valor.strip()
    return valor

# Aplica a limpeza completa em todas as células do DataFrame
df = df.map(limpar_texto)

print("Exportando para o arquivo Excel...")
# Salva direto em um arquivo Excel na sua Área de Trabalho
df.to_csv(r"F:\COORDENAÇÃO DE CADM\Inteligência\Relatorios ARTE\admp-sql.csv", index=False)

print("🚀 Processo concluído! Dados exportados com sucesso!")

# DESLIGA O CRONÔMETRO
tempo_final = time.time()

# Faz o cálculo do tempo gasto
tempo_total_segundos = tempo_final - tempo_inicial
minutos, segundos = divmod(tempo_total_segundos, 60)

print(f"✅ Busca concluída com sucesso!")
print(f"⏱️ Tempo de resposta do banco: {int(minutos)} min e {int(segundos)} seg")
print(f"📊 Total de linhas carregadas: {len(df)}")
print("-" * 50)