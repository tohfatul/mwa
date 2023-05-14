const express = require("express");
const router = express.Router();
const travelController = require("../controllers/travelController");

router.route("/json")
.get(function(req, res){
    res.status(200).json({"message": "my message"});
});

router.route("/travels")
.get(travelController.getAll)
.post(travelController.addOne);

module.exports = router;
