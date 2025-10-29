document.addEventListener('DOMContentLoaded', () => {
  const userInfoForm = document.getElementById('user-info-form');
  let userName = '';
  const feedbackSection = document.getElementById('feedback');

  userInfoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    userName = document.getElementById('name').value.trim();
    feedbackSection.hidden = false;
    feedbackSection.scrollIntoView({ behavior: 'smooth' });
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
