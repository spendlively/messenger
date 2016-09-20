module.exports = {
    entry: "./httpd/react/app",
    output: {
    	path: './httpd/',
        filename: "build.js",
        library: "app"
    },
    target: 'electron'
//    node: {
//    	fs: 'empty',
//    	electron: 'empty'
//    }
};