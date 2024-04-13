import express from 'express';
import { createBookingController, getBookingDetails } from '../controllers/bookings.js';
const router=express.Router();

router.post('/create',createBookingController);

router.get("/getBookingDetails/:listingId",getBookingDetails);


export default router;