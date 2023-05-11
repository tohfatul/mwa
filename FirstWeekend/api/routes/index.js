const express = require("express");
const router = express.Router();
const travelsController = require("../controllers/travelsController");

router.route("/travels")
.get(travelsController.getAll)

router.route("/travels/:travelId")
.get(travelsController.getOne)
.post(travelsController.addOne)
.put(travelsController.fullUpdateOne)
.patch(travelsController.partialUpdateOne)
.delete(travelsController.deleteOne);

module.exports = router;
