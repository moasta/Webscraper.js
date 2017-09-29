/*
- start session
- session should hold space for username, password, RequestHandler, requestProgram Object (config object: whicht request needs to be sent. which url, params, etc)
- instantiate a RequestHandler
- RequestHandler should hold a request_history object, response_history object, currentRequestID, 
- instantiate a new Request:
-- url
-- cookies
-- method
-- payload
- RequestHandler sends Request and receives a new Response
- RequestHandler instantiates a new ResponseHandler (legacy ResponseHandler)
- The ReseponseHandler needs to know which kind of data it should expect.
-- csv
-- html
-- JSON
-- etc.
- the ResponseHandler needs to know where to send the data to.
- if it is supposed to extract dynamic tokens from the website it needs to know for example:
-- number of parameters
--- identifier value to look for
--- next identifier
--- offset
- ResponseHandler extracts the necessary data and sends it to the response_history 
- FileHandler needs to be instantiated
- FileHandler receives the relevant entry from the response_history
- FileHandler needs to know which format the data should have => most relevant for me Google Spreadsheet

*/

function Main() {
  var loginUrl, responseHandler, requestHandler, session;
  var logInDocumentParams = {
    user : "",
    password : "",
  };
  
  loginUrl = "https://www.spked.de/de/home.html";  
  var otherurl = "https://www.spked.de/de/home/misc/logout.html?sp:ac=ifaemlogin%3ALoginPortlet_0%3ALOGIN_HEADER%40portal";
  
  requestHandler = new RequestHandler();
  responseHandler = new ResponseHandler();
  requestHandler.buildPayloadFromArray([[1,"test"],["zweiter test",2]]);
  Logger.log(requestHandler.getPayload());
  Logger.log(requestHandler.getRequestAmount());  
  requestHandler.createRequest("get",loginUrl);
  Logger.log(requestHandler.getRequestAmount());
  
}
