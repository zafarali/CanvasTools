/*
simple drawing library (SDL.js)
Playing around with object oriented library creation
this is library lets us draw simple shapes and add
simple text to a context defined object.
Library works by using 'point' objects ({x:int,y:int})
to define locations of different elements, this allows
us to use other objects which have x,y properties (eg: game characters)
*/
var SDLmanipulator = function(context){
	
	//defines the context for this object
	var ctx = context;
	this.WIDTH = ctx.canvas.getAttribute('width');
	this.HEIGHT = ctx.canvas.getAttribute('height');

	//object description
	const desc = "SDLobj";

	//draws a circle
	this.circle = function(location,r,stroke){
		ctx.beginPath();
		ctx.arc(location.x,location.y,r,0,Math.PI*2,true);
		ctx.closePath();
		if(stroke)
			ctx.stroke();
		else
			ctx.fill();
	};

	//draws a single point (useful for graphing)
	this.point = function(location,withtext,fontsize){
		this.circle(location,2,false);
		if(withtext){
			if(typeof(location.z)=='undefined')
				st = "("+location.x+", "+location.y+")";
			else
				st = "("+location.x+", "+location.y+", "+location.z+")";
			ctx.textBaseline="top";
			if(typeof(fontsize)=='undefined' || fontsize ==" " || fontsize=="") fontsize="9px";
			this.text(st,location,fontsize);
			ctx.textBaseline="alphabetic";
		}
	};

	//draws a rectange
	this.rect = function(location,w,h,stroke){
		ctx.beginPath();
		ctx.rect(location.x,location.y,w,h);
		ctx.closePath();
		if(stroke)
			ctx.stroke();
		else
			ctx.fill();
	};

	//draws a square
	this.square = function(location,side,stroke){
    	this.rect(location, side, side, stroke);   	
	};

	//clears the context
	this.clear = function(){
		ctx.clearRect(0,0,this.WIDTH,this.HEIGHT)
	};

	//strokes the path
	this.stroke = function(){
		ctx.stroke();
	};

	//fills the object/path
	this.fill = function(){
		ctx.fill();
	};


	//sets the color of both line and fill
	this.color = function(colorString){
		this.lineColor(colorString);
		this.fillColor(colorString);
	};

	//sets color of the line
	this.lineColor = function(colorString){
		ctx.strokeStyle = colorString;
	};

	//sets the color of the fill
	this.fillColor = function(colorString){
		ctx.fillStyle=colorString;
	};

	//draws text
	this.text = function(text, location, size, font, weight){
		if(typeof(size)=="undefined" || size==" " || size=="") size = "12px";
		if(typeof(font)=='undefined' || font=="" || font==" ") font = "Arial";
		if(typeof(weight)=='undefined' || weight=="" || weight==" ") weight = "bold";
		ctx.font= weight+" "+size+" "+font;
		ctx.fillText(text,location.x,location.y);
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
	};
};

var sdl = {

//the canvas library
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

//extends the sdl library with a new sublibrary or function
extend : function(lib_or_func_name,object_or_func){
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
	this.x = x;
	this.y = y;
	if(typeof(z)=='undefined'){
		this.dimension = 2;
	}else{
		this.z = z;
		this.dimension = 3;
	}
	sdl.point.points.push(this);
	const desc = "SDLpoint";
};

sdl.extend("point", {
	create:function(x,y,z){
		return new SDLpoint(x,y,z);
	},
	//stores all creates points
	points:[],

	//returns all created points
	get:function(){
		return sdl.point.points;
	},
});

//short hand to create new points
sdl.extend("newPoint", function(x,y,z){
	return sdl.point.create(x,y,z);
});