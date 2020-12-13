/**
 * Converts Google Sheets file to Microsoft Excel Format and saves to Drive
 * Needs Advanced Drive Service to run
 * @param  {String} ssID - Spreadsheet ID for export
 * @param  {String} folderId    - Folder ID of folder in which to save Sheet 
 * @return {Number}      - returns exit code 0 if successful, -1 if failed
 */
function convertSheetToXlsx(ssID, folderId) {
  try {
    // Define export endpoint and method.
    var url = "https://docs.google.com/feeds/download/spreadsheets/Export?key=";
    var exportMethod = "&exportFormat=xlsx";
    
    // Create options object for UrlFetch
    var parameters = {
      method: "get",
      headers: {
        "Authorization": "Bearer " + ScriptApp.getOAuthToken()
      },
      muteHttpExceptions: true
    };
   
    // Get the file as a Blob and set name of file
    var fileAsBlob = UrlFetchApp.fetch(url + ssID + exportMethod, parameters).getBlob();
    fileAsBlob.setName(SpreadsheetApp.openById(ssID).getName() + ".xlsx");

    // Create file metadata, set .xlsx Mimetype and ID of folder in which to be inserted
    var fileData = {
      title: SpreadsheetApp.openById(ssID).getName() + ".xlsx",
      mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      parents: [
        {
          "kind": "drive#parentReference",
          "id": folderId
        }
      ]
    };

  // Save to Drive
    Drive.Files.insert(fileData, fileAsBlob);
    return 0;
  }
  catch (err) {
    // Log error in case of unintended halt
    console.error(err);
    return -1;
  }
}
