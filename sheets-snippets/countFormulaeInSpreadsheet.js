/**
 * Returns number of formulae in a Spreadsheet
 * @return {Number} count    - number of formulae in given Spreadsheet
 */
 function getAllFormulae() {
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  var count = 0;
  
  for (var i = 0; i < ss.length; i++) {
    var currSheetValues = ss[i].getDataRange().getFormulas();
    for (var j = 0; j < currSheetValues.length; j++) {
      for (var k = 0; k < currSheetValues[j].length; k++) {
        if (currSheetValues[j][k].startsWith("=") == 1) {
          count++
        }
      }
    }
  }  
  return count;  
}
