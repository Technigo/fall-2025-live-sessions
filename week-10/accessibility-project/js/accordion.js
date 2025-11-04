document.addEventListener('DOMContentLoaded', () => {
  const accordion = document.querySelector('.accordion');

  if (!accordion) return;

  const buttons = document.querySelectorAll('.accordion-button');

  buttons.forEach((button, index) => {
    const targetId = button.getAttribute('aria-controls');
    const targetPanel = document.getElementById(targetId);

    button.addEventListener('click', () => {
      togglePanel(button, targetPanel);
    });
  });

  function togglePanel(button, panel) {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    const newExpandedState = !isExpanded;

    button.setAttribute('aria-expanded', newExpandedState);

    if (newExpandedState) {
      panel.hidden = false;
      requestAnimationFrame(() => {
        panel.style.maxHeight = panel.scrollHeight + 'px';
      });
    } else {
      panel.style.maxHeight = '0';
      panel.addEventListener(
        'transitioned',
        () => {
          panel.hidden = true;
        },
        { once: true }
      );
    }
  }
});
