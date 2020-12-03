# Google Apps Script Useful Snippets
A collection of small functions and/or classes to help along with development in GAS.

### Function list:

**Docs:**

[Count words in a Google Doc - `countWords()`](https://github.com/rafa-guillermo/Google-Apps-Script-Useful-Snippets/blob/main/docs-snippets/wordCounter.js):

- Takes Google Doc File ID
- Returns the number of words in the Document

**Drive:**

[Count all Files in Google Drive Folder - `countFilesInFolder()`](https://github.com/rafa-guillermo/Google-Apps-Script-Useful-Snippets/blob/main/drive-snippets/countFilesInDriveFolder.js):

- Takes Google Drive folder ID as parameter.
- Returns the number of items in the folder.

**Sheets:**

[Count number of Formulae in Google Spreadsheet - `getAllFormulae()`](https://github.com/rafa-guillermo/Google-Apps-Script-Useful-Snippets/blob/main/sheets-snippets/countFormulaeInSpreadsheet.js):

- Returns number of formulae in all sheets of a Spreadsheet file.

[Convert Google Sheet to `.xlsx` Format - `convertSheetToXlsx()`](https://github.com/rafa-guillermo/Google-Apps-Script-Useful-Snippets/blob/main/sheets-snippets/convertSheetToXlsx.js):

- Takes Spreadsheet ID and Drive folder ID as parameters
- Saves `.xlsx` version to user's Drive

[Convert `.xlsx` File to Google Sheets Format - `convertXlsxToSheet()`](https://github.com/rafa-guillermo/Google-Apps-Script-Useful-Snippets/blob/main/sheets-snippets/convertXlsxToSheet.js):

- Takes `.xlsx` File ID and Drive folder ID as parameters
- Saves converted Google Sheet to user's Drive

**UrlFetchApp:**

[Obtain Final Location of given URL - `getLocation()`](https://github.com/rafa-guillermo/Google-Apps-Script-Useful-Snippets/blob/main/urlfetchapp-snippets/urlShortenerReversal.js):

- Returns end location of a URL if passed through shortener.

[Turn JSON object of URL parameter-value pairs into URL parameter string - `urlParameterfy()`](https://github.com/rafa-guillermo/Google-Apps-Script-Useful-Snippets/blob/main/urlfetchapp-snippets/urlParameterfy.js)

- Takes JSON object of parameters and their values
- Returns single string of all URL parameters ready for concatenation with URL
