const landingPage = document.getElementById('landing-page');
const letterPage = document.getElementById('letter-page');
const yesPage = document.getElementById('yes-page');
const startBtn = document.getElementById('start-btn');
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const backgroundMusic = document.getElementById('background-music');
const meterFill = document.querySelector('.meter-fill');

// Transition to the letter page
startBtn.addEventListener('click', () => {
  landingPage.classList.add('hidden');
  letterPage.classList.remove('hidden');
  backgroundMusic.play();
});

// Love meter animation
yesBtn.addEventListener('mouseover', () => {
  meterFill.style.width = '100%';
});

yesBtn.addEventListener('mouseout', () => {
  meterFill.style.width = '0';
});

// Handle "Yes" button click
yesBtn.addEventListener('click', () => {
  letterPage.classList.add('hidden');
  yesPage.classList.remove('hidden');
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    shapes: ['heart']
  });
});

// Handle "No" button click
noBtn.addEventListener('click', () => {
  let count = 5; // Start with 1 "Yes" button
  const spawnYesButtons = () => {
    for (let i = 0; i < count; i++) {
      const newYesBtn = document.createElement('button');
      newYesBtn.textContent = 'Yes';
      newYesBtn.classList.add('yes-btn');
      newYesBtn.style.position = 'absolute';
      newYesBtn.style.left = `${Math.random() * 80 + 10}%`; // Random horizontal position
      newYesBtn.style.top = `${Math.random() * 80 + 10}%`; // Random vertical position
      newYesBtn.addEventListener('click', () => {
        letterPage.classList.add('hidden');
        yesPage.classList.remove('hidden');
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          shapes: ['heart']
        });
      });
      letterPage.appendChild(newYesBtn);
    }
    count += 2; // Increase the number of "Yes" buttons spawned each time
  };

  spawnYesButtons(); // Spawn "Yes" buttons
});

// Play again button
playAgainBtn.addEventListener('click', () => {
  yesPage.classList.add('hidden');
  landingPage.classList.remove('hidden');
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;

  // Remove all spawned "Yes" buttons
  const yesButtons = document.querySelectorAll('.yes-btn');
  yesButtons.forEach(button => button.remove());
});