function Piece(type,orientations,color,x,y){
	//The API for a Piece is its vertices, its x & y position, and its color.
	this.type = type;
	this.o = orientations;
	this.oi = 0;
	this.color = color;
	this.x = x;//optional
	this.y = y;//optional
}
Piece.prototype.getVertices = function(oi){
	//The vertices are exposed as an array of points.  Each point is a 2-membered array: [x,y].
	var oi = oi || this.oi;
	if(oi < 0 || oi >= this.o.length) throw("Piece.getVertices(oi): oi outside range of 0 -> " + this.o.length + ".  (" + oi + ")");
	var self = this;
	return this.o[oi].map(function(item,i){
		return [item[0] + self.x, item[1] + self.y];
	});
};
Piece.prototype.rotateCCW = function(){
	this.oi = this.getNextCCWOrientationIndex();
	return this;
}
Piece.prototype.rotateCW = function(){
	this.oi = this.getNextCWOrientationIndex();
	return this;
}
Piece.prototype.getNextCWVertices = function(){ //for previewing the would-be state after a CW rotation
	var oi = this.getNextCWOrientationIndex();
	return this.getVertices(oi);
};
Piece.prototype.getNextCCWVertices = function(){ //for previewing the would-be state after a CCW rotation
	var oi = this.getNextCCWOrientationIndex();
	return this.getVertices(oi);
};
Piece.prototype.getNextCWOrientationIndex = function(){
	var dec = this.oi - 1;
	return (dec >= 0) ? dec : this.o.length-1;
};
Piece.prototype.getNextCCWOrientationIndex = function(){
	var inc = this.oi + 1;
	return (inc < this.o.length) ? inc : 0;
};
//Piece has some statics
Piece.colors = {
	red:"#990000",
	orange:"#994400",
	yellow:"#999900",
	green:"#005500",
	blue:"#111188",
	teal:"#118888",
	purple:"#660066"
};
Piece.getRandomColor = function(){
	var c = [];
	for(var k in Piece.colors){
		c.push(Piece.colors[k]);
	}
	return c[Math.floor(Math.random() * c.length)];
};
Piece.getRandomPiece = function(t){
	var sh = [T,S,Z,I,L,J,O];
	var t = t || sh[Math.floor(Math.random() * sh.length)];
	return new t(Piece.getRandomColor());
}
Piece.getDemoPieces = function(){
	return [
		new T(Piece.colors.red, 	1, 	1),
		new S(Piece.colors.orange, 	5, 	1),
		new Z(Piece.colors.yellow, 	10, 1),
		new I(Piece.colors.green, 	15, 1),
		new J(Piece.colors.blue, 	20,	1),
		new L(Piece.colors.teal, 	25,	1),
		new S(Piece.colors.purple, 	30, 1)
	];
};
Piece.generateDemoPieces = function(n,t){
	var n = n || 0;
	if(n <= 0) throw("Piece.getDemoPieces(n): n must be >= 1");
	var genPieces = [];
	for(var i=0; i<n; i++){
		var piece = Piece.getRandomPiece(t);
		piece.x = (i%7)*5;
		piece.y = Math.floor(i/7)*5;
		genPieces.push(piece);
	}
	return genPieces;
};


//Subclasses of Piece
T.prototype = new Piece();
function T(color,x,y){ 
	var o = [
		[[0,-1],[0,0],[-1,0],[1,0]],
		[[1,0],[0,0],[0,-1],[0,1]],
		[[0,1],[0,0],[1,0],[-1,0]],
		[[-1,0],[0,0],[0,1],[0,-1]]
	];
	Piece.call(this, 'T', o, color, x, y);
	this.rvi = 1;
}

J.prototype = new Piece();
function J(color,x,y){ 
	var o = [
		[[-1,0],[0,0],[1,0],[1,-1]],
		[[0,-1],[0,0],[0,1],[1,1]],
		[[1,0],[0,0],[-1,0],[-1,1]],
		[[0,1],[0,0],[0,-1],[-1,-1]]
	];
	Piece.call(this, 'J', o, color, x, y);
	this.rvi = 2;
}

L.prototype = new Piece();
function L(color,x,y){ 
	var o = [
		[[1,0],[0,0],[-1,0],[-1,-1]],
		[[0,1],[0,0],[0,-1],[1,-1]],
		[[-1,0],[0,0],[1,0],[1,1]],
		[[0,-1],[0,0],[0,1],[-1,1]]
	];
	Piece.call(this, 'L', o, color, x, y);
	this.rvi = 2;
}

O.prototype = new Piece();
function O(color,x,y){ 
	var o = [
		[[0,0],[-1,0],[-1,-1],[0,-1]]
	];
	Piece.call(this, 'O', o, color, x, y);
}

S.prototype = new Piece();
function S(color,x,y){ 
	var o = [
		[[1,0],[0,0],[0,-1],[-1,-1]],
		[[0,1],[0,0],[1,0],[1,-1]]
	];
	Piece.call(this, 'S', o, color, x, y);
}

Z.prototype = new Piece();
function Z(color,x,y){ 
	var o = [
		[[-1,0],[0,0],[0,-1],[1,-1]],
		[[0,-1],[0,0],[1,0],[1,1]]
	];
	Piece.call(this, 'Z', o, color, x, y);
}

I.prototype = new Piece();
function I(color,x,y){ 
	var o = [
		[[-2,0],[-1,0],[0,0],[1,0]],
		[[0,-2],[0,-1],[0,0],[0,1]]
	];
	Piece.call(this, 'I', o, color, x, y);
}
