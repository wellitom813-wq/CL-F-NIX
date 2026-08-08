# CLÃ FÊNIX — Biblioteca completa de Layouts

Esta versão não usa a API oficial do Clash of Clans e não precisa de token ou IP fixo.

## Como funciona
A função gratuita `/api/layouts.js` da Vercel consulta o catálogo público:
`clashofclans-layouts.com`

O visitante escolhe:
- CV12
- CV13
- CV14
- CV15
- CV16
- CV17
- CV18

Depois navega por todas as páginas disponíveis daquele CV.

Cada página é carregada sob demanda, portanto o site não precisa armazenar centenas de layouts em um arquivo gigante.

## Recursos
- Paginação completa detectada automaticamente
- CV12–CV18
- Filtros Guerra, Farm, Defesa, Híbrido, Troll e Outros
- Prévia da base quando disponível
- Autor quando disponível
- Botão "Abrir no Clash"
- Botão "Ver base"
- Cache na Vercel para evitar consultas repetidas
- Atualiza junto com o catálogo público sem editar o site

## Arquivos importantes
- index.html
- style.css
- script.js
- api/layouts.js
- package.json

## Publicação
Envie todos os arquivos e a pasta `api` para o GitHub.

Não é necessário configurar nenhuma variável de ambiente.
