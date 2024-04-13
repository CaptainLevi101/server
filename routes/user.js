import express from 'express';
import { addWishListController, getPropertiesController, getReservationsController, userTripsController } from '../controllers/user.js';

const router=express.Router();


router.get('/:userId/trips',userTripsController);
router.patch('/:userId/:listingId',addWishListController);

//get property List
router.get("/:userId/properties",getPropertiesController);
router.get("/:userId/reservations",getReservationsController);

export default router;