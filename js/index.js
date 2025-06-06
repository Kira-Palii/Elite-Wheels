// карусель
const images = [
    { src: 'img/carousel/image 6.svg', width: 'w-35', height: 'h-12', margin: 'ml-25' },
    { src: 'img/carousel/image 7.svg', width: 'w-21', height: 'h-15', margin: 'ml-25' },
    { src: 'img/carousel/image 8.svg', width: 'w-15', height: 'h-20', margin: 'ml-25' },
    { src: 'img/carousel/image 9.svg', width: 'w-40', height: 'h-12', margin: 'ml-25' },
    { src: 'img/carousel/image 10.svg', width: 'w-15', height: 'h-23', margin: 'ml-25' },
    { src: 'img/carousel/image 11.svg', width: 'w-15', height: 'h-20', margin: 'ml-25' },
    { src: 'img/carousel/image 12.svg', width: 'w-18', height: 'h-18', margin: 'ml-25' },
    { src: 'img/carousel/image 13.svg', width: 'w-15', height: 'h-20', margin: 'ml-25' }
];
let currentStartIndex = 0;
const visibleCount = 8;
const carousel = document.getElementById('carousel');
function updateCarousel() {
    carousel.style.transition = 'none';
    carousel.innerHTML = '';
    for (let i = 0; i < visibleCount; i++) {
        const index = (currentStartIndex + i) % images.length;
        const imgData = images[index];
        const img = document.createElement('img');
        img.src = imgData.src;
        img.alt = `Зображення ${index + 1}`;
        img.className = `${imgData.width} ${imgData.height} object-cover rounded-lg flex-shrink-0 ${imgData.margin}`;
        carousel.appendChild(img);
    }
    setTimeout(() => {
        carousel.style.transition = 'transform 0.5s ease-in-out';
    }, 10);
}
document.getElementById('next').addEventListener('click', () => {
    currentStartIndex = (currentStartIndex + 1) % images.length;
    updateCarousel();
});
document.getElementById('prev').addEventListener('click', () => {
    currentStartIndex = (currentStartIndex - 1 + images.length) % images.length;
    updateCarousel();
});
updateCarousel();

//Курс валют
const dateInput = document.getElementById("currency-date");
const currencySelect = document.getElementById("currency-type");
const resultDiv = document.getElementById("currency-result");
const today = new Date().toISOString().split("T")[0];
dateInput.value = today;
async function loadCurrencyList() {
    try {
        const res = await fetch(`https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?date=${today.replaceAll("-", "")}&json`);
        const data = await res.json();
        currencySelect.innerHTML = "";
        data.forEach(item => {
            const opt = document.createElement("option");
            opt.value = item.cc;
            opt.textContent = `${item.cc} – ${item.txt}`;
            currencySelect.appendChild(opt);
        });
        currencySelect.value = "USD"; 
        fetchCurrency(); 
    } catch (err) {
        console.error("Помилка при завантаженні валют:", err);
    }
}
async function fetchCurrency() {
    const selectedDate = dateInput.value;
    const currencyCode = currencySelect.value;
    if (!selectedDate || !currencyCode) return;
    const formattedDate = selectedDate.replaceAll("-", "");
    const apiUrl = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${currencyCode}&date=${formattedDate}&json`;
    try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        if (data.length === 0) {
            resultDiv.innerHTML = `<p>Дані не знайдено для цієї дати.</p>`;
            return;
        }
        const rate = data[0].rate.toFixed(2);
        const cc = data[0].cc;
        resultDiv.innerHTML = `
                <td class="py-5 rounded-l-xl">UAH</td>
                <td class="grow">${cc}</td>
                <td class="grow">${rate}</td>
                <td class="rounded-r-xl">${rate}</p>
        `;
    } catch (error) {
        resultDiv.innerHTML = `<p>Помилка при завантаженні курсу.</p>`;
        console.error(error);
    }
}
dateInput.addEventListener("change", fetchCurrency);
currencySelect.addEventListener("change", fetchCurrency);
loadCurrencyList();

//Прогноз погоди
const weatherDate = document.getElementById("weather-date");
const weatherCity = document.getElementById("weather-city");
const weatherResult = document.getElementById("weather-result");
const cityCoords = {
    Odesa: { lat: 46.4825, lon: 30.7233 },
    Kyiv: { lat: 50.4501, lon: 30.5234 },
    Lviv: { lat: 49.8397, lon: 24.0297 },
};
const weatherDescriptions = {
    0: "Ясно",
    1: "Переважно ясно",
    2: "Мінлива хмарність",
    3: "Похмуро",
    45: "Туман",
    48: "Іній",
    51: "Легкий дощ",
    53: "Помірний дощ",
    55: "Інтенсивний дощ",
    61: "Слабкий дощ",
    63: "Помірний дощ",
    65: "Сильний дощ",
    71: "Слабкий сніг",
    73: "Помірний сніг",
    75: "Сильний сніг",
    80: "Короткочасні зливи",
    95: "Гроза",
    99: "Гроза з градом"
};
const todayWeather = new Date();
const maxDate = new Date();
maxDate.setDate(todayWeather.getDate() + 16);
const toISO = date => date.toISOString().split("T")[0];
weatherDate.value = toISO(todayWeather);
weatherDate.min = toISO(todayWeather);
weatherDate.max = toISO(maxDate);
async function fetchForecast() {
    const date = weatherDate.value;
    const city = weatherCity.value;
    const { lat, lon } = cityCoords[city];
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,weathercode,windspeed_10m_max,relative_humidity_2m_max&timezone=auto&start_date=${date}&end_date=${date}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        if (!data.daily || !data.daily.temperature_2m_max.length) {
            weatherResult.innerHTML = `<p>Прогнозу не знайдено.</p>`;
            return;
        }
        const temp = data.daily.temperature_2m_max[0];
        const wind = data.daily.windspeed_10m_max[0];
        const humidity = data.daily.relative_humidity_2m_max[0];
        const weatherCode = data.daily.weathercode[0];
        const weatherText = weatherDescriptions[weatherCode] || "Невідомо";
        weatherResult.innerHTML = `
                <td class="py-5 rounded-l-xl">${temp}°C</td>
                <td>${wind} км/год</td>
                <td>${humidity}%</td>
                <td class="rounded-r-xl">${weatherText}</td>
        `;
    } catch (err) {
        console.error("Помилка:", err);
        weatherResult.innerHTML = `<p>Помилка при отриманні прогнозу.</p>`;
    }
}
weatherDate.addEventListener("change", fetchForecast);
weatherCity.addEventListener("change", fetchForecast);
fetchForecast();