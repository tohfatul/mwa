
const mongoose = require("mongoose");
require("./travelModel");
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology:true});

