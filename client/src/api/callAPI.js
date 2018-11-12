import axios from 'axios';
import * as configs from '../constants/configs';


let callQuestionAPI = async (endpoint, method = 'GET', data) => {
    let questionAPI = null;
    try {
        questionAPI = await axios({
            method,
            url: `${configs.Url}/${endpoint}`,
            data,
        });
    } catch(e) {
        console.log(e);
    }
    
    return questionAPI;
}

export {callQuestionAPI};