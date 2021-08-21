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
    // eslint-disable-next-line no-unused-vars
    const [rentTime, setRentTime] = useState([])
    const bikeType = ["Custom", "Road", "Mountain", "Hybrid", "City", "Electric"]

    const requestBikeList = async (bike) => {
        if (rsList.list !== RequestState.request) {
            try {
                setRsList((prevState) => ({...prevState, list:RequestState.request}));
                const response = await ApiService.getAllBikes(bike);
                setBikes(response.data.rows);
                getRentTimer();
                setRsList((prevState) => ({...prevState, list:RequestState.succes }));
            } catch (e) {
                setRsList((prevState) => ({...prevState, list:RequestState.failure}));
            }
        }
    }

    const postBike = async () => {
        if (rsList.rsPost !== RequestState.request) {
            try {
                setRsList((prevState) => ( {...prevState, rsPost:RequestState.request}));
                await ApiService.addBike(name, type, price);
                setName('');
                setPrice('');
                setRsList((prevState) => ({...prevState, rsPost:RequestState.succes}));
                await requestBikeList();
            } catch (e) {
                setRsList((prevState) => ({...prevState, rsPost: RequestState.failure}));
            }
            
        }
    }

    const deleteBike = async (id) => {
        if (rsList.rsDelete !== RequestState.request) {
            try {
                setRsList((prevState) => ({...prevState, rsDelete:RequestState.request}));
                await ApiService.deleteBike(id)
                setRsList((prevState) => ({...prevState, rsDelete:RequestState.succes}));
                await requestBikeList();
            } catch (e) {
                setRsList((prevState) => ({...prevState,  rsDelete: RequestState.failure}));
            }
        }
    }

    const updateRentBike = async (id) => {
        if (rsList.rsUpdate !== RequestState.request) {
            try {
                setRsList((prevState) => ({...prevState, rsUpdate: RequestState.request}));
                await ApiService.updateRentStatus(id)
                setRsList((prevState) => ({...prevState, rsUpdate: RequestState.succes}));
                await requestBikeList();
            } catch (e) {
                setRsList((prevState) => ({...prevState, rsUpdate: RequestState.failure}));
            }
        }
    }

    const getRentTimer = async (time) => {
        if (rsList.rsGetTime !== RequestState.request) {
            try {
                setRsList((prevState) => ({...prevState, rsGetTime: RequestState.request}));
                const response = await ApiService.getRentTime(time);
                setRentTime(response.data.rows);
                setRsList((prevState) => ({...prevState, rsGetTime: RequestState.succes}));
            } catch(e) {
                setRsList((prevState) => ({...prevState, rsGetTime: RequestState.failure}))
            }
        }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
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

