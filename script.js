const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
const matrixChars = matrix.split("");

const fontSize = 14;
const columns = canvas.width / fontSize;
const drops = [];

for (let i = 0; i < columns; i++) {
    drops[i] = Math.floor(Math.random() * -canvas.height / fontSize);
}

function drawMatrix() {
    ctx.fillStyle = "rgba(13, 2, 8, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "#00ff41";
    ctx.font = fontSize + "px monospace";
    
    for (let i = 0; i < drops.length; i++) {
        const text = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 35);

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');

const commands = {
    help: `Comandos disponíveis:
    
help        - Mostra esta mensagem
about       - Informações sobre mim
skills      - Minhas habilidades técnicas
projects    - Lista de projetos
contact     - Informações de contato
experience  - Experiência profissional
education   - Formação acadêmica
clear       - Limpa o terminal`,

    about: `> INFORMAÇÕES PESSOAIS

Nome: Larissa Vitoria
Cargo: Software Developer
Localização: Brasil

Sou uma desenvolvedora apaixonada por tecnologia
e resolução de problemas através do código. Sempre em busca
de aprender novas tecnologias e melhorar minhas habilidades.`,

    skills: `> HABILIDADES TÉCNICAS

[████████░░] JavaScript     80%
[███████░░░] React          70%
[██████░░░░] HTML/CSS       60%
[██████░░░░] Node.js        60%
[█████░░░░░] Python         50%
[█████░░░░░] Git            50%
[████░░░░░░] MongoDB        40%
[████░░░░░░] SQL            40%

Soft Skills:
• Trabalho em equipe
• Comunicação clara
• Resolução de problemas
• Pensamento lógico
• Aprendizado contínuo`,

    projects: `> PROJETOS RECENTES

[01] Lumus - Bookshelf Scanner
     Stack: Python, React e Vite
     Status: Em andamento
     
[02] Gestor de Obras Inteligente
     Stack: JavaScript, React e TailwindCSS
     Status: Em andamento
     
[03] LOADING...
     Stack: EM DESENVOLVIMENTO
     Status: xx
     
Digite 'contact' para saber como ver mais detalhes.`,

    contact: `> INFORMAÇÕES DE CONTATO

Email: vlarissaq265@gmail.com
GitHub: github.com/withxlari
LinkedIn: linkedin.com/in/larissavitoriax

Disponível para:
• Projetos freelance
• Oportunidades de trabalho
• Colaborações em projetos open source
• Networking profissional`,

    experience: `> EXPERIÊNCIA PROFISSIONAL

[2024 - Presente] Freelance Developer
• Desenvolvimento de aplicações web
• Manutenção de sistemas existentes
• Implementação de novas features`,

    education: `> FORMAÇÃO ACADÊMICA

[2025 - Presente] Ciência da Computação
Instituição: [Universidade Cruzeiro do Sul]
• Full Stack Development
• Metodologias ágeis
• Projetos práticos

Cursos e Certificações:

• English Certificate C1
    Instituição: [EF Set]

• Inteligência Artificial
    Instituição: [Fundação Bradesco]

• Python
    Instituição: [Fundação Bradesco]

• Workshop Android Pentester
    Instituição: [Solyd Offensive Security]

• Back-end com Java
    Instituição: [Santander e DIO]

• NLW Expert trilha de HTML, CSS e Javascrip
    Instituição: [Rocketseat]

• Comparação Prática: R vs Python na Estatística para Ciência de Dados
    Instituição: [Universidade Cruzeiro do Sul]

• Empreender com Dados: Como IA e BI Ajudam Startups a Tomar Decisões com Precisão
    Instituição: [Universidade Cruzeiro do Sul]

• Inteligência Artificial: do fundamento aos Grafos de Conhecimento
    Instituição: [Universidade Cruzeiro do Sul]

• Git & GitHub`,

    clear: 'CLEAR'
};

function addTerminalLine(text, isCommand = false) {
    const line = document.createElement('div');
    line.className = 'terminal-line';
    
    if (isCommand) {
        line.innerHTML = `<span class="terminal-prompt">unknown@:~$</span> ${text}`;
    } else {
        line.textContent = text;
    }
    
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function initTerminal() {
    const welcomeText = `Bem-vindo ao Neo City x
    
Sistema inicializado com sucesso...
Digite 'help' para ver os comandos disponíveis.
`;
    addTerminalLine(welcomeText);
}

terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const input = terminalInput.value.trim().toLowerCase();
        
        if (input) {
            addTerminalLine(input, true);
            
            if (commands[input]) {
                if (input === 'clear') {
                    terminalOutput.innerHTML = '';
                } else {
                    addTerminalLine(commands[input]);
                }
            } else {
                addTerminalLine(`Comando '${input}' não encontrado. Digite 'help' para ver os comandos disponíveis.`);
            }
        }
        
        terminalInput.value = '';
    }
});

document.addEventListener('DOMContentLoaded', () => {
    initTerminal();
});

const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        
        alert('Mensagem enviada com sucesso! Em breve entrarei em contato.');
        form.reset();
    });
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.about-card, .project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

terminalInput.addEventListener('focus', () => {
    document.querySelector('.terminal-input-line').style.boxShadow = '0 0 10px rgba(0, 255, 65, 0.3)';
});

terminalInput.addEventListener('blur', () => {
    document.querySelector('.terminal-input-line').style.boxShadow = 'none';
});