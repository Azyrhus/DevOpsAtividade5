# Conversor de unidades – Pipeline com GitHub Actions

Projeto da atividade de DevOps sobre GitHub Actions. É um conversor de unidades
(°C ↔ °F e km ↔ milhas) em JavaScript, com testes automatizados com Jest. A cada push na
branch `main`, uma pipeline instala as dependências, roda os testes, gera o site, guarda o
relatório de cobertura e publica o site no GitHub Pages.

- **Repositório:** https://github.com/Azyrhus/DevOpsAtividade5
- **Site publicado:** https://azyrhus.github.io/DevOpsAtividade5/
- **Relatório de cobertura:** https://azyrhus.github.io/DevOpsAtividade5/cobertura/

## Estrutura

```
src/conversor.js              lógica de conversão
tests/conversor.test.js       testes automatizados (Jest)
public/index.html             página do site
scripts/build.js              monta a pasta dist/ (site + relatório de cobertura)
.github/workflows/pipeline.yml  pipeline do GitHub Actions
```

## Como rodar localmente

```
npm install
npm test          # roda os testes e gera o relatório de cobertura
npm run build     # gera a pasta dist/ com o site
```

## Actions utilizadas

| # | Action (Marketplace) | Etapa da pipeline | Função | Como contribuiu para a automação |
|---|---|---|---|---|
| 1 | `actions/setup-node@v4` | Preparação do ambiente | Instala o Node.js 22 no servidor da pipeline e ativa o cache do npm | Dispensa configurar o ambiente manualmente e deixa as instalações mais rápidas nas próximas execuções |
| 2 | `actions/upload-artifact@v4` | Testes / evidências | Guarda o relatório de cobertura de testes como artefato da execução | O relatório fica disponível para download na página de cada execução, sem precisar rodar os testes localmente |
| 3 | `peaceiris/actions-gh-pages@v4` | Publicação (deploy) | Envia o conteúdo da pasta `dist/` para a branch `gh-pages`, servida pelo GitHub Pages | Cada push na `main` atualiza o site publicado automaticamente, sem deploy manual |

Além delas, o workflow usa `actions/checkout@v4`, que apenas baixa o código do repositório
para o servidor da pipeline.

## Fluxo da pipeline

1. Push na branch `main` dispara o workflow.
2. `actions/checkout` baixa o código.
3. **Action 1** (`setup-node`) prepara o Node.js.
4. `npm ci` instala as dependências e `npm test` roda os testes com cobertura.
5. `npm run build` gera o site na pasta `dist/`.
6. **Action 2** (`upload-artifact`) guarda o relatório de cobertura.
7. **Action 3** (`actions-gh-pages`) publica o site no GitHub Pages.

## Verificação do funcionamento

- **Aba Actions do repositório:** cada etapa aparece com status e logs. Todas devem estar verdes.
- **Artefato:** na página da execução, em "Artifacts", aparece `relatorio-de-cobertura`.
- **Site:** abre no link do GitHub Pages acima e converte os valores.
