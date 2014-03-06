//this function creates a context object on which we can draw onto
//the inpud is the ID of the canvas defined by <canvas id='canvasId'></canvas>

var createContext = function(canvasId){
	var canvas = document.getElementById(canvasId);
	var context = canvas.getContext('2d');
	return context;
}

//Default Values
defaultThickness = 2;
defaultFillColor = 'white';
defaultLineColor = 'black';
//this function draws a full circle
//context = the canvas you want to target
//centerX,centerY,radius = the center coordinates and the radius
//optional parameter thickness which sets the line width
var drawCircle = function(context, centerX, centerY, radius, thickness){
	if(typeof(thickness)==='undefined') thickness = defaultThickness;
	context.beginPath();
	context.arc(centerX, centerY, radius, 0, 2*Math.PI, false);
	context.linewidth = thickness;
	context.stroke();
}

var drawSquare = function(context, centerX, centerY, side, thickness, lineColor, fillColor){
	if(typeof(thickness)=='undefined') thickness = defaultThickness;
	if(typeof(lineColor)=='undefined') lineColor = defaultLineColor;
	if(typeof(fillColor)=='undefined') fillColor = defaultFillColor;
    context.beginPath();
    context.rect(centerX, centerY, side, side);
    context.fillStyle = fillColor;
    context.fill();
    context.lineWidth = thickness;
    context.strokeStyle = lineColor;
    context.stroke();
}

    // add linear gradient
    //var grd = context.createLinearGradient(0, 0, canvas.width, canvas.height);
      // light blue
    //grd.addColorStop(0, '#8ED6FF');   
      // dark blue
    //grd.addColorStop(1, '#004CB3');
    

//Makes an equilateral triangle
var drawTriangle = function(context, centerX, centerY, side1, side2, side3, height, thickness, lineColor, fillColor){
	side2 = side1; side3 = side1;
	if(typeof(height)=='undefined') height = Math.sqrt((side1 * side1) - ((side1 / side1) * (side1 / side1)));
	if(typeof(thickness)=='undefined') thickness = defaultThickness;
	if(typeof(lineColor)=='undefined') lineColor = defaultLineColor;
	if(typeof(fillColor)=='undefined') fillColor = defaultFillColor;
	context.beginPath();
    context.moveTo(centerX, centerY);
    context.lineTo(centerX+(side1/2), centerY + (height));
    context.lineTo(centerX+side1, centerY);
    context.lineTo(centerX, centerY);
    context.lineJoin = 'miter';
    context.closePath();
    context.fillStyle = fillColor;
    context.fill();
    context.lineWidth = thickness;
    context.strokeStyle = lineColor;
    context.stroke();
}