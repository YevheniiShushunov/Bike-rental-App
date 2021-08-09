const db = require('../db');

class BikeController {
    async createBike (req, res) {
        const {name, type, price} = req.body
        const newBike = await db.query(`INSERT INTO bike (name, type, price) values($1, $2, $3) RETURNING *`, [name, type, price])
        res.json(newBike.rows[0]);
    }

    async getBikes (req, res) {
        const bikes = await db.query(`SELECT * FROM bike`)
        res.json(bikes);
    }

    async updateBike (req, res) {
        const {id} = req.body
        const bike = await db.query(`UPDATE bike SET rent = NOT rent, rentdate = NOW() WHERE bike.id = $1 RETURNING *`, [id])
        res.json(bike.row);
    }

    async deleteBike (req, res) {
        const id = req.params.id;
        const bike = await db.query(`DELETE FROM bike where id = $1`, [id])
        res.json(bike.row);
    }
}

module.exports = new BikeController();