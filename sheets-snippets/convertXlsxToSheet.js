/**
 * Converts Microsoft Excel Format to Google Sheet and saves to Drive
 * Needs Advanced Drive Service to run
 * @param  {String} excelFileId - File ID for .xlsx file to convert
 * @param  {String} folderId    - Folder ID of folder in which to save Sheet 
 * @return {Number}             - returns exit code 0 if successful, -1 if failed
 */
 function convertXlsxToSheet(excelFileId, folderId) {

  try {
    var excelFile = DriveApp.getFileById(excelFileId);
    var blob = excelFile.getBlob();
  
    var file = {
      title: excelFile.getName(),
      parents: [
        {
          "kind": "drive#parentReference",
          "id": folderId
        }
      ]
    };
  
    file = Drive.Files.insert(file, blob, {
      convert: true      
    });  
    return 0;
  }
  catch (err) {
    console.error(err);
    return -1;
  }
}
