import '../../App.css';

export const Awailable = ({bikes = [], onDelete,onRent}) => {
    let bikeCount = bikes.length;
    let awailableBikes = bikes.filter(rt => rt.rent === false)
    const renderList = () => {
        return awailableBikes.map( itm => (
            <div key={itm.id} className="awailable__item">
                <div>{itm.name} / {itm.type} / {itm.price}$ </div>
                <div className="awailable__buttons">
                        <button onClick={() => onRent(itm.id)} className="btn-rent">Rent</button>
                        <button onClick={() => onDelete(itm.id)} className="btn-delete">Delete</button>
                    </div>
            </div>
        ));
    }

    return(
        <div className="awailable">
            <div><h2>Awailable bicycles ({bikeCount})</h2></div>
            {renderList()}
        </div>
    )
}