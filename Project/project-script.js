const cards = document.querySelectorAll('.card');

cards.forEach((card) => {
  let animationFrameId;

  const handleMouseMove = (e) => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }

    animationFrameId = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Update CSS variables for transformation
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
      
      // Add the 'moving' class to apply any additional transformations if needed
      card.classList.add('moving');
    });
  };

  const handleMouseOut = () => {
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
    }

    // Remove the 'moving' class when the mouse leaves the card
    card.classList.remove('moving');
  };

  card.addEventListener('mousemove', handleMouseMove);
  card.addEventListener('mouseout', handleMouseOut);
});
