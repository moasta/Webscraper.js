/**
 * Request
 */
function Request(){
  var id = Math.floor(Math.random() * (10000 - 1 + 1)) + 1;
  var options = {};//method, Set-Cookie, payload
  var subscribers = [];
  /**
   * Returns the request id
   * @return {Number} id
   */
  this.getId = function(){
    return id; 
  };
  
  /**
   * sets one key-value pair of the options.
   * @param {String} key   
   * @param {Object} value 
   */
  this.setOption = function(key,value){
    options[key] = value;
  };
  
  /**
   * returns the value of one options key-value pair
   * @param  {String} key
   * @return {Object}
   */
  this.getOption = function(key){
    return options[key];
  };
  
  /**
   * Returns all request options
   * @return {Object} options
   */
  this.getOptions = function(){
    return options;
  };
  
  /**
   * subscribes a subscriber to the request
   * @param  {Subscriber} subscriber 
   * @return {void}
   */
  this.subscribe = function(subscriber){
    subscribers.push(subscriber);
  };
  
  /**
   * Returns all subscribers of the Request
   * @return {Array} subscribers
   */
  this.getSubscribers = function(){
    return subscribers; 
  }
}

/**
 * Sets the request type 
 * @param {String} type 
 */
Request.prototype.setType = function(type){
  this.setOption("method",type);
};

/**
 * sets all options of the payload
 * @param {Object} args
 */
Request.prototype.setPayload = function(args){
  for(var prop in args){
    this.setOption(prop,args[prop]);
  }
};

/**
 * sets the request URL
 * @param {String} url
 */
Request.prototype.setUrl = function(url){
  this.url = url;
};

/**
 * submits the request
 * @return {Object} response
 */
Request.prototype.send = function(instruction){
  var response;
  if(!this.url)
    throw "UndefinedTargetUrlException";
  else if(!this.getOptions())
    throw "UndefinedRequestOptionsException";
  else{
    response = UrlFetchApp.fetch(this.url, this.getOptions());
  }
  if(response){
    this.informSubscribers(response,instruction);
    return response;
  }
  else
    throw "FatalUrlFetchException";
};

Request.prototype.informSubscribers = function(response,instruction){
  for (var i=0;i<subscribers.length;i++){
    subscribers[i].receiveResponse(response,instruction);
  }
};