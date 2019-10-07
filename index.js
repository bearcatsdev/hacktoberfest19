const express = require('express');
const bodyParser = require('body-parser');
const port = process.env.PORT || 5697;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(port, () => {
    console.log("Server is running on port 5697, mai pren...");
});