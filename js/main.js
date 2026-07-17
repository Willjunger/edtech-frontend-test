// Scripts da landing page

document.addEventListener('DOMContentLoaded', () => {
  initInteractiveCards();
  initImageSlider();
  initDiscursiveActivity();
  initObjectiveActivity();
  initAudioPlayer();
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

/**
 * Inicializa os controles e a lógica do Player de Áudio Customizado.
 */
function initAudioPlayer() {
  const audio = document.getElementById('native-audio');
  const playBtn = document.getElementById('audio-play-btn');
  const iconPlay = playBtn ? playBtn.querySelector('.audio-player__icon-play') : null;
  const iconPause = playBtn ? playBtn.querySelector('.audio-player__icon-pause') : null;
  const progressBar = document.getElementById('audio-progress');
  const timeDisplay = document.getElementById('audio-time');
  const volumeBtn = document.getElementById('audio-volume-btn');
  const iconVolume = volumeBtn ? volumeBtn.querySelector('.audio-player__icon-volume') : null;
  const iconMute = volumeBtn ? volumeBtn.querySelector('.audio-player__icon-mute') : null;
  const volumeSlider = document.getElementById('audio-volume');
  const settingsBtn = document.getElementById('audio-settings-btn');
  const settingsMenu = document.getElementById('audio-settings-menu');
  const settingsWrapper = settingsBtn ? settingsBtn.closest('.audio-player__settings-wrapper') : null;

  if (!audio || !playBtn || !progressBar || !timeDisplay || !volumeBtn || !volumeSlider) return;

  let isDraggingProgress = false;
  let lastVolume = 0.8;

  // Sincroniza o volume inicial com o valor do input range
  audio.volume = parseFloat(volumeSlider.value) / 100;
  updateVolumeUI();

  // Inicializa o marcador de progresso visual
  if (audio.readyState >= 1) {
    updateTimeDisplay();
  } else {
    timeDisplay.textContent = `00:00 / 00:00`;
  }

  // --- Play / Pause ---
  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play().catch(err => console.error('Erro ao reproduzir áudio:', err));
    } else {
      audio.pause();
    }
  });

  audio.addEventListener('play', () => {
    if (iconPlay && iconPause) {
      iconPlay.style.display = 'none';
      iconPause.style.display = 'block';
    }
    playBtn.setAttribute('aria-label', 'Pausar áudio');
  });

  audio.addEventListener('pause', () => {
    if (iconPlay && iconPause) {
      iconPlay.style.display = 'block';
      iconPause.style.display = 'none';
    }
    playBtn.setAttribute('aria-label', 'Reproduzir áudio');
  });

  audio.addEventListener('ended', () => {
    if (iconPlay && iconPause) {
      iconPlay.style.display = 'block';
      iconPause.style.display = 'none';
    }
    playBtn.setAttribute('aria-label', 'Reproduzir áudio');
    progressBar.value = 0;
    progressBar.style.setProperty('--progress', '0%');
    updateTimeDisplay();
  });

  // --- Formatação de Tempo ---
  function formatTime(secs) {
    if (isNaN(secs) || secs === Infinity) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  }

  function updateTimeDisplay() {
    if (isDraggingProgress) return;
    const current = audio.currentTime;
    const duration = audio.duration || 0;

    if (duration > 0) {
      const pct = (current / duration) * 100;
      progressBar.value = pct;
      progressBar.style.setProperty('--progress', `${pct}%`);
      timeDisplay.textContent = `${formatTime(current)} / ${formatTime(duration)}`;
    } else {
      progressBar.value = 0;
      progressBar.style.setProperty('--progress', '0%');
      timeDisplay.textContent = `${formatTime(current)} / 00:00`;
    }
  }

  audio.addEventListener('timeupdate', updateTimeDisplay);
  audio.addEventListener('durationchange', updateTimeDisplay);
  audio.addEventListener('loadedmetadata', updateTimeDisplay);

  // --- Barra de Progresso / Timeline ---
  progressBar.addEventListener('input', () => {
    isDraggingProgress = true;
    const pct = parseFloat(progressBar.value);
    progressBar.style.setProperty('--progress', `${pct}%`);
    if (audio.duration) {
      const curTime = (pct / 100) * audio.duration;
      timeDisplay.textContent = `${formatTime(curTime)} / ${formatTime(audio.duration)}`;
    }
  });

  progressBar.addEventListener('change', () => {
    if (audio.duration) {
      audio.currentTime = (parseFloat(progressBar.value) / 100) * audio.duration;
    }
    isDraggingProgress = false;
  });

  // --- Volume & Mute ---
  function updateVolumeUI() {
    const val = audio.muted ? 0 : audio.volume * 100;
    volumeSlider.value = val;
    volumeSlider.style.setProperty('--volume', `${val}%`);

    if (iconVolume && iconMute) {
      if (audio.muted || audio.volume === 0) {
        iconVolume.style.display = 'none';
        iconMute.style.display = 'block';
        volumeBtn.setAttribute('aria-label', 'Ativar som');
      } else {
        iconVolume.style.display = 'block';
        iconMute.style.display = 'none';
        volumeBtn.setAttribute('aria-label', 'Desativar som');
      }
    }
  }

  audio.addEventListener('volumechange', updateVolumeUI);

  volumeSlider.addEventListener('input', () => {
    audio.volume = parseFloat(volumeSlider.value) / 100;
    if (audio.volume > 0) {
      audio.muted = false;
    }
  });

  volumeBtn.addEventListener('click', () => {
    if (audio.muted) {
      audio.muted = false;
      if (audio.volume === 0) {
        audio.volume = lastVolume || 0.8;
      }
    } else {
      lastVolume = audio.volume;
      audio.muted = true;
    }
  });

  // --- Configurações (Velocidade de Reprodução) ---
  if (settingsBtn && settingsMenu && settingsWrapper) {
    function openSettingsMenu() {
      settingsMenu.style.display = 'flex';
      settingsBtn.setAttribute('aria-expanded', 'true');
      const activeItem = settingsMenu.querySelector('.audio-player__menu-item--active');
      if (activeItem) activeItem.focus();
    }

    function closeSettingsMenu() {
      settingsMenu.style.display = 'none';
      settingsBtn.setAttribute('aria-expanded', 'false');
    }

    settingsBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = settingsMenu.style.display !== 'none';
      if (isVisible) {
        closeSettingsMenu();
      } else {
        openSettingsMenu();
      }
    });

    document.addEventListener('click', (e) => {
      if (!settingsWrapper.contains(e.target)) {
        closeSettingsMenu();
      }
    });

    settingsMenu.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeSettingsMenu();
        settingsBtn.focus();
      }
    });

    const speedItems = settingsMenu.querySelectorAll('.audio-player__menu-item');
    speedItems.forEach(item => {
      item.addEventListener('click', () => {
        const speed = parseFloat(item.getAttribute('data-speed'));
        audio.playbackRate = speed;

        speedItems.forEach(sib => {
          sib.classList.remove('audio-player__menu-item--active');
          sib.setAttribute('aria-checked', 'false');
        });
        item.classList.add('audio-player__menu-item--active');
        item.setAttribute('aria-checked', 'true');

        closeSettingsMenu();
        settingsBtn.focus();
      });
    });
  }
}
