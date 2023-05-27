const express = require("express");
const router = express.Router();
const travelsController = require("../controllers/travelsController");
const locationController = require("../controllers/locationController");
const photoController = require("../controllers/photoController");

router.route("/")
.get(travelsController.getAll)
.post(travelsController.addOne);

router.route("/:travelId")
.get(travelsController.getOne)
.put(travelsController.fullUpdateOne)
.patch(travelsController.partialUpdateOne)
.delete(travelsController.deleteOne);

router.route("/:travelId/location")
.get(locationController.getOne);

router.route("/:travelId/photos")
.get(photoController.getAll)
.post(photoController.addOne);

router.route("/:travelId/photos/:photoId")
.get(photoController.getOne);

module.exports = router;