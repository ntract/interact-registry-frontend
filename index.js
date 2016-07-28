events.on("interact-registry:loaded", function() {
	
	console.log("Frontend loading...");

	var cwd = path.join(__dirname, 'res');
	var build = './build';
	var src = './src';

	FileSystem.mkdir( path.join(cwd, src) );
	FileSystem.mkdir( path.join(cwd, build) );

	cli.plugins.install(path.join(cwd, src), [
		'interact-registry-frontend-app#~0.0'
	], {
		success: function() {

			cli.plugins.build({ 
				dev : true,
				cwd: cwd,
				src: src,
				build: build,
				success: function() {

					app.use(express.static( path.join(cwd, build) ));

					console.log("Frontend ready.");

				}
			});
			
		}
	})

});
