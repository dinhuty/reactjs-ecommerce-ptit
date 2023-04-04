import { createSlice } from "@reduxjs/toolkit";

const cart = JSON.parse(localStorage.getItem('cart'))
const initialState = cart ? cart : []

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        add: (state, action) => {
            function check_arr(element, arr) {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].product.id == element.id) {
                        return i
                    }
                }
                return -1
            }

            function check_size(size, arr) {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].size === size) {
                        return i
                    }
                }
                return -1
            }

            if (state.length === 0) {
                state.push({ product: action.payload.product, quality: 1, size: action.payload.sizeChoose })
            }
            else {
                if (check_arr(action.payload.product, state) < 0) {
                    state.push({ product: action.payload.product, quality: 1, size: action.payload.sizeChoose })

                    // if (check_size(action.payload.size, action.payload) < 0) {
                    //     state.push({ product: action.payload.product, quality: 1, size: action.payload.size })
                    // }
                    // else{
                    //     state[check_size(action.payload.product, state)].quality += 1
                    // }
                } else {
                    if (check_size(action.payload.sizeChoose, state) < 0) {
                        state.push({ product: action.payload.product, quality: 1, size: action.payload.sizeChoose })
                    }
                    else{
                        state[check_size(action.payload.sizeChoose, state)].quality += 1
                    }
                    // state[check_arr(action.payload.product, state)].quality += 1

                }
            }
            localStorage.setItem('cart', JSON.stringify(state))
        },
        reduce: (state, action) => {
            function check_arr(element, arr) {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].product.id == element.id) {
                        return i
                    }
                }
                return -1
            }
            let index = check_arr(action.payload, state)
            state[index].quality -= 1
            localStorage.setItem('cart', JSON.stringify(state))

        },
        remove: (state, action) => {
            state = state.filter((item) => item.product.id !== action.payload);
            localStorage.setItem('cart', JSON.stringify(state))
            return state

        },
        clearcart: (state, action) => {
            state = []
            return state
        }
    },
});
export const { add, remove, reduce, clearcart } = cartSlice.actions;
export default cartSlice.reducer;
