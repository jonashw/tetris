function Piece(orientations,color,x,y){
	this.o = orientations;
	this.oi = 0;
	this.color = color;
	this.x = x;//optional
	this.y = y;//optional
}
Piece.prototype.getVertices = function(){
	//The API for a Piece is its vertices, its x & y position, and its color.
	//The vertices are exposed as an array of points.  Each point is a 2-membered array: [x,y].
	var self = this;
	return this.o[this.oi].map(function(item,i){
		return [item[0] + self.x, item[1] + self.y];
	});
};
Piece.prototype.rotateCCW = function(){
	this.oi++;
	if(this.oi >= this.o.length) this.oi = 0;
	return this;
}
Piece.prototype.rotateCW = function(){
	this.oi--;
	if(this.oi < 0) this.oi = this.o.length-1;
	return this;
}
//Piece has some statics
Piece.colors = {
	red:"#ff0000",
	orange:"#eedd00",
	yellow:"#f3f300",
	green:"#00ee00",
	blue:"#3333ff",
	teal:"#00f3f3",
	purple:"#ee00ee"
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
		new T(Piece.colors.red, 	0, 	0),
		new S(Piece.colors.orange, 	5, 	0),
		new Z(Piece.colors.yellow, 	10, 0),
		new I(Piece.colors.green, 	15, 0),
		new J(Piece.colors.blue, 	20,	0),
		new L(Piece.colors.teal, 	25,	0),
		new S(Piece.colors.purple, 	30, 0)
	];
};
Piece.generateDemoPieces = function(n,t){
	var n = n || 0;
	if(n <= 0) throw("Piece.getRandomDemoPieces(n): n must be >= 1");
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
	Piece.call(this, o, color, x, y);
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
	Piece.call(this, o, color, x, y);
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
	Piece.call(this, o, color, x, y);
	this.rvi = 2;
}

O.prototype = new Piece();
function O(color,x,y){ 
	var o = [
		[[0,0],[-1,0],[-1,-1],[0,-1]]
	];
	Piece.call(this, o, color, x, y);
}

S.prototype = new Piece();
function S(color,x,y){ 
	var o = [
		[[1,0],[0,0],[0,-1],[-1,-1]],
		[[0,1],[0,0],[1,0],[1,-1]]
	];
	Piece.call(this, o, color, x, y);
}

Z.prototype = new Piece();
function Z(color,x,y){ 
	var o = [
		[[-1,0],[0,0],[0,-1],[1,-1]],
		[[0,-1],[0,0],[1,0],[1,1]]
	];
	Piece.call(this, o, color, x, y);
}

I.prototype = new Piece();
function I(color,x,y){ 
	var o = [
		[[-2,0],[-1,0],[0,0],[1,0]],
		[[0,-2],[0,-1],[0,0],[0,1]]
	];
	Piece.call(this, o, color, x, y);
}
