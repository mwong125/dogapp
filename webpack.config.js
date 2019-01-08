const path = require('path');
var nodeModules = path.resolve(path.join(__dirname, 'node_modules'));

module.exports = {
    entry: './src/App.jsx',
    output: {
	path: path.join(__dirname, '/static/build'),
	filename: 'app.bundle.js'
    },
    module: {
	rules: [
	    {
		test: /\.js(x)$/,
		exclude: /node_modules/,
		use: {
		    loader: "babel-loader"
		}
	    },
	    {
		test: /\.css$/,
		loaders: ["style-loader", "css-loader"]
	    }
	]
    }
};
