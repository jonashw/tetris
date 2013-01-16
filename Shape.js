function Shape(orientations,color,x,y){
	this.o = orientations;
	this.oi = 0;
	this.color = color;
	this.x = x;//optional
	this.y = y;//optional
}
Shape.prototype.getVertices = function(){
	//The API for a Shape is its vertices, its x & y position, and its color.
	//The vertices are exposed as an array of points.  Each point is a 2-membered array: [x,y].
	var self = this;
	return this.o[this.oi].map(function(item,i){
		return [item[0] + self.x, item[1] + self.y];
	});
};
Shape.prototype.rotateCCW = function(){
	this.oi++;
	if(this.oi >= this.o.length) this.oi = 0;
	return this;
}
Shape.prototype.rotateCW = function(){
	this.oi--;
	if(this.oi < 0) this.oi = this.o.length-1;
	return this;
}
//Shape has some statics
Shape.colors = {
	red:"#ff0000",
	orange:"#eedd00",
	yellow:"#f3f300",
	green:"#00ee00",
	blue:"#3333ff",
	teal:"#00f3f3",
	purple:"#ee00ee"
};
Shape.getRandomColor = function(){
	var c = [];
	for(var k in Shape.colors){
		c.push(Shape.colors[k]);
	}
	return c[Math.floor(Math.random() * c.length)];
};
Shape.getRandomShape = function(t){
	var sh = [T,S,Z,I,L,J,O];
	var t = t || sh[Math.floor(Math.random() * sh.length)];
	return new t(Shape.getRandomColor());
}
Shape.getDemoShapes = function(){
	return [
		new T(Shape.colors.red, 	0, 	0),
		new S(Shape.colors.orange, 	5, 	0),
		new Z(Shape.colors.yellow, 	10, 0),
		new I(Shape.colors.green, 	15, 0),
		new J(Shape.colors.blue, 	20,	0),
		new L(Shape.colors.teal, 	25,	0),
		new S(Shape.colors.purple, 	30, 0)
	];
};
Shape.getRandomDemoShapes = function(n,t){
	var n = n || 0;
	if(n <= 0) throw("Shape.getRandomDemoShapes(n): n must be >= 1");
	var genShapes = [];
	for(var i=0; i<n; i++){
		var shape = Shape.getRandomShape(t);
		shape.x = (i%7)*5;
		shape.y = Math.floor(i/7)*5;
		genShapes.push(shape);
	}
	return genShapes;
};


//Subclasses of Shape
T.prototype = new Shape();
function T(color,x,y){ 
	var o = [
		[[0,-1],[0,0],[-1,0],[1,0]],
		[[1,0],[0,0],[0,-1],[0,1]],
		[[0,1],[0,0],[1,0],[-1,0]],
		[[-1,0],[0,0],[0,1],[0,-1]]
	];
	Shape.call(this, o, color, x, y);
	this.rvi = 1;
}

J.prototype = new Shape();
function J(color,x,y){ 
	var o = [
		[[-1,0],[0,0],[1,0],[1,-1]],
		[[0,-1],[0,0],[0,1],[1,1]],
		[[1,0],[0,0],[-1,0],[-1,1]],
		[[0,1],[0,0],[0,-1],[-1,-1]]
	];
	Shape.call(this, o, color, x, y);
	this.rvi = 2;
}

L.prototype = new Shape();
function L(color,x,y){ 
	var o = [
		[[1,0],[0,0],[-1,0],[-1,-1]],
		[[0,1],[0,0],[0,-1],[1,-1]],
		[[-1,0],[0,0],[1,0],[1,1]],
		[[0,-1],[0,0],[0,1],[-1,1]]
	];
	Shape.call(this, o, color, x, y);
	this.rvi = 2;
}

O.prototype = new Shape();
function O(color,x,y){ 
	var o = [
		[[0,0],[-1,0],[-1,-1],[0,-1]]
	];
	Shape.call(this, o, color, x, y);
}

S.prototype = new Shape();
function S(color,x,y){ 
	var o = [
		[[1,0],[0,0],[0,-1],[-1,-1]],
		[[0,1],[0,0],[1,0],[1,-1]]
	];
	Shape.call(this, o, color, x, y);
}

Z.prototype = new Shape();
function Z(color,x,y){ 
	var o = [
		[[-1,0],[0,0],[0,-1],[1,-1]],
		[[0,-1],[0,0],[1,0],[1,1]]
	];
	Shape.call(this, o, color, x, y);
}

I.prototype = new Shape();
function I(color,x,y){ 
	var o = [
		[[-2,0],[-1,0],[0,0],[1,0]],
		[[0,-2],[0,-1],[0,0],[0,1]]
	];
	Shape.call(this, o, color, x, y);
}
