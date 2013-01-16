function Board(columnCount,rowCount){
	this.columnCount = columnCount || 10;
	this.rowCount = rowCount || 20;
	this.activePiece = null;
	this.rows = [];
	this.cells = [];
	this.initCells();
}
Board.prototype.initCells = function(){
	for(var r=0; r < this.rowCount; r++){
		this.rows[r] = [];
		for(var c=0; c < this.columnCount; c++){
			this.rows[r][c] = null;
			this.cells.push(null);
		}
	}
};
Board.prototype.getAt = function(c,r){
	if(r > this.rowCount || r <= 0){
		throw("Board.getAt(c,r): Illegal r value!");
	}
	if(c > this.columnCount || c <= 0){
		throw("Board.getAt(c,r): Illegal c value!");
	}
	return this.rows[r-1][c-1];	
};
Board.prototype.setAt = function(c,r,value){
	if(r > this.rowCount || r <= 0){
		throw("Board.setAt(c,r,value): Illegal r value!");
	}
	if(c > this.columnCount || c <= 0){
		throw("Board.setAt(c,r,value): Illegal c value!");
	}
	this.rows[r-1][c-1] = value;	
};
Board.prototype.absorbPiece = function(piece){
	var self = this;
	piece.getVertices().forEach(function(vert,i){
		self.setAt(vert[0], vert[1], piece.color);
	});
	//delete piece;
}
Board.prototype.pieceCanMoveDown = function(piece){
	var v = piece.getVertices();
	var can = true;
	var self = this;
	v.forEach(function(vs){
		if(vs[1] == 1){
			can = false;
			return;
		}
		if(self.getAt(vs[0],vs[1] - 1)) can = false;
	});
	return can;
}
Board.prototype.canPlacePiece = function(piece){
	var can = true;
	var self = this;
	var v = piece.getVertices().forEach(function(vs){
		if(self.getAt(vs[0],vs[1])) can = false;
		return;
	});
	return can;
}
