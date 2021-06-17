import Story from "../models/Story";

export const mapPrint = async (req, res) => {
    const stories = await Story.find({}).sort({ createdAt: "desc" });
    return res.render("marker", { pageTitle: "Map" , stories});
};

export const markerAdd =  (req, res) => {
};

