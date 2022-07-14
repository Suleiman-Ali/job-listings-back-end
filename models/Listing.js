const mongoose = require('mongoose');

const ListingScheme = new mongoose.Schema({
  ownerId: { type: String, required: true },
  jobTitle: { type: String, required: true },
  jobDescription: { type: String, required: true },
  jobType: { type: String, required: true },
  jobDate: { type: Date, default: Date.now() },
  jobRegion: { type: String, required: true },
  jobTimezones: { type: [String], required: true },
  jobCategory: { type: String, required: true },
  companyName: { type: String, required: true },
  companyWebsite: { type: String, required: true },
  jobApplicationLink: { type: String, required: true },
});

const Listing = mongoose.model('Listing', ListingScheme);

module.exports = Listing;
