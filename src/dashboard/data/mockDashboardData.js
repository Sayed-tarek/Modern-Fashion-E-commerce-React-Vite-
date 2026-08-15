// src/dashboard/data/mockDashboardData.js

export const initialStatsData = {
  totalRevenue: 128450.00,
  revenueChange: +14.2,
  totalOrders: 1420,
  ordersChange: +8.5,
  totalCustomers: 3890,
  customersChange: +12.1,
  totalProducts: 456,
  productsChange: +4.3,
  conversionRate: 3.42,
  averageOrderValue: 90.45
};

export const initialRevenueChartData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Revenue 2026 ($)",
      data: [12400, 14200, 11800, 16500, 19800, 22400, 21000, 25600, 24000, 28900, 31200, 34500],
      borderColor: "#515546",
      backgroundColor: "rgba(81, 85, 70, 0.12)",
      fill: true,
      tension: 0.4
    },
    {
      label: "Revenue 2025 ($)",
      data: [9800, 11000, 10200, 13000, 15400, 17200, 16800, 19500, 18900, 22000, 24100, 27000],
      borderColor: "#969A8E",
      backgroundColor: "rgba(150, 154, 142, 0.05)",
      fill: true,
      tension: 0.4
    }
  ]
};

export const initialCategoryDistribution = {
  labels: ["Men's Wear", "Women's Fashion", "Footwear", "Accessories", "Activewear"],
  datasets: [
    {
      data: [35, 40, 12, 8, 5],
      backgroundColor: ["#515546", "#EBB437", "#86A17B", "#DC6860", "#6C757D"],
      hoverOffset: 6
    }
  ]
};

export const initialLowStockProducts = [
  { id: 101, name: "Urban Dark Olive Parka", sku: "JKT-OLV-001", stock: 3, price: 189.99, image: "https://images.unsplash.com/photo-1544441893-675973e31985?w=150&auto=format&fit=crop&q=80" },
  { id: 102, name: "Minimalist Leather Sneakers", sku: "FTW-SNK-022", stock: 2, price: 129.50, image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=150&auto=format&fit=crop&q=80" },
  { id: 103, name: "Classic Cotton Polo - Charcoal", sku: "TSH-POL-044", stock: 5, price: 49.00, image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=150&auto=format&fit=crop&q=80" },
  { id: 104, name: "Silk Blend Tailored Blazer", sku: "BLZ-SLK-019", stock: 1, price: 245.00, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=150&auto=format&fit=crop&q=80" }
];

export const initialRecentOrders = [
  { id: "ORD-9482", customer: "Sophia Martinez", email: "sophia.m@example.com", date: "2026-08-15", total: 249.90, items: 3, status: "Delivered", paymentMethod: "Credit Card" },
  { id: "ORD-9481", customer: "Alex Mercer", email: "alex.m@example.com", date: "2026-08-15", total: 129.00, items: 1, status: "Processing", paymentMethod: "PayPal" },
  { id: "ORD-9480", customer: "Emma Watson", email: "emma.w@example.com", date: "2026-08-14", total: 385.50, items: 4, status: "Shipped", paymentMethod: "Apple Pay" },
  { id: "ORD-9479", customer: "David Chen", email: "d.chen@example.com", date: "2026-08-14", total: 89.00, items: 2, status: "Pending", paymentMethod: "Credit Card" },
  { id: "ORD-9478", customer: "Olivia Brown", email: "olivia.b@example.com", date: "2026-08-13", total: 175.20, items: 2, status: "Delivered", paymentMethod: "Store Credit" },
  { id: "ORD-9477", customer: "Liam Johnson", email: "liam.j@example.com", date: "2026-08-13", total: 420.00, items: 5, status: "Cancelled", paymentMethod: "Credit Card" }
];

export const initialRecentCustomers = [
  { id: 1, name: "Sophia Martinez", email: "sophia.m@example.com", spent: 1450.00, ordersCount: 8, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80", status: "VIP" },
  { id: 2, name: "Alex Mercer", email: "alex.m@example.com", spent: 890.50, ordersCount: 5, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80", status: "Regular" },
  { id: 3, name: "Emma Watson", email: "emma.w@example.com", spent: 2310.00, ordersCount: 12, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80", status: "VIP" },
  { id: 4, name: "David Chen", email: "d.chen@example.com", spent: 340.00, ordersCount: 2, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80", status: "New" },
  { id: 5, name: "Olivia Brown", email: "olivia.b@example.com", spent: 675.00, ordersCount: 4, avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&auto=format&fit=crop&q=80", status: "Regular" }
];

export const initialCategories = [
  { id: 1, name: "Men's Wear", slug: "mens-wear", count: 142, icon: "👔", description: "Shirts, jackets, trousers, and tailored suits", status: "Active" },
  { id: 2, name: "Women's Fashion", slug: "womens-fashion", count: 188, icon: "👗", description: "Dresses, blouses, skirts, and premium outerwear", status: "Active" },
  { id: 3, name: "Footwear", slug: "footwear", count: 64, icon: "👟", description: "Sneakers, boots, formal shoes, and loafers", status: "Active" },
  { id: 4, name: "Accessories", slug: "accessories", count: 48, icon: "👜", description: "Bags, belts, sunglasses, and leather goods", status: "Active" },
  { id: 5, name: "Activewear", slug: "activewear", count: 35, icon: "🧘‍♀️", description: "Athletic wear, hoodies, joggers, and performance gear", status: "Active" },
  { id: 6, name: "Winter Collection", slug: "winter-collection", count: 29, icon: "🧥", description: "Heavy coats, wool scarves, and insulated jackets", status: "Scheduled" }
];

export const initialReviews = [
  { id: 1, customer: "Sarah K.", rating: 5, comment: "The quality of the Dark Olive Parka is unmatched. Warm, waterproof, and extremely stylish!", product: "Urban Dark Olive Parka", date: "2026-08-14", status: "Approved", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80" },
  { id: 2, customer: "Marcus V.", rating: 4, comment: "Fits true to size. Leather is premium soft and comfortable all day.", product: "Minimalist Leather Sneakers", date: "2026-08-13", status: "Approved", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&auto=format&fit=crop&q=80" },
  { id: 3, customer: "Elena R.", rating: 5, comment: "Fast shipping and luxury packaging. Very impressed with the customer service.", product: "Silk Blend Tailored Blazer", date: "2026-08-11", status: "Approved", avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=100&auto=format&fit=crop&q=80" },
  { id: 4, customer: "James H.", rating: 2, comment: "Delivery took longer than expected, but the product is fine.", product: "Classic Cotton Polo", date: "2026-08-09", status: "Pending", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80" }
];

export const initialCoupons = [
  { id: 1, code: "SUMMER20", discount: "20% OFF", type: "Percentage", value: 20, minSpend: 100, usageLimit: 500, usedCount: 312, expiry: "2026-08-31", status: "Active" },
  { id: 2, code: "WELCOME50", discount: "$50.00 OFF", type: "Fixed Amount", value: 50, minSpend: 250, usageLimit: 1000, usedCount: 789, expiry: "2026-12-31", status: "Active" },
  { id: 3, code: "VIPFREESHIP", discount: "Free Shipping", type: "Free Shipping", value: 0, minSpend: 50, usageLimit: 200, usedCount: 198, expiry: "2026-09-15", status: "Active" },
  { id: 4, code: "AUTUMN15", discount: "15% OFF", type: "Percentage", value: 15, minSpend: 80, usageLimit: 300, usedCount: 0, expiry: "2026-10-01", status: "Scheduled" },
  { id: 5, code: "FLASH30", discount: "30% OFF", type: "Percentage", value: 30, minSpend: 150, usageLimit: 100, usedCount: 100, expiry: "2026-07-31", status: "Expired" }
];

export const initialMessages = [
  { id: 1, sender: "Sophia Martinez", email: "sophia.m@example.com", subject: "Inquiry about size exchange for order ORD-9482", date: "10 min ago", unread: true, priority: "High", body: "Hi support team, I received my order today and love the jacket, but I would like to exchange it for a size Medium. Could you guide me through the return process?" },
  { id: 2, sender: "Daniel Vance", email: "d.vance@example.com", subject: "Wholesale inquiry for Autumn collection", date: "2 hours ago", unread: true, priority: "Medium", body: "Hello, we operate a boutique store in Chicago and are interested in carrying your leather sneakers line. Please send over your wholesale catalogue." },
  { id: 3, sender: "Clara Oswald", email: "clara.o@example.com", subject: "Shipping tracking update request", date: "1 day ago", unread: false, priority: "Normal", body: "Thank you for the update on my order. Is tracking available for international express shipping?" }
];

export const initialNotifications = [
  { id: 1, title: "New Order Received", description: "Order ORD-9482 placed by Sophia Martinez ($249.90)", time: "5m ago", unread: true, icon: "🛍️" },
  { id: 2, title: "Low Stock Alert", description: "Silk Blend Tailored Blazer has only 1 item remaining in stock.", time: "42m ago", unread: true, icon: "⚠️" },
  { id: 3, title: "Payout Processed", description: "$12,450.00 payout was transferred to your connected bank account.", time: "3h ago", unread: false, icon: "💳" },
  { id: 4, title: "New 5-Star Review", description: "Sarah K. posted a review on Urban Dark Olive Parka", time: "1d ago", unread: false, icon: "⭐" }
];

export const initialAdminProfile = {
  name: "Said Al-Rashid",
  role: "Super Admin",
  email: "admin@aerostep.com",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  phone: "+1 (555) 234-5678",
  location: "Dubai, UAE / New York, USA",
  bio: "Head of Operations & Digital E-Commerce Store Lead at AERO STEP Fashion House.",
  twoFactorEnabled: true,
  lastLogin: "2026-08-15 21:40 GMT"
};
