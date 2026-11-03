const BASE_URL = 'https://dummyjson.com/products';

/**
 * Fetch list of products from DummyJSON API.
 * Uses limit=100 to ensure a rich catalog with all categories.
 */
export async function fetchProducts(limit = 100) {
  const url = `${BASE_URL}?limit=${limit}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
  }
  
  const data = await response.json();
  if (!data || !Array.isArray(data.products)) {
    throw new Error('Invalid products response structure from API');
  }
  
  return data.products;
}

/**
 * Fetch a single product by ID from DummyJSON API.
 */
export async function fetchProductById(id) {
  if (!id) {
    throw new Error('Product ID is required');
  }
  
  const response = await fetch(`${BASE_URL}/${id}`);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch product details: ${response.status} ${response.statusText}`);
  }
  
  const product = await response.json();
  return product;
}

/**
 * Calculate original price before discount.
 * Original Price = Price / (1 - (discountPercentage / 100))
 */
export function calculateOriginalPrice(price, discountPercentage) {
  if (!price || !discountPercentage || discountPercentage <= 0) return null;
  const original = price / (1 - discountPercentage / 100);
  return Number(original.toFixed(2));
}

/**
 * Format currency in USD ($X.XX).
 */
export function formatCurrency(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return '$0.00';
  return `$${Number(amount).toFixed(2)}`;
}
