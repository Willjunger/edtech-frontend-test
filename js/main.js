// Scripts da landing page

document.addEventListener('DOMContentLoaded', () => {
  initInteractiveCards();
  initImageSlider();
});

/**
 * Inicializa o slider de imagens usando a biblioteca Swiper.
 */
function initImageSlider() {
  const sliderTrack = document.getElementById('slider-track');
  if (!sliderTrack) return;

  new Swiper('.slider__track-container', {
    loop: false, // Mantém o slider linear com limite nas setas
    speed: 400,
    spaceBetween: 0,
    
    // Navegação (Setas)
    navigation: {
      nextEl: '#slider-next-btn',
      prevEl: '#slider-prev-btn',
    },

    // Paginação Dinâmica (Dots)
    pagination: {
      el: '#slider-dots',
      clickable: true,
      bulletClass: 'slider__dot',
      bulletActiveClass: 'slider__dot--active',
      renderBullet: function (index, className) {
        return `<button class="${className}" aria-label="Ir para o slide ${index + 1}"></button>`;
      }
    },

    // Suporte nativo a acessibilidade
    a11y: {
      prevSlideMessage: 'Slide anterior',
      nextSlideMessage: 'Próximo slide',
      firstSlideMessage: 'Este é o primeiro slide',
      lastSlideMessage: 'Este é o último slide',
      paginationBulletMessage: 'Ir para o slide {{index}}',
    }
  });
}

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
