const express = require('express');
const path = require('path');

const logger = require("./Middleware/logger");
const app = express();

//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(logger);


app.use(express.static(path.join(__dirname, "public")));

app.use('/api/members', require('./routes/api/members'));
const PORT = process.env.PORT || 5000;





app.listen(PORT, () => console.log("Server started"));
