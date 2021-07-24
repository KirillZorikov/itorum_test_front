import axios from "axios";
import {constants} from '../../constants'

const API_URL = constants.API_URL;

class OrderService {

    async getListOrdersByWeek(week_number) {
        return await axios.post(API_URL + `orders/open_list`, {
            week_number: week_number
        });
    }

}

export default new OrderService();