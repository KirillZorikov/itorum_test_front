import axios from "axios";
import authHeader from "../auth-header";
import {constants} from '../../constants'

const API_URL = constants.API_URL;

class CustomerUserService {

    async getListCustomers() {
        return await axios.get(API_URL + `customers`, {
            headers: authHeader(),
        });
    }

}

export default new CustomerUserService();