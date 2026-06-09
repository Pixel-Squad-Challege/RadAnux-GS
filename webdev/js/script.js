/**
 * Rad Anux - Landing Page Javascript Behavior
 * Projetado para alunos de 1º semestre - Código limpo e estruturado.
 */

document.addEventListener("DOMContentLoaded", () => {
    // ----------------------------------------------------
    // 1. ATUALIZAÇÃO DO DISPLAY DE RADIAÇÃO (SLIDER)
    // ----------------------------------------------------
    const radInput = document.getElementById("sim-radiation");
    const radDisplay = document.getElementById("rad-val-display");

    if (radInput && radDisplay) {
        radInput.addEventListener("input", (e) => {
            radDisplay.textContent = e.target.value;
        });
    }

    // ----------------------------------------------------
    // 2. SCROLL SPY - DEIXAR CLARO A SEÇÃO ATUAL NO MENU
    // ----------------------------------------------------
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    function scrollSpy() {
        let currentSectionId = "";
        
        // Verifica qual seção está mais visível na viewport
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Se o scroll atual ultrapassou o início da seção (menos uma margem do cabeçalho)
            if (window.scrollY >= (sectionTop - 120)) {
                currentSectionId = section.getAttribute("id");
            }
        });

        // Atualiza a classe active nos links de navegação
        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${currentSectionId}`) {
                link.classList.add("active");
            }
        });
    }

    // Executa no scroll da página
    window.addEventListener("scroll", scrollSpy);
    // Executa uma vez no início caso o usuário recarregue no meio da página
    scrollSpy();

    // ----------------------------------------------------
    // 3. SIMULADOR INTERATIVO DE BIT-FLIPS
    // ----------------------------------------------------
    const btnRunSim = document.getElementById("btn-run-sim");
    const terminal = document.getElementById("sim-terminal");
    const ledGreen = document.getElementById("led-green");
    const ledRed = document.getElementById("led-red");
    const simScore = document.getElementById("sim-score");

    if (btnRunSim && terminal && ledGreen && ledRed && simScore) {
        btnRunSim.addEventListener("click", () => {
            // Desativa o botão durante a simulação
            btnRunSim.disabled = true;
            btnRunSim.textContent = "Simulando...";
            btnRunSim.style.opacity = "0.6";

            // Limpa o terminal e desliga os LEDs
            terminal.innerHTML = "";
            ledGreen.classList.remove("active");
            ledRed.classList.remove("active");
            simScore.textContent = "--%";

            // Lê o valor atual do coeficiente k
            const k = parseFloat(radInput.value);

            // Sequência de logs simulados representando as etapas do User Flow
            const logs = [
                { text: "[INÍCIO] Conectando à esteira CI/CD...", delay: 500, type: "info" },
                { text: "[TELA] Dashboard de testes inicializado.", delay: 1000, type: "info" },
                { text: `[CONFIG] Cenário de teste: Órbita com Fator de Radiação k = ${k}`, delay: 1600, type: "info" },
                { text: "[SISTEMA] Iniciando bombardeio de radiação simulada...", delay: 2400, type: "warning" },
                { text: "[TESTE 1] Injetando Bit-Flip na variável 'velocidade_propulsor'...", delay: 3200, type: "warning" }
            ];

            // Executa os logs iniciais
            logs.forEach(log => {
                setTimeout(() => {
                    printLog(log.text, log.type === "warning");
                }, log.delay);
            });

            // Etapa de decisão com base no fator de radiação 'k'
            // Se k for maior que 0.07, simulamos que uma das variáveis críticas sofre falha total (Crash)
            const systemCrashed = k > 0.07;

            // Teste 1: Recuperação (Sempre sucesso no primeiro teste)
            setTimeout(() => {
                ledGreen.classList.add("active");
                printLog("[LOG] Watchdog ativado: 'velocidade_propulsor' recuperada com sucesso em 14ms.", false);
            }, 3800);

            // Teste 2: Injeção crítica
            setTimeout(() => {
                ledGreen.classList.remove("active");
                printLog("[TESTE 2] Injetando Bit-Flip na variável 'angulo_direcionamento'...", true);
            }, 4600);

            setTimeout(() => {
                if (systemCrashed) {
                    ledRed.classList.add("active");
                    printLog("[CRITICAL FAIL] Crash do sistema detectado! Transbordo de memória no propulsor.", true);
                } else {
                    ledGreen.classList.add("active");
                    printLog("[LOG] Autocorreção: 'angulo_direcionamento' restaurado em 26ms via tripla redundância.", false);
                }
            }, 5300);

            // Finalização do teste
            setTimeout(() => {
                printLog("[PROCESSAMENTO] Finalizando testes. Gerando relatório exponencial...", false);
            }, 6200);

            setTimeout(() => {
                // Cálculo de score simulado
                let finalScore = 100;
                if (systemCrashed) {
                    // Se quebrou, score cai muito
                    finalScore = Math.round(95 - (k * 700));
                    if (finalScore < 0) finalScore = 0;
                    
                    ledGreen.classList.remove("active");
                    ledRed.classList.add("active");
                    printLog(`[CONCLUÍDO] Score de resiliência baixo. Teste reprovado.`, true);
                } else {
                    // Se passou, score fica alto
                    finalScore = Math.round(100 - (k * 100));
                    
                    ledGreen.classList.add("active");
                    ledRed.classList.remove("active");
                    printLog(`[CONCLUÍDO] Score de resiliência ideal. Satélite pronto para órbita.`, false);
                }

                simScore.textContent = `${finalScore}%`;

                // Reabilita o botão
                btnRunSim.disabled = false;
                btnRunSim.textContent = "Iniciar Teste";
                btnRunSim.style.opacity = "1";
            }, 7000);
        });
    }

    // Função auxiliar para printar linhas no terminal simulado
    function printLog(text, isError) {
        const line = document.createElement("div");
        line.classList.add("terminal-line");
        if (isError) {
            line.classList.add("error");
        }
        line.textContent = `> ${text}`;
        terminal.appendChild(line);
        // Rola o terminal para o fim
        terminal.scrollTop = terminal.scrollHeight;
    }

    // ----------------------------------------------------
    // 4. SELETOR DE TEMAS (TROCA DE BACKGROUND)
    // ----------------------------------------------------
    const themeBtns = document.querySelectorAll(".theme-btn");
    const body = document.body;

    themeBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            // Remove a classe de tema ativa do body e dos botões
            body.classList.remove("theme-obsidian", "theme-void", "theme-nebula");
            themeBtns.forEach(b => b.classList.remove("active"));

            // Adiciona o tema selecionado
            const selectedTheme = btn.getAttribute("data-theme");
            body.classList.add(`theme-${selectedTheme}`);
            btn.classList.add("active");
        });
    });

    // ----------------------------------------------------
    // 5. SLIDESHOW DE IMAGENS DO HERO
    // ----------------------------------------------------
    let slideIndex = 0;
    const slides = document.querySelectorAll(".my-slide");
    const dots = document.querySelectorAll(".slide-dot");
    const prevBtn = document.getElementById("prev-slide-btn");
    const nextBtn = document.getElementById("next-slide-btn");
    let slideTimeout;

    function showSlides(index) {
        if (slides.length === 0) return;
        
        // Ajusta limite do índice
        if (index >= slides.length) { slideIndex = 0; }
        else if (index < 0) { slideIndex = slides.length - 1; }
        else { slideIndex = index; }

        // Oculta todos os slides
        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }

        // Desativa todos os dots
        for (let i = 0; i < dots.length; i++) {
            dots[i].classList.remove("active");
        }

        // Mostra o slide ativo e ativa o dot correspondente
        slides[slideIndex].style.display = "block";
        dots[slideIndex].classList.add("active");
    }

    function startAutoSlide() {
        clearTimeout(slideTimeout);
        slideTimeout = setTimeout(() => {
            showSlides(slideIndex + 1);
            startAutoSlide();
        }, 5000); // Troca a cada 5 segundos
    }

    if (slides.length > 0) {
        // Inicializa o slideshow
        showSlides(slideIndex);
        startAutoSlide();

        // Cliques nos botões de navegação
        if (prevBtn) {
            prevBtn.addEventListener("click", () => {
                showSlides(slideIndex - 1);
                startAutoSlide(); // Reinicia o timer automático
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener("click", () => {
                showSlides(slideIndex + 1);
                startAutoSlide(); // Reinicia o timer automático
            });
        }

        // Cliques nos dots indicadores
        dots.forEach(dot => {
            dot.addEventListener("click", (e) => {
                const targetIndex = parseInt(e.target.getAttribute("data-slide"));
                showSlides(targetIndex);
                startAutoSlide();
            });
        });
    }

    // ----------------------------------------------------
    // 6. QUIZ ESPACIAL INTERATIVO (10 PERGUNTAS)
    // ----------------------------------------------------
    const quizQuestions = [
        {
            question: "O que é um 'Bit-Flip' causado por radiação no espaço?",
            options: [
                "A destruição física de um painel solar do satélite",
                "A inversão indesejada de um bit de memória de 0 para 1 ou de 1 para 0",
                "A perda temporária de comunicação de rádio com a Terra",
                "O reinício programado dos computadores de bordo"
            ],
            correct: 1
        },
        {
            question: "Qual o principal objetivo do Chaos Engineering (Engenharia do Caos) aeroespacial?",
            options: [
                "Provocar acidentes reais para testar a resistência física de foguetes",
                "Injetar falhas controladas no software para garantir resiliência e auto-recuperação",
                "Aumentar a radiação solar artificialmente nas salas de servidores",
                "Desligar os satélites permanentemente para economizar bateria"
            ],
            correct: 1
        },
        {
            question: "Qual componente de CubeSats é altamente vulnerável a raios cósmicos?",
            options: [
                "Painel de Alumínio Externo",
                "Circuitos Integrados Comerciais Comuns (COTS)",
                "Baterias de Íon de Lítio",
                "Fitas adesivas térmicas"
            ],
            correct: 1
        },
        {
            question: "Em Chaos Engineering, o que faz um 'Watchdog Timer'?",
            options: [
                "Monitora a presença física de intrusos na estação terrestre",
                "Mede a temperatura externa do satélite em órbita",
                "Reinicia o sistema de forma autônoma caso o software trave",
                "Envia fotos da Terra para as redes sociais"
            ],
            correct: 2
        },
        {
            question: "O que significa a sigla COTS no contexto de satélites de baixo custo?",
            options: [
                "Computer On The Space",
                "Commercial Off-The-Shelf (Componentes Comerciais de Prateleira)",
                "Cosmic Orbit Terminal System",
                "CubeSat Orbital Test Simulation"
            ],
            correct: 1
        },
        {
            question: "Como o simulador Rad Anux avalia a resiliência do CubeSat?",
            options: [
                "Medindo a resistência à tração das antenas",
                "Simulando bombardeio de radiação através de injeção de falhas lógicas e bit-flips",
                "Calculando a velocidade orbital máxima do CubeSat",
                "Prevendo o tempo de vida útil dos painéis solares"
            ],
            correct: 1
        },
        {
            question: "Qual técnica ajuda a mitigar bit-flips na memória de sistemas espaciais?",
            options: [
                "Redundância Tripla Modular (TMR) e códigos de correção de erro (ECC)",
                "Pintura protetora reflexiva nos microchips",
                "Desligar a memória RAM durante a noite espacial",
                "Aumentar a voltagem de funcionamento dos transistores"
            ],
            correct: 0
        },
        {
            question: "Quem é o professor responsável pela disciplina de Web Development nesta entrega?",
            options: [
                "Prof. Israel Marques",
                "Prof. Alberto Silva",
                "Prof. Carlos Souza",
                "Prof. Maurício Lima"
            ],
            correct: 0
        },
        {
            question: "Qual é a órbita típica onde operam a maioria dos CubeSats científicos?",
            options: [
                "Órbita Terrestre Baixa (LEO)",
                "Órbita Geoestacionária (GEO)",
                "Órbita Terrestre Média (MEO)",
                "Órbita Lunar Distante"
            ],
            correct: 0
        },
        {
            question: "Qual linguagem de programação pura é exigida nesta atividade de Web Development?",
            options: [
                "TypeScript e React",
                "HTML, CSS e JavaScript puro (Vanilla JavaScript)",
                "Python e Django",
                "Java e Spring Boot"
            ],
            correct: 1
        }
    ];

    let currentQuestionIndex = 0;
    let quizScore = 0;
    let selectedOptionIndex = null;

    const quizProgressText = document.getElementById("quiz-progress-text");
    const quizScoreLive = document.getElementById("quiz-score-live");
    const quizQuestionText = document.getElementById("quiz-question-text");
    const quizOptionsContainer = document.getElementById("quiz-options-container");
    const btnNextQuestion = document.getElementById("btn-next-question");
    const quizStatusDisplay = document.getElementById("quiz-status-display");

    const quizContainer = document.getElementById("quiz-container");
    const quizResultContainer = document.getElementById("quiz-result-container");
    const resultScorePercent = document.getElementById("result-score-percent");
    const resultTitleText = document.getElementById("result-title-text");
    const resultMessageText = document.getElementById("result-message-text");
    const statCorrect = document.getElementById("stat-correct");
    const statIncorrect = document.getElementById("stat-incorrect");
    const btnRestartQuiz = document.getElementById("btn-restart-quiz");

    function loadQuestion() {
        if (!quizQuestionText || !quizOptionsContainer) return;
        
        selectedOptionIndex = null;
        if (btnNextQuestion) {
            btnNextQuestion.disabled = true;
            btnNextQuestion.textContent = currentQuestionIndex === quizQuestions.length - 1 ? "Finalizar" : "Avançar";
            btnNextQuestion.classList.remove("btn-secondary");
            btnNextQuestion.classList.add("btn-secondary");
            btnNextQuestion.style.opacity = "0.5";
        }

        const currentQ = quizQuestions[currentQuestionIndex];
        
        // Atualiza cabeçalho e progresso
        if (quizProgressText) {
            quizProgressText.textContent = `Pergunta ${currentQuestionIndex + 1} de ${quizQuestions.length}`;
        }
        if (quizStatusDisplay) {
            quizStatusDisplay.textContent = `Respondendo (${currentQuestionIndex + 1}/${quizQuestions.length})`;
        }
        
        // Renderiza a pergunta
        quizQuestionText.textContent = currentQ.question;
        
        // Limpa e renderiza alternativas
        quizOptionsContainer.innerHTML = "";
        currentQ.options.forEach((opt, idx) => {
            const btn = document.createElement("button");
            btn.classList.add("quiz-opt-btn");
            btn.innerHTML = `<span class="value-highlight">${String.fromCharCode(65 + idx)})</span> ${opt}`;
            btn.addEventListener("click", () => selectOption(idx));
            quizOptionsContainer.appendChild(btn);
        });
    }

    function selectOption(index) {
        selectedOptionIndex = index;
        const optionBtns = quizOptionsContainer.querySelectorAll(".quiz-opt-btn");
        
        optionBtns.forEach((btn, idx) => {
            btn.classList.remove("selected");
            if (idx === index) {
                btn.classList.add("selected");
            }
        });

        if (btnNextQuestion) {
            btnNextQuestion.disabled = false;
            btnNextQuestion.style.opacity = "1";
            btnNextQuestion.classList.remove("btn-secondary");
        }
    }

    function handleNextQuestion() {
        const currentQ = quizQuestions[currentQuestionIndex];
        
        // Valida se a resposta está correta
        if (selectedOptionIndex === currentQ.correct) {
            quizScore++;
        }

        // Mostra resposta correta/errada antes de avançar (efeito visual curto)
        const optionBtns = quizOptionsContainer.querySelectorAll(".quiz-opt-btn");
        optionBtns.forEach((btn, idx) => {
            btn.disabled = true; // Desabilita cliques
            if (idx === currentQ.correct) {
                btn.classList.add("correct");
            } else if (idx === selectedOptionIndex) {
                btn.classList.add("wrong");
            }
        });

        // Aguarda 1 segundo e avança
        setTimeout(() => {
            // Atualiza Score live
            if (quizScoreLive) {
                quizScoreLive.textContent = `Acertos: ${quizScore}`;
            }

            currentQuestionIndex++;
            
            if (currentQuestionIndex < quizQuestions.length) {
                loadQuestion();
            } else {
                showQuizResults();
            }
        }, 1000);
    }

    function showQuizResults() {
        if (!quizContainer || !quizResultContainer) return;
        
        quizContainer.style.display = "none";
        quizResultContainer.style.display = "flex";

        const percent = Math.round((quizScore / quizQuestions.length) * 100);
        if (resultScorePercent) resultScorePercent.textContent = `${percent}%`;
        if (statCorrect) statCorrect.textContent = quizScore;
        if (statIncorrect) statIncorrect.textContent = quizQuestions.length - quizScore;

        let title = "Operador Inexperiente";
        let message = `Você acertou ${quizScore} de ${quizQuestions.length} perguntas. Precisa revisar os conceitos de radiação cósmica e redundância eletrônica.`;

        if (percent >= 90) {
            title = "Diretor de Voo da NASA";
            message = `Incrível! Você acertou ${quizScore} de ${quizQuestions.length} perguntas. Está totalmente preparado para guiar CubeSats de forma tolerante a falhas!`;
        } else if (percent >= 60) {
            title = "Engenheiro Aeroespacial";
            message = `Muito bom! Você acertou ${quizScore} de ${quizQuestions.length} perguntas. Possui sólidos conhecimentos sobre Chaos Engineering e bit-flips.`;
        }

        if (resultTitleText) resultTitleText.textContent = title;
        if (resultMessageText) resultMessageText.textContent = message;
        if (quizStatusDisplay) quizStatusDisplay.textContent = "Missão Concluída";
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        quizScore = 0;
        if (quizScoreLive) quizScoreLive.textContent = `Acertos: 0`;
        if (quizContainer) quizContainer.style.display = "flex";
        if (quizResultContainer) quizResultContainer.style.display = "none";
        loadQuestion();
    }

    if (quizQuestionText) {
        loadQuestion();
        if (btnNextQuestion) {
            btnNextQuestion.addEventListener("click", handleNextQuestion);
        }
        if (btnRestartQuiz) {
            btnRestartQuiz.addEventListener("click", restartQuiz);
        }
    }

    // ----------------------------------------------------
    // 7. VALIDAÇÃO DO FORMULÁRIO DE CADASTRO/CONTATO
    // ----------------------------------------------------
    const form = document.getElementById("academic-form");
    const formSuccessToast = document.getElementById("form-success-toast");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault(); // Impede o envio do form

            let isFormValid = true;

            // 1. Campo Nome
            const nameInput = document.getElementById("form-name");
            const errorName = document.getElementById("error-name");
            if (nameInput && errorName) {
                if (nameInput.value.trim() === "") {
                    nameInput.classList.add("invalid-field");
                    errorName.style.display = "block";
                    isFormValid = false;
                } else {
                    nameInput.classList.remove("invalid-field");
                    errorName.style.display = "none";
                }
            }

            // 2. Campo E-mail
            const emailInput = document.getElementById("form-email");
            const errorEmail = document.getElementById("error-email");
            if (emailInput && errorEmail) {
                const emailVal = emailInput.value.trim();
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailVal === "") {
                    emailInput.classList.add("invalid-field");
                    errorEmail.textContent = "Este campo é obrigatório.";
                    errorEmail.style.display = "block";
                    isFormValid = false;
                } else if (!emailPattern.test(emailVal)) {
                    emailInput.classList.add("invalid-field");
                    errorEmail.textContent = "Por favor, insira um e-mail válido.";
                    errorEmail.style.display = "block";
                    isFormValid = false;
                } else {
                    emailInput.classList.remove("invalid-field");
                    errorEmail.style.display = "none";
                }
            }

            // 3. Campo Instituição/Organização
            const orgInput = document.getElementById("form-org");
            const errorOrg = document.getElementById("error-org");
            if (orgInput && errorOrg) {
                if (orgInput.value.trim() === "") {
                    orgInput.classList.add("invalid-field");
                    errorOrg.style.display = "block";
                    isFormValid = false;
                } else {
                    orgInput.classList.remove("invalid-field");
                    errorOrg.style.display = "none";
                }
            }

            // 4. Campo Setor
            const sectorSelect = document.getElementById("form-sector");
            const errorSector = document.getElementById("error-sector");
            if (sectorSelect && errorSector) {
                if (sectorSelect.value === "") {
                    sectorSelect.classList.add("invalid-field");
                    errorSector.style.display = "block";
                    isFormValid = false;
                } else {
                    sectorSelect.classList.remove("invalid-field");
                    errorSector.style.display = "none";
                }
            }

            // 5. Campo Mensagem
            const messageInput = document.getElementById("form-message");
            const errorMessageText = document.getElementById("error-message-text");
            if (messageInput && errorMessageText) {
                if (messageInput.value.trim() === "") {
                    messageInput.classList.add("invalid-field");
                    errorMessageText.style.display = "block";
                    isFormValid = false;
                } else {
                    messageInput.classList.remove("invalid-field");
                    errorMessageText.style.display = "none";
                }
            }

            // Se o formulário for válido, exibe mensagem de sucesso
            if (isFormValid) {
                if (formSuccessToast) {
                    formSuccessToast.style.display = "block";
                    
                    // Limpa os campos após 3 segundos
                    setTimeout(() => {
                        form.reset();
                        formSuccessToast.style.display = "none";
                    }, 4000);
                }
            }
        });

        // Remove estilos inválidos dinamicamente ao digitar/selecionar
        const inputs = form.querySelectorAll(".form-input");
        inputs.forEach(input => {
            input.addEventListener("input", () => {
                if (input.value.trim() !== "") {
                    input.classList.remove("invalid-field");
                    const parent = input.parentElement;
                    const errorMsg = parent.querySelector(".error-message");
                    if (errorMsg) errorMsg.style.display = "none";
                }
            });
            input.addEventListener("change", () => {
                if (input.value !== "") {
                    input.classList.remove("invalid-field");
                    const parent = input.parentElement;
                    const errorMsg = parent.querySelector(".error-message");
                    if (errorMsg) errorMsg.style.display = "none";
                }
            });
        });
    }
});