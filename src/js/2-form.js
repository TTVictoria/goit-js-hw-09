const form = document.querySelector('.feedback-form');
const inputEmail = form.elements.email;
const textarea = form.elements.message;
const localKeyStorage = 'feedback-form-state';

form.addEventListener('input', function () {
  const formData = {
    email: inputEmail.value.trim(),
    message: textarea.value.trim(),
  };

  localStorage.setItem(localKeyStorage, JSON.stringify(formData));
});

function updateFormContent() {
  const formUpdate = JSON.parse(localStorage.getItem(localKeyStorage)) || {};
  inputEmail.value = formUpdate.email ?? '';
  textarea.value = formUpdate.message ?? '';
}

updateFormContent();

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const formSubmit = JSON.parse(localStorage.getItem(localKeyStorage)) || {};

  if (formSubmit.email && formSubmit.message) {
    console.log(formSubmit);

    localStorage.removeItem(localKeyStorage);
    form.reset();
  }
});