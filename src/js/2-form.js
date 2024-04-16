'use strict';

console.log(Form);

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.feedback-form');
    const emailInput = form.querySelector('input[name="email"]');
    const messageInput = form.querySelector('textarea[name="message"]');

    // Перевірка, чи є дані в локальному сховищі
    const savedData = localStorage.getItem('feedback-form-state');
    if (savedData) {
        const { email, message } = JSON.parse(savedData);
        emailInput.value = email;
        messageInput.value = message;
    }

    // Обробник події вводу для зберігання даних у локальному сховищі
    form.addEventListener('input', () => {
        const data = {
            email: emailInput.value.trim(),
            message: messageInput.value.trim()
        };
        localStorage.setItem('feedback-form-state', JSON.stringify(data));
    });

    // Обробник події подання форми
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const data = {
            email: emailInput.value.trim(),
            message: messageInput.value.trim()
        };

        // Перевірка, чи обидва поля форми заповнені
        if (data.email && data.message) {
            console.log(data); // Виведення об'єкта даних у консоль
            localStorage.removeItem('feedback-form-state'); // Очищення сховища
            emailInput.value = ''; // Очищення поля Email
            messageInput.value = ''; // Очищення поля Message
        } else {
            alert('Please fill in all fields.'); // Повідомлення про невалідність форми
        }
    });
});