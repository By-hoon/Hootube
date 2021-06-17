import Story from "../models/Story";

export const mapPrint =  (req, res) => {
    return res.render("map", { pageTitle: "map" });
};

export const markerAdd =  async (req, res) => {
    const stories = await Story.find({}).sort({ createdAt: "desc" });
    return res.render("marker", { pageTitle: "Marker Add" , stories});
};

