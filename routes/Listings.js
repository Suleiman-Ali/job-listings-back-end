const express = require('express');
const Listing = require('../models/Listing');
const auth = require('../middleware/auth');

const router = express.Router();

// Get all listings
router.get('/', async (req, res) => {
  const listings = await Listing.find();
  res.send(listings);
});

// Get all listings of user
router.get('/:id', auth, async (req, res) => {
  if (!req.user._id === req.params.id) return res.send('Not authorized.');

  const listings = await Listing.find({ ownerId: req.user._id });
  res.send(listings);
});

// Create a listing
router.post('/', auth, async (req, res) => {
  let listing = new Listing({
    ownerId: req.user._id,
    jobTitle: req.body.jobTitle,
    jobDescription: req.body.jobDescription,
    jobType: req.body.jobType,
    jobRegion: req.body.jobRegion,
    jobTimezones: req.body.jobTimezones,
    jobCategory: req.body.jobCategory,
    companyName: req.body.companyName,
    companyWebsite: req.body.companyWebsite,
    jobApplicationLink: req.body.jobApplicationLink,
  });

  listing = await listing.save();
  res.send(listing);
});

// Edit a listing
router.put('/:id', auth, async (req, res) => {
  let listing = await Listing.findOne({ _id: req.params.id });

  if (!listing.ownerId === req.user._id) return res.send('Not authorized.');

  listing.jobTitle = req.body.jobTitle;
  listing.jobDescription = req.body.jobDescription;
  listing.jobType = req.body.jobType;
  listing.jobRegion = req.body.jobRegion;
  listing.jobTimezones = req.body.jobTimezones;
  listing.jobCategory = req.body.jobCategory;
  listing.companyName = req.body.companyName;
  listing.companyWebsite = req.body.companyWebsite;
  listing.jobApplicationLink = req.body.jobApplicationLink;
  listing = await listing.save();
  res.send(listing);
});

// Delete a listing
router.delete('/:id', auth, async (req, res) => {
  let listing = await Listing.findOne({ _id: req.params.id });

  if (!listing.ownerId === req.user._id) return res.send('Not authorized.');

  listing = await listing.remove();
  res.send(listing);
});

module.exports = router;

// {
// 	"jobTitle": "Front End Dev",
//     "jobDescription": "XYZ",
//     "jobType": "Full Time",
//     "jobRegion": "World Wide",
//     "jobTimezones": ["UTC"],
//     "jobCategory": "Web Dev",
//     "companyName": "Google",
//     "companyWebsite": "google.com",
//     "jobApplicationLink": "youtube.com"
// }
