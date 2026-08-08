# Clã Fênix — site com API do Clash of Clans

## Arquivos

- `index.html`
- `style.css`
- `script.js`
- `api/clan.js`
- `api/currentwar.js`
- `package.json`

## Configuração obrigatória na Vercel

Crie uma variável de ambiente:

Nome:
`CLASH_API_TOKEN`

Valor:
seu token criado no portal oficial da API do Clash of Clans.

Depois faça um novo Deploy.

## Tag configurada

`#VJ8GGLR8`

## Importante

A chave da API nunca deve ser colocada no `script.js` público.
Ela fica apenas na variável de ambiente da Vercel e é usada pelas funções dentro de `/api`.
