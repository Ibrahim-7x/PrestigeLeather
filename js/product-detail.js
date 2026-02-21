// ============================================
// PRESTIGE LEATHER - PRODUCT DETAIL PAGE
// ============================================

let currentProduct = null;
let selectedSize = null;
let selectedColor = null;
let quantity = 1;

document.addEventListener('DOMContentLoaded', function() {
    // Get product ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (!productId) {
        window.location.href = 'products.html';
        return;
    }
    
    // Load product
    loadProduct(productId);
    
    // Initialize quantity controls
    initQuantityControls();
    
    // Initialize add to cart
    initAddToCart();
    
    // Initialize image zoom
    initImageZoom();
});

// Load product data
function loadProduct(productId) {
    currentProduct = getProductById(parseInt(productId));
    
    if (!currentProduct) {
        window.location.href = 'products.html';
        return;
    }
    
    // Update page title
    document.title = `${currentProduct.name} - Prestige Leather`;
    
    // Update breadcrumb
    document.getElementById('breadcrumbProduct').textContent = currentProduct.name;
    
    // Update main image
    const mainImage = document.getElementById('mainProductImage');
    mainImage.src = currentProduct.images[0];
    mainImage.alt = currentProduct.name;
    
    // Update thumbnails
    const thumbnailGallery = document.getElementById('thumbnailGallery');
    thumbnailGallery.innerHTML = currentProduct.images.map((img, index) => `
        <img src="${img}" alt="${currentProduct.name} - Image ${index + 1}" 
             class="${index === 0 ? 'active' : ''}" 
             onclick="changeMainImage('${img}', this)">
    `).join('');
    
    // Update badges
    if (currentProduct.isNew) {
        document.getElementById('badgeNew').classList.remove('d-none');
    }
    if (currentProduct.originalPrice) {
        document.getElementById('badgeSale').classList.remove('d-none');
    }
    
    // Update product info
    document.getElementById('productCategory').textContent = currentProduct.category.toUpperCase();
    document.getElementById('productTitle').textContent = currentProduct.name;
    document.getElementById('productStars').innerHTML = generateStars(currentProduct.rating);
    document.getElementById('reviewCount').textContent = currentProduct.reviews;
    document.getElementById('currentPrice').textContent = formatPrice(currentProduct.price);
    
    if (currentProduct.originalPrice) {
        document.getElementById('originalPrice').textContent = formatPrice(currentProduct.originalPrice);
        document.getElementById('originalPrice').classList.remove('d-none');
        const discount = Math.round(((currentProduct.originalPrice - currentProduct.price) / currentProduct.originalPrice) * 100);
        document.getElementById('discountBadge').textContent = `-${discount}%`;
        document.getElementById('discountBadge').classList.remove('d-none');
    }
    
    document.getElementById('productDescription').textContent = currentProduct.description;
    
    // Render size selector
    renderSizeSelector();
    
    // Render color selector
    renderColorSelector();
    
    // Load description tab
    document.getElementById('descriptionContent').innerHTML = `
        <p>${currentProduct.longDescription}</p>
        <h5 class="mt-4">Key Features</h5>
        <ul class="feature-list">
            <li>Premium ${currentProduct.specifications.material}</li>
            <li>${currentProduct.specifications.armor}</li>
            <li>${currentProduct.specifications.ventilation}</li>
            <li>${currentProduct.specifications.closure}</li>
        </ul>
    `;
    
    // Load specifications tab
    document.getElementById('specificationsContent').innerHTML = `
        <table class="table table-striped">
            <tbody>
                <tr>
                    <th>Material</th>
                    <td>${currentProduct.specifications.material}</td>
                </tr>
                <tr>
                    <th>Lining</th>
                    <td>${currentProduct.specifications.lining}</td>
                </tr>
                <tr>
                    <th>Armor</th>
                    <td>${currentProduct.specifications.armor}</td>
                </tr>
                <tr>
                    <th>Back Protector</th>
                    <td>${currentProduct.specifications.backProtector}</td>
                </tr>
                <tr>
                    <th>Ventilation</th>
                    <td>${currentProduct.specifications.ventilation}</td>
                </tr>
                <tr>
                    <th>Closure</th>
                    <td>${currentProduct.specifications.closure}</td>
                </tr>
                <tr>
                    <th>Weight</th>
                    <td>${currentProduct.specifications.weight}</td>
                </tr>
            </tbody>
        </table>
    `;
    
    // Load reviews
    loadReviews();
    
    // Load related products
    loadRelatedProducts();
}

// Change main image
function changeMainImage(src, thumbnail) {
    document.getElementById('mainProductImage').src = src;
    document.querySelectorAll('.thumbnail-gallery img').forEach(img => img.classList.remove('active'));
    thumbnail.classList.add('active');
}

// Render size selector
function renderSizeSelector() {
    const container = document.getElementById('sizeSelector');
    selectedSize = currentProduct.sizes[0];
    
    container.innerHTML = currentProduct.sizes.map((size, index) => `
        <button class="size-btn ${index === 0 ? 'active' : ''}" 
                onclick="selectSize('${size}', this)">
            ${size}
        </button>
    `).join('');
}

// Select size
function selectSize(size, btn) {
    selectedSize = size;
    document.querySelectorAll('#sizeSelector .size-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

// Render color selector
function renderColorSelector() {
    const container = document.getElementById('colorSelector');
    selectedColor = currentProduct.colors[0];
    
    const colorMap = {
        black: '#000000',
        white: '#ffffff',
        maroon: '#800020',
        red: '#ff0000',
        blue: '#0000ff'
    };
    
    container.innerHTML = currentProduct.colors.map((color, index) => `
        <button class="color-btn ${index === 0 ? 'active' : ''}" 
                style="background: ${colorMap[color] || color};"
                title="${color.charAt(0).toUpperCase() + color.slice(1)}"
                onclick="selectColor('${color}', this)">
        </button>
    `).join('');
}

// Select color
function selectColor(color, btn) {
    selectedColor = color;
    document.querySelectorAll('#colorSelector .color-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
}

// Initialize quantity controls
function initQuantityControls() {
    const minusBtn = document.getElementById('qtyMinus');
    const plusBtn = document.getElementById('qtyPlus');
    const qtyInput = document.getElementById('qtyInput');
    
    minusBtn.addEventListener('click', function() {
        if (quantity > 1) {
            quantity--;
            qtyInput.value = quantity;
        }
    });
    
    plusBtn.addEventListener('click', function() {
        if (quantity < 10) {
            quantity++;
            qtyInput.value = quantity;
        }
    });
    
    qtyInput.addEventListener('change', function() {
        let val = parseInt(this.value);
        if (isNaN(val) || val < 1) val = 1;
        if (val > 10) val = 10;
        quantity = val;
        this.value = quantity;
    });
}

// Initialize add to cart
function initAddToCart() {
    const addToCartBtn = document.getElementById('addToCartBtn');
    const buyNowBtn = document.getElementById('buyNowBtn');
    const wishlistBtn = document.getElementById('wishlistBtn');
    
    addToCartBtn.addEventListener('click', function() {
        addToCart(currentProduct.id, quantity, selectedSize, selectedColor);
    });
    
    buyNowBtn.addEventListener('click', function() {
        addToCart(currentProduct.id, quantity, selectedSize, selectedColor);
        window.location.href = 'checkout.html';
    });
    
    wishlistBtn.addEventListener('click', function() {
        addToWishlist(currentProduct.id);
        this.innerHTML = '<i class="bi bi-heart-fill"></i>';
    });
}

// Initialize image zoom
function initImageZoom() {
    const zoomBtn = document.querySelector('.zoom-btn');
    const zoomImage = document.getElementById('zoomImage');
    
    if (zoomBtn) {
        zoomBtn.addEventListener('click', function() {
            zoomImage.src = document.getElementById('mainProductImage').src;
        });
    }
}

// Load reviews
function loadReviews() {
    const container = document.getElementById('reviewsList');
    const productReviews = reviews.filter(r => r.productId === currentProduct.id);
    
    if (productReviews.length === 0) {
        container.innerHTML = '<p class="text-muted">No reviews yet. Be the first to review this product!</p>';
        return;
    }
    
    container.innerHTML = productReviews.map(review => `
        <div class="review-item mb-4 pb-4 border-bottom">
            <div class="d-flex justify-content-between align-items-start">
                <div>
                    <div class="stars text-warning">${generateStars(review.rating)}</div>
                    <h6 class="mt-2 mb-1">${review.title}</h6>
                </div>
                <span class="text-muted small">${new Date(review.date).toLocaleDateString()}</span>
            </div>
            <p class="text-muted mb-2">${review.content}</p>
            <div class="d-flex align-items-center gap-2">
                <strong>${review.author}</strong>
                ${review.verified ? '<span class="badge bg-success">Verified Purchase</span>' : ''}
            </div>
        </div>
    `).join('');
}

// Load related products
function loadRelatedProducts() {
    const container = document.getElementById('relatedProducts');
    const relatedProducts = getRelatedProducts(currentProduct.id, 4);
    
    container.innerHTML = relatedProducts.map(product => createProductCard(product)).join('');
}

// Make functions globally available
window.changeMainImage = changeMainImage;
window.selectSize = selectSize;
window.selectColor = selectColor;