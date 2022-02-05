import axios from 'axios';

axios.interceptors.request.use((req) => {
    const token = window.localStorage.getItem('token')
    if (token) {
        req.headers = {'x-access-token': token}
    }
    return req
})


const authUser = (url, obj) => {
    return axios.post(url, obj)
}

const getItems = (url) => {
    return axios.get(url)
}

const getById = (url, id) => {
    return axios.get(`${url}/${id}`)
}

const addItem = (url, obj) => {
    return axios.post(url, obj)
}

const updateItem = (url, id, obj) => {
    return axios.put(`${url}/${id}`, obj)
}

const deleteItem = (url, id) => {
    return axios.delete(`${url}/${id}`)
}

export default {authUser, getItems, getById, updateItem,addItem,deleteItem}