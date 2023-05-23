const express = require("express");
const router = express.Router();
const travelController = require("../controllers/travelController");
const userController = require("../data/userController");

router.route("/json")
.get(function(req, res){
    res.status(200).json({"message": "my message"});
});

router.route("/travels")
.get(travelController.getAll)
.post(travelController.addOne);

router.route("/travels/:travelId")
.get(travelController.getOne)
.delete(travelController.deleteOne);

router.route("/users")
.post(userController.addOne);

module.exports = router;
