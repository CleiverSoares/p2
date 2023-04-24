import axios from "axios";
import PedidoService from "./pedidos"

export const httpClient = axios.create({
    baseURL: "http://localhost:3000",
    headers: {
        'Content-Type': 'application/json'
    }
});
export default {
    pedidos: PedidoService(httpClient)
}