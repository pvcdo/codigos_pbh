import base64
import io
import os
import requests
from datetime import datetime
import pandas as pd
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.primitives import padding

# Importa o arquivo de variáveis de ambiente
try:
    import env
except ImportError:
    pass

# Importa a lista de configurações do arquivo separado
from config_planilhas import PLANILHAS_CONFIG


def decriptografar_csv(conteudo_base64: str, chave: bytes, iv: bytes) -> str:
    """Decodifica a string Base64 e descriptografa via AES-256-CBC."""
    dados_encriptados = base64.b64decode(conteudo_base64)

    cipher = Cipher(algorithms.AES(chave), modes.CBC(iv))
    decryptor = cipher.decryptor()
    
    dados_com_padding = decryptor.update(dados_encriptados) + decryptor.finalize()

    unpadder = padding.PKCS7(128).unpadder()
    dados_decriptados = unpadder.update(dados_com_padding) + unpadder.finalize()

    return dados_decriptados.decode("utf-8")


def processar_todas_as_planilhas():
    # ==========================================================================
    # 1. CONFIGURAÇÃO DE DIRETÓRIOS E REGISTRO DE LOG
    # ==========================================================================
    diretorio_base = 'F:/COORDENAÇÃO DE CADM/Inteligência/Paulo/Planilhas GEASF'
    diretorio_planilhas = os.path.join(diretorio_base, 'planilhas')
    diretorio_logs = os.path.join(diretorio_base, 'logs')

    # Cria as pastas caso ainda não existam
    os.makedirs(diretorio_planilhas, exist_ok=True)
    os.makedirs(diretorio_logs, exist_ok=True)

    # Identificação única por Data e Hora no nome do arquivo
    data_inicio = datetime.now()
    timestamp_nome = data_inicio.strftime("%Y-%m-%d_%H-%M-%S")
    caminho_log = os.path.join(diretorio_logs, f"log_execucao_{timestamp_nome}.txt")

    def registrar_log(mensagem: str):
        """Imprime a mensagem no console e salva no arquivo de log simultaneamente."""
        print(mensagem)
        with open(caminho_log, "a", encoding="utf-8") as f_log:
            f_log.write(mensagem + "\n")

    # Cabeçalho do Log
    registrar_log("=" * 65)
    registrar_log("LOG DE EXECUÇÃO - EXTRAÇÃO DE PLANILHAS CRIPTOGRAFADAS")
    registrar_log(f"Data/Hora de Início: {data_inicio.strftime('%d/%m/%Y %H:%M:%S')}")
    registrar_log(f"Total de planilhas na fila: {len(PLANILHAS_CONFIG)}")
    registrar_log("=" * 65)

    # ==========================================================================
    # 2. CARREGAMENTO DE CHAVES E PROCESSAMENTO
    # ==========================================================================
    secret_crypto = os.environ.get('secret_crypto')
    iv_crypto = os.environ.get('iv_crypto') or os.environ.get('secret_crypto_iv')

    if not secret_crypto or not iv_crypto:
        erro_chaves = "ERRO CRÍTICO: Variáveis 'secret_crypto' ou 'iv_crypto' não foram encontradas no ambiente."
        registrar_log(f"\n❌ {erro_chaves}")
        raise ValueError(erro_chaves)

    KEY = secret_crypto.encode('utf-8')
    IV = iv_crypto.encode('utf-8')

    sucessos = 0
    falhas = 0

    for idx, item in enumerate(PLANILHAS_CONFIG, start=1):
        nome_arquivo = item.get("nome_arquivo")
        url_api = item.get("url")

        registrar_log(f"\n[{idx}/{len(PLANILHAS_CONFIG)}] Processando: '{nome_arquivo}'")
        registrar_log(f" 🔗 URL: {url_api}")

        try:
            response = requests.get(url_api, allow_redirects=True, timeout=30)

            if response.status_code != 200:
                raise RuntimeError(f"HTTP Status {response.status_code} - {response.text}")

            texto_resposta = response.text.strip()

            if texto_resposta.startswith("<") or "<html" in texto_resposta.lower():
                raise ValueError("A resposta da API retornou uma página HTML de erro/login.")

            if texto_resposta.startswith("Erro:"):
                raise RuntimeError(f"Erro retornado pelo Apps Script: {texto_resposta}")

            # Descriptografia
            csv_resultado = decriptografar_csv(texto_resposta, KEY, IV)

            # Salvar o arquivo CSV no diretório das planilhas
            caminho_arquivo_csv = os.path.join(diretorio_planilhas, nome_arquivo)
            with open(caminho_arquivo_csv, "w", encoding="utf-8") as f:
                f.write(csv_resultado)

            # Contagem de registros via Pandas
            df = pd.read_csv(io.StringIO(csv_resultado))
            registrar_log(f" ✅ Salvo em: {caminho_arquivo_csv}")
            registrar_log(f" 📊 Registros: {len(df)} linhas | {len(df.columns)} colunas")
            
            sucessos += 1

        except Exception as e:
            registrar_log(f" ❌ FALHA ao processar '{nome_arquivo}': {e}")
            falhas += 1

    # ==========================================================================
    # 3. RESUMO DA EXECUÇÃO
    # ==========================================================================
    data_fim = datetime.now()
    duracao = data_fim - data_inicio

    registrar_log("\n" + "=" * 65)
    registrar_log("RESUMO DA EXECUÇÃO")
    registrar_log(f"Data/Hora de Término: {data_fim.strftime('%d/%m/%Y %H:%M:%S')}")
    registrar_log(f"Duração Total: {duracao}")
    registrar_log(f"Sucessos: {sucessos} | Falhas: {falhas}")
    registrar_log("=" * 65)
    registrar_log(f"\n📄 Log salvo em: {caminho_log}")


if __name__ == "__main__":
    processar_todas_as_planilhas()