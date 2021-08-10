import axios from 'axios'

const baseURL = 'http://localhost:4000/api/bike';

export const ApiService = {
    getAllBikes: () => {
        return axios.get(baseURL);
    },

    getRentTime: () => {
        return axios.get(baseURL + '/time');
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