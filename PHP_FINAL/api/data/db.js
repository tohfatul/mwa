require("./travels-model");
const mongoose= require("mongoose");
mongoose.connect(process.env.DB_URL);

mongoose.connection.on("connected", function() {
    console.log("Connected to", process.env.DB_NAME);
});
mongoose.connection.on("disconnected", function() {
    console.log("Disconnected");
});
mongoose.connection.on("error", function(err) {
    console.log("Connection error", err);
});
process.on("message", function(message) {
    console.log("message ", message);
});
process.on("SIGINT", function() {
    mongoose.connection.close(function() {
        console.log(process.env.SIGINT_MESSAGE);
        process.exit(0);
    });    
});

process.on("SIGTERM", function() {
    mongoose.connection.close(function() {
        console.log(process.env.SIGTERM_MESSAGE);
        process.exit(0);
    });    
});