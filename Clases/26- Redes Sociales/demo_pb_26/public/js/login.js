document.addEventListener('DOMContentLoaded', () => {
  const elems = document.querySelectorAll('.datepicker');
  const datepickerOptions = {
    autoClose: true,
    format: 'mmmm dd, yyyy',
    yearRange: 50,
  }
  M.Datepicker.init(elems, datepickerOptions);
});

const coverSignInBtn = document.getElementById('cover-sign-in-btn');
const coverSignUpBtn = document.getElementById('cover-sign-up-btn');

const signInForm = document.getElementById('sign-in-form');
const signUpForm = document.getElementById('sign-up-form');
const formWindow = document.getElementById('form-window');
const formContent = document.getElementById('form-content');

coverSignInBtn.addEventListener('click', () => {
  signInForm.classList.remove('hide-form');
  signUpForm.classList.add('hide-form');

  formWindow.classList.remove('window-to-left-frame');
  formContent.classList.remove('content-to-right-frame');
  formWindow.classList.add('window-to-right-frame');
  formContent.classList.add('content-to-left-frame');
});

coverSignUpBtn.addEventListener('click', () => {
  signUpForm.classList.remove('hide-form');
  signInForm.classList.add('hide-form');

  formWindow.classList.remove('window-to-right-frame');
  formContent.classList.remove('content-to-left-frame');
  formWindow.classList.add('window-to-left-frame');
  formContent.classList.add('content-to-right-frame');
});

const twitterSignInBtn = document.getElementById('twitter-sign-in');

twitterSignInBtn.addEventListener('click', () => {
  window.location.href = '/api/auth/twitter';
});

const twitterSignUpBtn = document.getElementById('twitter-sign-up');

twitterSignUpBtn.addEventListener('click', () => {
  window.location.href = '/api/auth/twitter';
})