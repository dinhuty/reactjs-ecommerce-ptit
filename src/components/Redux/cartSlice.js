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

            if (state.length === 0) {
                state.push({ product: action.payload, quality: 1 })
            }
            else {
                if (check_arr(action.payload, state) < 0) {
                    state.push({ product: action.payload, quality: 1 })
                } else {
                    state[check_arr(action.payload, state)].quality += 1

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
