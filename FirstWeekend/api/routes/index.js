const express = require("express");
const router = express.Router();
const travelsController = require("../controllers/travelsController");
const locationController = require("../controllers/locationController");
const photoController = require("../controllers/photoController");

router.route("/travels")
.get(travelsController.getAll)
.post(travelsController.addOne);

router.route("/travels/:travelId")
.get(travelsController.getOne)
.put(travelsController.fullUpdateOne)
.patch(travelsController.partialUpdateOne)
.delete(travelsController.deleteOne);

router.route("/travels/:travelId/location")
.get(locationController.getOne);

router.route("/travels/:travelId/photos")
.get(photoController.getAll)
.post(photoController.addOne);


router.route("/travels/:travelId/photos/:photoId")
.get(photoController.getOne);


module.exports = router;
