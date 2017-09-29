function Instruction(instructionType){
	this.instructionType = instructionType;
  this.instructionId = Math.floor(Math.random() * (10000 - 1 + 1)) + 1;

  if(instructionType=="file"){
    this.fileType = "";
  }
  else if(instructionType=="elementExtraction"){
    this.elements = [];
  }
  else
    throw new IllegalInstructionTypeException("Instruction expects instruction type 'file' or 'elementExtraction'.")
}

Instruction.prototype.setFileType = function(fileType) {
  this.fileType = fileType;
};

Instruction.prototype.addExtractionElement = function(element) {
  this.elements.push(element);
};

/* Instruction: TBD
{
  instructionType : "file",
  instructionID: 123,
  fileType : "CSV"
}

{
  instructionType : "elementExtraction",
  instructionID: 124,
  elements : [
    {
      name : "",
      globalIdentifier : "",
      elementIdentifier : "",
      endElementIdentifier : "",
      elementLength : "",
      offset : ""
    },
    {
      name : "",
      globalIdentifier : "",
      elementIdentifier : "",
      endElementIdentifier : "",
      elementLength : "",
      offset : ""
    }
  ]
}
