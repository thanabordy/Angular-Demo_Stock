const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require('cors');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static(__dirname + "/routes/uploaded"));
app.use(cors());
app.use("/api/v2/authen", require("./routes/api_authen"));
app.use("/api/v2/stock", require("./routes/api_stock"));

app.listen(3000, () => {
    console.log("Server is running...")
})