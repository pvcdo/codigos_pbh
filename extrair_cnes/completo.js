const fs = require('node:fs');
const path = require('node:path');
const ExcelJS = require('exceljs');
const yauzl = require('yauzl');
const yazl = require('yazl');

const unidades = [
  "CENTRO%20DE%20SAUDE%20AARAO%20REIS",
"CENTRO%20DE%20SAUDE%20ALAMEDA%20DOS%20IPES",
"CENTRO%20DE%20SAUDE%20ALCIDES%20LINS",
"CENTRO%20DE%20SAUDE%20ALTO%20VERA%20CRUZ",
"CENTRO%20DE%20SAUDE%20AMILCAR%20VIANNA%20MARTINS",
"CENTRO%20DE%20SAUDE%20ANDRADAS",
"CENTRO%20DE%20SAUDE%20BARREIRO%20DE%20CIMA",
"CENTRO%20DE%20SAUDE%20BETANIA",
"CENTRO%20DE%20SAUDE%20BOA%20VISTA",
"CENTRO%20DE%20SAUDE%20BOM%20JESUS",
"CENTRO%20DE%20SAUDE%20BONSUCESSO",
"CENTRO%20DE%20SAUDE%20CABANA",
"CENTRO%20DE%20SAUDE%20CACHOEIRINHA",
"CENTRO%20DE%20SAUDE%20CAFEZAL",
"CENTRO%20DE%20SAUDE%20CALIFORNIA",
"CENTRO%20DE%20SAUDE%20CAMARGOS",
"CENTRO%20DE%20SAUDE%20CAMPO%20ALEGRE",
"CENTRO%20DE%20SAUDE%20CAPITAO%20EDUARDO",
"CENTRO%20DE%20SAUDE%20CARLOS%20CHAGAS",
"CENTRO%20DE%20SAUDE%20CARLOS%20PRATES",
"CENTRO%20DE%20SAUDE%20CARLOS%20RENATO%20DIAS",
"CENTRO%20DE%20SAUDE%20CEU%20AZUL",
"CENTRO%20DE%20SAUDE%20CICERO%20ILDEFONSO",
"CENTRO%20DE%20SAUDE%20CIDADE%20OZANAN",
"CENTRO%20DE%20SAUDE%20CONFISCO",
"CENTRO%20DE%20SAUDE%20CONJUNTO%20BETANIA",
"CENTRO%20DE%20SAUDE%20CONJUNTO%20PAULO%20VI",
"CENTRO%20DE%20SAUDE%20CONJUNTO%20SANTA%20MARIA",
"CENTRO%20DE%20SAUDE%20COPACABANA",
"CENTRO%20DE%20SAUDE%20COQUEIROS",
"CENTRO%20DE%20SAUDE%20DIAMANTE%20TEIXEIRA%20DIAS",
"CENTRO%20DE%20SAUDE%20DOM%20BOSCO",
"CENTRO%20DE%20SAUDE%20DOM%20CABRAL",
"CENTRO%20DE%20SAUDE%20DOM%20JOAQUIM",
"CENTRO%20DE%20SAUDE%20DOM%20ORIONE",
"CENTRO%20DE%20SAUDE%20DR%20JOSE%20DOMINGOS",
"CENTRO%20DE%20SAUDE%20EDUARDO%20MAURO%20DE%20ARAUJO%20MIRAMAR",
"CENTRO%20DE%20SAUDE%20EFIGENIA%20MURTA%20DE%20FIGUEIREDO",
"CENTRO%20DE%20SAUDE%20ERMELINDA",
"CENTRO%20DE%20SAUDE%20ETELVINA%20CARNEIRO",
"CENTRO%20DE%20SAUDE%20FABIO%20CORREA%20LIMA",
"CENTRO%20DE%20SAUDE%20FELICIDADE%20II",
"CENTRO%20DE%20SAUDE%20FLORAMAR",
"CENTRO%20DE%20SAUDE%20FRANCISCO%20GOMES%20BARBOSA%20TIROL",
"CENTRO%20DE%20SAUDE%20GENTIL%20GOMES",
"CENTRO%20DE%20SAUDE%20GLORIA",
"CENTRO%20DE%20SAUDE%20GOIANIA",
"CENTRO%20DE%20SAUDE%20GRANJA%20DE%20FREITAS",
"CENTRO%20DE%20SAUDE%20GUARANI",
"CENTRO%20DE%20SAUDE%20HAVAI",
"CENTRO%20DE%20SAUDE%20HELIOPOLIS",
"CENTRO%20DE%20SAUDE%20HORTO",
"CENTRO%20DE%20SAUDE%20INDEPENDENCIA",
"CENTRO%20DE%20SAUDE%20ITAIPU%20JATOBA",
"CENTRO%20DE%20SAUDE%20ITAMARATI",
"CENTRO%20DE%20SAUDE%20JAQUELINE",
"CENTRO%20DE%20SAUDE%20JAQUELINE%20II",
"CENTRO%20DE%20SAUDE%20JARDIM%20ALVORADA",
"CENTRO%20DE%20SAUDE%20JARDIM%20COMERCIARIOS",
"CENTRO%20DE%20SAUDE%20JARDIM%20EUROPA",
"CENTRO%20DE%20SAUDE%20JARDIM%20FELICIDADE",
"CENTRO%20DE%20SAUDE%20JARDIM%20FILADELFIA",
"CENTRO%20DE%20SAUDE%20JARDIM%20GUANABARA",
"CENTRO%20DE%20SAUDE%20JARDIM%20LEBLON",
"CENTRO%20DE%20SAUDE%20JARDIM%20MONTANHES",
"CENTRO%20DE%20SAUDE%20JOAO%20PINHEIRO",
"CENTRO%20DE%20SAUDE%20JOAO%20VITAL",
"CENTRO%20DE%20SAUDE%20JOAO%20XXIII",
"CENTRO%20DE%20SAUDE%20LAGOA",
"CENTRO%20DE%20SAUDE%20LAJEDO",
"CENTRO%20DE%20SAUDE%20LEOPOLDO%20CHRISOSTOMO%20DE%20CASTRO",
"CENTRO%20DE%20SAUDE%20LISANDRA%20ANGELICA%20DAVID%20JUSTINO",
"CENTRO%20DE%20SAUDE%20MANGUEIRAS",
"CENTRO%20DE%20SAUDE%20MANTIQUEIRA",
"CENTRO%20DE%20SAUDE%20MARCELO%20PONTEL%20GOMES",
"CENTRO%20DE%20SAUDE%20MARCO%20ANTONIO%20DE%20MENEZES",
"CENTRO%20DE%20SAUDE%20VILA%20PINHO",
"CENTRO%20DE%20SAUDE%20MARIA%20GORETTI%20IPE",
"CENTRO%20DE%20SAUDE%20MARIA%20MADALENA%20TEODORO%20LINDEIA",
"CENTRO%20DE%20SAUDE%20MARIANO%20DE%20ABREU",
"CENTRO%20DE%20SAUDE%20MARIVANDA%20BALEEIRO",
"CENTRO%20DE%20SAUDE%20MENINO%20JESUS",
"CENTRO%20DE%20SAUDE%20MG20",
"CENTRO%20DE%20SAUDE%20MILIONARIOS",
"CENTRO%20DE%20SAUDE%20MINAS%20CAIXA",
"CENTRO%20DE%20SAUDE%20NAZARE",
"CENTRO%20DE%20SAUDE%20NORALDINO%20DE%20LIMA",
"CENTRO%20DE%20SAUDE%20NOSSA%20SENHORA%20APARECIDA",
"CENTRO%20DE%20SAUDE%20NOSSA%20SENHORA%20DE%20FATIMA",
"CENTRO%20DE%20SAUDE%20NOVA%20YORK",
"CENTRO%20DE%20SAUDE%20NOVO%20AARAO%20REIS",
"CENTRO%20DE%20SAUDE%20NOVO%20HORIZONTE",
"CENTRO%20DE%20SAUDE%20OLAVO%20ALBINO%20CORREIA",
"CENTRO%20DE%20SAUDE%20OSWALDO%20CRUZ",
"CENTRO%20DE%20SAUDE%20OURO%20PRETO",
"CENTRO%20DE%20SAUDE%20PADRE%20EUSTAQUIO",
"CENTRO%20DE%20SAUDE%20PADRE%20FERNANDO%20DE%20MELO",
"CENTRO%20DE%20SAUDE%20PADRE%20JOAQUIM%20MAIA",
"CENTRO%20DE%20SAUDE%20PADRE%20TARCISIO",
"CENTRO%20DE%20SAUDE%20PADRE%20TIAGO",
"CENTRO%20DE%20SAUDE%20PALMEIRAS",
"CENTRO%20DE%20SAUDE%20PARAISO",
"CENTRO%20DE%20SAUDE%20PARAUNA",
"CENTRO%20DE%20SAUDE%20PARQUE%20CENTENARIO",
"CENTRO%20DE%20SAUDE%20PEDREIRA%20PRADO%20LOPES",
"CENTRO%20DE%20SAUDE%20PILAR%20OLHOS%20DAGUA",
"CENTRO%20DE%20SAUDE%20PINDORAMA%20ELZA%20MARTINS",
"CENTRO%20DE%20SAUDE%20PIRATININGA",
"CENTRO%20DE%20SAUDE%20POMPEIA",
"CENTRO%20DE%20SAUDE%20PRIMEIRO%20DE%20MAIO",
"CENTRO%20DE%20SAUDE%20PROVIDENCIA",
"CENTRO%20DE%20SAUDE%20REGINA",
"CENTRO%20DE%20SAUDE%20RIBEIRO%20DE%20ABREU",
"CENTRO%20DE%20SAUDE%20RIO%20BRANCO",
"CENTRO%20DE%20SAUDE%20SALGADO%20FILHO",
"CENTRO%20DE%20SAUDE%20SANTA%20AMELIA",
"CENTRO%20DE%20SAUDE%20SANTA%20CECILIA",
"CENTRO%20DE%20SAUDE%20SANTA%20INES",
"CENTRO%20DE%20SAUDE%20SANTA%20LUCIA",
"CENTRO%20DE%20SAUDE%20SANTA%20MARIA",
"CENTRO%20DE%20SAUDE%20SANTA%20MONICA",
"CENTRO%20DE%20SAUDE%20SANTA%20RITA%20DE%20CASSIA",
"CENTRO%20DE%20SAUDE%20SANTA%20ROSA",
"CENTRO%20DE%20SAUDE%20SANTA%20TEREZINHA",
"CENTRO%20DE%20SAUDE%20SANTO%20ANTONIO",
"CENTRO%20DE%20SAUDE%20SANTOS%20ANJOS",
"CENTRO%20DE%20SAUDE%20SAO%20BERNARDO",
"CENTRO%20DE%20SAUDE%20SAO%20CRISTOVAO",
"CENTRO%20DE%20SAUDE%20SAO%20FRANCISCO",
"CENTRO%20DE%20SAUDE%20SAO%20GERALDO",
"CENTRO%20DE%20SAUDE%20SAO%20JORGE",
"CENTRO%20DE%20SAUDE%20SAO%20JOSE",
"CENTRO%20DE%20SAUDE%20SAO%20JOSE%20OPERARIO",
"CENTRO%20DE%20SAUDE%20SAO%20MARCOS",
"CENTRO%20DE%20SAUDE%20SAO%20MIGUEL%20ARCANJO",
"CENTRO%20DE%20SAUDE%20SAO%20PAULO",
"CENTRO%20DE%20SAUDE%20SAO%20TOMAS",
"CENTRO%20DE%20SAUDE%20SERRA%20VERDE",
"CENTRO%20DE%20SAUDE%20SERRANO",
"CENTRO%20DE%20SAUDE%20TAQUARIL",
"CENTRO%20DE%20SAUDE%20TIA%20AMANCIA",
"CENTRO%20DE%20SAUDE%20TREVO",
"CENTRO%20DE%20SAUDE%20TUPI",
"CENTRO%20DE%20SAUDE%20URUCUIA",
"CENTRO%20DE%20SAUDE%20VALE%20DO%20JATOBA",
"CENTRO%20DE%20SAUDE%20VENTOSA",
"CENTRO%20DE%20SAUDE%20VERA%20CRUZ",
"CENTRO%20DE%20SAUDE%20VILA%20CEMIG",
"CENTRO%20DE%20SAUDE%20VILA%20IMPERIAL",
"CENTRO%20DE%20SAUDE%20VILA%20LEONINA",
"CENTRO%20DE%20SAUDE%20VILA%20MARIA",
"CENTRO%20DE%20SAUDE%20VISTA%20ALEGRE",
"CENTRO%20DE%20SAUDE%20WALDOMIRO%20LOBO",
"CENTRO%20DE%20SAUDE%20ZILAH%20SPOSITO",
]

const competencias = [
  202401,
  202402,
  202403,
  202404,
  202405,
  202406,
  202407,
  202408,
  202409,
  202410,
  202411,
  202412
]

const CAMINHO_PLANILHA =
  process.env.CNES_PLANILHA || String.raw`C:\usuarios\pr114067\Desktop\Desktop\codigos\dados.xlsx`;
const NOME_ABA = 'profissionais';
const CONCORRENCIA_UNIDADES = 5;
const CABECALHOS = [
  'Código CNES',
  'Unidade',
  'CNS',
  'Competência',
  'Equipe',
  'Profissional',
  'CH outros',
  'CH ambulatorial',
  'CH hospitalar',
  'Data de entrada',
  'Data de desligamento'
];

const cabecalhosRequisicao = {
  Accept: 'application/json, text/plain, */*',
  Cookie:
    'TS0142589a=01e9f7e51f3e494b591fcc8da0ba7ec660b086ea86ef78096fa03ccd1572116cb278a6a180c181e0682b50c487cca885b0bf6cb7bc; TS42893502027=08b6e4e1d8ab2000e016ca9637bb948c4815dcd8ec6e1a774cf4d3c3d5d27ceacc12e540c722c30a0883be1fe3113000072deb4f5a1dccc75bde21c08dab69801cf19813801d5b4edf7122d29dd578a83ce6888f3e39f1b754f938636fd11995'
};

async function buscarArray(url, referer, contexto) {
  let resposta;
  try {
    resposta = await fetch(url, {
      headers: { ...cabecalhosRequisicao, Referer: referer }
    });
  } catch (erro) {
    throw new Error(`${contexto}: falha ao acessar ${url}.`, { cause: erro });
  }

  if (!resposta.ok) {
    throw new Error(`${contexto}: resposta HTTP ${resposta.status} (${url})`);
  }

  let dados;
  try {
    dados = await resposta.json();
  } catch (erro) {
    throw new Error(`${contexto}: a resposta não contém JSON válido.`, { cause: erro });
  }

  if (!Array.isArray(dados)) {
    throw new Error(`${contexto}: a resposta da API não é uma lista.`);
  }

  return dados;
}

async function processarComConcorrencia(itens, limite, processar) {
  let proximoIndice = 0;
  const quantidadeWorkers = Math.min(limite, itens.length);

  const resultados = await Promise.allSettled(
    Array.from({ length: quantidadeWorkers }, async () => {
      while (proximoIndice < itens.length) {
        const indice = proximoIndice++;
        await processar(itens[indice]);
      }
    })
  );
  const resultadoComErro = resultados.find(resultado => resultado.status === 'rejected');
  if (resultadoComErro) {
    throw resultadoComErro.reason;
  }
}

async function buscarProfissionaisDaUnidade(unidade, worksheet, contador) {
  const urlUnidades =
    'https://cnes.datasus.gov.br/services/estabelecimentos?nome=' + unidade;
  const dadosUnidades = await buscarArray(
    urlUnidades,
    'https://cnes.datasus.gov.br/pages/estabelecimentos/consulta.jsp?search=' + unidade,
    `Consulta da unidade ${unidade}`
  );

  for (const unidadeEncontrada of dadosUnidades) {
    const idUnidade = unidadeEncontrada.id;

    for (const competencia of competencias) {
      const urlEquipes =
        'https://cnes.datasus.gov.br/services/estabelecimentos-equipes/' +
        idUnidade +
        '?competencia=' +
        competencia;
      const refererEquipes =
        'https://cnes.datasus.gov.br/pages/estabelecimentos/ficha/equipes/' +
        idUnidade +
        '?comp=' +
        competencia;
      const equipes = await buscarArray(
        urlEquipes,
        refererEquipes,
        `Consulta das equipes do CNES ${idUnidade}, competência ${competencia}`
      );

      for (const equipe of equipes) {
        const parametros = new URLSearchParams({
          coMun: '310620',
          coArea: equipe.coArea,
          coEquipe: equipe.coEquipe,
          competencia: String(competencia)
        });
        const urlProfissionais =
          'https://cnes.datasus.gov.br/services/estabelecimentos-equipes/profissionais/' +
          idUnidade +
          '?' +
          parametros;
        const profissionais = await buscarArray(
          urlProfissionais,
          refererEquipes,
          `Consulta dos profissionais da equipe ${equipe.coEquipe}, competência ${competencia}`
        );

        for (const profissional of profissionais) {
          worksheet.addRow([
            idUnidade,
            unidadeEncontrada.noFantasia || '',
            profissional.cns || '',
            competencia,
            equipe.nomeEquipe || '',
            profissional.noProfissional || '',
            profissional.chOutros || '',
            profissional.chAmb || '',
            profissional.chHosp || '',
            profissional.dtEntrada || '',
            profissional.dtDesligamento || ''
          ]).commit();
            contador.quantidade += 1;
        }
      }

      console.log(
        `Competência ${competencia} consultada para ${unidadeEncontrada.noFantasia || idUnidade}`
      );
    }

    console.log(`Unidade consultada: ${unidadeEncontrada.noFantasia || idUnidade}`);
  }
}

function abrirZip(caminho) {
  return new Promise((resolve, reject) => {
    yauzl.open(caminho, { lazyEntries: true, autoClose: false }, (erro, zipfile) => {
      if (erro) {
        reject(erro);
        return;
      }
      resolve(zipfile);
    });
  });
}

function lerEntradaZip(caminho, nomeEntrada) {
  return new Promise((resolve, reject) => {
    abrirZip(caminho).then(zipfile => {
      let concluido = false;
      const finalizar = (erro, conteudo) => {
        if (concluido) return;
        concluido = true;
        zipfile.close();
        if (erro) {
          reject(erro);
        } else {
          resolve(conteudo);
        }
      };

      zipfile.on('error', erro => finalizar(erro));
      zipfile.on('end', () => finalizar(null, null));
      zipfile.on('entry', entrada => {
        if (entrada.fileName !== nomeEntrada) {
          zipfile.readEntry();
          return;
        }

        zipfile.openReadStream(entrada, (erro, stream) => {
          if (erro) {
            finalizar(erro);
            return;
          }
          const partes = [];
          stream.on('data', parte => partes.push(parte));
          stream.on('error', erroStream => finalizar(erroStream));
          stream.on('end', () => finalizar(null, Buffer.concat(partes).toString('utf8')));
        });
      });

      zipfile.readEntry();
    }).catch(reject);
  });
}

function atributosXml(tag) {
  const atributos = {};
  const regex = /([A-Za-z_][\w:.-]*)="([^"]*)"/g;
  let resultado;
  while ((resultado = regex.exec(tag)) !== null) {
    atributos[resultado[1]] = resultado[2]
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&apos;/g, "'");
  }
  return atributos;
}

async function obterCaminhoAbaNoXlsx(caminho, nomeAba) {
  const [workbookXml, relacoesXml] = await Promise.all([
    lerEntradaZip(caminho, 'xl/workbook.xml'),
    lerEntradaZip(caminho, 'xl/_rels/workbook.xml.rels')
  ]);
  if (!workbookXml || !relacoesXml) {
    throw new Error('O arquivo de destino não contém a estrutura esperada de um XLSX.');
  }

  const abas = Array.from(workbookXml.matchAll(/<sheet\b[^>]*\/?>/g))
    .map(([tag]) => atributosXml(tag));
  const aba = abas.find(item => item.name === nomeAba);
  if (!aba || !aba['r:id']) {
    throw new Error(`A aba "${nomeAba}" não foi encontrada em ${caminho}.`);
  }

  const relacoes = Array.from(relacoesXml.matchAll(/<Relationship\b[^>]*\/?>/g))
    .map(([tag]) => atributosXml(tag));
  const relacao = relacoes.find(item => item.Id === aba['r:id']);
  if (!relacao || !relacao.Target) {
    throw new Error(`Não foi possível localizar o arquivo XML da aba "${nomeAba}".`);
  }

  const caminhoAba = relacao.Target.startsWith('/')
    ? path.posix.normalize(relacao.Target.slice(1))
    : path.posix.normalize(path.posix.join('xl', relacao.Target));
  if (!caminhoAba.startsWith('xl/')) {
    throw new Error(`O caminho XML da aba "${nomeAba}" é inválido.`);
  }

  const caminhoRelacoesAba = path.posix.join(
    path.posix.dirname(caminhoAba),
    '_rels',
    `${path.posix.basename(caminhoAba)}.rels`
  );
  const relacoesAba = await lerEntradaZip(caminho, caminhoRelacoesAba);
  if (relacoesAba) {
    throw new Error(
      `A aba "${nomeAba}" contém objetos ou vínculos que não podem ser substituídos com segurança.`
    );
  }

  return caminhoAba;
}

async function localizarEntradaZip(zipfile, nomeEntrada) {
  return new Promise((resolve, reject) => {
    const aoFechar = erro => reject(erro);
    zipfile.on('error', aoFechar);
    zipfile.on('end', () => reject(new Error(`Entrada "${nomeEntrada}" não encontrada no XLSX temporário.`)));
    zipfile.on('entry', entrada => {
      if (entrada.fileName === nomeEntrada) {
        zipfile.removeListener('error', aoFechar);
        resolve(entrada);
      } else {
        zipfile.readEntry();
      }
    });
    zipfile.readEntry();
  });
}

async function substituirXmlDaAba(caminhoOriginal, caminhoGerado, caminhoSaida, entradaOriginal) {
  const zipOriginal = await abrirZip(caminhoOriginal);
  let zipGerado;
  let zipSaida;
  let arquivoSaida;

  try {
    zipGerado = await abrirZip(caminhoGerado);
    const entradaGerada = await localizarEntradaZip(
      zipGerado,
      'xl/worksheets/sheet1.xml'
    );
    zipSaida = new yazl.ZipFile();
    arquivoSaida = fs.createWriteStream(caminhoSaida, { flags: 'wx' });
    zipSaida.outputStream.pipe(arquivoSaida);

    await new Promise((resolve, reject) => {
      let abaEncontrada = false;
      let finalizado = false;
      const falhar = erro => {
        if (finalizado) return;
        finalizado = true;
        arquivoSaida.destroy();
        reject(erro);
      };

      arquivoSaida.once('error', falhar);
      zipSaida.outputStream.once('error', falhar);
      zipOriginal.once('error', falhar);
      zipGerado.once('error', falhar);

      arquivoSaida.once('finish', () => {
        if (finalizado) return;
        finalizado = true;
        resolve();
      });

      zipOriginal.on('entry', entrada => {
        const opcoes = {
          mtime: entrada.getLastModDate(),
          size: entrada.uncompressedSize
        };

        if (entrada.fileName === entradaOriginal) {
          abaEncontrada = true;
          zipSaida.addReadStreamLazy(
            entradaOriginal,
            {
              mtime: entrada.getLastModDate(),
              size: entradaGerada.uncompressedSize
            },
            callback => zipGerado.openReadStream(entradaGerada, callback)
          );
        } else if (entrada.fileName.endsWith('/')) {
          zipSaida.addEmptyDirectory(entrada.fileName, { mtime: entrada.getLastModDate() });
        } else {
          zipSaida.addReadStreamLazy(
            entrada.fileName,
            opcoes,
            callback => zipOriginal.openReadStream(entrada, callback)
          );
        }
        zipOriginal.readEntry();
      });

      zipOriginal.once('end', () => {
        if (!abaEncontrada) {
          falhar(new Error(`A entrada "${entradaOriginal}" não foi encontrada no arquivo original.`));
          return;
        }
        zipSaida.end();
      });
      zipOriginal.readEntry();
    });
  } finally {
    if (zipOriginal) zipOriginal.close();
    if (zipGerado) zipGerado.close();
  }
}

async function criarPlanilhaTemporaria(caminho) {
  const workbook = new ExcelJS.stream.xlsx.WorkbookWriter({
    filename: caminho,
    useStyles: false,
    useSharedStrings: false
  });
  const worksheet = workbook.addWorksheet(NOME_ABA);
  worksheet.addRow(CABECALHOS).commit();
  worksheet.autoFilter = {
    from: 'A1',
    to: `${String.fromCharCode(64 + CABECALHOS.length)}1`
  };
  return { workbook, worksheet };
}

async function main() {
  const caminhoAbaOriginal = await obterCaminhoAbaNoXlsx(CAMINHO_PLANILHA, NOME_ABA);
  const diretorioTemporario = await fs.promises.mkdtemp(
    path.join(path.dirname(CAMINHO_PLANILHA), '.cnes-export-')
  );
  const caminhoPlanilhaTemporaria = path.join(diretorioTemporario, 'profissionais.xlsx');
  const caminhoXlsxTemporario = path.join(diretorioTemporario, 'dados-atualizados.xlsx');
  let workbook;
  const contador = { quantidade: 0 };

  try {
    const planilha = await criarPlanilhaTemporaria(caminhoPlanilhaTemporaria);
    workbook = planilha.workbook;
    try {
      await processarComConcorrencia(
        unidades,
        CONCORRENCIA_UNIDADES,
        unidade => buscarProfissionaisDaUnidade(unidade, planilha.worksheet, contador)
      );
    } catch (erroConsulta) {
      try {
        await workbook.commit();
      } catch (erroGravacao) {
        throw new AggregateError(
          [erroConsulta, erroGravacao],
          'A consulta falhou e também não foi possível finalizar o arquivo temporário.'
        );
      }
      throw erroConsulta;
    }
    await workbook.commit();

    await substituirXmlDaAba(
      CAMINHO_PLANILHA,
      caminhoPlanilhaTemporaria,
      caminhoXlsxTemporario,
      caminhoAbaOriginal
    );
    await fs.promises.rename(caminhoXlsxTemporario, CAMINHO_PLANILHA);
    console.log(
      `${contador.quantidade} registros gravados na aba "${NOME_ABA}" de: ${CAMINHO_PLANILHA}`
    );
  } finally {
    await fs.promises.rm(diretorioTemporario, { recursive: true, force: true });
  }
}

main().catch(erro => {
  console.error('Não foi possível concluir a extração:', erro);
  process.exitCode = 1;
});