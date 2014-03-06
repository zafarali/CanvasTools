//this function creates a context object on which we can draw onto
//the inpud is the ID of the canvas defined by <canvas id='canvasId'></canvas>
var createContext = function(canvasId){
	var canvas = document.getElementById(canvasId);
	var context = canvas.getContext('2d');
	return context;
}
