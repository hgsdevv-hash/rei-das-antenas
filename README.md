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

## Pendências (marcadas com TODO no código)

- Trocar a marca desenhada pela logo oficial em `assets/img/`
- Confirmar com a loja a lista de serviços e produtos (modelos do catálogo vieram da distribuidora eDonato)
- Fotos reais dos produtos novos do catálogo
- Revisar as respostas das dúvidas frequentes
- Adicionar fotos reais de instalações
- Pedir à loja autorização para os depoimentos do Google exibidos no site
- Trocar o botão "Avaliar a loja" pelo link curto oficial (Perfil da Empresa > Pedir avaliações)
- Dono da loja: adicionar o endereço do site no Perfil da Empresa no Google
