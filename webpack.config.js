var path = require('path');
const TerserPlugin = require('terser-webpack-plugin')

function getAppConfig(appName, folderName) {
    folderName = folderName || appName;
    return {
        name: appName,
        // devtool: 'source-map',
        // mode: "production",
        mode: process.env.NODE_ENV || "development",
        entry: path.join(__dirname, "src", "apps", folderName, "index.ts"),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: appName + '.bundle.js'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.json'],
            modules: [
                path.resolve(__dirname, "src"),
                "node_modules"
            ],
            alias: {
                Legacy: path.resolve(__dirname),
                Components: path.resolve(__dirname, "src", "components"),
                Styles: path.resolve(__dirname, "src", "styles"),
                Vendor: path.resolve(__dirname, "src", "vendor"),
                Utils: path.resolve(__dirname, "src", "utils"),
                Slices: path.resolve(__dirname, "src", "slices")
            }
        },
        module: {
            rules: [
                {
                    // Include ts, tsx, js, and jsx files.
                    // test: /\.(ts|js)x?$/,
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    use: ["babel-loader"]
                },
                {
                    test: /\.(ts|tsx)$/,
                    exclude: /node_modules/,
                    use: ["ts-loader"],
                }
            ]
        },
        // optimization: {
        //     minimize: true,
        //     minimizer: [
        //         new TerserPlugin({
        //             // Use multi-process parallel running to improve the build speed
        //             // Default number of concurrent runs: os.cpus().length - 1
        //             parallel: true
        //         })
        //     ]
        // }
    }
}


module.exports = [
    getAppConfig("record")
];
