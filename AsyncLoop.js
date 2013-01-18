function AsyncLoop(loopBody, delay, beforeStart, afterStop){
	this.loopBody = loopBody;
	this.delay = delay;
	this.beforeStart = beforeStart;
	this.afterStop = afterStop;
	this.timeout = null;
	this.isLooping = false;
}
AsyncLoop.prototype.start = function(){
	if(this.beforeStart) this.beforeStart();
	this.isLooping = true;
	this.execute();
};
AsyncLoop.prototype.execute = function(){
	this.loopBody();
	var self = this;
	if(this.isLooping) this.timeout = setTimeout(function(){
		self.execute();
	}, this.delay);
};
AsyncLoop.prototype.stop = function(){
	clearTimeout(this.timeout);
	this.isLooping = false;
	if(this.afterStop) this.afterStop();
};
AsyncLoop.prototype.isRunning = function(){
	return this.isLooping;
};
