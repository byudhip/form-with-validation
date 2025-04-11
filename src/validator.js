function RunValidator() {
  const emailLabel = document.querySelector('#email-label');
  const emailInput = document.querySelector('#email');
  const countryLabel = document.querySelector('#country-label');
  const countryInput = document.querySelector('#country');
  const postalCodeLabel = document.querySelector('#postal-code-label');
  const postalCodeInput = document.querySelector('#postal-code');
  const passwordLabel = document.querySelector('#password-label');
  const passwordInput = document.querySelector('#password');
  const passwordConfirmationLabel = document.querySelector(
    '#password-confirmation-label'
  );
  const passwordConfirmationInput = document.querySelector(
    '#password-confirmation'
  );

  const emailMessage = 'Please enter valid email address';
  const countryMessage = 'Country name must be between 3-30 characters';
  const postalCodeMessage = 'Postal code must be 5 characters';
  const passwordMessage =
    'Password must contains 8-16 characters, with 1 uppercase & lowercase letters, a symbol, and a number';
  const passwordConfirmationMessage = 'Please re-enter your password';
  const errorDivs = [...document.querySelectorAll('.error')];
  const submitBtn = document.querySelector('#submit');
  function email() {
    emailInput.classList.remove('valid');
    emailInput.classList.remove('invalid');
    const errorEmail = errorDivs.find((element) =>
      element.classList.contains('email')
    );
    emailInput.setCustomValidity('');
    emailInput.checkValidity();
    if (emailInput.validity.typeMismatch || emailInput.validity.valueMissing) {
      emailInput.setCustomValidity(emailMessage);
      emailInput.classList.add('invalid');
      errorEmail.classList.add('active');
      errorEmail.textContent = emailMessage;
      errorEmail.hidden = false;
      return false;
    } else if (emailInput.validity.valid) {
      emailInput.classList.add('valid');
      errorEmail.textContent = '';
      errorEmail.classList.remove('active');
      errorEmail.hidden = true;
      return true;
    }
  }
  function country() {
    countryInput.classList.remove('invalid');
    countryInput.classList.remove('valid');
    countryInput.setCustomValidity('');
    const errorCountry = errorDivs.find((element) =>
      element.classList.contains('country')
    );
    if (countryInput.value.length < 3) {
      countryInput.setCustomValidity(countryMessage);
      countryInput.classList.add('invalid');
      errorCountry.hidden = false;
      errorCountry.classList.add('active');
      errorCountry.textContent = countryMessage;
      return false;
    } else {
      countryInput.classList.add('valid');
      errorCountry.textContent = '';
      errorCountry.classList.remove('active');
      errorCountry.hidden = true;
      return true;
    }
  }
  function postalCode() {
    postalCodeInput.classList.remove('invalid');
    postalCodeInput.classList.remove('valid');
    postalCodeInput.setCustomValidity('');
    const errorPostalCode = errorDivs.find((element) =>
      element.classList.contains('postal-code')
    );
    postalCodeInput.checkValidity();
    if (postalCodeInput.value.length < 5) {
      postalCodeInput.setCustomValidity(postalCodeMessage);
      postalCodeInput.classList.add('invalid');
      errorPostalCode.hidden = false;
      errorPostalCode.classList.add('active');
      errorPostalCode.textContent = postalCodeMessage;
      return false;
    } else {
      postalCodeInput.classList.add('valid');
      errorPostalCode.textContent = '';
      errorPostalCode.classList.remove('active');
      errorPostalCode.hidden = true;
      return true;
    }
  }

  function password() {
    passwordInput.classList.remove('invalid');
    passwordInput.classList.remove('valid');
    passwordInput.setCustomValidity('');
    const errorPassword = errorDivs.find((element) =>
      element.classList.contains('password')
    );
    console.log('password is ', passwordInput.value);
    passwordInput.checkValidity();
    if (
      (passwordInput.value.length < 8 &&
        passwordInput.validity.patternMismatch) ||
      passwordInput.validity.valueMissing
    ) {
      console.log(passwordInput.validity);
      passwordInput.setCustomValidity(passwordMessage);
      passwordInput.classList.add('invalid');
      errorPassword.hidden = false;
      errorPassword.classList.add('active');
      errorPassword.textContent = passwordMessage;
    } else {
      console.log('password valid');
      passwordInput.classList.add('valid');
      errorPassword.textContent = '';
      errorPassword.classList.remove('active');
      errorPassword.hidden = true;
    }
    passwordConfirmation();
  }

  function passwordConfirmation() {
    passwordConfirmationInput.classList.remove('invalid');
    passwordConfirmationInput.classList.remove('valid');
    passwordConfirmationInput.setCustomValidity('');
    const errorPasswordConfirmation = errorDivs.find((element) =>
      element.classList.contains('password-confirmation')
    );
    const password = passwordInput.value;
    const pwdConfInputVal = passwordConfirmationInput.value;
    passwordConfirmationInput.checkValidity();
    if (
      pwdConfInputVal === '' ||
      password === '' ||
      (passwordInput.validity.patternMismatch && password !== pwdConfInputVal)
    ) {
      passwordConfirmationInput.setCustomValidity(passwordConfirmationMessage);
      passwordConfirmationInput.classList.add('invalid');
      errorPasswordConfirmation.hidden = false;
      errorPasswordConfirmation.classList.add('active');
      errorPasswordConfirmation.textContent = passwordConfirmationMessage;
    } else {
      passwordConfirmationInput.classList.add('valid');
      errorPasswordConfirmation.textContent = '';
      errorPasswordConfirmation.classList.remove('active');
      errorPasswordConfirmation.hidden = true;
      return true;
    }
  }

  function allValid() {
    const inputs = [...document.querySelectorAll('.valid')];
    return inputs.length === 5 ? true : false;
  }
  return {
    email,
    country,
    postalCode,
    password,
    passwordConfirmation,
    allValid,
  };
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
