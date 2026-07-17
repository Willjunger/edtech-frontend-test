// Scripts da landing page

document.addEventListener('DOMContentLoaded', () => {
  initInteractiveCards();
  initImageSlider();
  initDiscursiveActivity();
  initObjectiveActivity();
});

/**
 * Inicializa o slider de imagens usando a biblioteca Swiper.
 */
function initImageSlider() {
  const sliderTrack = document.getElementById('slider-track');
  if (!sliderTrack) return;

  new Swiper('.slider__track-container', {
    loop: false,
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

/**
 * Inicializa a lógica e persistência da Atividade Discursiva.
 */
function initDiscursiveActivity() {
  const textarea = document.getElementById('discursive-response');
  const submitBtn = document.getElementById('discursive-submit');
  const editBtn = document.getElementById('discursive-edit');
  const feedback = document.getElementById('discursive-feedback');
  const closeFeedbackBtn = document.getElementById('discursive-feedback-close');

  if (!textarea || !submitBtn || !editBtn || !feedback) return;

  function saveState() {
    const state = {
      text: textarea.value,
      submitted: textarea.disabled,
      feedbackVisible: feedback.style.display !== 'none'
    };
    sessionStorage.setItem('discursive_activity_state', JSON.stringify(state));
  }

  function restoreState() {
    const saved = sessionStorage.getItem('discursive_activity_state');
    if (saved) {
      const state = JSON.parse(saved);
      textarea.value = state.text || '';

      if (state.submitted) {
        textarea.disabled = true;
        submitBtn.disabled = true;
        editBtn.disabled = false;
      } else {
        textarea.disabled = false;
        submitBtn.disabled = textarea.value.trim() === '';
        editBtn.disabled = true;
      }

      if (state.feedbackVisible) {
        feedback.style.display = 'flex';
      } else {
        feedback.style.display = 'none';
      }
    } else {
      textarea.value = '';
      textarea.disabled = false;
      submitBtn.disabled = true;
      editBtn.disabled = true;
      feedback.style.display = 'none';
    }
  }

  textarea.addEventListener('input', () => {
    submitBtn.disabled = textarea.value.trim() === '';
    saveState();
  });

  submitBtn.addEventListener('click', () => {
    textarea.disabled = true;
    submitBtn.disabled = true;
    editBtn.disabled = false;
    feedback.style.display = 'flex';
    saveState();
  });

  editBtn.addEventListener('click', () => {
    textarea.disabled = false;
    submitBtn.disabled = textarea.value.trim() === '';
    editBtn.disabled = true;
    feedback.style.display = 'none';
    saveState();
  });

  if (closeFeedbackBtn) {
    closeFeedbackBtn.addEventListener('click', () => {
      feedback.style.display = 'none';
      saveState();
    });
  }

  restoreState();
}

/**
 * Inicializa a lógica e persistência da Atividade Objetiva.
 */
function initObjectiveActivity() {
  const checkboxes = document.querySelectorAll('.objective-option__input');
  const submitBtn = document.getElementById('objective-submit');
  const editBtn = document.getElementById('objective-edit');
  const feedback = document.getElementById('objective-feedback');
  const feedbackCloseBtn = document.getElementById('objective-feedback-close');

  if (checkboxes.length === 0 || !submitBtn || !editBtn || !feedback) return;

  const feedbackTitle = feedback.querySelector('.alert__title');
  const feedbackText = feedback.querySelector('.alert__text');

  const ORIGINAL_WARNING_TITLE = "Tente novamente!";
  const ORIGINAL_WARNING_TEXT = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Pariatur commodi odio maiores accusamus aspernatur consequatur ipsam dignissimos magnam hic, velit est perferendis explicabo aperiam ratione veritatis labore.";

  const SUCCESS_TITLE = "É isso aí!";
  const SUCCESS_TEXT = "Você acertou! A opção B é a resposta correta sobre o Lorem Ipsum.";

  function hasSelection() {
    return Array.from(checkboxes).some(cb => cb.checked);
  }

  function isCorrect() {
    const checkedValues = Array.from(checkboxes)
      .filter(cb => cb.checked)
      .map(cb => cb.value);

    return checkedValues.length === 1 && checkedValues[0] === 'B';
  }

  function updateFeedbackUI(correct) {
    if (correct) {
      feedback.classList.remove('alert--warning');
      feedback.classList.add('alert--success');
      if (feedbackTitle) feedbackTitle.textContent = SUCCESS_TITLE;
      if (feedbackText) feedbackText.textContent = SUCCESS_TEXT;
    } else {
      feedback.classList.remove('alert--success');
      feedback.classList.add('alert--warning');
      if (feedbackTitle) feedbackTitle.textContent = ORIGINAL_WARNING_TITLE;
      if (feedbackText) feedbackText.textContent = ORIGINAL_WARNING_TEXT;
    }
  }

  function saveState() {
    const checkboxStates = Array.from(checkboxes).map(cb => ({
      id: cb.id,
      checked: cb.checked
    }));

    const state = {
      checkboxes: checkboxStates,
      submitted: checkboxes[0].disabled,
      feedbackVisible: feedback.style.display !== 'none',
      isAnswerCorrect: isCorrect()
    };
    sessionStorage.setItem('objective_activity_state', JSON.stringify(state));
  }

  function restoreState() {
    const saved = sessionStorage.getItem('objective_activity_state');
    if (saved) {
      const state = JSON.parse(saved);

      state.checkboxes.forEach(cbState => {
        const cb = document.getElementById(cbState.id);
        if (cb) cb.checked = cbState.checked;
      });

      if (state.submitted) {
        checkboxes.forEach(cb => cb.disabled = true);
        submitBtn.disabled = true;
        editBtn.disabled = false;
      } else {
        checkboxes.forEach(cb => cb.disabled = false);
        submitBtn.disabled = !hasSelection();
        editBtn.disabled = true;
      }

      updateFeedbackUI(state.isAnswerCorrect);
      if (state.feedbackVisible) {
        feedback.style.display = 'flex';
      } else {
        feedback.style.display = 'none';
      }
    } else {
      checkboxes.forEach(cb => {
        cb.checked = false;
        cb.disabled = false;
      });
      submitBtn.disabled = true;
      editBtn.disabled = true;
      feedback.style.display = 'none';
    }
  }

  checkboxes.forEach(cb => {
    cb.addEventListener('change', () => {
      submitBtn.disabled = !hasSelection();
      saveState();
    });
  });

  submitBtn.addEventListener('click', () => {
    const correct = isCorrect();
    updateFeedbackUI(correct);

    checkboxes.forEach(cb => cb.disabled = true);
    submitBtn.disabled = true;
    editBtn.disabled = false;
    feedback.style.display = 'flex';

    saveState();
  });

  editBtn.addEventListener('click', () => {
    checkboxes.forEach(cb => cb.disabled = false);
    submitBtn.disabled = !hasSelection();
    editBtn.disabled = true;
    feedback.style.display = 'none';

    saveState();
  });

  if (feedbackCloseBtn) {
    feedbackCloseBtn.addEventListener('click', () => {
      feedback.style.display = 'none';
      saveState();
    });
  }

  restoreState();
}
