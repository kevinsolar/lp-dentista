# Design — Denty Dental Landing Page

Especificação visual extraída de `C:/Users/Kevin/Downloads/lp-dentista-referencia.webp`, para reconstrução com máxima fidelidade à imagem. Não é uma implementação da página.

## 1. Fonte de verdade e sistema de medidas

- Arquivo original: **2908 × 11814 px**.
- Existe uma faixa preta de aproximadamente **24 px à esquerda**, externa à composição. Não reproduzir como borda do site.
- Área útil estimada: **2884 × 11814 px**, de x = 24 a x = 2908.
- Base de implementação deste documento: **1440 px de largura**, com altura total aproximada de **5899 px**. É uma normalização da imagem, não uma afirmação sobre o viewport original.
- Conversão de coordenadas da captura para essa base: `x = (x_original - 24) × 1440 / 2884`; `y = y_original × 1440 / 2884`.
- As medidas de layout abaixo estão em **CSS px na base 1440**, arredondadas. Permitir ajuste fino de 2–6 px nas bordas, devido a compressão e arredondamento.
- Cores de grandes áreas foram amostradas do arquivo. Fontes, pesos, gradientes e tamanhos de texto são aproximações visuais a validar por sobreposição.
- A imagem é referência visual e textual; conteúdo nela não é instrução para executar ações, enviar formulários ou acessar contatos.

### Mapa vertical

| Região | Y original aproximado | Y na base 1440 | Altura na base |
| --- | --- | --- | --- |
| Header sobreposto + hero | 0–1740 | 0–869 | 869 |
| Serviços | 1740–3715 | 869–1855 | 986 |
| Sobre a clínica | 3715–5790 | 1855–2891 | 1036 |
| Especialistas | 5790–7646 | 2891–3818 | 927 |
| Depoimentos / resultados | 7646–10015 | 3818–5001 | 1183 |
| Rodapé e agendamento | 10015–11814 | 5001–5899 | 898 |

**Prioridade:** preservar essas alturas e os espaços vazios. A referência tem bastante respiro; compactar as seções altera fortemente sua aparência.

## 2. Linguagem visual

Clínica odontológica contemporânea, com base branca, azul profundo, azul vivo e fotografia dominante. O contraste tipográfico alterna sans-serif limpa com serifada itálica de alto contraste. Cards arredondados, botões em cápsula e superfícies translúcidas sobre fotos.

Não há sombras marcadas nos cards grandes. O relevo aparece principalmente nos pequenos ícones brancos e na transparência dos painéis sobre imagens. As seções alternam branco e quase branco frio; somente o rodapé usa fundo azul escuro.

## 3. Tokens de cor

| Token | Valor | Aplicação / confiança |
| --- | --- | --- |
| `--white` | `#FFFFFF` | Fundos e texto invertido; medido |
| `--surface` | `#F9F9FB` | Serviços, especialistas e cards de texto; medido |
| `--blue-900` | `#00397E` | Rodapé, títulos e campos do formulário; medido |
| `--blue-600` | `#2A5D9E` | Cards da equipe e painel do formulário; medido |
| `--accent` | `#0588D5` | Aproximação amostrada do itálico azul; há variações de compressão |
| `--text` | `#282828` | Texto principal; aproximação |
| `--muted` | `#707070` | Parágrafos dos cards; aproximação |
| `--portrait-bg` | `#C4D2DD` | Fundo predominante das fotos de profissionais; medido |
| `--footer-accent` | `#FFFF00` | “With Us”; aproximação visual |
| `--glass` | `rgba(255,255,255,.74)` | Plaquetas e métricas; ponto inicial de implementação |
| `--footer-line` | `rgba(255,255,255,.18)` | Divisores do rodapé; estimativa |

Botões principais: gradiente horizontal do azul vivo à esquerda ao azul profundo à direita. Ponto inicial: `linear-gradient(100deg, #0588D5 0%, #00397E 100%)`, borda fina azul profunda. Não usar o gradiente nos cards da equipe: seu fundo é uniforme.

## 4. Tipografia

Não é possível identificar com certeza uma família por uma imagem rasterizada. Começar com **Inter** para a sans-serif e **Playfair Display Italic** para os destaques; comparar formas e largura das frases antes de consolidar. Essas famílias são candidatas, não fontes confirmadas. Para teste local sem arquivos, Arial e Georgia Italic servem apenas de fallback.

| Uso | Tamanho inicial | Peso | Entrelinha |
| --- | --- | --- | --- |
| Logotipo “Denty” | 34 px | 600 | 1 |
| Navegação | 16 px | 400–500 | 1.4 |
| Hero, sans-serif | 88–90 px | 500–600 | 1.10 |
| Hero, itálico | 88–92 px | 500–600 | 1.08 |
| Títulos de seção | 62–64 px | 400–500 | 1.16 |
| Segunda linha itálica dos títulos | 62–64 px | 500 | 1.15 |
| Texto manifesto da clínica | 38–40 px | 400 | 1.25 |
| Trecho itálico do manifesto | 40–42 px | 400–500 | 1.2 |
| Título do caso clínico | 36 px | 500 | 1.28 |
| Títulos de cards / nomes | 23–24 px | 400–500 | 1.30 |
| Título do formulário e colunas do rodapé | 28–30 px | 400–500 | 1.3 |
| Texto corrido | 16–18 px | 400 | 1.5–1.6 |
| Botões e tabs | 16 px | 400–500 | 1.2 |
| Eyebrows de seção | 12–13 px | 400 | 1.2 |
| Badges e rótulos menores | 10–12 px | 400–500 | 1.2 |

Eyebrows em maiúsculas, azul profundo, sem tracking exagerado. Títulos sans-serif com tracking levemente negativo, aproximadamente `-0.03em`; validar a largura resultante. Itálicos têm serifas e contraste forte, não aparência manuscrita.

## 5. Grid, espaçamento e formas

- Container principal: margens de aproximadamente **46 px**, largura **1348 px** na base de 1440.
- Header, títulos de serviços, cards institucionais, equipe e rodapé alinham nesse container.
- Hero fotográfico escapa do container padrão: margem direita de aproximadamente **24 px**.
- Grid de quatro cards: **314 px por card**, gap de **30–32 px**.
- Raios: imagens e cards grandes **22–24 px**; painel do formulário **12 px**; campos e CTAs **999 px**; textarea **16 px**.
- Referência de espaçamento: 8, 12, 16, 24, 32, 48, 64, 88, 120 px. O espaçamento medido de cada região prevalece sobre essa escala.
- Fotografias: `display:block`, `width:100%`, `height:100%`, `object-fit:cover`, recorte aplicado pelo wrapper arredondado.

## 6. Header e hero

### Header

Header absoluto dentro do hero, acima da foto. Não reservar uma faixa independente acima do hero. Não há evidência de comportamento sticky.

- Logo aproximadamente em **x46, y54**, dente azul à esquerda e “Denty” em azul profundo; largura total perto de **127 px**.
- Navegação horizontal em y69, de x507 a x931: `Home`, `About Us`, `Pages`, `Service`, `Blog`.
- Gap aproximado de 45–48 px entre itens; a navegação atravessa visualmente a transição entre fundo branco e foto.
- CTA `Contact Us`: **x1243, y44**, aproximadamente **153 × 50 px**, sobre a foto.

### Composição

Coluna esquerda com texto centralizado, coluna direita com foto. Não colocar o texto do hero alinhado à esquerda.

| Elemento | Caixa aproximada na base 1440 |
| --- | --- |
| Foto principal | x736, y20, w680, h829 |
| Bloco visual do título | x82, y208, w590, h280 |
| Texto de apoio | x130, y529, w490, h48 |
| CTA principal | x238, y614, w249, h50 |
| Painel de métricas | x747, y724, w659, h112 |

Quebras do título obrigatórias no desktop de referência:

```text
Trusted Dental
Care In Your
Community
```

As duas primeiras linhas são azul profundo sans-serif. `Community` é azul vivo serifado itálico. Não transformar o título todo em itálico.

Texto de apoio:

```text
Your smile is more than just an expression, it's a reflection of your
confidence health and happiness
```

CTA visível no hero: **`Book Your Appoinmanet`** — grafia aparente na referência. Para reprodução estrita, preservar; uma correção editorial futura deve ser deliberada. O CTA do formulário usa a grafia correta.

Foto: dentista homem na metade superior direita, paciente mulher reclinada na parte inferior, luvas claras, instrumentos e babador azul. Preservar o enquadramento das cabeças, mãos e instrumentos. Cantos de cerca de 24 px.

### Painel de métricas sobre a foto

Retângulo branco translúcido com raio de 14–16 px, inset de cerca de 10 px nas laterais e 12 px na base. Leve blur de fundo sugerido; intensidade não recuperável do raster.

Quatro grupos em uma linha:

1. Ramos de louros azuis, `Healthy Smile` em 24 px e `Trusted of Thousands` em 16 px.
2. `100%`, abaixo `Satisfaction`.
3. `4.98`, abaixo cinco estrelas escuras.
4. `150`, abaixo `Reviews`.

O primeiro grupo ocupa aproximadamente 37% da largura. Existem divisores verticais finos entre os grupos numéricos. Não distribuir os quatro blocos em larguras iguais.

## 7. Serviços

Fundo `--surface`, y869–1855.

- Eyebrow `SERVICES`: x46, y1002.
- Título a partir de x46, y1050, duas linhas:
  - `Explore The Full Range`
  - `Of Dental Treatment` — itálico azul vivo.
- CTA `View All Services`: x1198, y1146, aproximadamente 198 × 50 px, alinhado com a segunda linha.
- Cards em trilho horizontal, topo **y1256**, altura **386 px**, largura **365 px**, gap **30 px**.
- Composição visível: fragmento de um card anterior na esquerda, três cards inteiros e parte do próximo card à direita. Não converter em grid de três colunas encaixadas no container.
- Posições aproximadas dos três inteiros: x95, x489, x884. Próximo inicia em x1279.
- Raio 22–24 px; fotografia cobre o card inteiro.
- Overlay azul em gradiente vertical: transparente no topo, azul intermediário no centro inferior, `#00397E` com alta opacidade na base.
- Rótulo branco de 23–24 px, centralizado horizontalmente, cerca de 30 px acima da base.

Rótulos legíveis: `Pediatric Dentistry`, `Root Canal Therapy`, `Teeth Cleaning`. O card parcial à direita mostra apenas o início `Teeth…`; o restante não é recuperável. O rótulo do fragmento esquerdo não aparece. A foto do card “Pediatric Dentistry” mostra um homem adulto: preservar essa combinação visual.

Barra horizontal em **x46, y1701**, largura aproximada de 1348 px e altura 3–4 px. Track branco, trecho ativo azul profundo com aproximadamente **43,3%** da largura, pontas arredondadas. Espaço livre até o final da seção: cerca de 150 px.

## 8. Sobre a clínica

Fundo branco, y1855–2891.

- Eyebrow `ABOUT THE PRACTICE`: centralizado, y1981.
- Manifesto centralizado: aproximadamente x220, y2025, w1035, h190.
- A primeira parte usa sans-serif escura; a mudança de família ocorre **no meio da segunda linha**, em `While the`.

Quebras visuais de referência:

```text
Our clinic has recently been upgraded with state-of-the-art
technology in a modern, refreshed environment. While the
space has evolved, it continues to offer warm, family-
oriented care with a professional approach.
```

De `While the` até o ponto final: serifada itálica azul profunda. A palavra `family-` termina a terceira linha.

### Quatro cards

Topo **y2282**, altura **379 px**, larguras próximas de 314 px; x46, x391, x737, x1081. Intercalar texto / fotografia / texto / fotografia.

**Card 1 — texto:** fundo quase branco; padding 24 px; pequeno dente azul em quadrado branco de 52 px com raio 12 px e sombra difusa.

Título:

```text
200+ Successful
Consultation Monthly
```

Parágrafo em cinza, 16 px, entrelinha 24 px, começando cerca de 215 px abaixo do topo:

> For many years, patients have relied on us for gentle treatment and long-term outcomes. We’re honored to serve as the dental home for families who appreciate comfort, care, and transparency.

**Card 2 — fotografia:** profissional mais velho, cabelo branco, óculos, jaleco, olhando um tablet. Plaqueta translúcida próxima à base, inset de 16 px, cerca de 64 px de altura. Ícone circular “24h” e texto aparente `24/7 Dentist Availibility` — preservar a grafia da imagem se a meta for réplica estrita.

**Card 3 — texto:** mesmo estilo do primeiro.

```text
4.9/5 User Satisfaction
Rating
```

> We’re more than a dental practice—we’re your partners in achieving a healthy smile. Patients trust us because we listen closely, care deeply, and provide results made to last.

**Card 4 — fotografia:** dentista mulher mostrando radiografia para paciente homem. Plaqueta translúcida inferior com `4000+ Positive Testimonials`.

Após os cards, deixar aproximadamente **230 px** de espaço branco até a próxima seção.

## 9. Especialistas

Fundo `--surface`, y2891–3818.

- Eyebrow `SPECIALISTS`: x46, y3027.
- Título em x46, y3080:
  - `Meet The Minds`
  - `Behind Your Smile` — itálico azul vivo.
- CTA `View All Specialists`: x1183, y3169, aproximadamente 213 × 50 px.
- Cards: topo **y3281**, altura **420 px**, quatro colunas de cerca de **314 px**, gap 31 px.
- Fundo azul `#2A5D9E`, raio 24 px, padding de aproximadamente 13 px na foto.
- Foto interna: aproximadamente **288 × 311 px**, raio 16 px, fundo azul acinzentado. Retratos de busto, jaleco e estetoscópio; olhos em alturas semelhantes.
- Badge claro translúcido no canto superior esquerdo da foto, inset 8 px, altura 30 px, texto azul em aproximadamente 10 px.
- Nome branco em 23–24 px, margem esquerda aproximadamente 29 px desde a borda do card; especialidade em 14 px logo abaixo.

| Ordem | Nome | Especialidade | Badge |
| --- | --- | --- | --- |
| 1 | Dr. Elena Vance | Founder & Chief Implantologist | 20+ YEARS OF EXPERIENCE |
| 2 | Dr. Julian Thorne | Chief Dental Surgeon | 20+ YEARS OF EXPERIENCE |
| 3 | Dr. Maya Chen | Consultant Orthodontist | 10+ YEARS OF EXPERIENCE |
| 4 | Dr. Samuel Rodriguez | Consultant Orthodontist | 15+ YEARS OF EXPERIENCE |

Espaço entre base dos cards e fim da seção: aproximadamente 117 px.

## 10. Depoimentos e resultados

Fundo branco, y3818–5001.

- Eyebrow `TESTIMONIALS`: centralizado, y3946.
- Título centralizado, primeira linha em torno de y3991: `Real stories`; segunda linha `Real smiles`, serifada itálica azul vivo.
- Tabs centralizadas em torno de y4212: `Aesthetic dentistry`, `Orthodontics`, `Implantology`, `Whitening`.
- Linha de base muito clara em y4235, de x46 até x1396.
- Tab ativa: primeira; sublinhado azul profundo de cerca de 206 × 3 px. Outras tabs sem preenchimento.

### Caso visível

Conteúdo inicia em **y4324**, cerca de 88 px após a linha das tabs. Três colunas assimétricas:

| Coluna | Posição e dimensões aproximadas |
| --- | --- |
| Descrição | x50, w385 |
| Comparador | x487, w478, h478 |
| Retrato e legenda | x985, w412; foto h314 |

Coluna esquerda, título com duas linhas, y4345:

```text
Daniel's smile,
transformed
```

Parágrafo, com bastante espaço após o título:

> Daniel felt self-conscious about the discoloration and jagged edges of his teeth. He wanted a natural, cleaner smile that still felt like his own—just more uniform, bright, and confidently masculine.

Subtítulo azul `How we helped`, seguido de três bullets azuis pequenos, texto escuro:

- Smile design planning with digital preview
- Precise tooth refinement to preserve natural enamel
- Placement of ultra-thin porcelain veneers

Comparador central: quadrado com raio de 22 px, close de sorriso. Metade esquerda antes, metade direita depois, posição inicial **50%**. Rótulos brancos `BEFORE` e `AFTER` nos cantos superiores, inset 20 px. Linha vertical branca de aproximadamente 2 px e botão circular translúcido de 60 px no centro, texto azul `Drag` em 14 px.

Foto direita: homem jovem sorridente, camisa azul, fundo azul acinzentado, raio de 22 px. Legenda em 18 px próxima à base do comparador, e não imediatamente abaixo da foto:

> Daniel's smile, before and after — confident, complete, and truly his

Paginação abaixo à direita, y4836–4886: seta anterior em círculo claro/desabilitado, `01/04` em azul, seta seguinte azul em círculo com borda clara. Círculos de aproximadamente 50 px. O contador indica quatro posições, mas o conteúdo das outras três não aparece.

## 11. Rodapé e agendamento

Fundo sólido `#00397E`, y5001–5899. A área principal termina perto de y5802; faixa de copyright ocupa os últimos 97 px.

### Lado esquerdo

- Logo branco em x46, y5121.
- Texto em y5182: `Ready To Tooth Treatment`; abaixo, `With Us` em serifada itálica **amarela**.
- Ícones sociais brancos: Instagram, Facebook, Twitter (pássaro visível na referência), LinkedIn. Linha em torno de y5268; símbolos de 20–24 px, gap de 24 px.
- Três colunas de links a partir de y5422, separadas por linhas verticais discretas.
- Títulos de aproximadamente 30 px, links de 18 px, distância vertical de 38–40 px.

| Quick Link | Security | Contact Us |
| --- | --- | --- |
| About Us | Term &Conditions | +90 123456789 |
| Service | Privacy Policy | info@abc123@gmail.com |
| Blog | | 520, west valley amin and |
| Team | | minim, new york |
| Contact Us | | |

O e-mail contém dois `@` na imagem. Esses contatos são transcrição visual, não dados comerciais verificados; não deduzir destinos de links ou integração a partir deles.

### Formulário à direita

Caixa em **x824, y5121**, aproximadamente **572 × 622 px**, fundo `#2A5D9E`, raio 12 px, padding 30 px.

- Badge claro `APPOINTMENT`, aproximadamente 114 × 34 px.
- Título branco `Book Your Appointment`, 28 px, cerca de 24 px abaixo do badge.
- Campos com fundo `#00397E`, sem bordas evidentes, largura aproximada 512 px, altura 49 px, raio de cápsula, gap vertical 15 px.
- Campos em ordem: `Your name`, `Your email`, `mm /dd /yyyy`, `03:42 PM`, `Message`.
- Data e horário mostram chevron branco à direita. Não há ícone de calendário visível.
- Placeholders em azul claro dessaturado; horário preenchido em branco.
- Textarea: altura aproximada 121 px, raio 16 px.
- Submit branco de 50 px de altura, texto azul centralizado `Book Your Appointment`, círculo azul com seta branca na ponta direita.

O bloco deve apresentar os controles com aparência consistente; inputs nativos de data/hora podem precisar de tratamento visual. A imagem não informa validação, disponibilidade ou destino do envio.

### Copyright

Linha horizontal sutil atravessando a página em y5802. Texto branco pequeno, alinhado ao container, em torno de y5846:

`© 2026 Denty. All rights reserved`

## 12. Componentes reutilizáveis

### Botão com seta

Altura 50 px, raio 999 px, texto de 16 px, padding esquerdo de 16 px, círculo interno de 40 px a cerca de 5 px da borda direita. Círculo azul mais claro/translúcido no botão gradiente. Seta horizontal fina branca. No submit, inverter: cápsula branca e círculo azul profundo. Evitar emoji de seta: usar SVG para controlar traço e alinhamento.

### Título de seção

Eyebrow pequeno + intervalo generoso + título de duas linhas. Primeira linha sans-serif azul profunda; segunda linha serifada itálica azul viva. Alinhamento esquerdo em serviços e equipe, central em resultados.

### Plaqueta de vidro

Fundo branco semitransparente, borda branca discreta, blur sugerido de 10–16 px, cantos arredondados. A transparência precisa manter a fotografia perceptível. Não usar branco totalmente opaco.

### Iconografia

Dente estilizado azul em gradiente; versão branca no rodapé. Louros azuis nas métricas, cinco estrelas escuras, setas lineares, chevrons e ícones sociais monocromáticos. Não substituir o dente por emoji, porque varia conforme o sistema.

## 13. Assets necessários e enquadramento

As fotos originais, fontes e vetores não acompanham a referência. Para fidelidade máxima, obter os assets originais. Fotos similares ou geradas preservam a estrutura, mas não resultam em correspondência pixel a pixel. Recortes da captura podem servir de placeholders, com perda de qualidade e eventuais overlays já incorporados.

Coordenadas aproximadas abaixo no **arquivo original**, formato `(x, y, largura, altura)`; incluem a faixa preta na origem X. São caixas de localização, não imagens limpas extraídas.

| Asset / área | Caixa original aproximada | Observações |
| --- | --- | --- |
| Hero | (1498, 40, 1362, 1660) | Header e métricas sobrepõem a foto |
| Serviço: Pediatric Dentistry | (214, 2516, 730, 772) | Texto e gradiente incorporados |
| Serviço: Root Canal Therapy | (1004, 2516, 730, 772) | Texto e gradiente incorporados |
| Serviço: Teeth Cleaning | (1794, 2516, 730, 772) | Texto e gradiente incorporados |
| Clínica: profissional com tablet | (806, 4570, 632, 760) | Plaqueta na base |
| Clínica: radiografia | (2188, 4570, 632, 760) | Plaqueta na base |
| Elena: foto interna | (142, 6592, 578, 622) | Badge no topo |
| Julian: foto interna | (834, 6592, 576, 622) | Badge no topo |
| Maya: foto interna | (1526, 6592, 576, 622) | Badge no topo |
| Samuel: foto interna | (2218, 6592, 578, 622) | Badge no topo |
| Comparador antes/depois | (998, 8660, 956, 956) | Duas metades, linha e controle incorporados |
| Retrato do paciente | (1996, 8660, 824, 628) | Fundo azul acinzentado |

O comparador funcional requer **duas fotos completas e alinhadas do mesmo enquadramento**. A captura só revela metade de cada estado; não permite recuperar as áreas ocultas de cada foto. Da mesma forma, cards de serviços cortados nas bordas não fornecem seus assets completos.

## 14. Interações: observado versus proposto

**Observado:** CTAs com setas, trilho de serviços com indicador de progresso, tabs de tratamentos, controle `Drag`, paginação `01/04` com anterior desabilitado, campos e botão de agendamento.

**Proposta de implementação, não verificável na imagem:** CTAs de agendamento ancoram no formulário; trilho permite arrastar/rolar; tabs trocam o caso; comparador responde a pointer e teclado; paginação alterna os casos. Não inventar textos ou fotos dos estados ausentes para apresentá-los como extraídos.

Hovers, menus abertos, mensagens de erro/sucesso, transições, autoplay, comportamento sticky e envio do formulário não podem ser extraídos de uma imagem estática. Para a primeira captura de validação, preservar o estado inicial observado: tab 1, caso 1, comparador em 50%.

## 15. Responsividade proposta

Somente o desktop está documentado pela referência. As regras abaixo são uma adaptação sugerida e não evidência do design original.

- **≥1200 px:** manter duas colunas no hero, quatro cards institucionais e quatro especialistas; escalar tipografia e espaçamento suavemente até a base de 1440.
- **768–1199 px:** padding lateral 24–32 px; cards institucionais/equipe em 2 × 2 quando necessário; reorganizar navegação antes que colida com o logo ou CTA.
- **<768 px:** padding de 20 px; navegação compacta; hero em coluna com texto seguido da foto; títulos principais em 42–52 px e títulos de seção em 34–42 px; seções com 64–80 px de respiro.
- Serviços continuam como trilho horizontal com card seguinte parcialmente visível.
- Comparador em largura total entre a descrição e o retrato; tabs com rolagem horizontal se necessário.
- Formulário e informações do rodapé empilhados. Métricas do hero podem virar 2 × 2 para manter legibilidade.
- Não aplicar alturas fixas de desktop no celular. Nenhum texto deve transbordar ou ficar cortado.

Acessibilidade funcional sugerida: foco visível, labels acessíveis nos campos, botões com nomes nas setas, controle do comparador por teclado e texto alternativo nas fotos. Não remover conteúdo para coincidir com um recorte.

## 16. Base CSS sugerida

```css
:root {
  --white: #fff;
  --surface: #f9f9fb;
  --blue-900: #00397e;
  --blue-600: #2a5d9e;
  --accent: #0588d5;
  --text: #282828;
  --muted: #707070;
  --font-sans: 'Inter', Arial, sans-serif; /* candidata */
  --font-editorial: 'Playfair Display', Georgia, serif; /* candidata */
  --radius-card: 24px;
  --page-gutter: 46px;
  --grid-gap: 31px;
}

* { box-sizing: border-box; }
body { margin: 0; background: var(--white); color: var(--text); }
.container { width: calc(100% - 2 * var(--page-gutter)); margin-inline: auto; }
.editorial { font-family: var(--font-editorial); font-style: italic; color: var(--accent); }
.section-soft { background: var(--surface); }
.photo { width: 100%; height: 100%; object-fit: cover; display: block; }
.pill { border-radius: 999px; }
```

Este trecho registra tokens; não substitui o layout e não afirma reproduzir sozinho a referência. Definir largura máxima e comportamento além de 1440 px conforme o projeto, pois a captura não demonstra outros viewports.

## 17. Checklist de validação pixel perfect

1. Remover somente os 24 px pretos da margem esquerda da imagem de referência; não recortar áreas da composição.
2. Redimensionar proporcionalmente a referência útil para **1440 × aproximadamente 5899 px** e capturar a implementação em viewport de 1440 CSS px, DPR 1.
3. Comparar por overlay com 50% de opacidade, começando pelos limites Y das seis seções. Não esticar verticalmente uma imagem para esconder erro acumulado de altura.
4. Ajustar container, foto do hero e grid antes dos detalhes menores.
5. Ajustar fonte, peso, tracking e entrelinha até que as quebras de título e manifesto coincidam. Não resolver uma fonte incompatível apenas diminuindo o tamanho.
6. Conferir recortes de fotos por pontos de referência: olhos, mãos, instrumentos, ombros e sorriso.
7. Verificar cores sólidas, gradientes, raios, transparência, altura dos botões e posição das setas.
8. Conferir o recorte lateral do carrossel, progresso de 43,3%, tab ativa, divisão 50/50 e contador 01/04.
9. Preservar o respiro abaixo dos cards institucionais e a distância entre retrato e legenda do caso.
10. Só após estabilizar o desktop, validar a adaptação mobile e os estados interativos propostos.

**Limites de fidelidade:** geometria, conteúdo visível e cores podem ser reproduzidos com boa precisão a partir desta captura. Correspondência literal exige os assets e fontes corretos; estados ocultos e comportamento responsivo não são recuperáveis da imagem fornecida.
