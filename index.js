// Находим форму и блок успеха в документе
const form = document.getElementById('contactsForm');
const successBlock = document.getElementById('contactsSuccess');

// Находим поля ввода
const phoneInput = document.getElementById('phone');
const telegramInput = document.getElementById('telegram');
const maxInput = document.getElementById('max');

// Находим контейнеры полей мессенджеров
const telegramField = document.getElementById('telegramField');
const maxField = document.getElementById('maxField');

// Находим элементы для вывода ошибок
const phoneError = document.getElementById('phoneError');
const messengerError = document.getElementById('messengerError');
const commonError = document.getElementById('commonError');

// Находим кнопки-табы переключения мессенджера
const tabs = document.querySelectorAll('.contacts-form-tab');

// Регулярное выражение для проверки телефона.
// Принимает форматы: +79991234567, 89991234567, 9991234567
const phoneRegex = /^(\+7|8)?[\s\-]?\(?[0-9]{3}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/;

// Регулярное выражение для проверки Telegram-ника.
// Должен начинаться с @, затем от 5 до 32 символов: буквы, цифры, подчёркивание
const telegramRegex = /^@[a-zA-Z0-9_]{5,32}$/;

// Max использует тот же формат что и телефон
const maxRegex = phoneRegex;

// Обработчик переключения табов
tabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
        const target = tab.dataset.target; // читаем data-target="telegram" или "max"

        // Убираем активный класс со всех табов, ставим на нажатый
        tabs.forEach(function(t) { t.classList.remove('contacts-form-tab--active'); });
        tab.classList.add('contacts-form-tab--active');

        // Показываем нужное поле, скрываем другое, очищаем скрытое
        if (target === 'telegram') {
            telegramField.hidden = false;
            maxField.hidden = true;
            maxInput.value = '';
        } else {
            maxField.hidden = false;
            telegramField.hidden = true;
            telegramInput.value = '';
        }

        // Сбрасываем ошибку мессенджера при переключении
        messengerError.textContent = '';
    });
});

// Функция очищает все ошибки на форме
function clearErrors() {
    phoneError.textContent = '';
    messengerError.textContent = '';
    commonError.textContent = '';

    phoneInput.classList.remove('contacts-form-input--error');
    telegramInput.classList.remove('contacts-form-input--error');
    maxInput.classList.remove('contacts-form-input--error');
}

// Функция проверяет форму и возвращает true если всё корректно
function validateForm() {
    clearErrors();

    const phone = phoneInput.value.trim();
    const telegram = telegramInput.value.trim();
    const max = maxInput.value.trim();

    let isValid = true;

    // Проверяем: заполнено хотя бы одно поле
    if (!phone && !telegram && !max) {
        commonError.textContent = 'Заполните хотя бы одно поле для связи';
        isValid = false;
    }

    // Если телефон заполнен — проверяем его формат
    if (phone && !phoneRegex.test(phone)) {
        phoneInput.classList.add('contacts-form-input--error');
        phoneError.textContent = 'Введите корректный номер телефона';
        isValid = false;
    }

    // Если Telegram заполнен — проверяем формат @ник
    if (telegram && !telegramRegex.test(telegram)) {
        telegramInput.classList.add('contacts-form-input--error');
        messengerError.textContent = 'Введите ник в формате @username (от 5 символов)';
        isValid = false;
    }

    // Если Max заполнен — проверяем формат номера телефона
    if (max && !maxRegex.test(max)) {
        maxInput.classList.add('contacts-form-input--error');
        messengerError.textContent = 'Введите корректный номер телефона';
        isValid = false;
    }

    return isValid;
}

// ======= ЯКОРНАЯ НАВИГАЦИЯ =======

// Находим все ссылки в шапке у которых href начинается с #
const navLinks = document.querySelectorAll('.header-nav-link[href^="#"]');

navLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
        // Отменяем стандартный переход по ссылке
        event.preventDefault();

        // Получаем значение href, например "#contacts"
        const targetId = link.getAttribute('href');

        // Находим элемент с нужным id на странице
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            // Плавно прокручиваем к нужной секции
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// ======= АНИМАЦИИ =======

// Находим все элементы с атрибутом data-animate
const animatedElements = document.querySelectorAll('[data-animate]');

// Создаём наблюдатель: срабатывает когда элемент появляется на экране
const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        // entry.isIntersecting — true, если элемент виден на экране
        if (entry.isIntersecting) {
            const element = entry.target;
            // Читаем задержку из data-delay (в миллисекундах), по умолчанию 0
            const delay = element.dataset.delay || 0;

            // Применяем задержку через inline-стиль и добавляем класс видимости
            element.style.transitionDelay = delay + 'ms';
            element.classList.add('is-visible');

            // Прекращаем наблюдать за элементом — анимация нужна только один раз
            observer.unobserve(element);
        }
    });
}, {
    // threshold: 0.2 означает — срабатывать когда 20% элемента видно на экране
    threshold: 0.2
});

// Подключаем наблюдатель к каждому элементу
animatedElements.forEach(function(element) {
    observer.observe(element);
});

// Слушаем событие отправки формы
form.addEventListener('submit', function(event) {
    // Отменяем стандартную отправку формы (перезагрузку страницы)
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    // Если валидация прошла — скрываем форму и показываем сообщение об успехе
    form.hidden = true;
    successBlock.hidden = false;
});
