import {v2 as cloudinary} from "cloudinary"
import multer from "multer"


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloudinary = async(localFilePath)=>{
    try {
        if(!localFilePath) throw new Error("File path is required")
            //uploading file to cloudinary
        const result = await cloudinary.uploader.upload(localFilePath,{
            folder:"videos", //folder name in cloudinary
            resource_type:"auto" //automatically detect file type
        })

        // file has been uploaded successfully
        console.log("file is uploaded in cloudinary ",
            result.secure_url
        )
        return result;

        return {
            url: result.secure_url,
            public_id: result.public_id
        }
        
    } catch (error) {
        fs.unlinkSync(localFilePath); //deleting the local file in case of error remove the locally save temporary file as the upload operation got failed
        console.error("Error while uploading file to cloudinary", error);
        throw error;
        return null;
        
    }   
}

export {uploadOnCloudinary}

    
export default cloudinary
