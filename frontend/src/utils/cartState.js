import { mapProduct } from './mapProduct'

export function cartStateFromApi(apiData) {
  const cart = apiData?.cart
  if (!cart?.items) {
    return { items: [], totalQuantity: 0, totalAmount: 0 }
  }

  const items = cart.items
    .filter((item) => item.product)
    .map((item) => {
      const product = mapProduct(item.product)
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        quantity: item.quantity,
        totalPrice: item.quantity * product.price,
        thumbnail: product.thumbnail,
      }
    })

  const totalQuantity = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalAmount =
    apiData.total ?? items.reduce((sum, item) => sum + item.totalPrice, 0)

  return { items, totalQuantity, totalAmount }
}
