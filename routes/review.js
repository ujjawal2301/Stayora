const express = require("express");
const router = express.Router({ mergeParams: true });
const wrapAsync = require("../utils/wrapAsync");
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware");
const reviewController = require("../controllers/review");

// Post Route
router.post("/",isLoggedIn, validateReview, wrapAsync(reviewController.createReview));

// Delete Reviews
router.delete("/:reviewId",isLoggedIn,isReviewAuthor, reviewController.destroyReview);

module.exports = router;