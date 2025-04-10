import ic from 'input-cleaner';

function RunValidator() {
  const emailLabel = document.querySelector('#email-label');
  const emailInput = document.querySelector('#email');
  const countryLabel = document.querySelector('#country-label');
  const countryInput = document.querySelector('#country');
  const postalCodeLabel = document.querySelector('#postal-code-label');
  const postalCodeInput = document.querySelector('#postal-code');
  const passwordLabel = document.querySelector('#password-label');
  const passwordInput = document.querySelector('#password');
  const passwordconfirmationLabel = document.querySelector(
    '#password-confirmation-label'
  );
  const passwordConfirmationInput = document.querySelector(
    '#password-confirmation'
  );

  const emailMessage = 'Please enter valid email address';
  const countryMessage = 'Country name must be between 3-30 characters';
  const postalCodeMessage = 'Postal code must be 5 characters';
  const passwordMessage =
    'Password must be 6-16 characters, contains 1 uppercase & lowercase letters, a symbol, and a number';
  const passwordConfirmationMessage = 'Please re-enter your password';
  const errorDiv = document.querySelector('#error');
  const submitBtn = document.querySelector('#submit');
  function email() {
    const cleanedEmail = ic(emailInput.value).escaped;
    emailInput.value = cleanedEmail;
    emailInput.checkValidity();
    if (emailInput.validity.typeMismatch) {
      emailLabel.appendChild(errorDiv);
      emailInput.setCustomValidity(emailMessage);
      emailInput.classList.add('invalid');
      errorDiv.removeAttribute('hidden');
      errorDiv.className = 'active';
      errorDiv.textContent = emailMessage;
      return false;
    } else {
      emailInput.setCustomValidity('');
      emailInput.classList.remove('invalid');
      emailInput.classList.add('valid');
      errorDiv.textContent = '';
      errorDiv.classList.remove('active');
      errorDiv.setAttribute('hidden', true);
      return true;
    }
  }
  function country() {
    const cleanedCountry = ic(countryInput.value).escaped;
    countryInput.value = cleanedCountry;
    countryInput.checkValidity();
    if (countryInput.validity.tooShort || countryInput.validity.tooLong) {
      countryLabel.appendChild(errorDiv);
      countryInput.setCustomValidity(countryMessage);
      countryInput.classList.add('invalid');
      errorDiv.removeAttribute('hidden');
      errorDiv.className = 'active';
      errorDiv.textContent = countryMessage;
      return false;
    } else if (countryInput.validity.valid) {
      countryInput.setCustomValidity('');
      countryInput.classList.remove('invalid');
      countryInput.classList.add('valid');
      errorDiv.textContent = '';
      errorDiv.classList.remove('active');
      errorDiv.setAttribute('hidden', true);
      return true;
    }
  }
  function postalCode() {
    const cleanedPostalCode = ic(postalCodeInput.value).escaped;
    postalCodeInput.value = cleanedPostalCode;
    if (postalCodeInput.validity.tooShort || postalCodeInput.validity.tooLong) {
      postalCodeInput.setCustomValidity(postalCodeMessage);
      postalCodeInput.classList.add('invalid');
      return false;
    } else if (postalCodeInput.validity.valid) {
      postalCodeInput.setCustomValidity('');
      postalCodeInput.classList.remove('invalid');
      postalCodeInput.classList.add('valid');
    }
  }

  function password() {
    const cleanedPassword = ic(passwordInput.value).escaped;
    passwordInput.value = cleanedPassword;
    if (
      passwordInput.validity.tooShort ||
      passwordInput.validity.tooLong ||
      passwordInput.validity.patternMismatch
    ) {
      passwordInput.setCustomValidity(passwordMessage);
      passwordInput.classList.add('invalid');
      return false;
    } else if (passwordInput.validity.valid) {
      passwordInput.setCustomValidity('');
      passwordInput.classList.remove('invalid');
      passwordInput.classList.add('valid');
      return true;
    }
  }

  function passwordConfirmation() {
    const cleanedPassword = ic(passwordInput.value).escaped;
    const cleanedPasswordConfirmation = ic(
      passwordConfirmationInput.value
    ).escaped;
    passwordConfirmationInput.value = cleanedPasswordConfirmation;
    if (cleanedPassword !== cleanedPasswordConfirmation) {
      passwordConfirmationInput.setCustomValidity(passwordConfirmationMessage);
      passwordConfirmationInput.classList.add('invalid');
      return false;
    } else if (cleanedPassword === cleanedPasswordConfirmation) {
      passwordConfirmationInput.setCustomValidity('');
      passwordConfirmationInput.classList.remove('invalid');
      passwordConfirmationInput.classList.add('valid');
      return true;
    }
  }

  function all() {
    return [email, country, postalCode, password, passwordConfirmation].every(
      (fn) => fn()
    );
  }
  return { email, country, postalCode, password, passwordConfirmation, all };
}

export default RunValidator;
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
