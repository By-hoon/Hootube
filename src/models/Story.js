import mongoose from "mongoose";

const storySchema = new mongoose.Schema({
    title: {type: String, required: true, trim: true , maxLength:80} ,
    fileUrl: { type: String, required: true },
    description: {type: String, required: true, trim: true, minLength: 20} ,
    createdAt: {type: Date, required: true, default:Date.now},
    hashtags: [{type: String, trim: true}],
    meta: {
        views:{type: Number, default: 0, required: true},
        rating: {type: Number, default: 0, required: true},
    },
    lat: {type:Number, default: 0,required: true},
    lng: {type:Number, default: 0,required: true},
});

storySchema.static('formatHashtags', function(hashtags){
    return hashtags.split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Story = mongoose.model("Story", storySchema);

export default Story;