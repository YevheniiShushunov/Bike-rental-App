import { AddBike } from "./AddBike";
import { useState, useEffect } from 'react';
import { RequestState } from '../rectypes/RequestState';
import { ApiService } from '../api/Api';
import { Awailable } from "../awailable/Awailable";
import { Rent } from "../rent/Rent";

export const BikeContainer = () => {
    const [rsList, setRsList] = useState(RequestState.none);
    const [rsPost, setRsPost] = useState(RequestState.none);
    const [rsUpdate, setRsUpdate] = useState([]);
    const [rsDelete, setRsDelete] = useState([]);
    const [bikes, setBikes] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('');
    const bikeType = ["Custom", "Road", "Mountain", "Hybrid", "City", "Electric"]
    

    const requestBikeList = async (bike) => {
        if (rsList !== RequestState.request) {
            try {
                setRsList(RequestState.request);
                const response = await ApiService.getAllBikes(bike);
                setBikes(response.data.rows);
                setRsList(RequestState.succes);
                console.log(response);
            } catch (e) {
                setRsList(RequestState.failure);
            }
        }
    }

    const postBike = async () => {
        if (rsPost !== RequestState.request) {
            try {
                setRsPost(RequestState.request);
                await ApiService.addBike(name, type, price);
                setName('');
                setRsPost(RequestState.succes);
                await requestBikeList();
            } catch (e) {
                setRsPost(RequestState.failure);
            }
            
        }
    }

    const deleteBike = async (id) => {
        if(rsDelete !== RequestState.request) {
            try {
                setRsDelete(RequestState.request);
                await ApiService.deleteBike(id)
                setRsDelete(RequestState.succes);
                await requestBikeList();
            } catch (e) {
                setRsDelete(RequestState.failure);
            }
        }
    }

    const updateRentBike = async (id) => {
        if(rsUpdate !== RequestState.request) {
            try {
                setRsUpdate(RequestState.request);
                await ApiService.updateRentStatus(id)
                setRsUpdate(RequestState.succes);
                await requestBikeList();
            } catch (e) {
                setRsDelete(RequestState.failure);
            }
        }
    }

    useEffect(() => requestBikeList(), []);

    return (
        <>
            <AddBike 
                name={name}
                onPost={postBike}
                onChangeName={setName}
                onChangeType={setType}
                onChangePrice={setPrice}
                bikeType={bikeType}
                price={price} />
            <Rent 
                bikes={bikes}
                onRent={updateRentBike} />
            <Awailable 
                bikes={bikes} 
                onDelete={deleteBike}
                onRent={updateRentBike} />
        </>
    )
}
