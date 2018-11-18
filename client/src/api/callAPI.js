import axios from 'axios';
import * as configs from '../constants/configs';


let callAPI = async (endpoint, method = 'GET', data) => {
    let dataAPI = null;
    try {
        dataAPI = await axios({
            method,
            url: `${configs.Url}/${endpoint}`,
            data,
        });
    } catch(e) {
        console.log(e);
    }
    
    return dataAPI;
}

export {callAPI}