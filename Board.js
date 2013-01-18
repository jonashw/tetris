function Board(columnCount,rowCount){
	this.columnCount = columnCount || 10;
	this.rowCount = rowCount || 20;
	this.activePiece = null;
	this.rows = [];
	this.initRows();
	this.totalRowsCleared=0;
	new Observable(this);
}
Board.prototype.initRows = function(){
	for(var r=0; r < this.rowCount; r++){
		this.initRow(r);
	}
};
Board.prototype.initRow = function(r){
	this.rows[r] = [];
	for(var c=0; c < this.columnCount; c++){
		this.rows[r][c] = null;
	}
};
Board.prototype.getAt = function(c,r){
	this.requireCellCoordsInBounds(c,r);
	return this.rows[r-1][c-1];	
};
Board.prototype.setAt = function(c,r,value){
	//used by absorbPiece(), below
	this.requireCellCoordsInBounds(c,r);
	this.rows[r-1][c-1] = value;	
};
Board.prototype.hasEmptyCellAt = function(c,r){
	//used by canmove queries
	return this.hasCellAt(c,r) && this.getAt(c,r) == null;
};
Board.prototype.hasCellAt = function(c,r){
	return c > 0 && c <= this.columnCount && r > 0 && r <= this.rowCount;	
};
Board.prototype.requireCellCoordsInBounds = function(c,r){
	if(!this.hasCellAt(c,r)){
		throw(
			"Board.getAt(c,r): Out of bounds!" 
			+ "  Requirements: 0 < r <= " + this.rowCount + ", 0 < c <= " + this.columnCount + "."
			+ "  Actual values (c,r): (" + c + "," + r + ")"
		);
	}
};
Board.prototype.absorbPiece = function(piece){
	var self = this;
	piece.getVertices().forEach(function(vert,i){
		self.setAt(vert[0], vert[1], piece.color);
	});
	//now check for full rows
	var rows = this.rows.map(function(row){
		return row.every(function(cellValue){
			return cellValue !== null;
		});
	});
	var fullRows = [];
	rows.forEach(function(full,r){
		if(full) fullRows.push(r);
	});
	var n = fullRows.length;
	if(!n>0) return false;
	fullRows.sort().reverse().forEach(function(r){
		self.gravityFillEmptiedRow(r);
	});
	this.totalRowsCleared += n;
	this.notifyObservers('clear',n);
	return true;
};
Board.prototype.gravityFillEmptiedRow = function(r){
	//ok so there is obviously some confusion here...
	//gravityFillEmptiedRow(), getAt(), and setAt() are only used by Board itself, is another class in order?
	//also: getAt() and setAt() treat row numbers as 1-indexed, while gravityFillEmptiedRow treats row numbers as 0-indexed.
	//There needs to be more consistency in the interface
	if(r >= this.rowCount || r < 0) throw("Board.gravityFillEmptiedRow(r): r must < " + this.rowCount + " && >= 0");
	var prev=null;
	//from the top down, to avoid conflicts in multi-line clears (Tetris!)
	for(var rr=this.rowCount-1; rr >= r; rr--){
		temp = this.rows[rr];	
		if(prev){
			this.rows[rr] = prev;
		} else {
			this.initRow(rr);
		}
		prev = temp;
	}
};
Board.prototype.pieceCanMoveDown = function(piece){
	//pieceCanMoveDown() and canPlacePiece(), below, certainly overlap a bit
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
};
Board.prototype.canPlacePiece = function(piece){
	var verts = piece.getVertices();
	var self = this;
	return verts.every(function(vert){
		return self.hasEmptyCellAt(vert[0],vert[1]);
	});
};
