import {createStore} from 'vuex'
import {auth} from './auth.module';


export const store = createStore({
    modules: {
        auth
    },
    state: {
        page: 1,
        orders: []
    },
    getters: {
        getPage: state => {
            return state.page
        },
        getOrders: state => {
            return state.orders
        }
    },
    mutations: {
        changePage(state, newPage) {
            state.page = newPage
        },
        changeOrders(state, newOrders) {
            state.orders = newOrders
        }
    }
})
