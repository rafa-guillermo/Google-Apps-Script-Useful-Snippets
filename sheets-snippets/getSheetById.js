/**
* Custom function to get sheet from Spreadsheet by ID
* @param  {String} id    - The ID of the sheet to get
* @return {Sheet}  sheet - The Sheet object for a given ID
*/
function getSheetById(id) {
  return SpreadsheetApp.getActiveSpreadsheet().getSheets().filter(function(sheet) {
    return sheet.getSheetId() == id
  })[0];
}
