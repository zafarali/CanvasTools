/*
simple drawing library (SDL.js)
Playing around with object oriented library creation
this is library lets us draw simple shapes and add
simple text to a context defined object.
*/
var SDL = function(ctx){
	
	//defines the context for this object
	var ctx = ctx;
	this.WIDTH = ctx.canvas.getAttribute('width');
	this.HEIGHT = ctx.canvas.getAttribute('height');


	this.circle = function(x,y,r,stroke){
		ctx.beginPath();
		ctx.arc(x,y,r,0,Math.PI*2,true);
		ctx.closePath();
		if(stroke)
			ctx.stroke();
		else
			ctx.fill();
	}


	this.rect = function(x,y,w,h,stroke){
		ctx.beginPath();
		ctx.rect(x,y,w,h);
		ctx.closePath();
		if(stroke)
			ctx.stroke();
		else
			ctx.fill();
	}

	this.square = function(x,y,side,stroke){
    	this.rect(x, y, side, side,stroke);   	
	}
	//clears the context
	this.clear = function(){
		ctx.clearRect(0,0,this.WIDTH,this.HEIGHT)
	}

	this.stroke = function(){
		ctx.stroke();
	}
	this.fill = function(){
		ctx.fill();
	}
	//sets the color of both lines and fill
	this.color = function(colorString){
		this.lineColor(colorString);
		this.fillColor(colorString);
	}

	//sets color of the line
	this.lineColor = function(colorString){
		ctx.strokeStyle = colorString;
	}

	//sets the color of the fill
	this.fillColor = function(colorString){
		ctx.fillStyle=colorString;
	}

	//adds text
	this.text = function(text, x, y, size, font, weight){
		if(typeof(size)=="undefined" || size==" " || size=="") size = "12px";
		if(typeof(font)=='undefined' || font=="" || font==" ") font = "Arial";
		if(typeof(weight)=='undefined' || weight=="" || weight==" ") weight = "bold";
		ctx.font= weight+" "+size+" "+font;
		ctx.fillText(text,x,y);
	}
	this.triangle = function(centerX, centerY, side1, side2, side3, height, stroke){
		side2 = side1; side3 = side1;
		if(typeof(height)=='undefined') height = Math.sqrt((side1 * side1) - ((side1 / side1) * (side1 / side1)));

		ctx.beginPath();
		ctx.moveTo(centerX, centerY);
		ctx.lineTo(centerX+(side1/2), centerY + (height));
		ctx.lineTo(centerX+side1, centerY);
		ctx.lineTo(centerX, centerY);
		ctx.lineJoin = 'miter';
		ctx.closePath();
		if(stroke)
			ctx.stroke();
		else
			ctx.fill();	
	}
}


var sdl = {
	canvas : {
		context:{
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
create : function(ctx){
	return new SDL(ctx);
}
}