// зворотній зв'язок
document.addEventListener("DOMContentLoaded", function () {
	document.getElementById("feedbackForm").addEventListener("submit", function (e) {
		e.preventDefault();

		const name = document.getElementById("name").value.trim();
		const phone = document.getElementById("phone").value.trim();
		const email = document.getElementById("email").value.trim();
		const subject = document.getElementById("subject").value.trim();
		const message = document.getElementById("message").value.trim();

		const nameRegex = /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ\s\-]+$/;
		const phoneRegex = /^\+380\d{9}$/;
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		// Спочатку очищаємо всі попередні повідомлення
		document.getElementById("nameError").textContent = "";
		document.getElementById("phoneError").textContent = "";
		document.getElementById("emailError").textContent = "";
		document.getElementById("subjectError").textContent = "";
		document.getElementById("messageError").textContent = "";

		let valid = true;

		if (!nameRegex.test(name)) {
			document.getElementById("nameError").textContent = "Ім’я має містити лише літери та пробіли";
			valid = false;
		}

		if (!phoneRegex.test(phone)) {
			document.getElementById("phoneError").textContent = "Телефон має бути у форматі +380XXXXXXXXX";
			valid = false;
		}

		if (!emailRegex.test(email)) {
			document.getElementById("emailError").textContent = "Некоректна електронна адреса";
			valid = false;
		}

		if (subject.length > 30) {
			document.getElementById("subjectError").textContent = "Тема має бути до 30 символів";
			valid = false;
		}

		if (message.length < 10 || message.length > 300) {
			document.getElementById("messageError").textContent = "Опис звернення має бути від 10 до 300 символів";
			valid = false;
		}

		if (valid) {
			this.reset();
			alert("Звернення надіслано успішно!");
		}
	});
});