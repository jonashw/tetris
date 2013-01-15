function Shape(vertices,color,x,y){
	this.v = vertices;
	this.color = color;
	this.x = x;//optional
	this.y = y;//optional
}
Shape.prototype.getVertices = function(){
	//The API for a Shape is its vertices, its x & y position, and its color.
	//The vertices are exposed as an array of points.  Each point is a 2-membered array: [x,y].
	var self = this;
	return this.v.map(function(item,i){
		return [item[0] + self.x, item[1] + self.y];
	});
};
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
Shape.getRandomShape = function(){
	var sh = [Trident,S,Z,Rod,L_L,L_R,Square];
	var n = Math.floor(Math.random() * sh.length);
	return new sh[n](Shape.getRandomColor());
}

//Subclasses of Shape
Trident.prototype = new Shape();
function Trident(color,x,y){ 
	Shape.call(this, [[0,0],[1,0],[2,0],[1,1]], color, x, y);
}

L_L.prototype = new Shape();
function L_L(color,x,y){ 
	Shape.call(this, [[0,0],[1,0],[1,1],[1,2]], color, x, y);
}

L_R.prototype = new Shape();
function L_R(color,x,y){ 
	Shape.call(this, [[1,0],[0,0],[0,1],[0,2]], color, x, y);
}

Square.prototype = new Shape();
function Square(color,x,y){ 
	Shape.call(this, [[0,0],[1,0],[1,1],[0,1]], color, x, y);
}

S.prototype = new Shape();
function S(color,x,y){ 
	Shape.call(this, [[0,0],[1,0],[1,1],[2,1]], color, x, y);
}

Z.prototype = new Shape();
function Z(color,x,y){ 
	Shape.call(this, [[1,0],[2,0],[1,1],[0,1]], color, x, y);
}

Rod.prototype = new Shape();
function Rod(color,x,y){ 
	Shape.call(this, [[0,0],[0,1],[0,2],[0,3]], color, x, y);
}
