/**
 * Returns number of files in a given Drive folder
 * Needs Advanced Drive Service to run
 * @param  {String} folderId - A Drive folder ID
 * @return {Number} count    - number of files in given Drive folder
 */
function countFilesInFolder(folderId) {
  
  // Get list of items in a Drive folder
  var folder = Drive.Children.list(folderId);
  
  // Store current count
  var count = folder.items.length;
  
  // Store count in buffer variable
  var tmp = count;
  
  do {
    // Check to see if there are more results not yet returned
    if (folder.nextPageToken) {
      // Get the nect page of results and add to count
      folder = Drive.Children.list(folderId, {
        pageToken: folder.nextPageToken
      });
      tmp = folder.items.length;
      count += tmp;
    }
  }
  // Repeat as long as there are more results
  while (folder.nextPageToken);
  
  // Log and return total count
  console.log(count);
  return count;
}
