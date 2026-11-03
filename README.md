# ShopKart — Minimal Luxury E-Commerce Technical Assessment

A complete, fully functional, responsive e-commerce web application designed with a **minimal luxury aesthetic** and **modern editorial shopping experience**, inspired by the clean usability and information hierarchy of **Amazon** and **Flipkart**.

Built with **React 19**, **Vite 8**, **Tailwind CSS v4**, and **React Router DOM v7**, powered dynamically by the **DummyJSON Products API**.

---

## 🎨 Aesthetic Design System & Palette

- **Warm Ivory (`#F7F5F0`)**: Page canvas and soft card backgrounds.
- **Pure White (`#FFFFFF`)**: Elevated card surfaces and product staging.
- **Charcoal (`#202522`)**: Deep luxury text, navigation wordmark, and primary actions.
- **Sage Green (`#78917E`)**: Refined accent badges, ratings, and active category pills.
- **Soft Beige (`#D8C8B5`)**: Subtle borders, dividers, and understated metadata chips.
- **Typography**: Dual hierarchy combining modern geometric sans (**Plus Jakarta Sans**) and editorial serif headings (**Playfair Display**).

---

## 🌟 Key Features

### 1. Dynamic API Integration
- **Zero hardcoding**: All products, categories, images, prices, brands, stock statuses, dimensions, and reviews are fetched dynamically.
- **Product Listing Endpoint**: `https://dummyjson.com/products`
- **Product Details Endpoint**: `https://dummyjson.com/products/{id}`
- **Original Price Calculation**: Accurately computes original pre-discount price from `price` and `discountPercentage`:
  $$\text{Original Price} = \frac{\text{Price}}{1 - (\text{Discount Percentage} / 100)}$$
- **Loading & Error Handling**:
  - Skeleton loaders for both product listing grid and product details page.
  - User-friendly error messaging with actionable **Retry** button for listing and **Back to Collection** button for details.

### 2. Homepage Architecture
1. **Elegant Navbar**: Minimalist ShopKart wordmark with editorial branding, live search bar, category link, concierge links, and visual bag counter.
2. **Hero Section**: Large editorial hero heading: **"Discover Your Everyday Essentials"** with curated edition eyebrow, value proposition pills, and warm ivory framing.
3. **Stylish Search Bar**: Refined search input with live filtering across title, brand, and category, paired with category and sort selectors.
4. **Category Navigation**: Horizontal pill tags dynamically extracted from the API response with item counts.
5. **Explore Products Section**: Section header with total items counter and active filters indicator.
6. **Premium Product Grid**: Consistent image sizing across 4 columns (desktop), 2-3 columns (tablet), and 1-2 columns (mobile).
7. **Refined Product Cards**: Subtle elevation, gentle image zoom, discount badge, stock status indicator, and elegant "View Details" button.
8. **Luxury Footer**: Deep charcoal background with conscious shipping, authenticity guarantees, and curated department links.

### 3. Comprehensive Product Details Page
- **Breadcrumb Navigation**: `Collection > [Category] > [Product Title]`.
- **Large Image Gallery**: Main display stage with hover zoom and thumbnail rail switcher for all product photos.
- **Key Information**: Title, brand, category, rating, review count, price, strikethrough original price, discount badge, stock status, MOQ, SKU, and prominent "View Product" button.
- **Complete Description**: Dedicated "About this product" section without truncation.
- **Clean Specification Table**: Key-value table displaying SKU, brand, category, price, discount, rating, stock, MOQ, weight, width, height, depth, and availability status.
- **Separate Logistics Cards**: Shipping information, warranty guarantee, return policy, and availability status.
- **Product Tags**: Understated classification chips.
- **Barcode & QR Presentation**: GS1 standard barcode rendering and live digital QR code image from `meta.qrCode`.
- **Verified Customer Reviews**: Real API reviews with star ratings, reviewer name, email, verified customer badge, and formatted dates.
- **Physical Dimensions**: Package metrics (weight, width, height, depth).

---

## 🛠️ Tech Stack

- **Framework**: [React 19](https://react.dev/)
- **Bundler**: [Vite 8](https://vite.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Routing**: [React Router DOM v7](https://reactrouter.com/)
- **Typography**: Playfair Display & Plus Jakarta Sans
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 📂 Project Architecture

```
shopkart/
├── public/
├── src/
│   ├── api/
│   │   └── products.js              # Fetch helpers, price calculations, and formatting
│   ├── components/
│   │   ├── Navbar.jsx               # Responsive header, search bar, and cart
│   │   ├── Breadcrumb.jsx           # Clean navigation breadcrumbs
│   │   ├── SearchBar.jsx            # Search input, category dropdown, sort controls
│   │   ├── ProductCard.jsx          # Listing card with discount, rating, hover zoom
│   │   ├── ProductGrid.jsx          # 4-col responsive grid with empty state
│   │   ├── ProductGallery.jsx       # Main image switcher & thumbnail gallery
│   │   ├── ProductInfo.jsx          # Title, price, stock, actions, assurances
│   │   ├── ProductSpecifications.jsx# Key-value technical specifications table
│   │   ├── ShippingWarranty.jsx     # Shipping, warranty, and return policy cards
│   │   ├── BarcodeCard.jsx          # Barcode representation & QR code image
│   │   ├── ReviewCard.jsx           # Customer reviews with ratings & dates
│   │   ├── Loading.jsx              # Skeleton loaders for grid & details
│   │   ├── ErrorMessage.jsx         # Error alert with Retry & Back buttons
│   │   └── Footer.jsx               # Luxury editorial footer
│   ├── pages/
│   │   ├── Products.jsx             # Main listing page with hero & filters
│   │   └── ProductDetails.jsx       # Full details page
│   ├── App.jsx                      # Router & layout setup
│   ├── index.css                    # Tailwind CSS configuration with @theme
│   └── main.jsx                     # React DOM entrypoint
├── index.html
├── package.json
└── vite.config.js
```

---

## 🚀 Running the Project

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
