const cards = document.querySelectorAll('.card');

cards.forEach((card, index) => {
  const img = card.querySelector('img');
  const config = {
    zIndex: 1,
    movingClassName: 'moving'
  };

  function getCenterCoordinates(rect) {
    return {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    };
  }

  function handleMouseMove(e) {
    const rect = card.getBoundingClientRect();
    const center = getCenterCoordinates(rect);
    const x = e.clientX - center.x;
    const y = e.clientY - center.y;

    // Add a threshold value to ensure the hover effect is only triggered when the mouse is within 10px of the center
    if (Math.abs(x) < 10 && Math.abs(y) < 10) {
      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
      card.classList.add(config.movingClassName);
      img.style.zIndex = config.zIndex;
    }
  }

  function handleMouseOut() {
    card.classList.remove(config.movingClassName);
  }

  // Add responsive conditions
  const mediaQuery = window.matchMedia('(max-width: 768px)');
  mediaQuery.addListener((e) => {
    if (e.matches) {
      // On small screens, disable the hover effect
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseout', handleMouseOut);
    } else {
      // On large screens, enable the hover effect
      card.addEventListener('mouseover', () => {
        card.addEventListener('mousemove', handleMouseMove);
      });
      card.addEventListener('mouseout', () => {
        card.removeEventListener('mousemove', handleMouseMove);
        handleMouseOut();
      });
    }
  });

  // Initialize the responsive conditions
  if (mediaQuery.matches) {
    card.removeEventListener('mousemove', handleMouseMove);
    card.removeEventListener('mouseout', handleMouseOut);
  } else {
    card.addEventListener('mouseover', () => {
      card.addEventListener('mousemove', handleMouseMove);
    });
    card.addEventListener('mouseout', () => {
      card.removeEventListener('mousemove', handleMouseMove);
      handleMouseOut();
    });
  }
});