const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async (req, res) => {
  let listingData = await Listing.findById(req.params.id);
  const { rating, comment } = req.body.review;
  let newReview = new Review({
    rating,
    comment,
  });
  newReview.author = req.user._id;
  listingData.reviews.push(newReview);
  await newReview.save();
  await listingData.save();
  req.flash("success", "New Review Created!");
  res.redirect(`/listings/${listingData._id}`);
};

module.exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted!");
  res.redirect(`/listings/${id}`);
};
