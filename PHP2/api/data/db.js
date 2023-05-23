
const mongoose = require("mongoose");
require("./travelModel");
require("./userModel");
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology:true});

