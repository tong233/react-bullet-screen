const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
	template: path.join(__dirname, "./example/src/index.html"),
	filename: "./index.html"
});

module.exports = {
	entry: path.join(__dirname, "./example/src/index.tsx"),
	output: {
		path: path.join(__dirname, "example/dist"),
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.(j|t)sx?$/,
				use: "babel-loader",
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					'style-loader',
					'css-loader'
				]
			}]
	},
	plugins: [htmlWebpackPlugin],
	resolve: {
		extensions: ['.ts', '.tsx', '.js', 'jsx']
	},
	devServer: {
		port: 3001
	}
};