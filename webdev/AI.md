# Registro de Uso de Inteligência Artificial (AI.md)

Este arquivo registra o uso da Inteligência Artificial no projeto para fins de avaliação na disciplina de **Web Development** do Prof. Israel Marques.

---

### 1. O que foi solicitado para a IA
- Utilização da aplicação original da matéria de Frontend Design como base, complementando com:
  - Gerar animação de um slideshow com 3 imagens relacionadas ao tema (Rad Anux).
  - Formulário com validação em JS para impedir envio de campos vazios.
  - Quiz dinâmico contendo 10 perguntas sobre o tema e exibição do resultado final.
  - Implementação de 3 opções de troca de tema (cor de fundo) da página.
### 2. O que a IA retornou
- **Estrutura de Conexão**: Propôs a inclusão de um banner superior em ambas as páginas (front-end/index.html e webdev/index.html) que serve como link de transição direto para o professor navegar entre os trabalhos.
- **Slideshow**: Desenhou um slideshow dinâmico em HTML/CSS/JS puros e gerou uma 3ª imagem relevante via IA (space_cosmic_rays.png) para compor o carrossel junto às imagens já existentes. O slideshow foi integrado na área principal (Hero) para melhor aproveitamento visual.
- **Temas**: Desenhou um widget flutuante no canto inferior direito que permite alternar as variáveis de cor de fundo do body entre 3 temas espaciais de alto contraste (Obsidian Space, Deep Void e Nebula Purple).
- **Quiz**: Melhorou a seção #quiz-section que lê dinamicamente um vetor de 10 perguntas sobre física espacial, bit-flips e chaos engineering, validando cada resposta imediatamente e exibindo uma tela final de relatório de aproveitamento e patente militar/científica.
- **Formulário**: Desenhou o formulário de simulação e suporte #contato-section com validação no evento submit que insere classes de erro visual (.invalid-field) nos campos vazios e bloqueia o envio caso existam pendências, exibindo um toast de sucesso ao concluir.

### 3. O que foi alterado ou rejeitado e o motivo
- **Aprovado sem alterações**: A proposta foi aceita integralmente. A solução de usar um banner discreto no topo resolveu o problema de manter os repositórios/pastas separados, porém "conectados" para facilidade de avaliação
