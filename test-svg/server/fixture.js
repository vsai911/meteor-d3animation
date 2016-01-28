Meteor.startup(function() {
	var fs = Meteor.npmRequire('fs');
	var path = Meteor.npmRequire('path');
	var base = process.env.PWD;
	var svgFiles;

	//empty the collection on start
	svgFile.remove();

	// returns all the files names in the directory
	function folderContents(path) {
		var files;
		try {
			files = fs.readdirSync(base + path);

			//the array also contains 'DS_Store' which is removed
			if (files.indexOf('.DS_Store') >= 0) {
				files.splice(files.indexOf('.DS_Store'), 1);
			}

		} catch(e) {
			console.log('No such Directory');
		}
		return files;
	}


	svgFiles = folderContents('/server/svg');

	// saving svg file contents to the svgFile collection
	if (svgFiles && svgFile.find().count() === 0) {

		// To select each file name in the array
		for (i = 0; i < svgFiles.length; i++) {

			// only the file name with'.scss' extension is selected
			if (path.extname(svgFiles[i]) === '.svg') {

				// the contents of selected file name is read synchronously
				var svgFileContents = fs.readFileSync(base +'/server/svg/'+ svgFiles[i], 'utf8');

				// save the fileContents to the Styles collection
				svgFile.insert({name: 'svgFile'+[i] , svgContent: svgFileContents});
			}
		}
	}
});
