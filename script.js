document.addEventListener('DOMContentLoaded', function() {
    const userAccountButton = document.getElementById('user-account');
    const cartButtons = document.querySelectorAll('.add-to-cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const placeOrderButton = document.getElementById('place-order');
    const clearCartButton = document.getElementById('clear-cart');
    const totalAmountElement = document.getElementById('total-amount');

    userAccountButton.addEventListener('click', function() {
        const customer = {
            name: prompt('Enter your name:'),
            email: prompt('Enter your email:'),
            phone: prompt('Enter your phone number:')
        };

        localStorage.setItem('customer', JSON.stringify(customer));
        alert('Account saved successfully!');
    });

    cartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const product = this.getAttribute('data-product');
            const price = parseInt(this.getAttribute('data-price'));

            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.push({ product, price });
            localStorage.setItem('cart', JSON.stringify(cart));

            alert('Item added to cart!');
            displayCartItems();
            updateTotalAmount();
        });
    });

    placeOrderButton.addEventListener('click', function() {
        const totalAmount = totalAmountElement.textContent;
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const customer = JSON.parse(localStorage.getItem('customer')) || {};
        let orderDetails = 'Order Details:\n';

        cart.forEach(item => {
            orderDetails += `${item.product} - ₹${item.price}\n`;
        });

        orderDetails += `Total Amount: ₹${totalAmount}\n`;
        orderDetails += `Customer Name: ${customer.name || 'N/A'}\n`;
        orderDetails += `Customer Email: ${customer.email || 'N/A'}\n`;
        orderDetails += `Customer Phone: ${customer.phone || 'N/A'}`;

        // Copy order details to clipboard
        copyToClipboard(orderDetails);

        const whatsappUrl = `https://wa.me/919500384953?text=${encodeURIComponent(orderDetails)}`;
        window.location.href = `payment.html?total=${totalAmount}`;
    });

    clearCartButton.addEventListener('click', function() {
        localStorage.removeItem('cart');
        alert('Cart cleared!');
        displayCartItems();
        updateTotalAmount();
    });

    function displayCartItems() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cartItemsContainer.innerHTML = '';

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.textContent = `${item.product} - ₹${item.price}`;
            cartItemsContainer.appendChild(itemElement);
        });
    }

    function updateTotalAmount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);
        totalAmountElement.textContent = totalAmount;
    }

    function copyToClipboard(text) {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Order details copied to clipboard!');
    }

    displayCartItems();
    updateTotalAmount();
});
