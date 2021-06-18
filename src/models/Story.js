import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
    title: {type: String, required: true, trim: true , maxLength:80} ,
    fileUrl: { type: String, required: true },
    description: {type: String, required: true, trim: true, minLength: 2} ,
    createdAt: {type: Date, required: true, default:Date.now},
    hashtags: [{type: String, trim: true}],
    meta: {
        views:{type: Number, default: 0, required: true},
        rating: {type: Number, default: 0, required: true},
    },
    //owner: {type: mongoose.Schema.Types.ObjectId, required: true, ref:''},
    lat: {type:Number,required: true},
    lng: {type:Number,required: true},
    address: {type:String, required: true},
    comments: [
        { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Comment" },
    ],
    owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

storySchema.static("formatHashtags", function (hashtags) {
    return hashtags
      .split(",")
      .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Story = mongoose.model("Story", storySchema);

export default Story;