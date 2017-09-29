function IllegalInstructionTypeException(message){
	this.message = message;
	this.type = "IllegalInstructionTypeException";
}

IllegalInstructionTypeException.prototype.printStack = function(){
	Logger.log(this.type);
	Logger.log(this.message);
};