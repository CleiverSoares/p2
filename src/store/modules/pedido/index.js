import services from "@/services";
import { store } from "@/store";
import {
  CREATE_PEDIDO,
  DELETE_PEDIDO,
  GET_PEDIDOS,
  GET_PEDIDO_POR_ID,
  UPDATE_PEDIDO,
  UPLOAD_DATA_PEDIDO,
  SAVE_PEDIDO_ID,
  GET_STATUS,
  UPDATE_STATUS,
} from "@/store/type-actions";
import {
  ADD_PEDIDO,
  CHANGE_PEDIDO,
  CHANGE_DATA_PEDIDO,
  SET_PEDIDOS,
  VALUE_PEDIDO,
  REMOVE_PEDIDO,
  SET_PEDIDO_POR_ID,
  SET_PEDIDO_ID,
  SET_STATUS,
  CHANGE_STATUS,
} from "@/store/type-mutations";

export const pedido = {
  mutations: {
    [SET_PEDIDOS](state, pedidos) {
      state.pedidos = pedidos;
    },
    [SET_STATUS](state, status) {
      state.status = status;
    },
    [SET_PEDIDO_POR_ID](state, pedido) {
      state.updatePedidoPorId = pedido;
    },
    [ADD_PEDIDO](state, pedido) {
      state.pedidos.push(pedido);
    },
    [CHANGE_PEDIDO](state, pedido) {
      const index = state.pedidos.findIndex((p) => p.id === pedido.id);
      state.pedidos[index] = pedido;
    },
    [CHANGE_DATA_PEDIDO](state, pedido) {
      state.updatePedido = pedido;
    },
    [REMOVE_PEDIDO](state, id) {
      state.pedidos = state.pedidos.filter((p) => p.id != id);
    },
    [SET_PEDIDO_ID](state, id) {
      state.pedidoId = id;
    },
  },
  actions: {
    async [GET_PEDIDOS]({ commit }) {
      try {
        let url = "/pedido";
        const { data } = await services.pedidos.getPedidos(url);
        commit(SET_PEDIDOS, data);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async [GET_STATUS]({ commit }) {
      try {
        let url = "/status";
        const { data } = await services.pedidos.getStatus(url);
        commit(SET_STATUS, data);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async [GET_PEDIDO_POR_ID]({ commit }, idPedido) {
      try {
        const { data } = await services.pedidos.getPedidoPorId(idPedido);
        commit(SET_PEDIDO_POR_ID, data);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async [CREATE_PEDIDO]({ commit }, pedido) {
      try {
        const { data } = await services.pedidos.createPedido(pedido)
        store.dispatch(SAVE_PEDIDO_ID, data.id);
        commit(SET_PEDIDO_ID, data.id)
        store.dispatch(GET_PEDIDOS);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async [UPDATE_PEDIDO]({ commit }, pedido) {
      try {
        const { data } = await services.pedidos.updatePedido(pedido);

        commit(CHANGE_PEDIDO, data);

        return data;
      } catch (error) {
        console.log(error);
      }
    },
    async [UPDATE_STATUS]({ commit }, status) {
      try {
        const { data } = await services.pedidos.updatePedido(status);

        commit(CHANGE_STATUS, data);

        return data;
      } catch (error) {
        console.log(error);
      }
    },
    [UPLOAD_DATA_PEDIDO]({ commit }, pedido) {
      commit(CHANGE_DATA_PEDIDO, pedido);
    },
    async [DELETE_PEDIDO]({ commit }, id) {
      try {
        await services.pedidos.deletePedido(id);
        commit(REMOVE_PEDIDO, id);
      } catch (error) {
        console.log(error);
      }
    },
    [SAVE_PEDIDO_ID]({ commit }, id) {
      commit(SET_PEDIDO_ID, id);
    },
  },
  getters: {
    [VALUE_PEDIDO](state) {
      return state.pedidos;
    },
  },
};
