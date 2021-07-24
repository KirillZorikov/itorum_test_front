import axios from "axios";
import authHeader from "../auth-header";
import {constants} from '../../constants'

const API_URL = constants.API_URL;

class OrderUserService {

    async getListOrders(params) {
        return await axios.get(API_URL + `orders`, {
            headers: authHeader(),
            params: params
        });
    }

    async deleteOrder(id) {
        return await axios.delete(API_URL + `orders/${id}`, {headers: authHeader()});
    }

    async addOrder(data) {
        return await axios.post(API_URL + `orders`, data, {headers: authHeader()});
    }

    async exportOrders() {
        const config = {
            responseType: 'blob',
            headers: authHeader()
        };
        return await axios.post(API_URL + `orders/export`, config);
    }
}

export default new OrderUserService();