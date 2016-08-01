require("./help");

events.on("interact-registry:loaded", function() {
	
	console.log("Frontend loading...");

	var dev = switches(['dev', 'd']);
	var cwd = path.join(__dirname, 'res');
	var build = './build';
	var src = './src';

	FileSystem.mkdir( path.join(cwd, src), {norel:true} );
	FileSystem.mkdir( path.join(cwd, build), {norel:true} );

	cli.plugins.install(path.join(cwd, src), [
		'interact-registry-frontend-app#~0.0'
	], {
		success: function() {

			cli.plugins.build({ 
				dev : dev,
				cwd: cwd,
				src: src,
				build: build,
				remove: [
					"_config.js.map",
					"_config.js",
					"_plugins.js.map",
					"_plugins.js",
					"_plugins.css",
					"_core.js"
				],
				tasks: [
					{
						"task": "copy",
						"description": "Copy"
					},
					{
						"task": "collate",
						"description": "Collate"
					},
					{
						"task": "handlebars",
						"description": "Handlebars"
					},
					{
						"task": "less",
						"description": "LESS"
					},
					{
						"task": "requirejs",
						"name": "javascript",
						"description": "Main RequireJS",
						"out": "_plugins.js",
						"afterTasks": [ "collate" ]
					},
					{
						"task": "requirejs",
						"name": "config",
						"description": "Config RequireJS",
						"out": "_config.js",
						"mainAttribute": "config",
						"afterTasks": [ "collate" ]
					}
				],
				success: function() {

					app.use(express.static( path.join(cwd, build) ));

					console.log("Frontend ready.");

				}
			});
			
		}
	})

});
