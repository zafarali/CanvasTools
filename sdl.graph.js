var SDLgraph = function(canvasId){
	const desc = "SDLgraph";

	var ctx = sdl.canvas.context.get(canvasId);
	var m = sdl.create(ctx);//creates the manipulator

	var drawAxis = function(){
		//draws the axis
	}

	this.label = function(text, location){
		//adds a label location
	}
	this.xlabel = function(text){
		//sets the x-label
	}
	this.ylabel = function(text){
		//sets the y-label
	}
	this.title = function(text){
		//sets the title;
	}

	this.init = function(options){
		//initializes the graph
		drawAxis();
		this.title();
		this.ylabel();
		this.xlabel();
		return this;
	}

	this.reinit = function(new_axis){
		//reinitializes the graph with a new axis
	}
	this.plotData = function(data){
		//plots data points
	}
	this.plotGraph = function(fx){
		//draws the graph for fx
	}

	this.clear = function(){
		//clears all plots
		m.clear();
		drawAxis();
		return this;
	}


};

sdl.extend("graph",{
	desc : "used to make and draw graphs using sdl"
});