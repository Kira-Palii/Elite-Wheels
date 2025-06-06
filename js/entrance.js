//вхід
document.addEventListener("DOMContentLoaded", function () {
  	document.getElementById("loginForm").addEventListener("submit", function(e) {
        e.preventDefault();
        const email = document.getElementById("login_email").value.trim().toLowerCase();
        const password = document.getElementById("login_password").value;
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
            alert("Неправильна пошта або пароль.");
            return;
        }
        localStorage.setItem('loggedInUser', JSON.stringify(user));
        window.location.href = "index.html";
    });
});
