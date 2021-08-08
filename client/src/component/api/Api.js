import axios from 'axios'

const baseURL = 'http://localhost:4000/api/bike';

export const ApiService = {
    getBike: (id) => {
        return axios.get(baseURL/ + id);
    },

    getAllBikes: () => {
        return axios.get(baseURL);
    },

    addBike: (name, type, price) => {
        return axios.post(baseURL, {name, type,price});
    },

    updateRentStatus: (id) => {
        return axios.put(baseURL, {id});
    },

    deleteBike: (id) => {
        return axios.delete(baseURL + '/' + id);
    }
}