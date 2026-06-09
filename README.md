# Rad Anux - Chaos Engineering Aeroespacial

O **Rad Anux** (Radian Anomaly Nucleus & Unit Experiment) é uma plataforma de Chaos Engineering voltada para a simulação de radiação orbital e detecção de resiliência de software em CubeSats e nanossatéis. Ela permite aos engenheiros simular o fenômeno físico do *Bit-Flip* diretamente nas esteiras de CI/CD, garantindo o bom funcionamento de algoritmos de auto-recuperação antes do lançamento real.

---

## 🎨 Guia de Paleta de Cores (Color Palette Guide)

O design visual da Landing Page foi estruturado para refletir um cockpit espacial ou console de controle de voo, utilizando um tema escuro (Dark Tech) com contrastes em neon de alta tecnologia.

Abaixo está o guia detalhado das cores especificadas nas variáveis CSS (`front-end/css/style.css`):

### 1. Cores de Fundo (Backgrounds)
*   **Space Obsidian Black (`#030508`)**: A cor base de todo o site, simulando o vácuo profundo do espaço. Possui uma textura sutil de grid vetorial integrada via CSS.
*   **Cyber Navy Card (`#0b0f19` / `rgba(11, 15, 26, 0.65)`)**: Utilizado para os contêineres, cards de objetivos, e painel do simulador. Cria uma camada de profundidade com vidro fosco (glassmorphism) sobre o fundo preto.

### 2. Cores de Destaque e Ação
*   **Cosmic Indigo (`#6c5ce7`)**: O tom violeta primário da marca, usado para botões, bordas internas dos cards de objetivos e detalhes de transição de hover. Representa a profundidade cósmica.
*   **Electric Neon Cyan (`#00ffcc`)**: O tom ciano secundário de alta visibilidade, usado para links ativos na navegação flutuante, títulos com gradiente e destaques de valores numéricos. Representa as leituras de radar e dados eletrônicos limpos.

### 3. Cores de Status e Sinais (LEDs)
*   **Emerald Green (`#00ff88`)**: Utilizado no LED de sucesso (`SYS_OK`) e no log de texto de processos normais. Significa que o satélite conseguiu realizar a auto-recuperação do bit-flip.
*   **Neon Pink/Red (`#ff3366`)**: Utilizado no LED de falha crítica (`SYS_WARN`) e em linhas de erro no console. Significa que o bit-flip causou um crash de software ou transbordo de variáveis.

### 4. Cores da Tipografia
*   **Pure White (`#ffffff`)**: Títulos de seção e textos em destaque para máxima legibilidade.
*   **Silver Slate (`#909bb0`)**: Descrições e parágrafos de conteúdo. Um cinza suave que reduz a fadiga visual e dá elegibilidade premium ao site.
*   **Muted Steel (`#4e596d`)**: Textos secundários, rótulos inativos e legendas técnicas.

---

## 🏗️ Estrutura de Fontes Usadas
*   `Orbitron`: Títulos de grande porte e logotipos (aspecto tecnológico e militar).
*   `Inter`: Corpo de texto e descrições (modernidade e excelente leitura).
*   `JetBrains Mono`: Terminal de logs, scores e tags numéricas (estilo console de desenvolvimento).