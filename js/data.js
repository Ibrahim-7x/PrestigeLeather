// ============================================
// PRESTIGE LEATHER - PRODUCT DATA
// ============================================

const products = [
    {
        id: 1,
        name: "Pro Racing Suit MK-V",
        category: "racing",
        price: 1899.99,
        originalPrice: 2199.99,
        discount: 14,
        description: "Our flagship racing suit engineered for professional track performance. Features CE-certified armor, aerodynamic hump, and premium cowhide leather construction.",
        longDescription: "The Pro Racing Suit MK-V represents the pinnacle of motorcycle racing protection. Handcrafted from 1.3mm premium cowhide leather, this suit features our revolutionary Aero-Tech hump design for improved aerodynamics at high speeds. The internal mesh lining provides exceptional breathability while maintaining a snug, comfortable fit.",
        images: [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
            "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800",
            "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800"
        ],
        colors: ["black", "maroon", "white"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        features: ["ce-certified", "race-ready"],
        rating: 4.8,
        reviews: 124,
        isNew: true,
        isFeatured: true,
        specifications: {
            material: "1.3mm Premium Cowhide Leather",
            lining: "Breathable Mesh",
            armor: "CE Level 2 (Shoulders, Elbows, Knees, Hips)",
            backProtector: "Pocket Ready (Sold Separately)",
            hump: "Aerodynamic with hydration pocket",
            ventilation: "Perforated panels",
            closure: "YKK Auto-lock zipper",
            weight: "4.2 kg"
        }
    },
    {
        id: 2,
        name: "Sport Performance Suit",
        category: "sport",
        price: 1299.99,
        originalPrice: null,
        discount: null,
        description: "Versatile sport suit perfect for track days and spirited street riding. Balanced protection and comfort for the performance-oriented rider.",
        longDescription: "The Sport Performance Suit bridges the gap between track and street. Constructed from durable 1.2mm leather with strategic stretch panels for enhanced mobility. Perfect for riders who demand performance on both the track and the street.",
        images: [
            "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
            "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800"
        ],
        colors: ["black", "blue", "red"],
        sizes: ["S", "M", "L", "XL"],
        features: ["ce-certified"],
        rating: 4.6,
        reviews: 89,
        isNew: false,
        isFeatured: true,
        specifications: {
            material: "1.2mm Drum-Dyed Leather",
            lining: "3D Mesh",
            armor: "CE Level 1 (Shoulders, Elbows, Knees)",
            backProtector: "Included CE Level 1",
            hump: "Standard",
            ventilation: "Zippered vents",
            closure: "YKK zipper",
            weight: "3.8 kg"
        }
    },
    {
        id: 3,
        name: "Touring Master Suit",
        category: "touring",
        price: 1499.99,
        originalPrice: null,
        discount: null,
        description: "Long-distance comfort meets premium protection. Designed for the serious touring enthusiast with all-weather capabilities.",
        longDescription: "The Touring Master Suit is engineered for riders who log serious miles. Featuring a removable thermal liner and waterproof membrane, this suit adapts to any weather condition. Multiple storage pockets and a relaxed fit ensure comfort on the longest journeys.",
        images: [
            "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
            "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800"
        ],
        colors: ["black", "maroon"],
        sizes: ["M", "L", "XL", "XXL"],
        features: ["ce-certified", "custom-fit"],
        rating: 4.7,
        reviews: 156,
        isNew: false,
        isFeatured: true,
        specifications: {
            material: "1.1mm Premium Leather",
            lining: "Removable Thermal + Waterproof",
            armor: "CE Level 1 (Shoulders, Elbows, Hips, Knees)",
            backProtector: "Included CE Level 1",
            hump: "None",
            ventilation: "Multiple zippered vents",
            closure: "Double zipper system",
            weight: "4.5 kg"
        }
    },
    {
        id: 4,
        name: "Championship Edition",
        category: "racing",
        price: 2499.99,
        originalPrice: 2999.99,
        discount: 17,
        description: "Limited edition replica of our championship-winning suit. Race-proven technology for the ultimate performance.",
        longDescription: "The Championship Edition is a faithful replica of the suit worn by our MotoGP champions. Every detail has been replicated, from the kangaroo leather construction to the titanium sliders. This is the ultimate suit for serious racers.",
        images: [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
            "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800",
            "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800"
        ],
        colors: ["black", "white", "red"],
        sizes: ["S", "M", "L", "XL"],
        features: ["ce-certified", "race-ready", "custom-fit"],
        rating: 5.0,
        reviews: 42,
        isNew: true,
        isFeatured: true,
        specifications: {
            material: "1.1mm Kangaroo Leather",
            lining: "Race-spec Mesh",
            armor: "CE Level 2 (Full Coverage)",
            backProtector: "Included CE Level 2",
            hump: "Aerodynamic with data logger pocket",
            ventilation: "Full perforation option",
            closure: "Racing zipper system",
            weight: "3.2 kg"
        }
    },
    {
        id: 5,
        name: "Street Fighter Suit",
        category: "sport",
        price: 999.99,
        originalPrice: 1199.99,
        discount: 17,
        description: "Aggressive styling for the urban rider. Street-focused protection with head-turning design.",
        longDescription: "The Street Fighter Suit combines urban style with serious protection. Featuring a more relaxed fit than our track suits, it's perfect for street riders who want premium protection without the racing posture. Bold design elements make a statement on any street.",
        images: [
            "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
            "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800"
        ],
        colors: ["black", "maroon"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        features: ["ce-certified"],
        rating: 4.5,
        reviews: 78,
        isNew: false,
        isFeatured: false,
        specifications: {
            material: "1.2mm Cowhide Leather",
            lining: "Comfort Mesh",
            armor: "CE Level 1 (Shoulders, Elbows, Knees)",
            backProtector: "Pocket Ready",
            hump: "None",
            ventilation: "Back vents",
            closure: "YKK zipper",
            weight: "3.5 kg"
        }
    },
    {
        id: 6,
        name: "Endurance Racer",
        category: "racing",
        price: 2199.99,
        originalPrice: null,
        discount: null,
        description: "Built for endurance racing with enhanced comfort features for long stints on the track.",
        longDescription: "The Endurance Racer is specifically designed for endurance racing events. Additional comfort features include enhanced ventilation, a hydration system compatible hump, and extra padding in key areas. Built to perform lap after lap.",
        images: [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
            "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800",
            "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800"
        ],
        colors: ["black", "blue"],
        sizes: ["M", "L", "XL"],
        features: ["ce-certified", "race-ready"],
        rating: 4.9,
        reviews: 34,
        isNew: true,
        isFeatured: false,
        specifications: {
            material: "1.3mm Premium Cowhide",
            lining: "Moisture-wicking Mesh",
            armor: "CE Level 2 (Shoulders, Elbows, Knees, Hips)",
            backProtector: "Included CE Level 2",
            hump: "Hydration system compatible",
            ventilation: "Extensive perforation",
            closure: "Racing zipper",
            weight: "4.0 kg"
        }
    },
    {
        id: 7,
        name: "Weekend Warrior",
        category: "sport",
        price: 849.99,
        originalPrice: null,
        discount: null,
        description: "Entry-level premium suit for track day enthusiasts. Professional features at an accessible price.",
        longDescription: "The Weekend Warrior is perfect for riders transitioning to track days. It offers professional-grade protection features at a more accessible price point. Don't let the price fool you - this suit means business on the track.",
        images: [
            "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
            "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800"
        ],
        colors: ["black", "white"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        features: ["ce-certified"],
        rating: 4.4,
        reviews: 112,
        isNew: false,
        isFeatured: false,
        specifications: {
            material: "1.1mm Cowhide Leather",
            lining: "Basic Mesh",
            armor: "CE Level 1 (Shoulders, Elbows, Knees)",
            backProtector: "Pocket Ready",
            hump: "Small aerodynamic",
            ventilation: "Chest vents",
            closure: "YKK zipper",
            weight: "3.6 kg"
        }
    },
    {
        id: 8,
        name: "Adventure Touring Suit",
        category: "touring",
        price: 1699.99,
        originalPrice: 1899.99,
        discount: 11,
        description: "Versatile adventure-ready suit for on and off-road exploration. Maximum versatility for the adventurous rider.",
        longDescription: "The Adventure Touring Suit is designed for riders who venture off the beaten path. Reinforced impact zones, adjustable fit, and compatibility with adventure boots make this the ultimate choice for exploration. From highway to trail, this suit handles it all.",
        images: [
            "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
            "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800"
        ],
        colors: ["black", "maroon"],
        sizes: ["M", "L", "XL", "XXL"],
        features: ["ce-certified", "custom-fit"],
        rating: 4.6,
        reviews: 67,
        isNew: false,
        isFeatured: false,
        specifications: {
            material: "1.2mm Dual-Tex Leather",
            lining: "Removable All-Weather",
            armor: "CE Level 1 (Full Coverage)",
            backProtector: "Included",
            hump: "None",
            ventilation: "Multiple adjustable vents",
            closure: "Adventure zipper system",
            weight: "4.8 kg"
        }
    },
    {
        id: 9,
        name: "Ladies Racing Suit",
        category: "racing",
        price: 1699.99,
        originalPrice: null,
        discount: null,
        description: "Specifically designed for female racers with anatomically correct fit and premium protection.",
        longDescription: "The Ladies Racing Suit is designed from the ground up for female riders. Every aspect, from the cut to the armor placement, is optimized for the female form. No compromises on protection or performance.",
        images: [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
            "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800",
            "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800"
        ],
        colors: ["black", "white", "maroon"],
        sizes: ["XS", "S", "M", "L"],
        features: ["ce-certified", "race-ready"],
        rating: 4.9,
        reviews: 56,
        isNew: true,
        isFeatured: true,
        specifications: {
            material: "1.2mm Premium Cowhide",
            lining: "Performance Mesh",
            armor: "CE Level 2 (Shoulders, Elbows, Knees, Hips)",
            backProtector: "Pocket Ready",
            hump: "Aerodynamic",
            ventilation: "Perforated panels",
            closure: "YKK Auto-lock",
            weight: "3.4 kg"
        }
    },
    {
        id: 10,
        name: "Classic Heritage Suit",
        category: "touring",
        price: 1199.99,
        originalPrice: null,
        discount: null,
        description: "Timeless styling with modern protection. For riders who appreciate classic aesthetics.",
        longDescription: "The Classic Heritage Suit combines vintage styling with contemporary protection technology. Brown leather accents and classic stitching details pay homage to motorcycling's golden era, while hidden modern armor keeps you safe.",
        images: [
            "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
            "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800"
        ],
        colors: ["black", "maroon"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        features: ["ce-certified"],
        rating: 4.7,
        reviews: 89,
        isNew: false,
        isFeatured: false,
        specifications: {
            material: "1.2mm Vintage-Finish Leather",
            lining: "Cotton twill",
            armor: "CE Level 1 (Shoulders, Elbows, Hips)",
            backProtector: "Included",
            hump: "None",
            ventilation: "Hidden zippered vents",
            closure: "Classic brass zipper",
            weight: "4.0 kg"
        }
    },
    {
        id: 11,
        name: "Junior Racer Suit",
        category: "racing",
        price: 799.99,
        originalPrice: null,
        discount: null,
        description: "Professional-grade racing suit for young riders. Same protection as adult suits in youth sizes.",
        longDescription: "The Junior Racer Suit offers the same level of protection as our adult suits, sized for young riders. Perfect for aspiring racers who take their riding seriously. Adjustable fit system accommodates growing riders.",
        images: [
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
            "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800",
            "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800"
        ],
        colors: ["black", "blue", "red"],
        sizes: ["XS", "S", "M"],
        features: ["ce-certified", "race-ready"],
        rating: 4.8,
        reviews: 23,
        isNew: true,
        isFeatured: false,
        specifications: {
            material: "1.1mm Cowhide Leather",
            lining: "Comfort Mesh",
            armor: "CE Level 1 (Shoulders, Elbows, Knees)",
            backProtector: "Included",
            hump: "Small aerodynamic",
            ventilation: "Perforated chest",
            closure: "YKK zipper",
            weight: "2.8 kg"
        }
    },
    {
        id: 12,
        name: "Two-Piece Sport Suit",
        category: "sport",
        price: 1099.99,
        originalPrice: 1299.99,
        discount: 15,
        description: "Versatile two-piece design for street and track. Jacket and pants can be worn separately.",
        longDescription: "The Two-Piece Sport Suit offers maximum versatility. The jacket and pants connect via a full-circumference zipper for track use, or can be worn separately for street riding. Perfect for riders who want options.",
        images: [
            "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800",
            "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
            "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800"
        ],
        colors: ["black", "white"],
        sizes: ["S", "M", "L", "XL", "XXL"],
        features: ["ce-certified"],
        rating: 4.5,
        reviews: 145,
        isNew: false,
        isFeatured: true,
        specifications: {
            material: "1.2mm Cowhide Leather",
            lining: "3D Mesh",
            armor: "CE Level 1 (Shoulders, Elbows, Knees, Hips)",
            backProtector: "Pocket Ready",
            hump: "None",
            ventilation: "Zippered vents",
            closure: "360° connecting zipper",
            weight: "3.9 kg (total)"
        }
    }
];

// Reviews data
const reviews = [
    {
        id: 1,
        productId: 1,
        author: "Marco R.",
        rating: 5,
        date: "2024-01-15",
        title: "Best suit I've ever owned",
        content: "The quality is exceptional. After 20+ track days, it still looks and performs like new. The protection gives me confidence to push harder.",
        verified: true
    },
    {
        id: 2,
        productId: 1,
        author: "Sarah L.",
        rating: 5,
        date: "2024-01-10",
        title: "Worth every penny",
        content: "Finally found a suit that fits my riding style perfectly. The ventilation is great and the armor placement is spot on.",
        verified: true
    },
    {
        id: 3,
        productId: 2,
        author: "James K.",
        rating: 4,
        date: "2024-01-08",
        title: "Great value for money",
        content: "Excellent suit for the price. Good protection and comfortable for all-day riding. Only wish it had more ventilation.",
        verified: true
    },
    {
        id: 4,
        productId: 3,
        author: "David M.",
        rating: 5,
        date: "2024-01-05",
        title: "Perfect for long rides",
        content: "Did a 3000-mile trip with this suit. Comfortable in all weather conditions. The removable liner is a game changer.",
        verified: true
    },
    {
        id: 5,
        productId: 4,
        author: "Professional Racer",
        rating: 5,
        date: "2024-01-03",
        title: "Championship quality",
        content: "This suit is identical to what the pros wear. The kangaroo leather is incredibly light yet strong. Best investment for serious racers.",
        verified: true
    }
];

// Helper functions
function getProductById(id) {
    return products.find(p => p.id === parseInt(id));
}

function getProductsByCategory(category) {
    return products.filter(p => p.category === category);
}

function getFeaturedProducts() {
    return products.filter(p => p.isFeatured);
}

function getNewProducts() {
    return products.filter(p => p.isNew);
}

function getRelatedProducts(productId, limit = 4) {
    const product = getProductById(productId);
    if (!product) return [];
    return products
        .filter(p => p.category === product.category && p.id !== productId)
        .slice(0, limit);
}

function searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return products.filter(p => 
        p.name.toLowerCase().includes(searchTerm) ||
        p.description.toLowerCase().includes(searchTerm) ||
        p.category.toLowerCase().includes(searchTerm)
    );
}

function formatPrice(price) {
    return '$' + price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function calculateDiscount(price, originalPrice) {
    if (!originalPrice) return 0;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        products,
        reviews,
        getProductById,
        getProductsByCategory,
        getFeaturedProducts,
        getNewProducts,
        getRelatedProducts,
        searchProducts,
        formatPrice,
        calculateDiscount
    };
}