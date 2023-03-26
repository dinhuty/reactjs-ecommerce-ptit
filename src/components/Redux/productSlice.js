import { createSlice } from "@reduxjs/toolkit";
import { Axios } from "axios";
const initialState = {
    products: [],
    loading: false,
    pageIndex: 1,
    pageSize: 5,
    totalPage: 1
}
// export const getProdData = () => dispatch => {
//     dispatch(getProductRequest());
//     Axios.get('https://localhost:7164/api/Products/GetProduct', {
//         params: {
//           PageIndex: 1,
//           PageSize: 3
//         }      
//       })
//         .then(res => {
//             dispatch(getProduct(res.data.products));
//             console.log(res.data.products)
//         })
//         .catch(err => {
//             console.log(err)
//         });
// };
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
        getTotalPage(state,action){
            state.totalPage = action.payload
        }

    },
});
export const { getProductRequest, getProduct, getTotalPage } = productSlice.actions;
export default productSlice.reducer;