/**
 * Returns final location of given URL
 * Needs Advanced Drive Service to run
 * @param  {String} ssID - Spreadsheet ID for export
 * @return {Number}      - returns exit code 0 if successful, -1 if failed
 */
function convertSheetToXlsx(ssID) {
  var url = "https://docs.google.com/feeds/download/spreadsheets/Export?key=";
  var exportMethod = "&exportFormat=xlsx";
  var parameters = {
    method: "get",
    headers: {
      "Authorization": "Bearer " + ScriptApp.getOAuthToken()
    },
    muteHttpExceptions: true
  };

  var fileAsBlob = UrlFetchApp.fetch(url + ssID + exportMethod, parameters).getBlob();

  fileAsBlob.setName(SpreadsheetApp.openById(ssID).getName() + ".xlsx");

  var fileData = {
    title: SpreadsheetApp.openById(ssID).getName() + ".xlsx",
    mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  };

  // Save to Drive
  try {
    Drive.Files.insert(fileData, fileAsBlob);
    return 0;
  }
  catch (err) {
    console.error(err);
    return -1;
  }
}
