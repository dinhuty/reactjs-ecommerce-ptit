import { createSlice } from "@reduxjs/toolkit";
import { Axios } from "axios";
const initialState = {
    products: [],
    loading: false,
    pageIndex: 1,
    pageSize: 5,
    totalPage: 1
}
const productSlice = createSlice({
    name: 'productData',
    initialState,
    reducers: {
        getProductRequest(state, action) {
            state.loading = true
        },
        getProduct(state, action) {
            state.products = action.payload
            state.loading = false
        },
        getTotalPage(state, action) {
            state.totalPage = action.payload
        }

    },
});
export const { getProductRequest, getProduct, getTotalPage } = productSlice.actions;
export default productSlice.reducer;