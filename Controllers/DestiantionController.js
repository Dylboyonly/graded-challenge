const { Destination } = require("../models/index");
const { v2: cloudinary } = require('cloudinary')

cloudinary.config({ 
    cloud_name: 'dfgfmzqfp', 
    api_key: '597428239396521', 
    api_secret: 'TMIV0kyo4kJMUaCxVjfzy1236tE'
});


class DestinationController {
  static async CreateDestination( request , respond , next) {
    try {
      const {
        Name,
        Overview,
        Culture,
        Food,
        Site,
    } = request.body;

    // Helper function to upload images to Cloudinary
    const uploadImageToCloudinary = async (imageBuffer) => {
        const base64 = imageBuffer.toString('base64');
        const base64url = `data:image/png;base64,${base64}`;
        const result = await cloudinary.uploader.upload(base64url);
        return result.secure_url; // Return the URL of the uploaded image
    };

    // Image upload promises
    const imageUploads = {
        MainImage: request.files.MainImage ? uploadImageToCloudinary(request.files.MainImage[0].buffer) : Promise.resolve(null),
        OverviewImg: request.files.OverviewImg ? uploadImageToCloudinary(request.files.OverviewImg[0].buffer) : Promise.resolve(null),
        CultureImg: request.files.CultureImg ? uploadImageToCloudinary(request.files.CultureImg[0].buffer) : Promise.resolve(null),
        FoodImg: request.files.FoodImg ? uploadImageToCloudinary(request.files.FoodImg[0].buffer) : Promise.resolve(null),
        SiteImg: request.files.SiteImg ? uploadImageToCloudinary(request.files.SiteImg[0].buffer) : Promise.resolve(null),
    };

    // Wait for all image uploads to complete
    const [MainImageUrl, OverviewImgUrl, CultureImgUrl, FoodImgUrl, SiteImgUrl] = await Promise.all(Object.values(imageUploads));

    // Create the new destination
    const NewDestination = await Destination.create({
        Name,
        MainImage: MainImageUrl,
        Overview,
        OverviewImg: OverviewImgUrl,
        Culture,
        CultureImg: CultureImgUrl,
        Food,
        FoodImg: FoodImgUrl,
        Site,
        SiteImg: SiteImgUrl,
    });
      respond.status(201).json({
        message: "Success created new destination"
      })
    } catch (error){
        console.log(error)
        let status = 500
        let message = "Internal Server Error"

        respond.status(status).json({
            message
        })
    }
  }

  static async ReadAllDestination( request , respond , next){
    try {
        const ReadAll = await Destination.findAll()
        respond.status(200).json({
            message: "Success Read All Destiantion",
            ReadAll
        })
    } catch (error){
        let status = 500
        let message = "Internal Server Error"

        respond.status(status).json({
            message
        })
    }
  }

  static async ReadOneDestination( request , respond , next){
    try {
        const {id} = request.params

        const One = await  Destination.findByPk(id)

        if(!One) throw {name: "Id notfound"}

        respond.status(200).json({
            One
        })
    } catch (error){
        let status = 500
        let message = "Internal Server Error"

        respond.status(status).json({
            message
        })
    }
  }
}

module.exports = DestinationController;
