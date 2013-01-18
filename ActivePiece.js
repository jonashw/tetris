function ActivePiece(board,piece){
	this.board = board;
	this.piece = piece;//optional
}
ActivePiece.prototype.canDrop = function(){
	return !!this.piece;
};
ActivePiece.prototype.canMoveLeft = function(){
	var board = this.board;
	return !!this.piece && this.piece.getVertices().every(function(vert){
		return board.hasEmptyCellAt(vert[0]-1,vert[1]);
	});
};
ActivePiece.prototype.canMoveRight = function(){
	var board = this.board;
	return !!this.piece && this.piece.getVertices().every(function(vert){
		return board.hasEmptyCellAt(vert[0]+1,vert[1]);
	});
};
ActivePiece.prototype.canMoveDown = function(){
	var board = this.board;
	return !!this.piece && this.piece.getVertices().every(function(vert){
		return board.hasEmptyCellAt(vert[0],vert[1]-1);
	});
};
ActivePiece.prototype.canRotateCW = function(){
	var board = this.board;
	var verts = this.piece.getNextCWVertices();
	console.log(verts);
	return !!this.piece && verts.every(function(vert){
		return board.hasEmptyCellAt(vert[0],vert[1]);
	});
};
ActivePiece.prototype.canRotateCCW = function(){
	var board = this.board;
	var verts = this.piece.getNextCCWVertices();
	console.log(verts);
	return !!this.piece && verts.every(function(vert){
		return board.hasEmptyCellAt(vert[0],vert[1]);
	});
};
ActivePiece.prototype.moveLeft = function(){
	if(!this.canMoveLeft()) return false;
	this.piece.x--;
};
ActivePiece.prototype.moveRight = function(){
	if(!this.canMoveRight()) return false;
	this.piece.x++;
};
ActivePiece.prototype.drop = function(){
	if(!this.canDrop()) return false;
	var verts = this.piece.getVertices();
	var board = this.board;
	var i = 0;
	while(verts.every(function(vert){return board.hasEmptyCellAt(vert[0], vert[1] + i-1);})){
		i--;
	}
	this.piece.y += i;
};
ActivePiece.prototype.moveDown = function(){
	if(!this.canMoveDown()) return false;
	this.piece.y--;
};
ActivePiece.prototype.rotateCW = function(){
	if(!this.canRotateCW()) return false;
	this.piece.rotateCW();
};
ActivePiece.prototype.rotateCCW = function(){
	if(!this.canRotateCCW()) return false;
	this.piece.rotateCCW();
};
