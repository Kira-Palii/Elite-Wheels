// годинник
function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    document.getElementById('clock').textContent = timeString;
}
setInterval(updateClock, 1000);
updateClock();

//кабінет та вихід
document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem("loggedInUser"));
    
    const registerLink = document.getElementById("registrationLink");
    const loginLink = document.getElementById("entranceLink");
    const dashboardLink = document.getElementById("officeLink");
    const logoutLink = document.getElementById("logoutLink");
    if (user) {
        registerLink.classList.add("hidden");
        loginLink.classList.add("hidden");
        dashboardLink.classList.remove("hidden");
        logoutLink.classList.remove("hidden");
        logoutLink.addEventListener("click", function (e) {
        e.preventDefault();
        localStorage.removeItem("loggedInUser");
        window.location.href = "index.html";
        });
    }
});
