commands
.on(['help', undefined], output);


function output(done) {
	done();

	console.log("Registry frontend.");
	console.log("");
	console.log("  -d | --dev                           enable sourcemapping and auto");
	console.log("                                       rebuilding on frontend");
	console.log("");
}