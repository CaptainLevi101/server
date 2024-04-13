import express from 'express';
import { createListingController, getListingByCategories, getListingBySearch, getListingDetails } from '../controllers/listing.js';

const router=express.Router();

router.post('/create',createListingController);
router.get('/getFeed',getListingByCategories);
router.get('/listingDetails/:id',getListingDetails);

router.get('/search/:search',getListingBySearch);

export default router;

