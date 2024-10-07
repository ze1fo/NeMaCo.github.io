
// Функция для добавления товара в корзину
function addToCart(productName, productPrice) {
    const product = {
        name: productName,
        price: productPrice,
        quantity: 1
    };

    // Проверяем, есть ли такой товар в корзине
    const existingProduct = cart.find(item => item.name === product.name);
    if (existingProduct) {
        existingProduct.quantity += 1; // Если товар уже есть, увеличиваем его количество
    } else {
        cart.push(product); // Добавляем новый товар в корзину
    }

    // Сохраняем обновлённую корзину в localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${productName} добавлен в корзину!`);
}

// Отображаем корзину на странице cart.html
function displayCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-items');
    const totalContainer = document.getElementById('cart-total');

    // Очищаем контейнер перед обновлением
    cartContainer.innerHTML = '';
    let total = 0;

    // Добавляем каждый товар из корзины
    cartItems.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <p>${item.name}</p>
            <p>Цена: ${item.price} $</p>
            <p>Количество: ${item.quantity}</p>
            <button onclick="removeFromCart('${item.name}')">Удалить</button>
        `;
        cartContainer.appendChild(itemElement);
        total += item.price * item.quantity;
    });

    totalContainer.textContent = `Итого: ${total.toFixed(2)} $`;
}

// Удаление товара из корзины
function removeFromCart(productName) {
    cart = cart.filter(item => item.name !== productName);
    localStorage.setItem('cart', JSON.stringify(cart));
    displayCart();
    alert(`${productName} удалён из корзины!`);
}
window.addEventListener('load', () => {
    setTimeout(() => {
        // Меняем URL на "index.html" без перезагрузки страницы
        history.pushState(null, null, "index.html");

        // Находим элемент, который содержит основной контент
        const mainContent = document.getElementById('main-content');
        
        // Обновляем только основной контент страницы
        if (mainContent) {
            mainContent.innerHTML = `
                <h1>Главная страница NeMa</h1>
                <p>Добро пожаловать на главную страницу NeMa! Здесь вы найдете различные товары для покупки.</p>
            `;
        }
    }, 3000); // Задержка 3 секунды
});
