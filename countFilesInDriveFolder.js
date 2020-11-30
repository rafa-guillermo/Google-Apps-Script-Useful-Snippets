
/**
 * Returns number of files in a given Drive folder
 * Needs Advanced Drive Service to run
 * @param  {String} folderId - A Drive folder ID
 * @return {Number} count    - number of files in given Drive folder
 */
function countFilesInFolder(folderId) {
  var folder = Drive.Children.list(folderId);
  var count, tmp = folder.items.length;
  
  do {
    if (folder.nextPageToken) {
      folder = Drive.Children.list(folderId, {
        pageToken: folder.nextPageToken
      });
      tmp = folder.items.length;
      count += tmp;
    }
  }
  while (folder.nextPageToken);
  
  console.log(count);
  return count;
}
