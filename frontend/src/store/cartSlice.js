import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api, { isAuthenticated } from '../config/api.js'
import { cartStateFromApi } from '../utils/cartState.js'
import { mapProduct } from '../utils/mapProduct.js'

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
  loading: false,
  error: null,
}

function applyLocalAdd(state, product) {
  const id = String(product.id)
  const existingItem = state.items.find((item) => item.id === id)

  if (existingItem) {
    existingItem.quantity++
    existingItem.totalPrice = existingItem.quantity * existingItem.price
  } else {
    state.items.push({
      id,
      title: product.title,
      price: product.price,
      quantity: 1,
      totalPrice: product.price,
      thumbnail: product.thumbnail,
    })
  }

  state.totalQuantity++
  state.totalAmount += product.price
}

export const loadCart = createAsyncThunk(
  'cart/load',
  async (_, { rejectWithValue }) => {
    if (!isAuthenticated()) return null

    try {
      const { data } = await api.get('/cart')
      return cartStateFromApi(data.data)
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to load cart'
      )
    }
  }
)

/** After login at checkout, push guest cart items to the server cart */
export const mergeGuestCartOnLogin = createAsyncThunk(
  'cart/mergeGuest',
  async (_, { getState, rejectWithValue }) => {
    if (!isAuthenticated()) return null

    const guestItems = getState().cart.items
    try {
      for (const item of guestItems) {
        await api.post('/cart', {
          productId: item.id,
          quantity: item.quantity,
        })
      }

      const { data } = await api.get('/cart')
      return cartStateFromApi(data.data)
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to sync cart'
      )
    }
  }
)

export const addToCartAsync = createAsyncThunk(
  'cart/add',
  async (product, { rejectWithValue }) => {
    const mapped = mapProduct(product)

    if (!isAuthenticated()) {
      return { mode: 'local', product: mapped }
    }

    try {
      const { data } = await api.post('/cart', {
        productId: mapped.id,
        quantity: 1,
      })
      return { mode: 'server', ...cartStateFromApi(data.data) }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to add to cart'
      )
    }
  }
)

export const updateCartItemAsync = createAsyncThunk(
  'cart/update',
  async ({ productId, quantity }, { rejectWithValue }) => {
    if (!isAuthenticated()) {
      return { mode: 'local', productId: String(productId), quantity }
    }

    try {
      const { data } = await api.put(`/cart/${productId}`, { quantity })
      return { mode: 'server', ...cartStateFromApi(data.data) }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to update cart'
      )
    }
  }
)

export const removeFromCartAsync = createAsyncThunk(
  'cart/remove',
  async (productId, { rejectWithValue }) => {
    if (!isAuthenticated()) {
      return { mode: 'local', productId: String(productId) }
    }

    try {
      const { data } = await api.delete(`/cart/${productId}`)
      return { mode: 'server', ...cartStateFromApi(data.data) }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to remove item'
      )
    }
  }
)

export const clearCartAsync = createAsyncThunk(
  'cart/clear',
  async (_, { rejectWithValue }) => {
    if (!isAuthenticated()) {
      return { mode: 'local' }
    }

    try {
      await api.delete('/cart')
      return { mode: 'server', items: [], totalQuantity: 0, totalAmount: 0 }
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || 'Failed to clear cart'
      )
    }
  }
)

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCartLocal: (state, action) => {
      applyLocalAdd(state, action.payload)
    },

    removeFromCartLocal: (state, action) => {
      const id = String(action.payload)
      const existingItem = state.items.find((item) => item.id === id)

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity
        state.totalAmount -= existingItem.totalPrice
        state.items = state.items.filter((item) => item.id !== id)
      }
    },

    increaseQuantityLocal: (state, action) => {
      const id = String(action.payload)
      const existingItem = state.items.find((item) => item.id === id)

      if (existingItem) {
        existingItem.quantity++
        existingItem.totalPrice = existingItem.quantity * existingItem.price
        state.totalQuantity++
        state.totalAmount += existingItem.price
      }
    },

    decreaseQuantityLocal: (state, action) => {
      const id = String(action.payload)
      const existingItem = state.items.find((item) => item.id === id)

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--
        existingItem.totalPrice = existingItem.quantity * existingItem.price
        state.totalQuantity--
        state.totalAmount -= existingItem.price
      }
    },

    setCartFromServer: (state, action) => {
      Object.assign(state, action.payload)
    },
  },
  extraReducers: (builder) => {
    const setPending = (state) => {
      state.loading = true
      state.error = null
    }
    const setRejected = (state, action) => {
      state.loading = false
      state.error = action.payload
    }

    builder
      .addCase(loadCart.pending, setPending)
      .addCase(loadCart.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload) {
          Object.assign(state, action.payload)
        }
      })
      .addCase(loadCart.rejected, setRejected)

      .addCase(mergeGuestCartOnLogin.pending, setPending)
      .addCase(mergeGuestCartOnLogin.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload) {
          Object.assign(state, action.payload)
        }
      })
      .addCase(mergeGuestCartOnLogin.rejected, setRejected)

      .addCase(addToCartAsync.pending, setPending)
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload.mode === 'server') {
          const { items, totalQuantity, totalAmount } = action.payload
          state.items = items
          state.totalQuantity = totalQuantity
          state.totalAmount = totalAmount
        } else {
          applyLocalAdd(state, action.payload.product)
        }
      })
      .addCase(addToCartAsync.rejected, setRejected)

      .addCase(updateCartItemAsync.pending, setPending)
      .addCase(updateCartItemAsync.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload.mode === 'server') {
          const { items, totalQuantity, totalAmount } = action.payload
          state.items = items
          state.totalQuantity = totalQuantity
          state.totalAmount = totalAmount
        } else {
          const { productId, quantity } = action.payload
          const item = state.items.find((i) => i.id === productId)
          if (!item) return

          const diff = quantity - item.quantity
          item.quantity = quantity
          item.totalPrice = quantity * item.price
          state.totalQuantity += diff
          state.totalAmount += diff * item.price
        }
      })
      .addCase(updateCartItemAsync.rejected, setRejected)

      .addCase(removeFromCartAsync.pending, setPending)
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload.mode === 'server') {
          const { items, totalQuantity, totalAmount } = action.payload
          state.items = items
          state.totalQuantity = totalQuantity
          state.totalAmount = totalAmount
        } else {
          const id = action.payload.productId
          const existingItem = state.items.find((item) => item.id === id)
          if (existingItem) {
            state.totalQuantity -= existingItem.quantity
            state.totalAmount -= existingItem.totalPrice
            state.items = state.items.filter((item) => item.id !== id)
          }
        }
      })
      .addCase(removeFromCartAsync.rejected, setRejected)

      .addCase(clearCartAsync.pending, setPending)
      .addCase(clearCartAsync.fulfilled, (state) => {
        state.loading = false
        state.items = []
        state.totalQuantity = 0
        state.totalAmount = 0
      })
      .addCase(clearCartAsync.rejected, setRejected)
  },
})

export const {
  addToCartLocal,
  removeFromCartLocal,
  increaseQuantityLocal,
  decreaseQuantityLocal,
  setCartFromServer,
} = cartSlice.actions

export const selectCartItems = (state) => state.cart.items
export const selectTotalQuantity = (state) => state.cart.totalQuantity
export const selectTotalAmount = (state) => state.cart.totalAmount
export const selectCartLoading = (state) => state.cart.loading
export const selectCartError = (state) => state.cart.error

export default cartSlice.reducer
