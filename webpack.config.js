const path = require('path');
module.exports = {
    mode: "development",

    entry: {
        bundle: './src/main.ts'
    },  
    output: {
        // devServer: {
        //     contentBase: path.join(__dirname,'dist')
        // },
        filename: "bundle.js",
        path: path.join(__dirname, "dist"),
    },
    module: {
            rules: [{test: /\.ts$/, use: 'ts-loader'}],
    },        
    resolve: {
        extensions:['.ts','.js']
    },
}

module.exports = {
    mode: "development",

    entry: {
        bundle: './src/animation.ts'
    },  
    output: {
        // devServer: {
        //     contentBase: path.join(__dirname,'dist')
        // },
        filename: "animation.js",
        path: path.join(__dirname, "dist"),
    },
    module: {
            rules: [{test: /\.ts$/, use: 'ts-loader'}],
    },        
    resolve: {
        extensions:['.ts','.js']
    },
}