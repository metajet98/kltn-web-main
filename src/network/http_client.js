import { useHistory } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import { toast } from 'react-toastify';
import { BASE_URL, timeout } from 'src/config/config';
import LocalStorage from 'src/storage/local_storage';

const axios = require('axios');

var instance = axios.create();

instance.defaults.timeout = timeout;
instance.defaults.baseURL = BASE_URL;

instance.interceptors.request.use(function (config) {
    console.log("REQUEST:", config);
    var token = LocalStorage.getAccessToken();
    if (token != null) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(function (response) {
    console.log("RESPONSE", response);
    if(response.data.message != null) {
        toast.info(response.data.message);
    }
    return response;
}, function (error) {
    console.log("ERROR", error);
    if(error.response) {
        if(error.response?.status === 500) {
            toast.error("Server lỗi khi thực hiện, vui lòng thử lại!");
            return;
        }
        if(error.response?.data?.message) {
            toast.error(error.response.data.message);
            return;
        }
        const originalRequest = error.config;
    
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            return axios.post(`${BASE_URL}api/token/refresh`,{ "refreshToken": LocalStorage.getRefreshToken() })
                .then(res => {
                    if (res.status === 200) {
                        LocalStorage.setToken(res.data);
                        instance.defaults.headers.common['Authorization'] = 'Bearer ' + LocalStorage.getAccessToken();
                        return instance(originalRequest);
                    }
                })
                .catch(err => {
                    LocalStorage.clear();
                    createBrowserHistory().push(`/#/login`);
                    window.location.reload();
                    toast.error("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại!");
                });
        }
    } else if(error.request) {
        toast.error("Không thể kết nối đến server, vui lòng kiểm tra lại mạng");
        return;
    } else {
        toast.error(error);
        return;
    }
    
});

export default instance