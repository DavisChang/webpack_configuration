const path = require('path');

// post css 

module.exports = {
	entry: './src/App.js',
	output: {
		path: __dirname,
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{	test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel-loader',
				query: {
		        	presets: ['stage-0', 'react', 'es2015']
		      }
			},
			{ 
				test: /\.css$/, 
				loader: 'style-loader!css-loader!postcss-loader'
			}
		]
	},
	resolve: {
		root: [
    		path.resolve('./src')
		],
		extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json'],
	},
	postcss: function (){
		return [
			require('postcss-import'),
			require('autoprefixer')({
				browsers: ['last 2 versions'] 
			}),
			require('postcss-nested'),
			require('postcss-mixins'),
			require('postcss-cssnext'),
			require('postcss-assets')({
				loadPaths: [
					path.resolve(__dirname, './src/public'),
					path.resolve(__dirname, './src/public/assets')
				],
				cachebuster: true,
			}),
			


		];
	}

}