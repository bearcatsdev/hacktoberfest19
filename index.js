const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const port = process.env.PORT || 5697;
const app = express();

routes(app);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log("Server is running on port 5697, mai pren...");
});