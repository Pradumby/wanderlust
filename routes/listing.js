const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const {
  index,
  renderNewForm,
  showListing,
  createListing,
  renderEditForm,
  updateListing,
  deleteListing,
} = require("../controllers/listings.js");
const multer = require("multer");
const { cloudinary, storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//index route
router.get("/", wrapAsync(index));

// New Route
router.get("/new", isLoggedIn, renderNewForm);

//show route
router.get("/:id", wrapAsync(showListing));

//create route
router.post(
  "/",
  isLoggedIn,
  validateListing,
  upload.single("image"),
  wrapAsync(createListing)
);

//edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(renderEditForm));

// update route
router.put(
  "/:id",
  isLoggedIn,
  isOwner,
  upload.single("image"),
  validateListing,
  wrapAsync(updateListing)
);

//delete routes

router.delete("/:id", isLoggedIn, isOwner, wrapAsync(deleteListing));

module.exports = router;
