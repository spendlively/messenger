module.exports = {
    entry: "./httpd/react/app",
    output: {
    	path: './httpd/',
        filename: "build.js",
        library: "app"
    },
    node: {
    	fs: 'empty',
    	electron: 'empty'
    }
};