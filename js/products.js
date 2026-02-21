// ============================================
// PRESTIGE LEATHER - PRODUCTS PAGE SCRIPTS
// ============================================

let currentFilters = {
    categories: [],
    priceMin: null,
    priceMax: null,
    sizes: [],
    colors: [],
    features: [],
    sort: 'featured',
    search: ''
};

let currentPage = 1;
const productsPerPage = 9;

document.addEventListener('DOMContentLoaded', function() {
    // Parse URL parameters
    parseURLParams();
    
    // Initialize filters
    initFilters();
    
    // Load products
    loadProducts();
    
    // Initialize sort select
    initSortSelect();
    
    // Initialize view options
    initViewOptions();
    
    // Initialize clear filters
    initClearFilters();
});

// Parse URL parameters
function parseURLParams() {
    const params = new URLSearchParams(window.location.search);
    
    if (params.has('category')) {
        currentFilters.categories = [params.get('category')];
    }
    
    if (params.has('search')) {
        currentFilters.search = params.get('search');
    }
    
    if (params.has('sort')) {
        currentFilters.sort = params.get('sort');
    }
}

// Initialize filters
function initFilters() {
    // Category checkboxes
    const categoryCheckboxes = document.querySelectorAll('#categoryFilter input[type="checkbox"]');
    categoryCheckboxes.forEach(checkbox => {
        if (currentFilters.categories.includes(checkbox.value)) {
            checkbox.checked = true;
        }
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                currentFilters.categories.push(this.value);
            } else {
                currentFilters.categories = currentFilters.categories.filter(c => c !== this.value);
            }
        });
    });
    
    // Size buttons
    const sizeButtons = document.querySelectorAll('.size-btn');
    sizeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const size = this.dataset.size;
            if (this.classList.contains('active')) {
                currentFilters.sizes.push(size);
            } else {
                currentFilters.sizes = currentFilters.sizes.filter(s => s !== size);
            }
        });
    });
    
    // Color buttons
    const colorButtons = document.querySelectorAll('.color-btn');
    colorButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            this.classList.toggle('active');
            const color = this.dataset.color;
            if (this.classList.contains('active')) {
                currentFilters.colors.push(color);
            } else {
                currentFilters.colors = currentFilters.colors.filter(c => c !== color);
            }
        });
    });
    
    // Feature checkboxes
    const featureCheckboxes = document.querySelectorAll('#featureFilter input[type="checkbox"]');
    featureCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                currentFilters.features.push(this.value);
            } else {
                currentFilters.features = currentFilters.features.filter(f => f !== this.value);
            }
        });
    });
    
    // Price range
    const priceRadios = document.querySelectorAll('input[name="priceRange"]');
    priceRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value) {
                const [min, max] = this.value.split('-').map(Number);
                currentFilters.priceMin = min;
                currentFilters.priceMax = max;
            }
        });
    });
    
    // Apply filters button
    const applyBtn = document.getElementById('applyFilters');
    if (applyBtn) {
        applyBtn.addEventListener('click', function() {
            currentPage = 1;
            loadProducts();
            updateActiveFilters();
        });
    }
}

// Initialize sort select
function initSortSelect() {
    const sortSelect = document.getElementById('sortSelect');
    if (!sortSelect) return;
    
    sortSelect.value = currentFilters.sort;
    
    sortSelect.addEventListener('change', function() {
        currentFilters.sort = this.value;
        loadProducts();
    });
}

// Initialize view options
function initViewOptions() {
    const viewButtons = document.querySelectorAll('.view-btn');
    const productsGrid = document.getElementById('productsGrid');
    
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            viewButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const view = this.dataset.view;
            if (view === 'list') {
                productsGrid.classList.add('list-view');
            } else {
                productsGrid.classList.remove('list-view');
            }
        });
    });
}

// Initialize clear filters
function initClearFilters() {
    const clearBtn = document.getElementById('clearFilters');
    const resetBtn = document.getElementById('resetFilters');
    
    [clearBtn, resetBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function() {
                // Reset filters object
                currentFilters = {
                    categories: [],
                    priceMin: null,
                    priceMax: null,
                    sizes: [],
                    colors: [],
                    features: [],
                    sort: 'featured',
                    search: ''
                };
                
                // Reset UI
                document.querySelectorAll('.filter-options input').forEach(input => {
                    input.checked = false;
                });
                document.querySelectorAll('.size-btn, .color-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                document.getElementById('priceMin').value = '';
                document.getElementById('priceMax').value = '';
                
                currentPage = 1;
                loadProducts();
                updateActiveFilters();
            });
        }
    });
}

// Load products
function loadProducts() {
    const container = document.getElementById('productsGrid');
    const noProducts = document.getElementById('noProducts');
    const resultsCount = document.getElementById('resultsCount');
    
    if (!container) return;
    
    // Filter products
    let filteredProducts = filterProducts();
    
    // Sort products
    filteredProducts = sortProducts(filteredProducts);
    
    // Update results count
    if (resultsCount) {
        resultsCount.textContent = filteredProducts.length;
    }
    
    // Show/hide no products message
    if (filteredProducts.length === 0) {
        container.innerHTML = '';
        if (noProducts) noProducts.classList.remove('d-none');
        return;
    }
    
    if (noProducts) noProducts.classList.add('d-none');
    
    // Paginate
    const startIndex = (currentPage - 1) * productsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);
    
    // Render products
    container.innerHTML = paginatedProducts.map(product => createProductCard(product)).join('');
    
    // Render pagination
    renderPagination(filteredProducts.length);
}

// Filter products
function filterProducts() {
    return products.filter(product => {
        // Category filter
        if (currentFilters.categories.length > 0 && 
            !currentFilters.categories.includes(product.category)) {
            return false;
        }
        
        // Price filter
        if (currentFilters.priceMin !== null && product.price < currentFilters.priceMin) {
            return false;
        }
        if (currentFilters.priceMax !== null && product.price > currentFilters.priceMax) {
            return false;
        }
        
        // Size filter
        if (currentFilters.sizes.length > 0) {
            const hasSize = currentFilters.sizes.some(size => product.sizes.includes(size));
            if (!hasSize) return false;
        }
        
        // Color filter
        if (currentFilters.colors.length > 0) {
            const hasColor = currentFilters.colors.some(color => product.colors.includes(color));
            if (!hasColor) return false;
        }
        
        // Feature filter
        if (currentFilters.features.length > 0) {
            const hasFeature = currentFilters.features.some(feature => product.features.includes(feature));
            if (!hasFeature) return false;
        }
        
        // Search filter
        if (currentFilters.search) {
            const searchTerm = currentFilters.search.toLowerCase();
            const matchesSearch = 
                product.name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm);
            if (!matchesSearch) return false;
        }
        
        return true;
    });
}

// Sort products
function sortProducts(productsArray) {
    const sorted = [...productsArray];
    
    switch (currentFilters.sort) {
        case 'newest':
            return sorted.filter(p => p.isNew).concat(sorted.filter(p => !p.isNew));
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'name-az':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        case 'name-za':
            return sorted.sort((a, b) => b.name.localeCompare(a.name));
        default:
            return sorted.filter(p => p.isFeatured).concat(sorted.filter(p => !p.isFeatured));
    }
}

// Render pagination
function renderPagination(totalProducts) {
    const pagination = document.querySelector('#pagination ul');
    if (!pagination) return;
    
    const totalPages = Math.ceil(totalProducts / productsPerPage);
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let html = '';
    
    // Previous button
    html += `
        <li class="page-item ${currentPage === 1 ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage - 1}); return false;">
                <i class="bi bi-chevron-left"></i>
            </a>
        </li>
    `;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            html += `
                <li class="page-item ${i === currentPage ? 'active' : ''}">
                    <a class="page-link" href="#" onclick="changePage(${i}); return false;">${i}</a>
                </li>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            html += '<li class="page-item disabled"><span class="page-link">...</span></li>';
        }
    }
    
    // Next button
    html += `
        <li class="page-item ${currentPage === totalPages ? 'disabled' : ''}">
            <a class="page-link" href="#" onclick="changePage(${currentPage + 1}); return false;">
                <i class="bi bi-chevron-right"></i>
            </a>
        </li>
    `;
    
    pagination.innerHTML = html;
}

// Change page
function changePage(page) {
    const totalPages = Math.ceil(filterProducts().length / productsPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    loadProducts();
    
    // Scroll to top of products
    document.querySelector('.products-toolbar').scrollIntoView({ behavior: 'smooth' });
}

// Update active filters display
function updateActiveFilters() {
    const container = document.getElementById('activeFilters');
    if (!container) return;
    
    let tags = [];
    
    currentFilters.categories.forEach(cat => {
        tags.push({ type: 'category', value: cat, label: cat.charAt(0).toUpperCase() + cat.slice(1) });
    });
    
    currentFilters.sizes.forEach(size => {
        tags.push({ type: 'size', value: size, label: `Size: ${size}` });
    });
    
    currentFilters.colors.forEach(color => {
        tags.push({ type: 'color', value: color, label: `Color: ${color}` });
    });
    
    if (tags.length === 0) {
        container.innerHTML = '';
        return;
    }
    
    container.innerHTML = tags.map(tag => `
        <span class="filter-tag">
            ${tag.label}
            <button onclick="removeFilter('${tag.type}', '${tag.value}')">&times;</button>
        </span>
    `).join('');
}

// Remove individual filter
function removeFilter(type, value) {
    switch (type) {
        case 'category':
            currentFilters.categories = currentFilters.categories.filter(c => c !== value);
            document.querySelector(`#categoryFilter input[value="${value}"]`).checked = false;
            break;
        case 'size':
            currentFilters.sizes = currentFilters.sizes.filter(s => s !== value);
            document.querySelector(`.size-btn[data-size="${value}"]`).classList.remove('active');
            break;
        case 'color':
            currentFilters.colors = currentFilters.colors.filter(c => c !== value);
            document.querySelector(`.color-btn[data-color="${value}"]`).classList.remove('active');
            break;
    }
    
    currentPage = 1;
    loadProducts();
    updateActiveFilters();
}

// Make changePage globally available
window.changePage = changePage;
window.removeFilter = removeFilter;