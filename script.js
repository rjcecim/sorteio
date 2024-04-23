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

// Função para iniciar o efeito de confete na tela
function launchConfetti() {
  const confettiSettings = {
    particleCount: 2500, // Número de partículas
    startVelocity: 70, // Velocidade inicial das partículas
    gravity: 0.1, // Gravidade aplicada às partículas
    spread: 360, // Espalhamento das partículas em graus
    origin: { y: 0.6 }, // Origem vertical das partículas
    ticks: 2500, // Duração da animação em ticks
    scalar: 1.2, // Escala das partículas
  };

  // Cria e executa a animação de confete utilizando a biblioteca confetti.js
  confetti.create(document.getElementById('canvas'), { resize: true })(confettiSettings);
}
