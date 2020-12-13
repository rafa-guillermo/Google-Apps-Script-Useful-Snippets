/**
 * Returns number of formulae in a Spreadsheet
 * @return {Number} count    - number of formulae in given Spreadsheet
 */
 function getAllFormulae() {
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  // Initialise count
  var count = 0;
  
  // Repeat for all Sheets
  for (var i = 0; i < ss.length; i++) {
   
   // Get list of all formulae in current sheet
    var currSheetValues = ss[i].getDataRange().getFormulas();
   
   // Repeat for all rows in Sheet
    for (var j = 0; j < currSheetValues.length; j++) {
     // Repeat for all columns in row
      for (var k = 0; k < currSheetValues[j].length; k++) {
       // If the cell's value starts with a "=", add 1 to count
        if (currSheetValues[j][k].startsWith("=") == 1) {
          count++
        }
      }
    }
  }  
  
  // Return the total count of formulae
  return count;  
}
