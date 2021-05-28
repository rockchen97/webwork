import axios from 'axios'





const api = axios.create({
    baseURL: 'http://49.235.98.65:3000',
    timeout: 200000
});
// 60ac920756ae60584bb0b3f3
// 添加请求拦截器
api.interceptors.request.use( config => {
    if (localStorage.getItem('id')) {
        let id = JSON.parse(localStorage.getItem('id')).id;
        console.log(id);
        config.headers.user = id;
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
});



let get = async function (url, data) {
    const response = await api.get(url, {
        params: data
    }).catch( err=> {
        errorhandler(err);
    })
    return response.data;
};
let post = async function (url, data) {
    const response = await api.post(url, data)
    .catch( err=> {
        errorhandler(err);
    })
    return response.data;
};
let put = async function (url, data) {
    const response = await api.put(url, data)
    .catch( err=> {
        errorhandler(err);
    })
    return response.data;
}

let del = async function (url, data) {
    const response = await api.request({data, url, method: 'delete'})
    .catch( err=> {
        errorhandler(err);
    });
    return response.data;
}

// 错误处理公共方法，
function errorhandler (error) {
    console.log('err==>', error);
    console.log('err==>', error.response.data.message);
    alert( error.response.data.message );
}



export {
    get, post, put, del
}