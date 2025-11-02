import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Product{
    id: string
    title:string
    description:string
    price:number
}

interface ProductsState {
    items: Product[]
    editingProduct: Product | null
    loading: boolean
    error: string | null
}

const initialState: ProductsState = {
  items: [],
  editingProduct: null,
  loading: false,
  error: null,
}

const API_BASE = 'https://688a101d4c55d5c73954d120.mockapi.io/api/v1/Product'

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const res = await fetch(API_BASE)
        const data = await res.json()
        return data
    }
)

export const createProduct = createAsyncThunk(
  'products/createProduct',
  async (product: Omit<Product, 'id'>) => {
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
    const data = await res.json()
    return data
  }
)

export const deleteProductAsync = createAsyncThunk(
  'products/deleteProduct',
  async (id: string) => {
    await fetch(`${API_BASE}/${id}`, {
      method: 'DELETE',
    })
    return id
  }
)

export const updateProductAsync = createAsyncThunk(
  'products/updateProduct',
  async (product: Product) => {
    const res = await fetch(`${API_BASE}/${product.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    })
    const data = await res.json()
    return data
  }
)

export const productSlice = createSlice({
    name:'products',
    initialState,
    reducers:{
        setEditingProduct: (state, action: PayloadAction<Product>) => {
            state.editingProduct = action.payload
        },
        clearEditingProduct: (state) => {
            state.editingProduct = null
        }
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.loading = false
            state.items = action.payload
         })
         .addCase(fetchProducts.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message || 'Error al cargar los productos'
         })
         .addCase(createProduct.fulfilled, (state, action) => {
            state.items.push(action.payload)
        })
        .addCase(deleteProductAsync.fulfilled, (state, action) => {
            state.items = state.items.filter((p) => p.id !== action.payload)
        })
        .addCase(updateProductAsync.fulfilled, (state, action) => {
            const index = state.items.findIndex((p) => p.id === action.payload.id)
            if (index !== -1) {
                state.items[index] = action.payload
            }
        })
    }
})

export const { setEditingProduct, clearEditingProduct } = productSlice.actions
export default productSlice.reducer