// ============================================
// PRESTIGE LEATHER - CART FUNCTIONALITY
// ============================================

// Cart State
let cart = [];

// Initialize cart from localStorage
function initCart() {
    const savedCart = localStorage.getItem('prestigeCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    }
    updateCartCount();
}

// Save cart to localStorage
function saveCart() {
    localStorage.setItem('prestigeCart', JSON.stringify(cart));
    updateCartCount();
}

// Update cart count in navigation
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cartCount, .cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElements.forEach(el => {
        el.textContent = totalItems;
    });
}

// Add item to cart
function addToCart(productId, quantity = 1, size = null, color = null) {
    const product = getProductById(productId);
    if (!product) return false;

    // Check if item already exists in cart
    const existingIndex = cart.findIndex(item => 
        item.id === productId && 
        item.size === size && 
        item.color === color
    );

    if (existingIndex > -1) {
        // Update quantity
        cart[existingIndex].quantity += quantity;
    } else {
        // Add new item
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.images[0],
            quantity: quantity,
            size: size || product.sizes[0],
            color: color || product.colors[0],
            category: product.category
        });
    }

    saveCart();
    showToast('Product added to cart!', 'success');
    return true;
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
    showToast('Product removed from cart', 'success');
}

// Update item quantity
function updateQuantity(index, quantity) {
    if (quantity < 1) {
        removeFromCart(index);
        return;
    }
    if (quantity > 10) {
        showToast('Maximum quantity is 10', 'error');
        return;
    }
    cart[index].quantity = quantity;
    saveCart();
    renderCart();
}

// Clear entire cart
function clearCart() {
    cart = [];
    saveCart();
    renderCart();
}

// Get cart total
function getCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Get cart subtotal (before tax/shipping)
function getCartSubtotal() {
    return getCartTotal();
}

// Get tax amount
function getTaxAmount(subtotal) {
    return subtotal * 0.10; // 10% tax
}

// Get shipping cost
function getShippingCost(method = 'standard') {
    const shippingRates = {
        standard: 0,
        express: 29.99,
        overnight: 49.99
    };
    return shippingRates[method] || 0;
}

// Render cart page
function renderCart() {
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const cartContent = document.getElementById('cartContent');

    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        if (emptyCart) emptyCart.classList.remove('d-none');
        if (cartContent) cartContent.classList.add('d-none');
        return;
    }

    if (emptyCart) emptyCart.classList.add('d-none');
    if (cartContent) cartContent.classList.remove('d-none');

    // Render cart items
    cartItemsContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h5 class="cart-item-title">${item.name}</h5>
                <p class="cart-item-variant">Size: ${item.size} | Color: ${item.color}</p>
                <div class="d-flex align-items-center gap-3">
                    <div class="quantity-selector">
                        <button class="qty-btn minus" onclick="updateQuantity(${index}, ${item.quantity - 1})">-</button>
                        <input type="number" class="qty-input" value="${item.quantity}" min="1" max="10" 
                               onchange="updateQuantity(${index}, parseInt(this.value))">
                        <button class="qty-btn plus" onclick="updateQuantity(${index}, ${item.quantity + 1})">+</button>
                    </div>
                    <button class="btn btn-link text-danger p-0" onclick="removeFromCart(${index})">
                        <i class="bi bi-trash"></i> Remove
                    </button>
                </div>
            </div>
            <div class="text-end">
                <div class="cart-item-price">${formatPrice(item.price * item.quantity)}</div>
                ${item.originalPrice ? `<small class="text-muted text-decoration-line-through">${formatPrice(item.originalPrice * item.quantity)}</small>` : ''}
            </div>
        </div>
    `).join('');

    // Update summary
    updateCartSummary();
}

// Update cart summary
function updateCartSummary() {
    const subtotal = getCartSubtotal();
    const tax = getTaxAmount(subtotal);
    const shipping = getShippingCost();
    const total = subtotal + tax + shipping;

    const subtotalEl = document.getElementById('cartSubtotal');
    const taxEl = document.getElementById('cartTax');
    const shippingEl = document.getElementById('cartShipping');
    const totalEl = document.getElementById('cartTotal');

    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    if (taxEl) taxEl.textContent = formatPrice(tax);
    if (shippingEl) shippingEl.textContent = shipping === 0 ? 'FREE' : formatPrice(shipping);
    if (totalEl) totalEl.textContent = formatPrice(total);
}

// Show toast notification
function showToast(message, type = 'success') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }

    // Create new toast
    const toast = document.createElement('div');
    toast.className = `toast-notification ${type}`;
    toast.innerHTML = `
        <i class="bi bi-${type === 'success' ? 'check-circle' : 'exclamation-circle'} me-2"></i>
        ${message}
    `;
    document.body.appendChild(toast);

    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Promo code functionality
function applyPromoCode(code) {
    const promoCodes = {
        'PRESTIGE10': { discount: 0.10, message: '10% discount applied!' },
        'RACING20': { discount: 0.20, message: '20% discount applied!' },
        'WELCOME15': { discount: 0.15, message: '15% discount applied!' }
    };

    const promo = promoCodes[code.toUpperCase()];
    const messageEl = document.getElementById('promoMessage');

    if (promo) {
        if (messageEl) {
            messageEl.innerHTML = `<span class="text-success"><i class="bi bi-check-circle"></i> ${promo.message}</span>`;
        }
        return promo.discount;
    } else {
        if (messageEl) {
            messageEl.innerHTML = `<span class="text-danger"><i class="bi bi-x-circle"></i> Invalid promo code</span>`;
        }
        return 0;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initCart();
    
    // Render cart if on cart page
    if (document.getElementById('cartItems')) {
        renderCart();
    }

    // Clear cart button
    const clearCartBtn = document.getElementById('clearCartBtn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to clear your cart?')) {
                clearCart();
            }
        });
    }

    // Promo code button
    const applyPromoBtn = document.getElementById('applyPromo');
    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', function() {
            const code = document.getElementById('promoCode').value;
            applyPromoCode(code);
        });
    }
});

// Export functions for use in other files
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = updateQuantity;
window.clearCart = clearCart;
window.getCartTotal = getCartTotal;
window.getCartSubtotal = getCartSubtotal;
window.getTaxAmount = getTaxAmount;
window.getShippingCost = getShippingCost;
window.cart = cart;