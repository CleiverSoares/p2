export default (httpClient) => ({

    getPedidos: async (url) => {
      const response = await httpClient.get(url);
  
      return {
        data: response.data,
      };
    },
    getStatus: async (url) => {
      const response = await httpClient.get(url);
  console.log(response.data,"teste");
      return {
        data: response.data,
      };
    },
    getPedidoPorId: async (id) => {
      const response = await httpClient.get(`/pedido/${id}`);
  
      return {
        data: response.data,
      };
    },
    createPedido: async (pedido) => {
      const response = await httpClient.post("/pedido", pedido);
  
      return {
        data: response.data,
      };
    },
    updatePedido: async (pedido) => {
      const response = await httpClient.put(`/pedido/${pedido.id}`, pedido);
  
      return {
        data: response.data,
      };
    },
    updateStatus: async (status) => {
      const response = await httpClient.put(`/pedido/${pedido.id}`, pedido);
  
      return {
        data: response.data,
      };
    },
    deletePedido: async (id) => {
      await httpClient.delete(`/pedido/${id}`);
    }
  });
  