function BoardGraphic(board,ctx,tileSize){
	this.board = board;
	this.ctx = ctx;
	this.tileSize = tileSize || 20;
	//setup the canvas
	var c = ctx.canvas;
	var bw = tileSize * board.columnCount;
	var bh = tileSize * board.rowCount;
	c.width = bw;
	c.style.width = bw + 'px';
	c.height = bh;
	c.style.height = bh + 'px';
}
BoardGraphic.prototype.clear = function(){
	var c = this.ctx.canvas;
	this.ctx.clearRect(0,0,c.width,c.height);
};
BoardGraphic.prototype.dim = function(){
	this.ctx.save();
	var c = this.ctx.canvas;
	this.ctx.fillStyle="rgba(0,0,0,0.5)";
	this.ctx.fillRect(0,0,c.width,c.height);
	this.ctx.restore();
};
BoardGraphic.prototype.draw = function(){
	var ctx = this.ctx;
	var board = this.board;
	var RC = board.rowCount;
	for(var r=1; r<=RC; r++){
		for(var c=1; c<=board.columnCount; c++){
			var color = board.getAt(c,r);
			if(color){
				ctx.save();
				ctx.fillStyle = color;
				this.drawTile(c,r)
				ctx.restore();
			} else {
				this.outlineTile(c,r);
			}
		}
	}
};
BoardGraphic.prototype.drawPiece = function(piece,highlightCenter){
	var ctx = this.ctx;
	var board = this.board;
	ctx.save();
	ctx.fillStyle=piece.color;
	var self = this;
	piece.getVertices().forEach(function(v,i){
		var c = v[0];
		var r = v[1];
		var center = (c == piece.x && r == piece.y);
		self.drawTile(c, r, center && highlightCenter);
	});
	ctx.restore();
};
BoardGraphic.prototype.drawTile = function(c,r,special){
	var ctx = this.ctx;
	var board = this.board;
	var tileSize = this.tileSize;
	if(special){
		ctx.save();
		ctx.fillStyle="#ffffff";
	}
	ctx.fillRect((c-1)*tileSize,(board.rowCount - r)*tileSize,tileSize,tileSize);
	this.outlineTile(c,r);
	if(special){
		ctx.restore();
	}
};
BoardGraphic.prototype.outlineTile = function(c,r){
	var tileSize = this.tileSize;
	var ctx = this.ctx;
	ctx.save();
	ctx.fillStyle="#999999";
	ctx.strokeRect((c-1)*tileSize,(this.board.rowCount - r)*tileSize,tileSize,tileSize);
	ctx.restore();
};
