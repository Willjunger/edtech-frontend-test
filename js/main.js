// Scripts da landing page

document.addEventListener('DOMContentLoaded', () => {
  initInteractiveCards();
});

function initInteractiveCards() {
  const cardButtons = document.querySelectorAll('.interactive-card__btn');

  cardButtons.forEach(button => {
    button.addEventListener('click', () => {
      const card = button.closest('.interactive-card');
      if (!card) return;

      const expandedContent = card.querySelector('.interactive-card__expanded-content');
      const isExpanded = card.classList.contains('interactive-card--expanded');

      if (isExpanded) {
        // Recolher card
        card.classList.remove('interactive-card--expanded');
        button.setAttribute('aria-expanded', 'false');
        button.textContent = 'Abrir';
        if (expandedContent) {
          expandedContent.setAttribute('aria-hidden', 'true');
        }
      } else {
        // Expandir card
        card.classList.add('interactive-card--expanded');
        button.setAttribute('aria-expanded', 'true');
        button.textContent = 'Fechar';
        if (expandedContent) {
          expandedContent.setAttribute('aria-hidden', 'false');
        }
      }
    });
  });
}
