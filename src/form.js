import em from 'element-maker';
import rv from './validator.js';

function FormController() {
  const body = document.querySelector('body');
  const form = em('form', {
    id: 'form',
    attributes: { novalidate: true, action: '/', method: 'GET' },
  });
  const formHeadline = em('h2', { textContent: 'Shopping Form' });
  const emailLabel = em('label', {
    textContent: 'Email',
    id: 'email-label',
    attributes: { for: 'email' },
  });
  const emailInput = em('input', {
    id: 'email',
    attributes: { type: 'email', name: 'email', required: true },
  });
  emailLabel.appendChild(emailInput);

  const countryLabel = em('label', {
    textContent: 'Country',
    id: 'country-label',
    attributes: { for: 'country' },
  });
  const countryInput = em('input', {
    id: 'country',
    attributes: {
      type: 'text',
      name: 'country',
      minlength: 3,
      maxlength: 30,
      required: true,
    },
  });
  countryLabel.appendChild(countryInput);

  const postalCodeLabel = em('label', {
    textContent: 'Postal Code',
    id: 'postal-code-label',
    attributes: { for: 'postal-code' },
  });
  const postalCodeInput = em('input', {
    id: 'postal-code',
    attributes: {
      type: 'text',
      maxlength: 5,
      pattern: '/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5}$/g',
      required: true,
    },
  });
  postalCodeLabel.appendChild(postalCodeInput);

  const passwordLabel = em('label', {
    textContent: 'Password',
    id: 'password-label',
    attributes: { for: 'password' },
  });
  const passwordInput = em('input', {
    id: 'password',
    attributes: {
      name: 'password',
      type: 'password',
      minlength: 6,
      maxlength: 16,
      required: true,
      pattern: '/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,16}$/g',
    },
  });
  passwordLabel.appendChild(passwordInput);

  const passwordConfirmationLabel = em('label', {
    textContent: 'Confirm Password',
    id: 'password-confirmation-label',
    attributes: { for: 'password-confirmation' },
  });
  const passwordConfirmationInput = em('input', {
    id: 'password-confirmation',
    attributes: {
      type: 'password',
      name: 'password-confirmation',
      minlength: 6,
      maxlength: 16,
      required: true,
    },
  });
  passwordConfirmationLabel.appendChild(passwordConfirmationInput);

  const submitBtn = em('button', {
    id: 'submit',
    textContent: 'Submit',
    attributes: { type: 'submit' },
  });

  const errorDiv = em('div', {
    id: 'error',
    textContent: '',
  });
  form.appendChild(formHeadline);
  form.appendChild(emailLabel);
  form.appendChild(countryLabel);
  form.appendChild(postalCodeLabel);
  form.appendChild(passwordLabel);
  form.appendChild(passwordConfirmationLabel);
  form.appendChild(submitBtn);
  form.appendChild(errorDiv);
  body.appendChild(form);

  return form;
}

function FormListener() {
  function kebabToCamel(str) {
    return str.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
  }
  const form = document.querySelector('#form');
  const submitBtn = document.querySelector('#submit');

  form.addEventListener('input', (e) => {
    if (e.target.closest('input')) {
      const convertedId = kebabToCamel(e.target.id);
      rv()[convertedId]();
    }
  });
  form.addEventListener('blur', (e) => {
    if (e.target.closest('input')) {
      const convertedId = kebabToCamel(e.target.id);
      rv()[convertedId]();
    }
  });
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (rv().all() === true) {
      alert('high five!');
    } else {
      e.preventDefault();
    }
  });
}

export { FormController, FormListener };
// I need a form constructor
// Form got to have novalidate attribute
// Email, Country, Postal Code, Password, Password Confirmation, Submit button (type submit)
