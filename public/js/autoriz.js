document.addEventListener('DOMContentLoaded', function() {
    var emailInput = document.getElementById('email');
    var firstnameInput = document.getElementById('firstname');
    var passwordInput = document.getElementById('password');
    var confirmPasswordInput = document.getElementById('confirm_password');

    emailInput.addEventListener('input', function() {
        var email = emailInput.value;
        if (!isValidEmail(email)) {
            emailInput.setCustomValidity('Invalid email address');
        } else {
            emailInput.setCustomValidity('');
        }
    });

    firstnameInput.addEventListener('input', function() {
        var firstname = firstnameInput.value;
        if (firstname.length < 2) {
            firstnameInput.setCustomValidity('First name must be at least 2 characters long');
        } else {
            firstnameInput.setCustomValidity('');
        }
    });

    passwordInput.addEventListener('input', function() {
        var password = passwordInput.value;
        if (password.length < 6) {
            passwordInput.setCustomValidity('Password must be at least 6 characters long');
        } else {
            passwordInput.setCustomValidity('');
        }
    });

    confirmPasswordInput.addEventListener('input', function() {
        var password = passwordInput.value;
        var confirmPassword = confirmPasswordInput.value;
        if (password !== confirmPassword) {
            confirmPasswordInput.setCustomValidity('Passwords do not match');
        } else {
            confirmPasswordInput.setCustomValidity('');
        }
    });

    // Функция для проверки валидности email
    function isValidEmail(email) {
        // Простая проверка формата email
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
    }
});
