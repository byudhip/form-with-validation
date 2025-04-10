import em from 'element-maker';

function FormController() {
  const body = document.querySelector('body');
  const form = em('form', {
    id: 'form',
    attributes: { novalidate: true, action: '/', method: 'GET' },
  });
  const emailLabel = em('label', {
    textContent: 'Email',
    attributes: { for: 'email' },
  });
  const emailInput = em('input', {
    id: 'email',
    attributes: { type: 'email', id: 'email', name: 'email', required: true },
  });
  emailLabel.appendChild(emailInput);

  const countryLabel = em('label', {
    textContent: 'Country',
    attributes: { for: 'country' },
  });
  const countryInput = em('input', {
    id: 'country',
    attributes: {
      type: 'text',
      id: 'country',
      name: 'country',
      minlength: 3,
      maxlength: 30,
      required: true,
    },
  });
  countryLabel.appendChild(countryInput);

  const postalCodeLabel = em('label', {
    textContent: 'Postal Code',
    attributes: { for: 'postal-code' },
  });
  const postalCodeInput = em('input', {
    id: 'postal-code',
    attributes: {
      type: 'text',
      pattern: '/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5}$/g',
      required: true,
    },
  });
  postalCodeLabel.appendChild(postalCodeInput);

  const passwordLabel = em('label', {
    textContent: 'Password',
    attributes: { for: 'password' },
  });
  const passwordInput = em('input', {
    id: 'password',
    attributes: {
      type: 'password',
      id: 'password',
      name: 'password',
      minlength: 6,
      maxlength: 16,
      required: true,
      pattern: '/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{6,16}$/g',
    },
  });
  passwordLabel.appendChild(passwordInput);

  const passwordConfirmationLabel = em('label', {
    textContent: 'Confirm Password',
    attributes: { for: 'password-confirmation' },
  });
  const passwordConfirmationInput = em('input', {
    id: 'password',
    attributes: {
      type: 'password',
      id: 'password-confirmation',
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
  form.appendChild(emailLabel);
  form.appendChild(countryLabel);
  form.appendChild(postalCodeLabel);
  form.appendChild(passwordLabel);
  form.appendChild(passwordConfirmationLabel);
  form.appendChild(submitBtn);

  body.appendChild(form);

  return form;
}

export default { FormController };
// I need a form constructor
// Form got to have novalidate attribute
// Email, Country, Postal Code, Password, Password Confirmation, Submit button (type submit)
// Email: type mismatch, required (valueMissing)
// Country: minlength 3 maxlength 30 (tooShort, tooLong), required (valueMissing)
// Postal Code: maxlength 5 (tooShort, tooLong), required (valueMissing)
// Password: minlength 6 maxlength 10 (tooShort, tooLong), required (valueMissing), regex pattern /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{6,16}$/g (patternMismatch)
// Password Confirmation: Check strictly equal with password value (manually), required (valueMissing)
// Function to handle the validation for each field, which means i need to build 5 functions
// Structure example runValidator().email(), runValidator().country() etc
// Validators have to stylize the relevant elements
// Run setCustomValidity right after validator
// Custom validity message should be set at runValidator() level, so the children can use it instead of reinit every time
// If valid, remove error message and add valid styling
// Each focusin event should start with errormsg div removal
// Focusout event should only run validator
// I need event listener for the validations, should be live inline validation
// (highlighting a field red and providing a helpful error message until it has been filled in properly.)
// eventlistener should catch the input type, then use it during function call eg runValidator.${type}()
// don't forget e.preventDefault, also :valid and :invalid pseudoclasses
// submit button should run all validators one by one, and prevent submission
// show alert(high five) upon successful submission
