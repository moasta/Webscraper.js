/**
 * ResponseHandler implements Subscriber interface 
 *
 * 1. verschiedene Elemente nach veschiedenen Kriterien (globalIdentifier, elementIdentifier, endElementIdentifier, elementLength, offset) aus einer Seite extrahieren.
 * 2. Dateien (JSON, XML, CSV) erhalten
 * 3. Transformation der Daten in einheitliches JSON Format
 * 4. Daten an einen Handler (Request, File, etc.) zurückspielen.
 * 
 */
function ResponseHandler(){
  var id = Math.floor(Math.random() * (10000 - 1 + 1)) + 1;
  
  /**
   * Returns the id of the current ResponseHandler instance.
   * @return {Number} id
   */
  this.getId = function(){
    return id;
  }; 
}

/**
 * Registers and handles the response.
 * @param  {Object} response
 * @param  {Object} instruction 
 * @return {void}
 */
ResponseHandler.prototype.receiveResponse = function(response,instruction){
  this.response = response;
  this.handleResponse(instruction);
};

//Rückgabewerte aller Handler müssen JSON Objekte sein

ResponseHandler.prototype.handleResponse = function(instruction) {
  var self = this;
  if(instruction.instructionType == "file"){
    var fileHandler = new FileHandler(self.response,instruction);

  }
  else if(instruction.instructionType == "elementExtraction"){
    var elementExtractor = new ElementExtractor(self.response,instruction);
  }
  else
    throw new IllegalInstructionTypeException();
  
};

ResponseHandler.prototype.buildParams = function(){
  
  // Maybe make the buildParams function more flexbible with adding an object through which one can define ehich element is to be fetched, and which value {identifier:"test", nextValue:"test2",indexOffset:5, valueLength:16}
  this.params[getElementByInnerHTML("Anmeldename")] = this.logInDocumentParams.user;
  this.params[getElementByInnerHTML("PIN")] = this.logInDocumentParams.password;
  this.params[getElementByInnerHTML('value="Anmelden"')] = "Anmelden";
  this.params[getElementByInnerHTML('type="hidden"')[0]] = getElementByInnerHTML('type="hidden"',this)[1];
  
  function getElementByInnerHTML(identifierString){
    var stringIndex, elementIndex, element = [];
    stringIndex = self.xml.indexOf(identifierString);
    elementIndex = self.xml.indexOf("name=",stringIndex)+5;
    element[0] = self.xml.substring(elementIndex+1,elementIndex+17);
    if(identifierString.indexOf("type")>-1)
      element[1] = self.xml.substring(self.xml.indexOf("value=",stringIndex)+7,self.xml.indexOf("value=",stringIndex)+23);
    return element;
  }
};

