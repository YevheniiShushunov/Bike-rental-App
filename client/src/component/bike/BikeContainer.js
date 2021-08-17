import React from 'react';
import { AddBike } from "./AddBike";
import { useState, useEffect } from 'react';
import { RequestState } from '../rectypes/RequestState';
import { ApiService } from '../api/Api';
import { Awailable } from "../awailable/Awailable";
import { Rent } from "../rent/Rent";
import { Preloader } from '../preloader/Preloader';

export const BikeContainer = () => {
    const [rsList, setRsList] = useState({
        list: RequestState.none,
        rsPost: RequestState.none,
        getTime: RequestState.none,
        rsUpdate: RequestState.none,
        rsDelete: RequestState.none,
    });
    const [bikes, setBikes] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [type, setType] = useState('Custom');
    const [rentTime, setRentTime] = useState([])
    const bikeType = ["Custom", "Road", "Mountain", "Hybrid", "City", "Electric"]
    

    const requestBikeList = async (bike) => {
        if (rsList.list !== RequestState.request) {
            try {
                setRsList({...rsList, list:RequestState.request});
                const response = await ApiService.getAllBikes(bike);
                setBikes(response.data.rows);
                getRentTimer();
                setRsList({...rsList, list:RequestState.succes });
            } catch (e) {
                setRsList({...rsList, list:RequestState.failure});
            }
        }
    }

    const postBike = async () => {
        if (rsList.rsPost !== RequestState.request) {
            try {
                setRsList({...rsList, rsPost:RequestState.request});
                await ApiService.addBike(name, type, price);
                setName('');
                setPrice('');
                setRsList({...rsList, rsPost:RequestState.succes});
                await requestBikeList();
            } catch (e) {
                setRsList({...rsList, rsPost: RequestState.failure});
            }
            
        }
    }

    const deleteBike = async (id) => {
        if (rsList.rsDelete !== RequestState.request) {
            try {
                setRsList({...rsList, rsDelete:RequestState.request});
                await ApiService.deleteBike(id)
                setRsList({...rsList, rsDelete:RequestState.succes});
                await requestBikeList();
            } catch (e) {
                setRsList({...rsList, rsDelete: RequestState.failure});
            }
        }
    }

    const updateRentBike = async (id) => {
        if (rsList.rsUpdate !== RequestState.request) {
            try {
                setRsList({...rsList, rsUpdate: RequestState.request});
                await ApiService.updateRentStatus(id)
                setRsList({...rsList, rsUpdate: RequestState.succes});
                await requestBikeList();
            } catch (e) {
                setRsList({...rsList, rsUpdate: RequestState.failure});
            }
        }
    }

    const getRentTimer = async (time) => {
        if (rsList.rsGetTime !== RequestState.request) {
            try {
                setRsList({...rsList, rsGetTime: RequestState.request});
                const response = await ApiService.getRentTime(time);
                setRentTime(response.data.rows);
                
                setRsList({...rsList, rsGetTime: RequestState.succes});
            } catch(e) {
                setRsList({...rsList, rsGetTime: RequestState.failure})
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
            <Preloader inProgress={rsList.rsUpdate === RequestState.request}>
                <Rent
                   bikes={bikes}
                   onRent={updateRentBike} />
            </Preloader>
            <Preloader inProgress={rsList.rsDelete === RequestState.request && rsList.rsUpdate === RequestState.request}>
                <Awailable 
                    bikes={bikes} 
                    onDelete={deleteBike}
                    onRent={updateRentBike} />
            </Preloader>
        </>
    )
}

