document.addEventListener("DOMContentLoaded", function () {
    const registrationForm = document.getElementById("registrationForm");
    if (registrationForm) {
        registrationForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value;
        const repeatPassword = document.getElementById("password_repeat").value;
        const nameRegex = /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ\s\-]+$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        document.getElementById("nameError").textContent = "";
        document.getElementById("emailError").textContent = "";
        document.getElementById("passwordError").textContent = "";
        let valid = true;
        if (!nameRegex.test(name)) {
            document.getElementById("nameError").textContent = "Ім’я має містити лише літери та пробіли";
            valid = false;
        }
        if (!emailRegex.test(email)) {
            document.getElementById("emailError").textContent = "Некоректна електронна адреса";
            valid = false;
        }
        if (password.length < 6) {
            document.getElementById("passwordError").textContent = "Пароль повинен містити щонайменше 6 символів";
            valid = false;
        }
        if (password !== repeatPassword) {
            alert("Паролі не співпадають");
            return;
        }
        let users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(u => u.email === email);
        if (userExists) {
            alert("Користувач з такою поштою вже існує");
            return;
        }
        const newUser = { name, email, password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        window.location.href = "entrance.html";
        });
    }
});

console.log(localStorage);