const reviewCards = Array.from(document.querySelectorAll('.review-card'));
const filterButtons = Array.from(document.querySelectorAll('.filter-chip'));
const searchInput = document.querySelector('#movie-search');
const emptyState = document.querySelector('#empty-state');
let activeGenre = 'all';

function filterReviews() {
  const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : '';
  let visibleCount = 0;

  reviewCards.forEach((card) => {
    const matchesGenre = activeGenre === 'all' || card.dataset.genre.split(' ').includes(activeGenre);
    const matchesSearch = card.dataset.title.includes(searchTerm);
    const isVisible = matchesGenre && matchesSearch;
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  if (emptyState) emptyState.hidden = visibleCount > 0;
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeGenre = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      const isSelected = filterButton === button;
      filterButton.classList.toggle('selected', isSelected);
      filterButton.setAttribute('aria-pressed', String(isSelected));
    });
    filterReviews();
  });
});

if (searchInput) searchInput.addEventListener('input', filterReviews);

document.querySelectorAll('.save-button').forEach((button) => {
  button.addEventListener('click', () => {
    const isSaved = button.getAttribute('aria-pressed') !== 'true';
    button.setAttribute('aria-pressed', String(isSaved));
    button.textContent = isSaved ? '♥' : '♡';
    button.setAttribute('aria-label', `${isSaved ? 'Remove' : 'Save'} ${button.getAttribute('aria-label').replace(/^(Save|Remove) /, '')}`);
  });
});

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') !== 'true';
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    mainNav.classList.toggle('open', isOpen);
  });
}

const newsletterForm = document.querySelector('#newsletter-form');
if (newsletterForm) {
  newsletterForm.addEventListener('submit', (event) => {
    event.preventDefault();
    document.querySelector('#newsletter-message').textContent = 'You’re on the list. See you Friday!';
    newsletterForm.reset();
  });
}

document.querySelectorAll('.password-toggle').forEach((button) => {
  button.addEventListener('click', () => {
    const passwordInput = document.querySelector(button.dataset.target);
    const isVisible = passwordInput.type === 'text';
    passwordInput.type = isVisible ? 'password' : 'text';
    button.textContent = isVisible ? 'Show' : 'Hide';
    button.setAttribute('aria-label', isVisible ? 'Show password' : 'Hide password');
  });
});

const signupForm = document.querySelector('#signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const password = document.querySelector('#signup-password').value;
    const confirmation = document.querySelector('#signup-confirm').value;
    const notice = document.querySelector('#auth-notice');

    if (password !== confirmation) {
      notice.textContent = 'Those passwords do not match yet.';
      document.querySelector('#signup-confirm').focus();
      return;
    }

    notice.textContent = 'You’re all set for the demo! No account details were sent or saved.';
    signupForm.reset();
  });
}

const loginForm = document.querySelector('#login-form');
if (loginForm) {
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    document.querySelector('#auth-notice').textContent = 'This is a front-end demo. Connect a server to enable real sign-in.';
    loginForm.reset();
  });
}
