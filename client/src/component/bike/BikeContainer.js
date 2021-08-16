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
                setRsList({list:RequestState.request});
                const response = await ApiService.getAllBikes(bike);
                setBikes(response.data.rows);
                getRentTimer();
                setRsList({list:RequestState.succes });
            } catch (e) {
                setRsList({list:RequestState.failure});
            }
        }
    }

    const postBike = async () => {
        if (rsList.rsPost !== RequestState.request) {
            try {
                setRsList({rsPost:RequestState.request});
                await ApiService.addBike(name, type, price);
                setName('');
                setPrice('');
                setRsList({rsPost:RequestState.succes});
                await requestBikeList();
            } catch (e) {
                setRsList({rsPost: RequestState.failure});
            }
            
        }
    }

    const deleteBike = async (id) => {
        if (rsList.rsDelete !== RequestState.request) {
            try {
                setRsList({rsDelete:RequestState.request});
                await ApiService.deleteBike(id)
                setRsList({rsDelete:RequestState.succes});
                await requestBikeList();
            } catch (e) {
                setRsList({rsDelete: RequestState.failure});
            }
        }
    }

    const updateRentBike = async (id) => {
        if (rsList.rsUpdate !== RequestState.request) {
            try {
                setRsList({rsUpdate: RequestState.request});
                await ApiService.updateRentStatus(id)
                setRsList({rsUpdate: RequestState.succes});
                await requestBikeList();
            } catch (e) {
                setRsList({rsUpdate: RequestState.failure});
            }
        }
    }

    const getRentTimer = async (time) => {
        if (rsList.rsGetTime !== RequestState.request) {
            try {
                setRsList({rsGetTime: RequestState.request});
                const response = await ApiService.getRentTime(time);
                setRentTime(response.data.rows);
                
                setRsList({rsGetTime: RequestState.succes});
            } catch(e) {
                setRsList({rsGetTime: RequestState.failure})
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

