/*
simple drawing library (SDL.js)
Playing around with object oriented library creation
this library lets us draw simple shapes and add
simple text to a context defined object.

Library works by using 'point' objects {x:int,y:int}
to define locations of different elements, this allows
us to use other objects which have x,y properties (eg: game characters)

VERSION: 0.2.0 (beta:01)

*/
var SDLmanipulator = function(context){
	
	//defines the context for this object
	var ctx = context;
	this.WIDTH = ctx.canvas.getAttribute('width');
	this.HEIGHT = ctx.canvas.getAttribute('height');

	//object description
	const desc = "SDLobj";

	//default values
	this.defaults = {
		color:"black",
		fontfamily:"Arial",
		fontsize:"12px",
		weight:"bold",
		linewidth:1,
		join:"miter"
	};


	//draws a circle
	this.circle = function(location, r, stroke){
		ctx.beginPath();
		ctx.arc(location.x,location.y,r,0,Math.PI*2,true);
		ctx.closePath();
		if(stroke)
			ctx.stroke();
		else
			ctx.fill();
		return this;
	};

	//draws a single point (useful for graphing)
	this.point = function(location, withtext, fontsize){
		this.circle(location,sdl.point.defaults.pointsize,false);
		if(withtext){
			if(typeof(location.label)=='undefined'){
				if(typeof(location.z)=='undefined')
					st = "("+location.x+", "+location.y+")";
				else
					st = "("+location.x+", "+location.y+", "+location.z+")";
			}else{
				st = location.label;
			}
			ctx.textBaseline="top";
			if(typeof(fontsize)=='undefined' || fontsize ==" " || fontsize=="") fontsize=sdl.point.defaults.fontsize;
			this.text(st,location,fontsize);
			ctx.textBaseline="alphabetic";
		}
		return this;
	};

	//draws a rectange
	this.rect = function(location, w, h, stroke){
		ctx.beginPath();
		ctx.rect(location.x,location.y,w,h);
		ctx.closePath();
		if(stroke)
			ctx.stroke();
		else
			ctx.fill();
		return this;
	};

	//draws a square
	this.square = function(location, side, stroke){
    	this.rect(location, side, side, stroke);   	
    	return this;
	};

	//clears the context
	this.clear = function(){
		ctx.clearRect(0,0,this.WIDTH,this.HEIGHT);
		return this;
	};

	//strokes the path
	this.stroke = function(){
		ctx.stroke();
		return this;
	};

	//fills the object/path
	this.fill = function(){
		ctx.fill();
		return this;
	};

	//sets the color of both line and fill
	this.color = function(colorString){
		this.lineColor(colorString);
		this.fillColor(colorString);
		return this;
	};

	//sets color of the line
	this.lineColor = function(colorString){
		if(typeof(colorString.rep)=='undefined') 
			ctx.strokeStyle = colorString;
		else
			ctx.strokeStyle = colorString.rep;
		return this;
	};

	//sets the color of the fill
	this.fillColor = function(colorString){
		if(typeof(colorString.rep)=='undefined') 
			ctx.fillStyle=colorString;
		else
			ctx.fillStyle=colorString.rep;
		return this;
	};

	//draws text
	this.text = function(text, location, size, font, weight){
		if(typeof(size)=="undefined" || size==" " || size=="") size = this.defaults.fontsize;
		if(typeof(font)=='undefined' || font=="" || font==" ") font = this.defaults.fontfamily;
		if(typeof(weight)=='undefined' || weight=="" || weight==" ") weight = this.defaults.weight;
		ctx.font= weight+" "+size+" "+font;
		ctx.fillText(text,location.x,location.y);
		return this;
	};

	//draws a triangle
	this.triangle = function(centre, side1, side2, side3, height, stroke){
		side2 = side1; side3 = side1;
		if(typeof(height)=='undefined') height = Math.sqrt((side1 * side1) - ((side1 / side1) * (side1 / side1)));

		ctx.beginPath();
		ctx.moveTo(centre.x, centre.y);
		ctx.lineTo(centre.x+(side1/2), centre.y + (height));
		ctx.lineTo(centre.x+side1, centre.y);
		ctx.lineTo(centre.x, centre.y);
		ctx.lineJoin = 'miter';
		ctx.closePath();
		if(stroke)
			ctx.stroke();
		else
			ctx.fill();	
		return this;
	};


	this.start=function(){
		ctx.lineWidth = this.defaults.linewidth;
		ctx.beginPath();
		return this;
	};
	this.end=function(){
		ctx.lineJoin=this.defaults.join;
		ctx.closePath();
		return this;
	};

	this.to = function(to){
		ctx.lineTo(to.x,to.y);
		return this;
	};
	this.from = function(from){
		ctx.moveTo(from.x,from.y);
		return this;
	};
	this.line = function(from,to){
		ctx.lineWidth = this.defaults.linewidth;
		ctx.moveTo(from.x,from.y);
		ctx.lineTo(to.x,to.y);
		return this;
	};
	this.thickness = function(val){
		ctx.lineWidth=val;
		return this;
	}
};

var sdl = {

//the canvas sublibrary
canvas : {
		context:{
			//gets the context of canvasId
			get : function(canvasId){
				var canvas = document.getElementById(canvasId);
				var context = canvas.getContext('2d');
				return context;
			}
		},
		create : function(canvasId,width,height,parent){
		//creates a canvas element and appends it
		return "not implemented";
	}
},

//creates an SDL manipulator object
create : function(ctx){
	return new SDLmanipulator(ctx);
},

//shorthand for getting the context of a canvas
getContext : function(canvasId){
	return this.canvas.context.get(canvasId);
},

animate:function(){

},

//extends the sdl library with a new sublibrary or function
extend : function(lib_or_func_name, object_or_func){
	if(typeof(object_or_func)!='undefined' && (object_or_func !='' && object_or_func!=' ' && lib_or_func_name!='' && lib_or_func_name !=' '))
		sdl[lib_or_func_name] = object_or_func;
}
}



/*
C O R E   E X T E N S I O N S
*/

//the point library
//made to easily create and store points

var SDLpoint = function(x,y,z){
	const desc = "SDLpoint";
	this.x = x;
	this.y = y;
	if(typeof(z)=='undefined'){
		this.dimension = 2;
	}else{
		this.z = z;
		this.dimension = 3;
	}
	sdl.point.points.push(this);
	this.setLabel = function(label){
		this.label=label;
		return this;
	}
};

sdl.extend("point", {
	create:function(x,y,z){
		return new SDLpoint(x,y,z);
	},
	//stores all created SDLpoints
	points:[],

	//default values
	defaults:{
		pointsize:2,
		fontsize:"9px"
	},

	//returns all created points
	get:function(){
		return sdl.point.points;
	},

	//pushes an arbitriary point to be tracked by the sdl.point class
	push:function(newpoint){
		sdl.point.points.push(newpoint);
		return this;
	}
});

//short hand to create new points
sdl.extend("newPoint", function(x,y,z){
	return sdl.point.create(x,y,z);
});

//the color library
//made to easily create colors and gradients
var SDLcolor = function(colorname,colorstring){
	const desc = "SDLcolor";
	this.name = colorname;
	this.rep = colorstring;
}
sdl.extend("color",{
	create:function(colorname, colorstring){
		return new SDLcolor(colorname,colorstring);
	},

	//predefined color library
	emerald: new SDLcolor("emerald", "#2ECC71"),
	amethyst: new SDLcolor("amethyst", "#9B59B6"),
	topaz: new SDLcolor("topaz", "#F1C40F"),
	garnet: new SDLcolor("garnet","#C0392B"),
	silver: new SDLcolor("silver", "#BDC3C7")
});