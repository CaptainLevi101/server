import Listing from "../models/Listing.js";
import cloudinary from "../utils/cloudinaryT.js";

export const createListingController=async(req,res)=>{
    try{
        const {
            creator,
            category,
            type,
            streetAddress,
            aptSuite,
            city,
            state,
            country,
            guestCount,
            bedroomCount,
            bedCount,
            bathroomCount,
            amenities,
            title,
            description,
            highlight,
            highlightDesc,
            price,
            photos
          } = req.body; 
          let cloudPhotos=[];
          if(!photos){
            return res.status(400).send("NO Photos Uploaded");
          }
          await Promise.all(photos.map(async (photo) => {
            const resultantImage = await cloudinary.uploader.upload(photo, {
              upload_preset: "faifuxkk"
            });
            cloudPhotos.push(resultantImage.secure_url);
          }));
        const newListing = new Listing({
            creator,
            category,
            type,
            streetAddress,
            aptSuite,
            city,
            state,
            country,
            guestCount,
            bedroomCount,
            bedCount,
            bathroomCount,
            amenities,
            title,
            description,
            highlight,
            highlightDesc,
            price,
            cloudPhotos
          });
          await newListing.save();
          return res.status(200).json(newListing);    

    }catch(err){
        res.status(409).json({ message: "Fail to create Listing", error: err.message })
        console.log(err)
    }
}

export const getListingByCategories=async(req,res)=>{
   
        const qcategory=req.query.category;
        try{
            let listings;
            if(qcategory){
                listings=await Listing.find({category:qcategory}).populate("creator");
            }else{
                listings=await Listing.find().populate("creator");
            }
            res.status(200).json(listings);
        }
        catch(error){
            res.status(404).json({ message: "Fail to fetch listings", error: err.message })
        console.log('error in getting listing by categories');
    }
}

/*Get Listing By Search */

export const getListingBySearch=async(req,res)=>{
    const {search}=req.params;
    try{
        let listings=[];
        if(search=="all"){
            listings=await Listing.find().populate("creator");

        }else{
            listings = await Listing.find({
                $or: [
                  { category: {$regex: search, $options: "i" } },
                  { title: {$regex: search, $options: "i" } },
                ]
              }).populate("creator")
        }
        res.status(200).json(listings)
    }catch(err){
        res.status(404).json({ message: "Fail to fetch listings", error: err.message })
    }
}


/* listing details */

export const getListingDetails=async(req,res)=>{
    try{
       
        const {id}=req.params;
        
        const listing=await Listing.findById(id).populate("creator");
        res.status(202).json(listing);
    }catch(error){
        res.status(404).json({ message: "Listing can not found!", error: error.message })

    }
}


