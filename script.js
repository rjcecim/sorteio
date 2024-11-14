document.addEventListener('DOMContentLoaded', () => {
    const drawButton = document.getElementById('drawButton');
    const winnerNameElement = document.getElementById('winnerName');

    drawButton.addEventListener('click', async () => {
        try {
            const audio = new Audio('sound.mp3');
            await audio.play();

            const response = await fetch('cadastrados.json');
            const { names } = await response.json();

            animateDrawing(names);
        } catch (error) {
            console.error('Erro na operação:', error);
            winnerNameElement.textContent = 'Erro ao realizar o sorteio!';
        }
    });

    const animateDrawing = (names) => {
        let counter = 0;
        const animationInterval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * names.length);
            winnerNameElement.textContent = names[randomIndex];
            counter++;

            if (counter >= 55) {
                clearInterval(animationInterval);
                displayFinalWinner(names[randomIndex]);
            }
        }, 100);
    };

    const displayFinalWinner = (winner) => {
        winnerNameElement.textContent = winner;
        if (winner) launchConfetti();
    };

    const launchConfetti = () => {
        const confettiSettings = {
            particleCount: 2500,
            startVelocity: 70,
            gravity: 0.1,
            spread: 360,
            origin: { y: 0.6 },
            ticks: 2500,
            scalar: 1.2
        };
        confetti(confettiSettings);
    };
});