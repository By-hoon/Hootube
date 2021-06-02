
export const mapPrint =  (req, res) => {
    return res.render("map", { pageTitle: "map" });
};

export const markerAdd =  (req, res) => {
    return res.render("marker", { pageTitle: "Marker Add" });
};

