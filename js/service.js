let cart = [];
let total = 0;
function addToCart(name, pricePerDay) {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    if (!startDate || !endDate) {
        alert('Будь ласка, оберіть дати оренди');
        return;
    }
    const days = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
    if (days <= 0) {
        alert('Некоректні дати оренди');
        return;
    }
    const totalPrice = pricePerDay * days;
    cart.push({ name, days, totalPrice });
    updateCart();
}
function updateCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = '';
    total = 0;
    cart.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'flex justify-between mb-2 text-2xl items-center';
        div.innerHTML = `<span>${item.name} - ${item.days} днів - ${item.totalPrice} грн</span>
                         <button onclick="removeFromCart(${index})"><img src="img/delete.svg" alt="" class="w-[70%] float-right"></button>`;
        cartItems.appendChild(div);
        total += item.totalPrice;
    });
    document.getElementById('totalPrice').textContent = total;
}
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}
document.getElementById('filterBtn').addEventListener('click', () => {
    const brand = document.getElementById('brand').value;
    const model = document.getElementById('model').value;
    const city = document.getElementById('city').value;
    const cars = document.querySelectorAll('.grid > div');
    cars.forEach(car => {
        const carBrand = car.getAttribute('data-brand');
        const carModel = car.getAttribute('data-model');
        const carCity = car.getAttribute('data-city');
        const brandMatch = !brand || carBrand === brand;
        const modelMatch = !model || carModel === model;
        const cityMatch = !city || carCity === city;
        if (brandMatch && modelMatch && cityMatch) {
            car.classList.remove('hidden');
        } else {
            car.classList.add('hidden');
        }
    });
});
document.getElementById('cartBtn').addEventListener('click', () => {
    document.getElementById('cartModal').classList.remove('hidden');
});
document.getElementById('closeCart').addEventListener('click', () => {
    document.getElementById('cartModal').classList.add('hidden');
});
document.getElementById('payBtn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Корзина порожня');
        return;
    }
    alert('Все сплачено');
    cart = [];
    updateCart();
    document.getElementById('cartModal').classList.add('hidden');
});