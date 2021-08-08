import '../../App.css';

export const AddBike = ({ name,  bikeType, price ,onChangeName, onChangePrice,onChangeType, onPost}) => {
    const handleChangeName = (e) => {
        onChangeName(e.currentTarget.value);   
    }

    const handleChangePrice = (e) => {
        onChangePrice(e.currentTarget.value);
    }

    const selectChangeType = (e) => {
        onChangeType(e.currentTarget.value)         
    }

    return (
        <div>
            <div className="add-bike">
                <div><h2>Create new rent</h2></div>
                <div className="bike">
                    
                    <div className="box">
                        <div className="title">Bike name</div>
                        <div className="item">
                            <input value={name} onChange={handleChangeName} className="inp"></input>
                        </div>
                    </div>

                    <div className="box">
                        <div className="select-title">Type</div>
                        <select className="item select" onChange={selectChangeType}>
                                <option value="chose your type" disabled>chose your type</option>
                                {bikeType.map(itm => (
                                    <option key={itm} value={itm}>{itm}</option>
                                ))}
                            </select>
                    </div>

                    <div className="box">
                        <div className="rent-title">Rent price</div>
                        <div className="item price" >
                            <input value={price} type="number" onChange={handleChangePrice} className="price" ></input>
                        </div>
                    </div>
                    <button className="btn" onClick={onPost}>Submit</button> 
                </div>
            </div>
        </div>
    )
}