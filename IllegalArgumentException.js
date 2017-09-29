function IllegalArgumentException(message){
	this.message = message;
	this.type = "IllegalArgumentException";
}

IllegalArgumentException.prototype.printStack = function(){
	Logger.log(this.type);
	Logger.log(this.message);
};