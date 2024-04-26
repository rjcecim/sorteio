document.getElementById('drawButton').addEventListener('click', async () => {
  try {
    const audio = new Audio('sound.mp3');
    await audio.play();

    const response = await fetch('cadastrados.json');
    const data = await response.json();
    const names = data.names;
    
    animateDrawing(names);

  } catch (error) {
    console.error('Erro na operação:', error);
    document.getElementById('winnerName').textContent = 'Erro ao realizar o sorteio!';
  }
});

function animateDrawing(names) {
  const winnerNameElement = document.getElementById('winnerName');
  let counter = 0;
  const animationInterval = setInterval(() => {
    const randomIndex = Math.floor(Math.random() * names.length);
    
    // Aplica fade out antes de mudar o nome
    winnerNameElement.classList.add('fadeOut');

    setTimeout(() => {
      winnerNameElement.textContent = names[randomIndex];
      // Remove a classe fadeOut e aplica fadeIn novamente
      winnerNameElement.classList.remove('fadeOut');
      winnerNameElement.classList.add('fadeIn');
    }, 500); // Tempo de espera deve ser metade do tempo total da animação

    counter++;
    
    if (counter >= 55) {
      clearInterval(animationInterval);
      displayFinalWinner(names, randomIndex);
    }
  }, 1000); // Aumentar o intervalo para permitir animação completa
}

function displayFinalWinner(names, index) {
  const winnerNameElement = document.getElementById('winnerName');
  winnerNameElement.textContent = names[index];

  if (names[index]) {
    launchConfetti();
  }
}

function launchConfetti() {
  const confettiSettings = {
    particleCount: 2500,
    startVelocity: 70,
    gravity: 0.1,
    spread: 360,
    origin: { y: 0.6 },
    ticks: 2500,
    scalar: 1.2,
  };

  confetti.create(document.getElementById('canvas'), { resize: true })(confettiSettings);
}
