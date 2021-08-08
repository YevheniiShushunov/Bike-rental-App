const express = require ('express')
const bikeRouter = require('./routes/bike.routes');
const cors = require ('cors');
const PORT = process.env.PORT || 4000;

const app = express();

app.use(
    cors({
        origin: "http://localhost:3000"
    }))
app.use(express.json())
app.use('/api', bikeRouter);


app.listen(PORT, () => console.log(`server working on port ${PORT}` ));

