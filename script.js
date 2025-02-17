// Adiciona um ouvinte de evento ao botão de sorteio para executar a lógica quando clicado
document.getElementById('drawButton').addEventListener('click', async () => {
  try {
    // Cria e executa um arquivo de áudio para adicionar efeito sonoro ao sorteio
    const audio = new Audio('sound.mp3');
    await audio.play();

    // Faz uma solicitação para obter a lista de nomes de um arquivo JSON
    const response = await fetch('cadastrados.json');
    const data = await response.json();
    const names = data.names;
    
    // Chama a função para iniciar a animação dos nomes sendo sorteados
    animateDrawing(names);

  } catch (error) {
    // Captura e exibe qualquer erro no console e na página web
    console.error('Erro na operação:', error);
    document.getElementById('winnerName').textContent = 'Erro ao realizar o sorteio!';
  }
});

// Função para animar a exibição de nomes aleatórios da lista
function animateDrawing(names) {
  const winnerNameElement = document.getElementById('winnerName');
  let counter = 0;
  // Define um intervalo para mudar o nome exibido a cada 100 milissegundos
  const animationInterval = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * names.length);
    winnerNameElement.textContent = names[randomIndex];
    counter++;
    
    // Interrompe a animação após 55 atualizações e exibe o vencedor final
    if (counter >= 55) {
      clearInterval(animationInterval);
      displayFinalWinner(names, randomIndex);
    }
  }, 100);
}

// Função para mostrar o nome final do vencedor e disparar efeito de confete
function displayFinalWinner(names, index) {
  const winnerNameElement = document.getElementById('winnerName');
  winnerNameElement.textContent = names[index];

  // Se o nome do vencedor for válido, dispara o efeito de confete
  if (names[index]) {
    launchConfetti();
  }
}

// Função aprimorada para lançar confetes com partículas que sobem mais alto
const launchConfetti = () => {
  // Duração total da animação em milissegundos
  const duration = 4000;
  const animationEnd = Date.now() + duration;
  const defaults = {
    startVelocity: 60, // Aumenta a velocidade inicial para que as partículas subam mais
    gravity: 0.3,      // Diminui a gravidade para que as partículas desacelerem menos na subida
    spread: 360,
    ticks: 60,
    scalar: 1,
    zIndex: 100,
  };

  // Função auxiliar para gerar número aleatório em um intervalo
  const randomInRange = (min, max) => Math.random() * (max - min) + min;

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    // Calcula a quantidade de partículas proporcional ao tempo restante
    const particleCount = 1500 * (timeLeft / duration);
    confetti(Object.assign({}, defaults, {
      particleCount,
      origin: {
        x: randomInRange(0, 1),         // Origem aleatória na horizontal
        y: Math.random() * 0.2 + 0.8,     // Origem próxima à base para efeito de queda
      },
    }));
  }, 250);
};
