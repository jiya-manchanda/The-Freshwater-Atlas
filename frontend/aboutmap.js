document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start-game');
  const chapterImages = document.querySelectorAll('.chapter-images img');

  let foundArtifacts = 0;

  // Start the game
  startButton.addEventListener('click', () => {
    document.querySelector('#chapter1').classList.remove('hidden');
    startButton.parentElement.classList.add('hidden');
  });

  // Artifact discovery or Try Again logic
  chapterImages.forEach((image) => {
    image.addEventListener('click', () => {
      const artifactId = image.dataset.artifact;
      const targetArtifact = document.getElementById(artifactId);

      // Hide all messages in the current chapter
      const parentChapter = image.closest('.chapter');
      parentChapter.querySelectorAll('.artifact, .try-again').forEach((msg) => {
        msg.classList.add('hidden');
      });

      // Reveal the appropriate message
      targetArtifact.classList.remove('hidden');

      // Disable further clicks for this image
      image.style.pointerEvents = 'none';

      // Increment artifacts found if it's an artifact
      if (artifactId.startsWith('artifact')) {
        foundArtifacts++;

        if (foundArtifacts === document.querySelectorAll('.artifact').length) {
          setTimeout(() => {
            alert('Congratulations! You found all the artifacts!');
          }, 500);
        }
      }
    });
  });
});
