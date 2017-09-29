function IllegalInstructionCompositionException(message){
	this.message = message;
	this.type = "IllegalInstructionCompositionException";
}

IllegalInstructionCompositionException.prototype.printStack = function(){
	Logger.log(this.type);
	Logger.log(this.message);
};