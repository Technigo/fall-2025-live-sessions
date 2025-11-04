document.addEventListener('DOMContentLoaded', () => {
  const userInfoForm = document.getElementById('user-info-form');
  let userName = '';
  const feedbackSection = document.getElementById('feedback');

  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(input, errorElement, message) {
    input.setAttribute('aria-invalid', 'true');
    errorElement.textContent = message;
    errorElement.hidden = false;
  }

  function clearError(input, errorElement) {
    input.removeAttribute('aria-invalid');
    errorElement.textContent = '';
    errorElement.hidden = true;
  }

  nameInput.addEventListener('input', () => {
    if (nameInput.value.trim()) {
      clearError(nameInput, nameError);
    }
  });

  emailInput.addEventListener('input', () => {
    if (emailInput.value.trim()) {
      if (isValidEmail(emailInput.value)) {
        clearError(emailInput, emailError);
      }
    }
  });

  userInfoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Validate name
    if (!nameInput.value.trim()) {
      showError(nameInput, nameError, 'Please enter your name');
      isValid = false;
      nameInput.focus();
    } else {
      clearError(nameInput, nameError);
    }

    if (!emailInput.value.trim()) {
      showError(emailInput, emailError, 'Please enter your email address');
      isValid = false;
      if (!nameError.textContent) {
        emailInput.focus();
      }
    } else if (!isValidEmail(emailInput.value)) {
      showError(emailInput, emailError, 'Please enter a valid email address');
      isValid = false;
      if (!nameError.textContent) {
        emailInput.focus();
      }
    } else {
      clearError(emailInput, emailError);
    }

    if (isValid) {
      userName = document.getElementById('name').value.trim();
      feedbackSection.hidden = false;
      feedbackSection.scrollIntoView({ behavior: 'smooth' });
    }
  });

  const feedbackForm = document.getElementById('feedback-form');
  const resultsSection = document.getElementById('results');
  const resultsContent = document.getElementById('results-content');

  feedbackForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(feedbackForm);
    const userAnswers = Object.fromEntries(formData);

    let feedback = userName
      ? 'Thank you for your feedback ' + userName + '! \n\n'
      : 'Thank you for your feedback!\n\n';

    if (userAnswers.navigation === 'easy') {
      feedback += "We're glad you found the site easy to navigate \n\n";
    } else if (userAnswers.navigation === 'difficult') {
      feedback += "We'll work on improving our navigation \n\n";
    }

    if (userAnswers.readability === 'clear') {
      feedback += "It's great to hear our content is clear and readable.";
    } else if (userAnswers.readability === 'unclear') {
      feedback += "We'll focus on making our content better";
    }

    resultsSection.hidden = false;
    resultsContent.textContent = feedback;

    resultsSection.setAttribute('tabindex', '-1');
    resultsSection.focus();
  });
});
