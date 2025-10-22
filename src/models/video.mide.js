import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videoFile:{
            type: String,//coudnary uri
            required: true,
        },
        thumbnail:{
            type: String,//coudnary uri
            required: true,
        },
        title:{
            type: String,
            required: true,
            max: 100,
        },
        description:{
            type: String,
            required: true,
            max: 500,
        },
        duration:{
            type: Number,
            required: true,

        },
        views:{
            type: Number,
            default: 0,
        },
        isPublish:{
            type:Boolean,
            default: true,
        },
        owner:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        }
    },
    {
        timestamps: true,
    
}
)

//yaha hum adition plugin use kar rahe hai for pagination
videoSchema.plugin(mongooseAggregatePaginate);
        

export const video = mongoose.model("Video", videoSchema);