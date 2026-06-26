# 🍳  Pomodoro Web App

Um aplicativo de Pomodoro interativo, fofo e com estética retrô baseado em janelas de sistemas operacionais antigos. O projeto conta com seleção de tempo, escolha de mascote, animações fluidas de nuvens em CSS no plano de fundo e alertas sonoros nativos.

> 🌐 **Acesse o projeto publicado aqui:**  https://k3117.github.io/Pomodoro-Web/

---

## ✨ Funcionalidades

* **⏱️ Seleção de Tempo Prática:** Escolha rápida entre blocos de Foco (25 min), Pausa Longa (15 min) ou Pausa Curta (5 min) através de ícones personalizados.
* **🐣 Escolha de Mascote:** Permite ao usuário selecionar qual ilustração de ovinho vai acompanhá-lo durante o tempo de foco.
* **☁️ Cenário Animado:** Fundo interativo com 7 nuvens em Pixel Art flutuando de forma assíncrona usando puro CSS.
* **🎵 Alarme via Web Audio API:** Um som sintetizado diretamente pelo navegador avisa quando o tempo acaba, sem precisar carregar arquivos pesados de áudio.
* **📱 Design Responsivo:** Interface simulando uma janela retrô, totalmente adaptada para telas de celulares e computadores.

---

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando tecnologias web puras, sem a necessidade de frameworks complexos no backend:

* **HTML5:** Estruturação semântica das telas e fluxo do aplicativo.
* **CSS3 & Tailwind CSS:** Estilização moderna, efeitos de degradê, responsividade e animações avançadas via `@keyframes`.
* **JavaScript (ES6):** Motor de contagem regressiva, manipulação dinâmica do DOM (troca de telas) e sintetização de áudio em tempo real.

---

## 📂 Estrutura de Pastas

```text
├── 📁 imagens/
│   ├── 🖼️ relogio.png       # Ícone de relógio da primeira tela
│   └── 🖼️ (demais imagens do projeto)
├── 📄 index.html            # Estrutura principal e janelas
├── 📄 style.css             # Animações de transição e efeito das nuvens
├── 📄 script.js            # Lógica do cronômetro e sintetizador de som
└── 📄 README.md             # Documentação do projeto
