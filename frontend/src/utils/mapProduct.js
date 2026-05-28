/**
 * Map backend product document to UI-friendly shape used across the app.
 */
export function mapProduct(product) {
  if (!product) return null

  const id = String(product._id ?? product.id ?? '')
  const image = product.image ?? product.thumbnail ?? 'https://via.placeholder.com/300'

  return {
    id,
    _id: product._id ?? id,
    title: product.name ?? product.title ?? 'Untitled',
    name: product.name ?? product.title ?? 'Untitled',
    price: Number(product.price) || 0,
    description: product.description ?? '',
    thumbnail: image,
    image,
    category: product.category ?? 'General',
    stock: product.stockQuantity ?? product.stock ?? 0,
    stockQuantity: product.stockQuantity ?? product.stock ?? 0,
    brand: product.brand ?? product.category ?? 'ShoppyGlobe',
    rating: product.rating ?? 0,
    discountPercentage: product.discountPercentage ?? 0,
    images: product.images?.length ? product.images : [image],
    returnPolicy: product.returnPolicy ?? '30-day return policy',
    shippingInformation:
      product.shippingInformation ?? 'Free shipping on orders over $50',
    warrantyInformation: product.warrantyInformation ?? '',
  }
}

export function mapProducts(products) {
  return (products ?? []).map(mapProduct).filter(Boolean)
}
