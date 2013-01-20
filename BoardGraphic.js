function BoardGraphic(board,ctx,tileSize){
	this.board = board;
	this.x = 0;
	this.y = tileSize;
	this.ctx = ctx;
	this.tileSize = tileSize || 20;
	//setup the canvas
	var c = ctx.canvas;
	var bw = tileSize * board.columnCount + this.x;
	var bh = tileSize * board.rowCount + this.y;
	c.width = bw;
	c.style.width = bw + 'px';
	c.height = bh;
	c.style.height = bh + 'px';
	var self = this;
	this.board.on('piece_placed',function(){
		//console.log('placed!');
		self.fullCells = null;
	});
}
BoardGraphic.prototype.draw = function(withGradients,withOutline){
	var self = this;
	this.board.forEachCell(function(r,c,color){
		if(!!color){
			if(withGradients){
				self.drawTileWithGradient(c,r,lighten(color,50),color);
			} else {
				self.drawTile(c,r,color);
			}
			//if(withOutline) self.outlineJunk();
		} else {
			self.outlineTile(c,r);
		}
	});
};
BoardGraphic.prototype.getBoardHeight = function(){
	return this.board.rowCount * this.tileSize;
};
BoardGraphic.prototype.clear = function(){
	var c = this.ctx.canvas;
	this.ctx.clearRect(0,0,c.width,c.height);
};
BoardGraphic.prototype.getFullCells = function(){
	if(!!this.fullCells) return this.fullCells;
	var board = this.board;
	var fullCells = {t:[],b:[],l:[],r:[]};
	board.forEachCell(function(r,c,color){
		if(!color) return false;
		var cell = {r:r,c:c};
		if(board.hasEmptyCellAt(c, r + 1)) fullCells.t.push(cell);
		if(board.hasEmptyCellAt(c, r - 1)) fullCells.b.push(cell);
		if(board.hasEmptyCellAt(c + 1, r)) fullCells.r.push(cell);
		if(board.hasEmptyCellAt(c - 1, r)) fullCells.l.push(cell);
	});
	this.fullCells = fullCells;
	return this.fullCells;
};
BoardGraphic.prototype.outlineJunk = function(){
	var self = this;
	this.ctx.save();
	this.ctx.strokeStyle="#ffffff";
	var fullCells = this.getFullCells();
	fullCells.t.forEach(function(cell){ self.drawTopBorderAt(cell.c, cell.r); });
	fullCells.b.forEach(function(cell){ self.drawBottomBorderAt(cell.c, cell.r); });
	fullCells.r.forEach(function(cell){ self.drawRightBorderAt(cell.c, cell.r); });
	fullCells.l.forEach(function(cell){ self.drawLeftBorderAt(cell.c, cell.r); });
	this.ctx.restore();
};
BoardGraphic.prototype.dim = function(){
	this.ctx.save();
	var c = this.ctx.canvas;
	this.ctx.fillStyle="rgba(0,0,0,0.5)";
	this.ctx.fillRect(0,0,c.width,c.height);
	this.ctx.restore();
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
BoardGraphic.prototype.drawPieceWithGradient = function(piece,highlightCenter){
	var ctx = this.ctx;
	var board = this.board;
	var self = this;
	var colorA = lighten(piece.color,50);
	var colorB = piece.color;
	piece.getVertices().forEach(function(v,i){
		var c = v[0];
		var r = v[1];
		var center = (c == piece.x && r == piece.y);
		self.drawTileWithGradient(c, r, colorA, colorB, center && highlightCenter);
	});
};
BoardGraphic.prototype.drawTileWithGradient = function(c,r,colorA,colorB,isSpecial){
	this.ctx.save();
	var x = this.x + (c-1)*this.tileSize; 
	var y = this.y + this.getBoardHeight() - (r*this.tileSize);
	var grd = this.ctx.createLinearGradient(x, y, x, y + this.tileSize);//x1,y1,x2,y2
    grd.addColorStop(0, colorA);   
    grd.addColorStop(1, colorB);
    this.ctx.fillStyle = grd;
    this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
	this.ctx.restore();
	if(isSpecial){
		this.ctx.save();
		this.ctx.fillStyle="rgba(255,255,255,0.5)";
		this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
		this.ctx.restore();
	}
	this.outlineTile(c,r);
};
BoardGraphic.prototype.drawTile = function(c,r,isSpecial){
	var x = this.x + (c-1)*this.tileSize; 
	var y = this.y + this.getBoardHeight() - (r*this.tileSize);
	this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
	if(isSpecial){
		this.ctx.save();
		this.ctx.fillStyle="rgba(255,255,255,0.5)";
		this.ctx.fillRect(x, y, this.tileSize, this.tileSize);
		this.ctx.restore();
	}
	this.outlineTile(c,r);
};
BoardGraphic.prototype.outlineTile = function(c,r){
	var x = this.x + (c-1)*this.tileSize; 
	var y = this.y + this.getBoardHeight() - (r*this.tileSize);
	this.ctx.save();
	this.ctx.fillStyle="#999999";
	this.ctx.strokeRect(x, y, this.tileSize, this.tileSize);
	this.ctx.restore();
};
BoardGraphic.prototype.drawRightBorderAt = function(c,r){
	var x = this.x + (c-1)*this.tileSize + this.tileSize; 
	var y = this.y + this.getBoardHeight() - (r*this.tileSize);
	this.drawBorder(x,y,x,y+this.tileSize);
};
BoardGraphic.prototype.drawLeftBorderAt = function(c,r){
	var x = this.x + (c-1)*this.tileSize; 
	var y = this.y + this.getBoardHeight() - (r*this.tileSize) + this.tileSize;
	this.drawBorder(x,y,x,y-this.tileSize);
};
BoardGraphic.prototype.drawTopBorderAt = function(c,r){
	var x = this.x + (c-1)*this.tileSize + this.tileSize; 
	var y = this.y + this.getBoardHeight() - (r*this.tileSize);
	this.drawBorder(x,y,x-this.tileSize,y);
};
BoardGraphic.prototype.drawBottomBorderAt = function(c,r){
	var x = this.x + (c-1)*this.tileSize; 
	var y = this.y + this.getBoardHeight() - (r*this.tileSize) + this.tileSize;
	this.drawBorder(x,y,x+this.tileSize,y);
};
BoardGraphic.prototype.drawBorder = function(x1,y1,x2,y2){
	this.ctx.moveTo(x1,y1);
	this.ctx.lineTo(x2,y2);
	this.ctx.stroke();
};
