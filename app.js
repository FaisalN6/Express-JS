const express = require('express');
const app = express();
const ConnRoute = require('./routes/ConnRoute')
const UserRoute  = require('./routes/UserRoute')

app.use(express.json());

app.use('/api', ConnRoute);
app.use('/users', UserRoute);

const port = 3000;

app.listen(port, () => {
    console.log(`Server berjalalan di port http://localhost:${port}`)
});

module.exports = app;