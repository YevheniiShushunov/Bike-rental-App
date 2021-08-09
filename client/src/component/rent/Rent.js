export const Rent = ({bikes=[], onRent }) => {
    const rent = bikes.filter( rt => rt.rent === true);
    const totalPrice = (arr) => {
        let sum = 0
        for (let i = 0; i < arr.length; i++) {
            sum += +arr[i].price
        }
        return Math.floor(sum * 100) / 100;
    }

    const renderRent = () => { 
        return rent.map( itm => (
            <div key={itm.id} className="rent">
               <div>{itm.name} / {itm.type} / {itm.price}$</div>
               <div>
                <button onClick={() => onRent(itm.id)} className="btn-cancel-rent">Cancel rent</button>
            </div>
            </div> 
            
        ));       
    }

    return (
        <>
            <div>
               <div><h2>Yor rent (Total: {totalPrice(rent)}$)</h2></div>
                    {renderRent()}
            </div>
        </>
    )
}