# 🚀 EdTech - Plataforma de Aprendizado Interativo

Uma landing page responsiva, moderna e acessível, desenvolvida sob medida para proporcionar uma experiência de aprendizagem online premium. O projeto reúne recursos multimídia, atividades avaliativas interativas com persistência de estado e animações fluidas baseadas em comportamento de rolagem e carregamento de página.

---

## 🎨 Design & Identidade Visual

A interface foi projetada com foco em estética minimalista e de alta fidelidade (Hi-Fi), com transições suaves e design focado no usuário:
*   **Tipografia:** Fonte moderna [Inter](https://fonts.google.com/specimen/Inter) (importada via Google Fonts), garantindo excelente legibilidade em telas de qualquer tamanho.
*   **Paleta de Cores:**
    *   `Verde Destaque (--color-primary: #76B900)`: Cor vibrante da marca que direciona o olhar do usuário e destaca chamadas para ação (CTAs).
    *   `Dark Mode / Contrast (--color-bg-dark: #0C0A08)`: Usado no cabeçalho/Hero e rodapé para criar um contraste marcante e sensação premium.
    *   `Fundo Claro (--color-bg-light: #F7F8F5)`: Fundo sutil para uma leitura limpa e confortável.
*   **Responsividade:** Desenvolvida sob o conceito *Mobile-First* integrado com um container máximo de `960px`, garantindo visualização impecável de celulares a desktops de alta resolução.
*   **Micro-interações:** Todos os botões, links e campos possuem efeitos de *hover*, *focus* e *active* refinados.

---

## 🛠️ Recursos & Componentes Interativos

### 1. Hero Section com Animações de Entrada
*   Animações de entrada aceleradas por hardware (`@keyframes`) aplicadas logo no carregamento inicial da página.
*   O título e descrição realizam um efeito de revelação suave subindo (`fadeInUp`), enquanto a imagem do mockup lateral surge suavemente da direita expandindo (`fadeInRightScale`).

### 2. Video Player com Lazy Loading
*   Um reprodutor de vídeo interativo otimizado para performance.
*   Exibe inicialmente uma capa estática personalizada (`Container.png`) com um botão de reprodução estilizado.
*   Ao clicar no botão de play, a imagem de capa é substituída dinamicamente por um `iframe` incorporado do YouTube (`MUNDO LINDO - Os lugares mais bonitos do planeta`), iniciando a reprodução automaticamente via Javascript sem sobrecarregar o carregamento inicial da página.

### 3. Carrossel de Imagens (Slider Section)
*   Implementado utilizando a biblioteca **Swiper** (carregada localmente para maior independência e velocidade).
*   Possui botões de navegação lateral (Anterior/Próximo) que desabilitam automaticamente no limite dos slides.
*   Paginação dinâmica por meio de indicadores visuais (dots clicáveis).
*   Suporte completo a gestos de arrastar (*swipe/touch*).

### 4. Grid de Cards Interativos
*   Grid flexível com cards expansíveis no estilo "saiba mais".
*   Os cards contam com botões "Abrir" / "Fechar" que revelam ou ocultam blocos de conteúdo extra.
*   Garante total conformidade com leitores de tela gerenciando atributos como `aria-expanded` e `aria-hidden` dinamicamente.

### 5. Player de Áudio Customizado Completo
Um reprodutor de áudio nativo (`audio.mp3`) envelopado em uma interface totalmente personalizada e controlada via ES6 Javascript:
*   **Play/Pause:** Botão com transição de ícones SVG dinâmica.
*   **Barra de Progresso (Timeline):** Input do tipo `range` customizado com preenchimento visual progressivo da cor primária. Exibe o tempo atual e a duração total atualizados a cada segundo.
*   **Volume & Mute:** Controle deslizante de volume integrado, permitindo silenciar instantaneamente no clique do ícone.
*   **Controle de Velocidade:** Menu flutuante que permite alterar a taxa de reprodução do áudio em tempo real (`0.5x`, `1.0x (Normal)`, `1.5x` e `2.0x`), melhorando a acessibilidade cognitiva.

### 6. Atividade Discursiva
*   Campo de texto (`textarea`) dinâmico.
*   O botão de envio "Responder" é ativado apenas se houver conteúdo preenchido.
*   Ao enviar, a área de texto é travada e um feedback de sucesso em formato de alerta é exibido.
*   O usuário pode clicar em "Alterar" para voltar ao estado de edição do texto enviado.
*   **Persistência de Estado:** Salva todo o texto inserido e o status de envio no `sessionStorage`, mantendo a resposta salva mesmo após atualizar a página (F5).

### 7. Atividade Objetiva
*   Questionário de múltipla escolha com opções estilizadas com comportamento de checkbox.
*   O botão "Responder" valida se alguma opção está selecionada.
*   **Validação em Tempo Real:** Ao responder, valida se a alternativa selecionada está correta (A opção correta configurada é a **B**).
*   **Feedback Visual:** Exibe um alerta de sucesso (Verde) caso o usuário acerte, ou um alerta de atenção (Amarelo) recomendando tentar novamente se errar.
*   Possui botão de "Alterar" para reiniciar a atividade.
*   **Persistência de Estado:** O progresso e a resposta selecionada também são recuperados via `sessionStorage` em recarregamentos.

### 8. FAQ com Accordion Semântico
*   Seção de perguntas frequentes implementada utilizando elementos nativos `<details>` e `<summary>`.
*   Excelente legibilidade para mecanismos de busca (SEO) e total suporte à navegação por teclado padrão do navegador.
*   Ícones de seta SVG que giram automaticamente quando o painel é aberto/fechado através de transições em CSS.

---

## ♿ Acessibilidade (A11y) & SEO

O projeto foi construído respeitando as melhores práticas de acessibilidade na Web:
*   **Contraste e Foco Visual:** Estilo global `focus-visible` que adiciona uma borda verde de alto contraste (`3px`) ao navegar pelo teclado (utilizando a tecla `Tab`).
*   **Leitores de Tela:** Uso da classe `.sr-only` para ocultar elementos puramente visuais e fornecer rótulos alternativos adicionais onde necessário.
*   **Marcação Semântica:** HTML estruturado com tags como `<header>`, `<main>`, `<section>`, `<footer`, `<details>`, `<textarea>` e `<fieldset>`.
*   **SEO:** Arquivo [index.html](file:///c:/Users/William.Junger/Desktop/IA/edtech-frontend-test/html/index.html) otimizado com títulos claros, metadados (`description`), e tags `alt` descritivas em todas as imagens.

---

## 📂 Estrutura do Projeto

```bash
edtech-frontend-test/
├── assets/                  # Imagens, SVGs e arquivos de áudio locais
│   ├── Container.png
│   ├── DashboardOverlay.png
│   ├── Header.png
│   ├── NatureWavesCrashing.png
│   ├── audio.mp3
│   └── (outros assets de ícones .svg)
├── css/                     # Estilização
│   ├── main.css             # Folha de estilo principal e Design System
│   └── swiper-bundle.min.css# Biblioteca CSS do Swiper
├── html/                    # Documento HTML
│   └── index.html           # Página inicial da plataforma
├── js/                      # Lógica Javascript
│   ├── main.js              # Inicializadores de componentes e controle de estados
│   └── swiper-bundle.min.js # Biblioteca Javascript do Swiper
└── README.md                # Documentação do projeto
```

---

## 🚀 Como Executar o Projeto

Como o projeto é construído em cima de Vanilla HTML, CSS e JavaScript, você pode iniciá-lo de duas maneiras muito simples:

### Opção 1: Diretamente no Navegador
1.  Navegue até a pasta `html/`.
2.  Abra o arquivo [index.html](file:///c:/Users/William.Junger/Desktop/IA/edtech-frontend-test/html/index.html) dando um duplo clique.
    > ⚠️ *Nota:* Algumas políticas de segurança do navegador (CORS) podem bloquear recursos dinâmicos locais, como a reprodução do arquivo de áudio. Nesses casos, recomendamos a Opção 2.

### Opção 2: Servidor Local (Recomendado)
Para garantir o perfeito funcionamento de todas as funcionalidades de mídia e controle de estado, inicie um servidor web local.

*   **Usando VS Code:** Instale a extensão **Live Server**, abra a pasta do projeto e clique no botão **Go Live** no canto inferior direito.
*   **Usando NodeJS:** Se tiver o Node instalado, você pode executar o seguinte comando na raiz do projeto:
    ```bash
    # Usando o pacote http-server
    npx http-server
    ```
    Em seguida, abra o endereço fornecido (geralmente `http://localhost:8080/html/index.html`) em seu navegador de preferência.