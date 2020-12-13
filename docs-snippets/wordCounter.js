/**
 * Returns number of words in a given Document
 * @param  {String} docId    - A Google Docs File ID
 * @return {Number} count    - number of words in given Document
 */
 function countWords(docId) {
  let doc = DocumentApp.openById(docId)().getBody().getText();
  
  // Matches all strings of the form:
  // Word boundary, One or more non-whitespace character, Word boundary
  let count = (doc.match(/\b\S+\b/g) || []).length;
  
  // return length of matches array
  return count;
}
