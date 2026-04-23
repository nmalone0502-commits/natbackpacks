const form = document.getElementById('contactForm');

if (form) {
  const fields = {
    firstName: document.getElementById('firstName'),
    lastName: document.getElementById('lastName'),
    email: document.getElementById('email'),
    city: document.getElementById('city'),
    zip: document.getElementById('zip'),
    tripType: document.getElementById('tripType'),
    message: document.getElementById('message')
  };

  const successMessage = document.getElementById('successMessage');
  const zipPattern = /^\d{4,5}(?:-\d{4})?$/;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const capitalizeWords = (value) => {
    return value
      .trim()
      .replace(/\s+/g, ' ')
      .toLowerCase()
      .replace(/\b([a-z])/g, (match) => match.toUpperCase());
  };

  const setError = (fieldName, message = '') => {
    const error = document.getElementById(`${fieldName}Error`);
    if (error) {
      error.textContent = message;
    }
  };

  const clearAllErrors = () => {
    Object.keys(fields).forEach((fieldName) => setError(fieldName, ''));
  };

  ['firstName', 'lastName', 'city'].forEach((fieldName) => {
    fields[fieldName].addEventListener('blur', () => {
      fields[fieldName].value = capitalizeWords(fields[fieldName].value);
    });
  });

  const validate = () => {
    clearAllErrors();
    successMessage.classList.remove('show');
    let isValid = true;

    fields.firstName.value = capitalizeWords(fields.firstName.value);
    fields.lastName.value = capitalizeWords(fields.lastName.value);
    fields.city.value = capitalizeWords(fields.city.value);
    fields.email.value = fields.email.value.trim();
    fields.zip.value = fields.zip.value.trim();
    fields.message.value = fields.message.value.trim();

    if (!fields.firstName.value) {
      setError('firstName', 'Enter your first name.');
      isValid = false;
    }

    if (!fields.lastName.value) {
      setError('lastName', 'Enter your last name.');
      isValid = false;
    }

    if (!fields.email.value) {
      setError('email', 'Enter your email address.');
      isValid = false;
    } else if (!emailPattern.test(fields.email.value)) {
      setError('email', 'Enter a valid email address.');
      isValid = false;
    }

    if (!fields.city.value) {
      setError('city', 'Enter your city.');
      isValid = false;
    }

    if (!fields.zip.value) {
      setError('zip', 'Enter your zip code.');
      isValid = false;
    } else if (!zipPattern.test(fields.zip.value)) {
      setError('zip', 'Use a valid 4 or 5 digit zip code.');
      isValid = false;
    }

    if (!fields.tripType.value) {
      setError('tripType', 'Choose a trip type.');
      isValid = false;
    }

    if (!fields.message.value) {
      setError('message', 'Enter a short message.');
      isValid = false;
    }

    return isValid;
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (validate()) {
      successMessage.classList.add('show');
      form.reset();
    }
  });
}
