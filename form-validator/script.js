const utilities = (function() {
  const EMAIL_REGELUR_EXPRESSION = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  return {
    isValidEmail: function(input) {
      if (EMAIL_REGELUR_EXPRESSION.test(input.value.trim())) {
        return true;
      } else {
        return false;
      }
    }
  }
})();

const ux = (function(utilities) {
  function displayError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
  }

  function displaySuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
  }

  function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
  }

  return {
    validateEmail: function(input) {
      if (utilities.isValidEmail(input)) {
        displaySuccess(input);
      } else {
        displayError(input, 'Email is not valid');
      }
    },
    validateFieldLength: function(input, min, max) {
      if (input.value.length < min) {
        displayError(input, `${getFieldName(input)} must be at least ${min} characters`);
      } else if (input.value.length > max) {
        displayError(input, `${getFieldName(input)} must be less than ${max} characters`);
      } else {
        displaySuccess(input);
      }
    },
    validatePasswordMatch: function(input1, input2) {
      if (input1.value !== input2.value) {
        displayError(input2, 'Passwords do not match');
      }
    },
    validateRequiredFields: function(inputArr) {
      inputArr.forEach(function(input) {
        if (input.value.trim() === '') {
          displayError(input, `${getFieldName(input)} is required`);
        } else {
          displaySuccess(input);
        }
      });
    }
  }
})(utilities);

const controller = (function(ux) {
  const PASSWORD_MIN_LENGTH = 6;
  const PASSWORD_MAX_LENGTH = 25;
  const USERNAME_MIN_LENGTH = 3;
  const USERNAME_MAX_LENGTH = 15;

  const form = document.getElementById('form');
  const username = document.getElementById('username');
  const email = document.getElementById('email');
  const password1 = document.getElementById('password1');
  const password2 = document.getElementById('password2');
  
  const addEventListeners = function() {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      ux.validateRequiredFields([username, email, password1, password2]);
      ux.validateFieldLength(username, USERNAME_MIN_LENGTH, USERNAME_MAX_LENGTH);
      ux.validateFieldLength(password1, PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH);
      ux.validateEmail(email);
      ux.validatePasswordMatch(password1, password2);
    })}

    return {
      init: function() {
        addEventListeners();
      }
    }

})(ux);

controller.init();