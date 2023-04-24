import { createStore, useStore as vueXUseStore } from "vuex";
import { pedido } from './modules/pedido'

export const store = createStore({
    state: {
        status:{
            id: 0,
            tipo:"",
            cor:""
        },
        pedido: {
            pedidos: [],
            pedidoId: 0,
            updatePedidoPorId: {}
        },
    },
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        pedido,
        status
    }
})

export default function useStore(){
    return vueXUseStore();
}