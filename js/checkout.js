// ============================================
// PRESTIGE LEATHER - CHECKOUT PAGE SCRIPTS
// ============================================

let currentStep = 1;
let shippingMethod = 'standard';
let paymentMethod = 'card';
let checkoutData = {};

document.addEventListener('DOMContentLoaded', function() {
    // Check if cart is empty
    if (cart.length === 0) {
        window.location.href = 'cart.html';
        return;
    }
    
    // Initialize checkout
    initCheckout();
    
    // Initialize step navigation
    initStepNavigation();
    
    // Initialize payment options
    initPaymentOptions();
    
    // Initialize shipping options
    initShippingOptions();
    
    // Initialize form submission
    initFormSubmission();
    
    // Load order summary
    loadOrderSummary();
});

// Initialize checkout
function initCheckout() {
    // Load saved checkout data if exists
    const savedData = localStorage.getItem('prestigeCheckout');
    if (savedData) {
        checkoutData = JSON.parse(savedData);
    }
}

// Initialize step navigation
function initStepNavigation() {
    const nextButtons = document.querySelectorAll('.btn-next');
    const prevButtons = document.querySelectorAll('.btn-prev');
    
    nextButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const nextStep = parseInt(this.dataset.next);
            if (validateStep(currentStep)) {
                saveStepData(currentStep);
                goToStep(nextStep);
            }
        });
    });
    
    prevButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const prevStep = parseInt(this.dataset.prev);
            goToStep(prevStep);
        });
    });
}

// Validate current step
function validateStep(step) {
    const currentStepEl = document.getElementById(`step${step}`);
    const requiredFields = currentStepEl.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.classList.add('is-invalid');
            isValid = false;
        } else {
            field.classList.remove('is-invalid');
        }
    });
    
    if (!isValid) {
        showToast('Please fill in all required fields', 'error');
    }
    
    return isValid;
}

// Save step data
function saveStepData(step) {
    const currentStepEl = document.getElementById(`step${step}`);
    const inputs = currentStepEl.querySelectorAll('input, select, textarea');
    
    inputs.forEach(input => {
        if (input.name) {
            checkoutData[input.name] = input.value;
        }
    });
    
    checkoutData.shippingMethod = shippingMethod;
    checkoutData.paymentMethod = paymentMethod;
    
    localStorage.setItem('prestigeCheckout', JSON.stringify(checkoutData));
}

// Go to specific step
function goToStep(step) {
    // Hide all steps
    document.querySelectorAll('.checkout-step').forEach(s => s.classList.remove('active'));
    
    // Show target step
    document.getElementById(`step${step}`).classList.add('active');
    
    // Update progress indicators
    document.querySelectorAll('.progress-step').forEach(s => {
        const stepNum = parseInt(s.dataset.step);
        s.classList.remove('active', 'completed');
        if (stepNum < step) {
            s.classList.add('completed');
        } else if (stepNum === step) {
            s.classList.add('active');
        }
    });
    
    currentStep = step;
    
    // If on review step, load review data
    if (step === 3) {
        loadReviewData();
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Initialize payment options
function initPaymentOptions() {
    const paymentOptions = document.querySelectorAll('.payment-option');
    const cardDetails = document.getElementById('cardDetails');
    const paypalDetails = document.getElementById('paypalDetails');
    
    paymentOptions.forEach(option => {
        option.addEventListener('click', function() {
            paymentOptions.forEach(o => o.classList.remove('active'));
            this.classList.add('active');
            
            paymentMethod = this.querySelector('input').value;
            
            if (paymentMethod === 'card') {
                cardDetails.classList.remove('d-none');
                paypalDetails.classList.add('d-none');
            } else {
                cardDetails.classList.add('d-none');
                paypalDetails.classList.remove('d-none');
            }
        });
    });
}

// Initialize shipping options
function initShippingOptions() {
    const shippingOptions = document.querySelectorAll('.shipping-option');
    
    shippingOptions.forEach(option => {
        option.addEventListener('click', function() {
            shippingMethod = this.querySelector('input').value;
            updateCheckoutSummary();
        });
    });
}

// Initialize form submission
function initFormSubmission() {
    const form = document.getElementById('checkoutForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!document.getElementById('termsCheck').checked) {
            showToast('Please accept the terms and conditions', 'error');
            return;
        }
        
        // Process order
        processOrder();
    });
}

// Load order summary
function loadOrderSummary() {
    const summaryItems = document.getElementById('summaryItems');
    
    summaryItems.innerHTML = cart.map(item => `
        <div class="summary-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="summary-item-info">
                <div class="summary-item-title">${item.name}</div>
                <div class="summary-item-variant">${item.size} / ${item.color}</div>
                <div class="summary-item-qty">Qty: ${item.quantity}</div>
            </div>
            <div class="summary-item-price">${formatPrice(item.price * item.quantity)}</div>
        </div>
    `).join('');
    
    updateCheckoutSummary();
}

// Update checkout summary
function updateCheckoutSummary() {
    const subtotal = getCartSubtotal();
    const tax = getTaxAmount(subtotal);
    const shipping = getShippingCost(shippingMethod);
    const total = subtotal + tax + shipping;
    
    document.getElementById('checkoutSubtotal').textContent = formatPrice(subtotal);
    document.getElementById('checkoutTax').textContent = formatPrice(tax);
    document.getElementById('checkoutShipping').textContent = shipping === 0 ? 'FREE' : formatPrice(shipping);
    document.getElementById('checkoutTotal').textContent = formatPrice(total);
}

// Load review data
function loadReviewData() {
    // Load order items
    const orderItems = document.getElementById('orderItems');
    orderItems.innerHTML = cart.map(item => `
        <div class="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
            <div class="d-flex gap-3">
                <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 75px; object-fit: cover;">
                <div>
                    <h6 class="mb-1">${item.name}</h6>
                    <small class="text-muted">${item.size} / ${item.color} × ${item.quantity}</small>
                </div>
            </div>
            <span class="fw-bold">${formatPrice(item.price * item.quantity)}</span>
        </div>
    `).join('');
    
    // Load shipping address
    const shippingSummary = document.getElementById('shippingSummary');
    shippingSummary.innerHTML = `
        <p class="mb-1">
            <strong>${checkoutData.firstName || ''} ${checkoutData.lastName || ''}</strong>
        </p>
        <p class="mb-1">${checkoutData.address1 || ''}</p>
        ${checkoutData.address2 ? `<p class="mb-1">${checkoutData.address2}</p>` : ''}
        <p class="mb-1">${checkoutData.city || ''}, ${checkoutData.state || ''} ${checkoutData.zip || ''}</p>
        <p class="mb-1">${checkoutData.country || ''}</p>
        <p class="mb-0"><i class="bi bi-envelope me-2"></i>${checkoutData.email || ''}</p>
        <p class="mb-0"><i class="bi bi-telephone me-2"></i>${checkoutData.phone || ''}</p>
    `;
    
    // Load payment method
    const paymentSummary = document.getElementById('paymentSummary');
    if (paymentMethod === 'card') {
        const lastFour = checkoutData.cardNumber ? checkoutData.cardNumber.slice(-4) : '****';
        paymentSummary.innerHTML = `
            <p class="mb-0">
                <i class="bi bi-credit-card-2-front me-2"></i>
                Credit Card ending in ${lastFour}
            </p>
        `;
    } else {
        paymentSummary.innerHTML = `
            <p class="mb-0">
                <i class="bi bi-paypal me-2"></i>
                PayPal
            </p>
        `;
    }
}

// Process order
function processOrder() {
    // Show loading state
    const placeOrderBtn = document.querySelector('.btn-place-order');
    placeOrderBtn.innerHTML = '<span class="loading"></span> Processing...';
    placeOrderBtn.disabled = true;
    
    // Simulate order processing
    setTimeout(function() {
        // Generate order number
        const orderNumber = 'PL-' + Math.random().toString(36).substr(2, 9).toUpperCase();
        
        // Clear cart
        localStorage.removeItem('prestigeCart');
        
        // Clear checkout data
        localStorage.removeItem('prestigeCheckout');
        
        // Show success modal
        document.getElementById('orderNumber').textContent = orderNumber;
        const modal = new bootstrap.Modal(document.getElementById('orderSuccessModal'));
        modal.show();
        
    }, 2000);
}

// Format card number input
document.addEventListener('DOMContentLoaded', function() {
    const cardNumberInput = document.querySelector('input[name="cardNumber"]');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            let formattedValue = '';
            for (let i = 0; i < value.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formattedValue += ' ';
                }
                formattedValue += value[i];
            }
            e.target.value = formattedValue;
        });
    }
    
    // Format expiry date input
    const expiryInput = document.querySelector('input[name="cardExpiry"]');
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2);
            }
            e.target.value = value;
        });
    }
});