// Adiciona um ouvinte de evento ao botão "Sortear"
document.getElementById('drawButton').addEventListener('click', async () => {
  try {
    // Toca um efeito sonoro ao iniciar o sorteio
    const audio = new Audio('sound.mp3'); // Cria objeto de áudio
    await audio.play(); // Aguarda a reprodução do áudio
    
    // Faz requisição para carregar a lista de nomes
    const response = await fetch('cadastrados.json'); // Busca o arquivo JSON
    const data = await response.json(); // Converte resposta para JSON
    const names = data.names; // Extrai o array de nomes
    
    // Inicia a animação do sorteio
    animateDrawing(names);
  } catch (error) {
    // Trata erros (ex.: áudio ou JSON indisponíveis)
    console.error('Erro na operação:', error); // Loga o erro no console
    document.getElementById('winnerName').textContent = 'Erro ao realizar o sorteio!'; // Mostra mensagem de erro na página
  }
});

// Função para animar a exibição de nomes aleatórios
function animateDrawing(names) {
  const winnerNameElement = document.getElementById('winnerName'); // Seleciona o elemento do nome
  let counter = 0; // Contador para limitar a animação
  const animationInterval = setInterval(() => { // Executa a cada 100ms
    const randomIndex = Math.floor(Math.random() * names.length); // Gera índice aleatório
    winnerNameElement.textContent = names[randomIndex]; // Exibe nome aleatório
    counter++; // Incrementa o contador
    if (counter >= 55) { // Para após 55 ciclos (~5,5 segundos)
      clearInterval(animationInterval); // Encerra o intervalo
      displayFinalWinner(names, randomIndex); // Mostra o vencedor final
    }
  }, 100); // Intervalo de 100 milissegundos
}

// Função para exibir o vencedor final e disparar confete
function displayFinalWinner(names, index) {
  const winnerNameElement = document.getElementById('winnerName'); // Seleciona o elemento do nome
  winnerNameElement.textContent = names[index]; // Define o nome final
  if (names[index]) { // Verifica se o nome é válido
    launchConfetti(); // Dispara o efeito de confete
  }
}

// Função para criar o efeito de confete
const launchConfetti = () => {
  const duration = 4000; // Duração total da animação (4 segundos)
  const animationEnd = Date.now() + duration; // Momento de término da animação
  const defaults = { // Configurações padrão das partículas
    startVelocity: 60, // Velocidade inicial alta para subir mais
    gravity: 0.3, // Gravidade baixa para queda lenta
    spread: 360, // Dispersão em 360 graus
    ticks: 60, // Duração das partículas no ar
    scalar: 1, // Tamanho padrão das partículas
    zIndex: 100, // Garante que o confete fique acima de outros elementos
  };

  // Função auxiliar para gerar números aleatórios em um intervalo
  const randomInRange = (min, max) => Math.random() * (max - min) + min;

  const interval = setInterval(() => { // Executa a cada 250ms
    const timeLeft = animationEnd - Date.now(); // Calcula tempo restante
    if (timeLeft <= 0) { // Para quando o tempo acabar
      clearInterval(interval); // Encerra o intervalo
      return;
    }
    const particleCount = 1500 * (timeLeft / duration); // Ajusta número de partículas pelo tempo
    confetti(Object.assign({}, defaults, { // Dispara confete com configurações
      particleCount, // Quantidade de partículas
      origin: {
        x: randomInRange(0, 1), // Posição horizontal aleatória
        y: Math.random() * 0.2 + 0.8, // Origem próxima à base da tela
      },
    }));
  }, 250); // Intervalo de 250 milissegundos
};