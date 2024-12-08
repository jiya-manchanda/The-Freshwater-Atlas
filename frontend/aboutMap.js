document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start-game');
  const buttons = document.querySelectorAll('.reveal-button');
  const artifacts = document.querySelectorAll('.artifact');
  const chapterImages = document.querySelectorAll('.chapter-image');

  let foundArtifacts = 0;

  // Start the game
  startButton.addEventListener('click', () => {
    document.querySelector('#chapter1').classList.remove('hidden');
    startButton.parentElement.classList.add('hidden');
  });

  // Reveal next chapter
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const targetSelector = button.dataset.target;
      const targetElement = document.querySelector(targetSelector);

      if (targetElement) {
        targetElement.classList.remove('hidden');
        button.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Artifact discovery
  chapterImages.forEach((image, index) => {
    image.addEventListener('click', () => {
      artifacts[index].classList.remove('hidden');
      image.style.pointerEvents = 'none';
      foundArtifacts++;

      if (foundArtifacts === artifacts.length) {
        setTimeout(() => {
          alert('Congratulations! You found all the artifacts!');
        }, 500);
      }
    });
  });
});
