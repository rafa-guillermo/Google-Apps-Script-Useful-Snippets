/**
 * Returns final location of given URL
 * @param  {String} params    - JSON object of parameters and their values
 * @return {String} returnStr - single string of all URL parameters ready for concatenation with URL
 */
 
 /*
Example parameter object to be passed:
var params = {
  "pagesize": 100,
  "fromdate": 1220227200,
  "todate": 1594598400,
  "order": "desc",
  "sort": "activity",
  "tagged": "google-apps-script",
}
*/

function urlParameterfy(params) {
  var keys = Object.keys(params);
  var returnStr = "?";
  
  keys.forEach(function(key) {
    returnStr+= key + "=" + params[key] + "&";
  });
  
  return returnStr;
}
