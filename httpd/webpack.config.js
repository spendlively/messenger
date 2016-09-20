
module.exports = {

	entry: './js/app',
    output: {
        // path: __dirname + "/js",
        filename: "build.js",
        library: 'app'
    },
    target: 'electron',
    watch: true
}