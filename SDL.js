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
	this.color = function(colorString){
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