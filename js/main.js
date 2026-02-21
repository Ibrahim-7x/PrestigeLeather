// ============================================
// PRESTIGE LEATHER - MAIN JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize navbar scroll effect
    initNavbarScroll();
    
    // Initialize scroll to top button
    initScrollToTop();
    
    // Load featured products on homepage
    loadFeaturedProducts();
    
    // Load new arrivals on homepage
    loadNewArrivals();
    
    // Initialize newsletter form
    initNewsletterForm();
    
    // Initialize search functionality
    initSearch();
    
    // Initialize tooltips
    initTooltips();
});

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Scroll to top button
function initScrollToTop() {
    // Create scroll to top button
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-top';
    scrollBtn.innerHTML = '<i class="bi bi-arrow-up"></i>';
    document.body.appendChild(scrollBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top on click
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Load featured products
function loadFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;
    
    const featuredProducts = getFeaturedProducts().slice(0, 4);
    container.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
}

// Load new arrivals
function loadNewArrivals() {
    const container = document.getElementById('newArrivals');
    if (!container) return;
    
    const newProducts = getNewProducts().slice(0, 4);
    container.innerHTML = newProducts.map(product => createProductCard(product)).join('');
}

// Create product card HTML
function createProductCard(product) {
    const stars = generateStars(product.rating);
    const discount = product.originalPrice ? 
        Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;
    
    return `
        <div class="col-lg-3 col-md-6">
            <div class="product-card">
                <div class="product-image">
                    <a href="product-detail.html?id=${product.id}">
                        <img src="${product.images[0]}" alt="${product.name}">
                    </a>
                    <div class="product-badges">
                        ${product.isNew ? '<span class="badge-new">NEW</span>' : ''}
                        ${discount > 0 ? `<span class="badge-sale">-${discount}%</span>` : ''}
                    </div>
                    <div class="product-actions">
                        <button class="action-btn" onclick="quickView(${product.id})" title="Quick View">
                            <i class="bi bi-eye"></i>
                        </button>
                        <button class="action-btn" onclick="addToCart(${product.id}, 1)" title="Add to Cart">
                            <i class="bi bi-bag-plus"></i>
                        </button>
                        <button class="action-btn" onclick="addToWishlist(${product.id})" title="Add to Wishlist">
                            <i class="bi bi-heart"></i>
                        </button>
                    </div>
                </div>
                <div class="product-info">
                    <div class="product-category">${product.category}</div>
                    <h5 class="product-title">
                        <a href="product-detail.html?id=${product.id}">${product.name}</a>
                    </h5>
                    <div class="product-rating">
                        <span class="stars">${stars}</span>
                        <span class="rating-count">(${product.reviews})</span>
                    </div>
                    <div class="product-price">
                        <span class="current-price">${formatPrice(product.price)}</span>
                        ${product.originalPrice ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Generate star rating HTML
function generateStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="bi bi-star-fill"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="bi bi-star-half"></i>';
    }
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
        stars += '<i class="bi bi-star"></i>';
    }
    
    return stars;
}

// Quick view modal
function quickView(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    const modal = document.getElementById('quickViewModal');
    const content = document.getElementById('quickViewContent');
    
    if (!modal || !content) return;
    
    content.innerHTML = `
        <div class="row g-0">
            <div class="col-md-6">
                <img src="${product.images[0]}" alt="${product.name}" class="img-fluid w-100">
            </div>
            <div class="col-md-6 p-4">
                <div class="product-category mb-2">${product.category}</div>
                <h3 class="text-white mb-3">${product.name}</h3>
                <div class="product-rating mb-3">
                    <span class="stars">${generateStars(product.rating)}</span>
                    <span class="rating-count text-white-50">(${product.reviews} Reviews)</span>
                </div>
                <div class="product-price mb-3">
                    <span class="current-price text-white" style="font-size: 1.5rem;">${formatPrice(product.price)}</span>
                    ${product.originalPrice ? `<span class="original-price">${formatPrice(product.originalPrice)}</span>` : ''}
                </div>
                <p class="text-white-50 mb-4">${product.description}</p>
                <div class="d-flex gap-2">
                    <a href="product-detail.html?id=${product.id}" class="btn btn-maroon">View Details</a>
                    <button class="btn btn-outline-light" onclick="addToCart(${product.id}, 1); closeModal('quickViewModal');">Add to Cart</button>
                </div>
            </div>
        </div>
    `;
    
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
}

// Close modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        const bsModal = bootstrap.Modal.getInstance(modal);
        if (bsModal) {
            bsModal.hide();
        }
    }
}

// Add to wishlist (placeholder)
function addToWishlist(productId) {
    const product = getProductById(productId);
    if (product) {
        showToast(`${product.name} added to wishlist!`, 'success');
    }
}

// Initialize newsletter form
function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Simulate subscription
        showToast('Thank you for subscribing!', 'success');
        this.reset();
    });
}

// Initialize search functionality
function initSearch() {
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.getElementById('searchInput');
    
    if (!searchForm || !searchInput) return;
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const query = searchInput.value.trim();
        
        if (query) {
            window.location.href = `products.html?search=${encodeURIComponent(query)}`;
        }
    });
}

// Initialize Bootstrap tooltips
function initTooltips() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(function(tooltipTriggerEl) {
        new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Make functions globally available
window.quickView = quickView;
window.addToWishlist = addToWishlist;
window.closeModal = closeModal;
window.createProductCard = createProductCard;
window.generateStars = generateStars;