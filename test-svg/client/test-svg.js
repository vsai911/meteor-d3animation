var stringSvg;
var a;
//cursor added from database ,here is where we want zoom funcitonality to work.
Template.Svg.helpers({
	svgDrawing: function(){
		 return svgFile.find().fetch()[0].svgContent;
		//return stringSvg
}

});


Template.Svg.rendered= function() {
  var svgdiv = d3.select('#zoomBehavior');

  var zoomFn = d3.behavior.zoom().scaleExtent([1, 6]).on("zoom", zoom);
  svgdiv.call(zoomFn);

  Deps.autorun(function (c) {
    c.stop();
    //perform a reactive query on the collection to get an array
    //var zoomfun = $(svgdiv[0]).append(a[4]);

    //svgdiv.call(d3.behavior.zoom(zoom).scaleExtent([1, 6]));//.on("zoom", zoom));
  });
      function zoom() {
        var scale = d3.event.scale;
        var elem = svgdiv[0][0];
    		d3.select(elem).attr("transform", "translate(" + d3.event.translate + ")scale(" + scale + ")").selectAll("*").attr('zoom', Math.round(scale));
    	}
    // });
  };
