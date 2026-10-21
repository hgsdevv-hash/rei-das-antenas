# Rei das Antenas | Landing page

Site de uma página para a loja Rei das Antenas, de Santa Bárbara d'Oeste (SP):
instalação e manutenção de antenas, câmeras, portões e eletrônicos, e venda de peças.

## Estrutura

```
rei-das-antenas/
├── index.html      # a página inteira
├── css/style.css   # visual (cores no topo, em :root)
├── js/main.js      # menu, medidor de sinal, cards que abrem, vídeos, animações
├── assets/img/     # logo oficial e fotos de serviços (a adicionar)
└── assets/video/   # 8 vídeos de trabalhos, todos SEM som (áudio removido):
                    #   *-preview.mp4 = 8 s nos cards, *.mp4 = completo no player, *.jpg = capa
```

## Catálogo (catalogo.html + js/catalogo.js)

- Produtos ficam na lista PRODUTOS de js/catalogo.js (com cat, marca e tags para a busca)
- Busca sem acento, filtro por categoria e marca com contagem, ordenação, itens por página e paginação
- A busca e os filtros ficam no endereço (ex.: catalogo.html?cat=portao&marca=Linear), dá para mandar o link
- Produtos novos sem foto mostram o ícone da categoria

## Como abrir

Abra o `index.html` no navegador. Não precisa instalar nada.

## Privacidade e LGPD

- `privacidade.html` (política, com a tabela de cookies em #cookies) e `termos.html`, ligadas no rodapé de todas as páginas
- Sem cookies e sem rastreamento; só armazenamento local necessário (`rda-orcamento`, `rda-aviso`, `intro-vista`)
- Fontes hospedadas no próprio site (`fonts/` + `css/fonts.css`), sem chamar o Google Fonts
- Mapa do Google só carrega depois do clique em "Carregar o mapa"
- Aviso de privacidade em `js/aviso.js` (some depois do "Entendi")
- Ao incluir um serviço de terceiros (estatística, pixel, chat), atualize a política e troque o aviso por um pedido de consentimento

## Pendências (marcadas com TODO no código)

- Dono da loja: ler e aprovar a política de privacidade e os termos, que estão em nome da loja
- Informar razão social e CNPJ da loja para incluir no rodapé e na política
- Autorização das pessoas que aparecem nos vídeos (equipe e clientes) e dos clientes cujas casas aparecem

- Trocar a marca desenhada pela logo oficial em `assets/img/`
- Confirmar com a loja a lista de serviços e produtos (modelos do catálogo vieram da distribuidora eDonato)
- Fotos reais dos produtos novos do catálogo
- Revisar as respostas das dúvidas frequentes
- Adicionar fotos reais de instalações
- Pedir à loja autorização para os depoimentos do Google exibidos no site
- Trocar o botão "Avaliar a loja" pelo link curto oficial (Perfil da Empresa > Pedir avaliações)
- Dono da loja: adicionar o endereço do site no Perfil da Empresa no Google

## SEO (busca no Google)

- `robots.txt` e `sitemap.xml` na raiz; canonical, Open Graph e favicon em todas as páginas
- Imagem de compartilhamento: `assets/img/og.jpg` (1200×630)
- `404.html` com caminhos absolutos (`/rei-das-antenas/...`) porque aparece em qualquer endereço errado
- TODO: verificar o site no Google Search Console e colar a meta `google-site-verification` no `index.html`
- TODO: enviar o sitemap no Search Console e adicionar o site no Perfil da Empresa no Google
