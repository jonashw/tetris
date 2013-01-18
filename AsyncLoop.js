function AsyncLoop(fn, delay){
	this.fn = fn;
	this.delay = delay;
	this.timeout = null;
	this.isLooping = false;
}
AsyncLoop.prototype.start = function(){
	this.isLooping = true;
	this.execute();
};
AsyncLoop.prototype.execute = function(){
	this.fn();
	var self = this;
	if(this.isLooping) this.timeout = setTimeout(function(){
		self.execute();
	}, this.delay);
};
AsyncLoop.prototype.stop = function(){
	clearTimeout(this.timeout);
	this.isLooping = false;
};
AsyncLoop.prototype.isRunning = function(){
	return this.isLooping;
};
