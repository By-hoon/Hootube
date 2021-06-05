const path = require("path");

module.exports = {
    entry: "./src/client/js/map.js",
    output:{
        filename: "map.js",
        path: path.resolve(__dirname, "assets", "js"),
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [["@babel/preset-env", {targets: "defaults"}]],
                    },
                },
            },
        ],
    },
};