/**
 * @constructor RequestHandler
 */
function RequestHandler() {
  var id = Math.floor(Math.random() * (10000 - 1 + 1)) + 1;
  var request_queue = [];

  /**
   * Returns the instance id
   * @return {Number} id
   */
  this.getId = function() {
    return id;
  };

  /**
   * Returns the latest request in the request_queue
   * @return {Request} request
   */
  this.getLastRequest = function() {
    return request_queue[request_queue.length - 1];
  };

  /**
   * Returns the number of request in the request_queue
   * @return {Number}
   */
  this.getRequestAmount = function() {
    return request_queue.length;
  };

  /**
   * Adds a new Request to the request_queue
   * @param {Request} request Request that should be added to the request_queue
   */
  function addRequest(request) {
    if (!request instanceof Request){
      throw new IllegalArgumentException("RequestHandler.prototype.addRequest expects an argument of type 'Request'.");
    }
    request_queue.push(request);
  }

  /**
   * Creates a new Request
   * @param  {String} requestType
   * @param  {String} url
   * @param  {ResponseHandler} responseHandler The ResponseHandler which should be subscribed to the Request
   * @return {void}
   */
  this.createRequest = function(requestType, url, responseHandler) {
    if (!responseHandler instanceof ResponseHandler) {
      throw new IllegalArgumentException("RequestHandler.prototype.createRequest expects an arguement of type ResponseHandler.");
    }
    if (requestType){
      var self = this;
    }
    var request = new Request();
    addRequest(request);
    request.setType(requestType);
    request.setUrl(url);
    request.setPayload(self.payload);
    request.subscribe(responseHandler);
    this.deletePayload();
  };
}

/**
 * Stores the payload for a new Request
 * @param {Object} payload
 */
RequestHandler.prototype.setPayload = function(payload) {
  this.payload = payload;
};

/**
 * Returns the current payload.
 * @return {Object} payload
 */
RequestHandler.prototype.getPayload = function() {
  return this.payload;
};

/**
 * Deletes the current payload
 * @return {void}
 */
ResponseHandler.prototype.deletePayload = function() {
  this.payload = {};
};

/**
 * Builds a new payload object from an array and stores it.
 * @param  {Array} args 2-dimensional Array which holds key-value pairs that are supposed to be stored in the payload object.
 * @return {void}
 */
RequestHandler.prototype.buildPayloadFromArray = function(args) {
  var payload = {};
  var i;
  for (i = 0; i < args.length; i++) {
    payload[args[i][0]] = args[i][1];
  }
  this.payload = payload;
};

/**
 * Submits the latest request in the request_queue
 * @return {void}
 */
RequestHandler.prototype.sendRequest = function(instruction) {
  var request = this.getLastRequest();
  if (instruction instanceof Instruction){
    request.send(instruction);
  }
};