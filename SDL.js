/*
simple drawing library (SDL.js)
Playing around with object oriented library creation
this is library lets us draw simple shapes and add
simple text to a context defined object.
*/
var SDL = function(ctx){
	
	var ctx = ctx;
	this.WIDTH = ctx.canvas.getAttribute('width');
	this.HEIGHT = ctx.canvas.getAttribute('height');

	this.defaults = {
		thickness = 2;
		fill = 'white';
		color = 'black';
	}

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

	//clears the context
	this.clear = function(){
		ctx.clearRect(0,0,this.WIDTH,this.HEIGHT)
	}

	//sets the color
	this.setColor = function(colorString){
		ctx.fillStyle=colorString;
	}

	//adds text
	this.text = function(text, x, y, size,fontWeight){
		if(typeof(size)=="undefined") size = "12px";
		if(typeof(fontWeight)=='undefined') fontWeight = "";
		ctx.font= size+" "+fontWeight;
		ctx.fillText(text,x,y);
	}
	this.triangle = function(context, centerX, centerY, side1, side2, side3, height){
		side2 = side1; side3 = side1;
		if(typeof(height)=='undefined') height = Math.sqrt((side1 * side1) - ((side1 / side1) * (side1 / side1)));

		context.beginPath();
		context.moveTo(centerX, centerY);
		context.lineTo(centerX+(side1/2), centerY + (height));
		context.lineTo(centerX+side1, centerY);
		context.lineTo(centerX, centerY);
		context.lineJoin = 'miter';
		context.closePath();
		context.fill();
	}
}