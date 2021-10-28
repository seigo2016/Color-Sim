const path = require('path');

module.exports = {
    mode: "development",

    entry: {
        main: './src/main.ts',
        animation: './src/animation.ts',
        handdrawing: './src/handdrawing.ts'
    },
    output: {
        // devServer: {
        //     contentBase: path.join(__dirname,'dist')
        // },
        filename: "[name].js",
        path: path.join(__dirname, "dist"),
    },
    module: {
        rules: [{ test: /\.ts$/, use: 'ts-loader' }],
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
}