/**
 * Returns final location of given URL
 * @param  {String} url - URL to be followed
 * @return {String} url - final location of given URL
 */
function getLocation(url) {
  var fetched = UrlFetchApp.fetch(url, {
    followRedirects:false
  });

  if (fetched.getHeaders().Location !== undefined) {
    return getLocation(fetched.getHeaders().Location);
  }
  return url;
}
