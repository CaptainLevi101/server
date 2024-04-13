import { response } from "express";
import Booking from "../models/Booking.js";
import Listing from "../models/Listing.js";

export const createBookingController=async(req,res)=>{ 
    try{
        const { customerId, hostId, listingId, startDate, endDate, totalPrice } = req.body;
        const newBooking = new Booking({ customerId, hostId, listingId, startDate, endDate, totalPrice })
        await newBooking.save()
        res.status(200).json(newBooking)
    }catch(err){
        console.log(err)
        res.status(400).json({ message: "Fail to create a new Booking!", error: err.message })
    }
}


export const getBookingDetails=async(req,res)=>{
    try{
        const {listingId}=req.params;
        const listing=await Listing.findById(listingId).populate("creator");
        const bookingDetail=await Booking.find({listingId:listing.id}).populate("customerId hostId listingId");
        if(bookingDetail){
            let arra = bookingDetail.map((item) => ({
                startDate: item.startDate,
                endDate: item.endDate
              }));
              console.log(bookingDetail);
            res.status(200).send(arra); 
        }else{
            console.log(bookingDetail);
            res.status(200).send({message:"No Booking"});
        }
    }catch(err){
        console.log("failed");
        res.status(404).json({ message: "Fail to fetch Bookingdetails", error: err.message })
    }
}