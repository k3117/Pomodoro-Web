// Variáveis Globais de Controle da Aplicação
let remaining = 0;       // Segundos totais restantes
let interval = null;     // Guardará o ID do setInterval
let running = false;     // Estado: se o cronômetro está rodando ou pausado
let chosenEgg = '🍳';    // Guardará o emoji escolhido pelo usuário

// Mapeamento dos elementos que serão manipulados na tela
const display = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const timerEgg = document.getElementById('timer-egg');

/**
 * Cria e dispara um som sintetizado de alarme em tempo real 
 * utilizando a Web Audio API nativa do próprio navegador.
 */
function playAlarmSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const now = audioContext.currentTime;
        const duration = 2; // Tempo de duração do bip (2 segundos)
        
        // Cria dois geradores de onda sonora (osciladores) em frequências diferentes para dar o efeito de acorde
        const osc1 = audioContext.createOscillator();
        const osc2 = audioContext.createOscillator();
        const gainNode = audioContext.createGain(); // Controle de volume
        
        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(audioContext.destination); // Envia o som para as caixas/fones
        
        osc1.frequency.setValueAtTime(800, now); // Frequência aguda 1
        osc2.frequency.setValueAtTime(600, now); // Frequência aguda 2
        
        gainNode.gain.setValueAtTime(0.3, now); // Volume inicial em 30%
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + duration); // Faz o som sumir suavemente no final
        
        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + duration);
        osc2.stop(now + duration);
    } catch (e) {
        console.log('Suporte de áudio indisponível neste navegador.');
    }
}

/**
 * Acionada ao clicar em um tempo na primeira tela.
 * Salva o tempo e avança para a tela de escolher o mascote.
 */
function selectTime(minutes) {
    remaining = minutes * 60;
    document.getElementById('screen-time').classList.add('hidden');
    document.getElementById('screen-egg').classList.remove('hidden');
}

/**
 * Acionada ao escolher o estilo do ovo.
 * Define o emoji no mostrador e avança para a tela final do timer.
 */
function selectEgg(emoji) {
    chosenEgg = emoji;
    timerEgg.textContent = emoji;
    document.getElementById('screen-egg').classList.add('hidden');
    document.getElementById('screen-timer').classList.remove('hidden');
    running = false;
    if (interval) clearInterval(interval);
    startBtn.textContent = 'INICIAR';
    updateDisplay();
}

/**
 * Renderiza os números formatados como MM:SS no mostrador digital
 */
function updateDisplay() {
    const m = String(Math.floor(remaining / 60)).padStart(2, '0');
    const s = String(remaining % 60).padStart(2, '0');
    display.textContent = `${m}:${s}`;
}

/**
 * Controla os estados do botão principal (Iniciar / Pausar) e ativa o contador
 */
function toggleTimer() {
    if (running) {
        // Modo: Pausar
        clearInterval(interval);
        running = false;
        startBtn.textContent = 'INICIAR';
    } else {
        // Modo: Iniciar Contagem
        running = true;
        startBtn.textContent = 'PAUSAR';
        interval = setInterval(() => {
            remaining--;
            
            // Quando a contagem regressiva chega a zero
            if (remaining <= 0) {
                clearInterval(interval);
                running = false;
                playAlarmSound(); // Ativa o sinal sonoro
                document.getElementById('screen-timer').classList.add('hidden');
                document.getElementById('screen-done').classList.remove('hidden');
            }
            updateDisplay();
        }, 1000);
    }
}

/**
 * Função de Soneca: Adiciona 1 minuto extra direto da tela de sucesso
 */
function snooze() {
    document.getElementById('screen-done').classList.add('hidden');
    document.getElementById('screen-timer').classList.remove('hidden');
    remaining = 60; // 60 segundos (1 minuto)
    running = false;
    startBtn.textContent = 'INICIAR';
    updateDisplay();
}

/**
 * Reseta todos os estados e reconduz o usuário de volta para a primeira tela
 */
function restart() {
    if (interval) clearInterval(interval);
    running = false;
    document.getElementById('screen-timer').classList.add('hidden');
    document.getElementById('screen-done').classList.add('hidden');
    document.getElementById('screen-egg').classList.add('hidden');
    document.getElementById('screen-time').classList.remove('hidden');
}