const form = document.getElementById('contactsForm');
const successBlock = document.getElementById('contactsSuccess');

const phoneInput = document.getElementById('phone');
const telegramInput = document.getElementById('telegram');
const maxInput = document.getElementById('max');

const phoneError = document.getElementById('phoneError');
const telegramError = document.getElementById('telegramError');
const maxError = document.getElementById('maxError');
const commonError = document.getElementById('commonError');

const phoneRegex = /^(\+7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

function clearErrors() {
    phoneError.textContent = '';
    telegramError.textContent = '';
    maxError.textContent = '';
    commonError.textContent = '';

    phoneInput.classList.remove('contacts-form-input--error');
    telegramInput.classList.remove('contacts-form-input--error');
    maxInput.classList.remove('contacts-form-input--error');
}

function showFieldError(input, errorElement, message) {
    input.classList.add('contacts-form-input--error');
    errorElement.textContent = message;
}

function validateForm() {
    clearErrors();

    const phone = phoneInput.value.trim();
    const telegram = telegramInput.value.trim();
    const max = maxInput.value.trim();

    let isValid = true;

    if (!phone && !telegram && !max) {
        commonError.textContent = 'Заполните хотя бы одно поле для связи';
        isValid = false;
    }

    if (phone && !phoneRegex.test(phone)) {
        showFieldError(phoneInput, phoneError, 'Введите корректный номер телефона');
        isValid = false;
    }

    return isValid;
}

form.addEventListener('submit', function(event) {
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    form.hidden = true;
    successBlock.hidden = false;
});
